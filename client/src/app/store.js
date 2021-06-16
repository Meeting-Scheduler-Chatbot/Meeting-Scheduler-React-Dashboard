import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import authReducer from '../reducers/authSlice';
import navbarReducer from '../reducers/navbarSlice';
import teamReducer from '../reducers/teamSlice';
import calendarReducer from '../reducers/calendarSlice'


export default configureStore({
  // reducer: {
  //   counter: counterReducer,
  // },
  reducer: {
    auth: authReducer,
    navbar: navbarReducer,
    team: teamReducer,
    calendar: calendarReducer,
  },
});
