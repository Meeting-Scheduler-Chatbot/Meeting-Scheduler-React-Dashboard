// server.js
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const secureRouter = require("./src/routes/secure.router");
const postRouter = require("./src/routes/post.router");
const authRouter = require("./src/routes/auth.router");
const companyRouter = require("./src/routes/company.router");
const groupRouter = require("./src/routes/group.router");
const calendarRouter = require("./src/routes/calendar.router");
const googleRouter = require("./src/routes/google.router");

// Our DB Configuration
require("./src/database");

require("./src/services/auth/auth");

// const PORT = 8080;

const { DEBUG, PORT } = process.env;

const app = express();

app.use(helmet());

app.use(
  helmet.frameguard({
    action: "deny",
  })
);

// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     reportOnly: true,
//   })
// );

helmet.contentSecurityPolicy.getDefaultDirectives();

app.use(
  helmet.expectCt({
    maxAge: 86400,
    //   enforce: true,
    //   reportUri: "https://example.com/report",
  })
);

app.use(
  helmet.referrerPolicy({
    policy: "no-referrer",
  })
);

app.use(
  helmet.permittedCrossDomainPolicies({
    permittedPolicies: "none",
  })
);

app.use(cors());

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api/posts", postRouter);
app.use("/auth", authRouter);
app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  secureRouter
);
app.use(
  "/api/company",
  passport.authenticate("jwt", { session: false }),
  companyRouter
);
app.use(
  "/api/group",
  passport.authenticate("jwt", { session: false }),
  groupRouter
);
app.use(
  "/api/calendar",
  passport.authenticate("jwt", { session: false }),
  calendarRouter
);
app.use(
  "/api/googleSecure",
  passport.authenticate("jwt", { session: false }),
  googleRouter.secureRouter
);
app.use("/api/google", googleRouter.unsecureRouter);

if (DEBUG == 0) {
  const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

  // Static files
  app.use(express.static(CLIENT_BUILD_PATH));

  // Server React Client
  app.get("*", function (req, res) {
    res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
  });
} else {
  // Routes
  app.get("/", (req, res) => {
    res.send("Hello World ! ");
  });
  // will redirect all the non-api routes to react frontend
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`);
});
