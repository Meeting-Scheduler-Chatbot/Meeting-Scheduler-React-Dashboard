const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const router = express.Router();
const unsecureRouter = express.Router();
const User = require("../models/user.model");

dotenv.config();
const {
  CLIENT_ID,
  CLIENT_SECRET,
  CALENDAR_REDIRECT_URI,
  TOP_SECRET,
} = process.env;

const generateUrl = (token) => {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    CALENDAR_REDIRECT_URI
  );

  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ["https://www.googleapis.com/auth/calendar"];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    // If you only need one scope you can pass it as a string
    state: token,
    scope: scopes,
    prompt: "consent",
  });
  return url;
};

router.post("/get_url", async (req, res) => {
  const url = generateUrl(req.body.token);

  if (url.length === 0) {
    res.status(400).send({
      data: url,
      message: "Url olmadı.",
    });
  } else {
    res.status(200).send({
      data: url,
      message: "Url",
    });
  }
});

router.post("/insert_event", async (req, res) => {
  const attendees_emails = req.body.attendees_emails;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const token = req.body.token;
  const event_name = req.body.event_name;

  console.log("token: ", token);
  console.log("end time: ", end_time);
  console.log("start time: ", start_time);
  console.log("mails: ", attendees_emails);
  console.log("event_name", "===>", event_name);
  const decoded = jwt.verify(token, TOP_SECRET);
  const id = decoded.user._id;
  console.log("id: ", id);

  User.findOne({
    _id: id,
  }).then(async (docs) => {
    googleCalendarRefreshToken = docs.googleCalendarRefreshToken;
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      CALENDAR_REDIRECT_URI
    );
    // console.log("googleCalendarRefreshToken",googleCalendarRefreshToken)
    oauth2Client.setCredentials({
      refresh_token: googleCalendarRefreshToken,
    });

    // const calendarEvents = await listEvents(oauth2Client, docs.email);
    // const calendar = google.calendar({version: 'v3', oauth2Client});

    let event = {
      summary: event_name,
      description: "This meeting is created by APPA bot",
      start: {
        dateTime: start_time, // Format: '2015-05-28T09:00:00-07:00'
        timeZone: "Europe/Istanbul",
      },
      end: {
        dateTime: end_time,
        timeZone: "Europe/Istanbul",
      },
      attendees: attendees_emails.map((email) => ({ email: email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    const calendar = google.calendar({ version: "v3", oauth2Client });
    calendar.events.insert(
      {
        auth: oauth2Client,
        calendarId: "primary",
        sendNotifications: true,
        resource: event,
      },
      function (err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          res.status(400).send({
            message: "There is an error contacting the Calendar service",
          });
          return;
        }
        // console.log('Event created: %s', event.data);
        res.status(201).send({
          data: event,
          message: "Event created",
        });
      }
    );
  });

  // if (1) {
  //     res.status(400).send({
  //         data: attendees_emails,
  //         message: "Url olmadı."
  //     });
  // } else {
  //     res.status(200).send({
  //         data: url,
  //         message: "Url",
  //     });
  // }
});

const listEvents = async (auth, email) => {
  date = new Date();
  maxDate = new Date();
  maxDate.setDate(date.getDate() + 5); // NUMBER MEANS HOW MANY DAYS TO CONSIDER
  const calendar = google.calendar({ version: "v3", auth });
  const returnList = await calendar.events
    .list({
      calendarId: "primary",
      timeMin: date.toISOString(),
      timeMax: maxDate.toISOString(),
      // maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    })
    .then((res) => {
      const events = res.data.items;

      if (events.length) {
        // console.log('Upcoming 10 events:');
        result = events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          //   console.log(`${start} - ${event.summary}`);
          if (
            event.start.dateTime === null ||
            event.start.dateTime === undefined
          ) {
            console.log("consolelogevent: ", event, "START: ", start);
            return [start + "T00:00:00+03:00", start + "T23:59:59+03:00"];
          }
          return [event.start.dateTime, event.end.dateTime];
        });
        // console.log("should be",result);
        return { events: result, email: email };
      } else {
        console.log("No upcoming events found.");
      }
    })
    .catch((err) => {
      return console.log("The API returned an error: " + err);
    });

  return returnList;
};

router.get("/calendar", async (req, res) => {
  let googleCalendarRefreshToken = null;

  User.findOne({
    _id: req.user._id,
  }).then(async (docs) => {
    googleCalendarRefreshToken = docs.googleCalendarRefreshToken;
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      CALENDAR_REDIRECT_URI
    );
    // console.log("googleCalendarRefreshToken",googleCalendarRefreshToken)
    oauth2Client.setCredentials({
      refresh_token: googleCalendarRefreshToken,
    });

    const calendarEvents = await listEvents(oauth2Client, docs.email);

    // console.log("calendarEvents",calendarEvents)
    res.status(200).send({
      data: calendarEvents,
    });
  });
});

router.post("/schedule", async (req, res) => {
  User.find({
    _id: { $in: req.body.memberList },
  }).then(async (docs) => {
    const peopleAuthList = docs.map((doc) => {
      const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        CALENDAR_REDIRECT_URI
      );
      oauth2Client.setCredentials({
        refresh_token: doc.googleCalendarRefreshToken,
      });
      return { oAuthObj: oauth2Client, email: doc.email };
    });

    let calendarEvents = {};
    Promise.all(
      peopleAuthList.map((event) => {
        return Promise.resolve(listEvents(event.oAuthObj, event.email));
      })
    )
      .then((values) => {
        console.log(values);
        values.map((value) => {
          calendarEvents[value.email] = value.events;
        });
        res.status(200).send({
          data: calendarEvents,
        });
      })
      .catch((err) => {
        console.log("I am called");
        console.log(err);
      });
  });
});

unsecureRouter.get("/callback", async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    CALENDAR_REDIRECT_URI
  );

  const token = req.query.state;
  const code = req.query.code;

  const decoded = jwt.verify(token, TOP_SECRET);
  const userId = decoded.user._id;

  // call getTokens
  const { tokens } = await oauth2Client.getToken(code);
  const refreshToken = tokens.refresh_token;

  // console.log("tokens ... ", tokens)
  // console.log("-------------------------")
  // console.log("userID",userId);
  // console.log("refreshToken", refreshToken);

  // store in mongo
  User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      googleCalendarRefreshToken: refreshToken,
    }
  )
    .then((doc) => {
      res.redirect("http://localhost:3000/");
    })
    .catch((err) => {
      console.log("error mongo");
      res.redirect("http://localhost:3000/page-not-found");
    });
});

module.exports = {
  secureRouter: router,
  unsecureRouter: unsecureRouter,
};
