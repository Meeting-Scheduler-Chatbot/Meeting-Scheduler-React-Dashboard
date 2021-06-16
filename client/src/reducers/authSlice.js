import { createSlice } from '@reduxjs/toolkit';
import our_api from "../utils/requests"

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      localStorage.setItem('token', action.payload);
      //localStorage.setItem('loggedIn', true);
      return {token:action.payload}
    },
    clearToken: state => {
      localStorage.removeItem('token');
      //localStorage.removeItem('loggedIn');
      return {token:null} 
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectToken = state => {

  let token = undefined;
  try{
    token = localStorage.getItem('token');
  }
  catch(err)
  {
    console.log(err);
    return token;
  }
  
  return token;



}
export const selectLoggedIn = (state) => {
  let token = undefined;
  try{
    token = localStorage.getItem('token');
    console.log("TOKEN", token)
    our_api.getProfileRequest(token)
    .then((req) => {
      console.log("LOGIN STATUS", req.data.loginStatus)
      return req.data.loginStatus === true ? true : false;
    })
  }
  catch(err)
  {
    console.log(err);
    return false
  }
}

export default authSlice.reducer;
