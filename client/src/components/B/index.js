import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {
    setToken,
    selectToken,
} from '../../reducers/authSlice';
import Button from '@material-ui/core/Button';
import our_api from "../../utils/requests"
import { Redirect } from "react-router-dom";

const B = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const deneme = async () => {
      return (
        <Redirect
          to={{
            pathname:
              "https://accounts.google.com/o/oauth2/v2/auth?client_id=1007639792536-3qnn0prdn21hi0p8teihsn8s68kl2dn7.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/calendar&redirect_uri=http://localhost&access_type=offline",
          }}
        />
      );
}
  // }https://accounts.google.com/o/oauth2/v2/auth?client_id=1007639792536-3qnn0prdn21hi0p8teihsn8s68kl2dn7.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/calendar&redirect_uri=http://localhost&access_type=offline

  our_api.dummyRequest().then((data) => {
    console.log("B", data.data);
  });

  return (
    <div>
      <p> Token B: {token} </p>

      <Button
        type="button"
        fullWidth
        variant="contained"
        color="secondary"
        // onClick={() => dispatch(setToken("Cavit"))}
        onClick={() => {
            window.location.href =
              "https://accounts.google.com/o/oauth2/v2/auth?client_id=1007639792536-3qnn0prdn21hi0p8teihsn8s68kl2dn7.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/calendar&redirect_uri=http://localhost:8080&access_type=offline"; 
            return null;
        }}
      />
    </div>
  );
}


export default B;

