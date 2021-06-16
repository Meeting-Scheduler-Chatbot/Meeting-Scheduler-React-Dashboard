import React, { useEffect, useState } from "react";
import NarrowGroupList from "../../components/NarrowGroupList/narrowGroupList";
import { useDispatch, useSelector } from "react-redux";
import myTheme from "../../themes/themes";
import {
  makeStyles,
  Button,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import our_api from "../../utils/requests";
import {
  selectCalendarStatus,
  setCalendarAuthUrl,
  selectCalendarAuthUrl,
} from "../../reducers/calendarSlice";
import { selectEmail, selectUserType } from "../../reducers/navbarSlice";
import { selectToken } from "../../reducers/authSlice";
import { selectCompanyMembers } from "../../reducers/teamSlice";
import Dropzone from "react-dropzone";

//our_api.allMembersNotBelongToAnyCompany;

//our_api.addMembersToMyCompany;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginTop: myTheme.spacing(20),
    margin: "auto",
  },
  card: {
    height: "60vh",
    minWidth: 690,
    padding: 30,
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  autoComplete: {
    width: "25vw",
    minWidth: 250,
    marginBottom: 30,
    marginTop: 50,
  },
  topMargin: {
    margin: 20,
  },
  a: {
    width: 350,
    height: 250,
    border: "5px dashed #bbbbbb",
    "&:hover": {
      backgroundColor: "#ff0000",
    },
  },
  hover: {
    backgroundColor: "#00ff00",
    width: 350,
    height: 250,
    border: "5px dashed #bbbbbb",
  },
}));

const SettingsPage = () => {
  const classes = useStyles();
  const calendarStatus = useSelector(selectCalendarStatus);
  const calendarAuthUrl = useSelector(selectCalendarAuthUrl);
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail);
  const userType = useSelector(selectUserType);

  const dispatch = useDispatch();

  const [value, setValue] = React.useState({ tags: [] });
  const [allMembersToAddCompany, setAllMembersToAddCompany] = useState([]);
  const [file, setFile] = useState("yok");

  const handleCalendarAuth = () => {
    window.location.href = calendarAuthUrl;
  };

  const onTagsChange = (event, values) => {
    setValue({ tags: values });
    console.log("values:", values);
    console.log("value", value);
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles[0] !== undefined) {
      if (acceptedFiles[0].size > 5242880) {
        console.log("SIZEEE", acceptedFiles[0].size);
        setFile("yok");
        alert(
          "Dosya boyutu 5MB'tan büyük, lütfen daha küçük bir dosya yükleyiniz."
        );
      } else {
        alert("Dosyanız alındı!");
        console.log(acceptedFiles[0]);
        setFile(acceptedFiles[0]);
      }
    } else {
      alert(
        "Dosya formatı yanlış, lütfen .json formatında bir dosya tercih ediniz."
      );
      setFile("yok");
    }
  };

  useEffect(() => {
    our_api
      .getUrlForGoogleButton(token)
      .then((res) => {
        console.log("RESSS", res.data.data);
        dispatch(setCalendarAuthUrl(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });

    our_api
      .allMembersNotBelongToAnyCompany(token)
      .then((res) => {
        console.log("RESSS", res.data.data);
        setAllMembersToAddCompany(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalendarAuth}
        disabled={calendarAuthUrl === "" ? true : false}
      >
        Authenticate Google Calendar
      </Button>
      <h5>
        {" "}
        {calendarAuthUrl === ""
          ? "there is a problem, you cannot authenticate right now."
          : ""}{" "}
      </h5>
      <h3>
        calendar auth status:{" "}
        {calendarStatus ? "AUTHENTICATED" : "NOT AUTHENTICATED"}{" "}
      </h3>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          our_api.getCalendarEvents(token).then((res) => {
            console.log("DATAAA", res.data.data);
          })
        }
      >
        Get Calendar Events
      </Button>
      {userType === "company_admin" ? (
        <>
          <Autocomplete
            className={classes.autoComplete}
            multiple
            id="tags-standard"
            onChange={onTagsChange}
            options={allMembersToAddCompany}
            value={value.tags}
            limitTags={2}
            //defaultValue={["cavitcakir@sabanciuniv.edu", "kayakapagan@sabanciuniv.edu", "gokberkyar@sabanciuniv.edu", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj"]}
            getOptionLabel={(option) => option.email}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="All Users"
                placeholder="All Users"
              />
            )}
          />
          <Dropzone
            multiple={false}
            onDrop={onDrop}
            accept={
              "application/json, .csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"
            }
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={isDragActive ? classes.hover : classes.a}
                // style={{
                //   width: 350,
                //   height: 250,
                //   border: "5px dashed #bbbbbb",

                //   //backgroundSize: "cover",
                //   //backgroundImage:
                //   //  "url(https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png)",
                // }}
              >
                <Typography
                  className={classes.topMargin}
                  component="h2"
                  align="center"
                >
                  Drag and Drop Your Files
                </Typography>
                <Typography
                  className={classes.topMargin}
                  component="h4"
                  align="center"
                >
                  or
                </Typography>
                <Box textAlign="center" className={classes.topMargin}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ justifyContent: "center" }}
                    size="large"
                  >
                    Browse File
                  </Button>
                </Box>
                {file !== "yok" ? (
                  <Typography
                    className={classes.topMargin}
                    component="h4"
                    align="center"
                  >
                    uploaded file: {file.name}
                  </Typography>
                ) : (
                  <></>
                )}

                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            color="secondary"
            onClick={() => {
              const memberList = value.tags.map((item) => item._id);
              if (memberList.length !== 0) {
                our_api
                  .addMembersToMyCompany(token, memberList)
                  .then((res) => {
                    console.log("RESSS", res);
                    alert("Members are added by text field");
                    setValue({ tags: [] });
                  })
                  .catch((err) => {
                    alert("something not good happend while adding members");
                    console.log(err);
                  });
              }
              console.log("value.tags", "===>", value.tags);

              if (file !== "yok") {
                our_api
                  .addMembersToMyCompanyByCsv(token, file)
                  .then((res) => {
                    console.log("RESSS", res);
                    alert("Members are added by file");
                  })
                  .catch((err) => {
                    alert("something not good happend while adding members");
                    console.log(err);
                  });
              }
              if (file === "yok" && memberList.length === 0) {
                alert(
                  "You need to add people from text box or select a file to add peope to your company!"
                );
              }
            }}
          >
            Add to Company
          </Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SettingsPage;
