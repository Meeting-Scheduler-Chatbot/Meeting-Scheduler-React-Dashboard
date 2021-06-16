import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../reducers/authSlice";
import { setEmail, setUserType } from "../../reducers/navbarSlice";

import our_api from "../../utils/requests";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const Profile = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //const [userType, setUserType] = useState("");

  const checkAuth = async () => {
    return our_api.getProfileRequest(token);
  };

  useEffect(() => {
    // console.log('isLoading:', isLoading);
    checkAuth().then((data) => {
      try {
        console.log("islogged:", data.data.userType, "isloading:", isLoading);
        dispatch(setUserType(data.data.userType));
        // console.log("user:", data.data.user);
        dispatch(setEmail(data.data.user));
        setIsLoggedIn(data.data.loginStatus);
        console.log("isLoggedIn:", data.data.loginStatus);
        setUserType(data.data.userType);
      } catch (error) {
        console.log(error);
      }
      // dispatch(setIsLoggedIn(data.data.token));
      setIsLoading(false);
    });
  }, [isLoading]);

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress size="25vh" thickness={2.4} color="secondary" />
      </div>
    );
  } else {
    if (!isLoggedIn) {
      return <Redirect to={{ pathname: props.redirectPath }} />;
    } else {
      return props.content;
    }
  }
};

export default Profile;
