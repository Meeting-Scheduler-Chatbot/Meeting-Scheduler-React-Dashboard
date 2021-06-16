import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    calendarStatus: false,
    calendarAuthUrl: "",
  },
  reducers: {
    setCalendarStatus: (state, action) => {
        state.calendarStatus = action.payload;
    },
    setCalendarAuthUrl: (state, action) => {
      state.calendarAuthUrl = action.payload;
    },
  },
});

export const { setCalendarStatus } = calendarSlice.actions;
export const { setCalendarAuthUrl } = calendarSlice.actions;


export const selectCalendarStatus = state => state.calendar.calendarStatus;
export const selectCalendarAuthUrl = state => state.calendar.calendarAuthUrl;

export default calendarSlice.reducer;