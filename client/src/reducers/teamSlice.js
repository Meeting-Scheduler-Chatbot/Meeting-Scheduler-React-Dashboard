import { createSlice } from '@reduxjs/toolkit';

export const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teams: [],
    teamMembers: [],
    companyMembers: [],
    groupId: undefined,
    loadingNeededTeams: false,
    loadingNeededCompanyMembers: false,
  },
  reducers: {
    setTeams: (state, action) => {
        console.log("REDUCEEEERRR", action.payload)
        state.teams = action.payload;
    },
    setTeamMembers: (state, action) => {
      state.teamMembers = action.payload;
    },
    setCompanyMembers: (state, action) => {
      state.companyMembers = action.payload;
    }, 
    setGroupId: (state, action) => {
      state.groupId = action.payload;
    },
    setLoadingNeededTeams: (state, action) => {
      state.loadingNeededTeams = action.payload;
    },
    setLoadingNeededCompanyMembers: (state, action) => {
      state.loadingNeededCompanyMembers = action.payload;
    }
  },
});

export const { setTeams } = teamSlice.actions;
export const { setTeamMembers } = teamSlice.actions;
export const { setCompanyMembers } = teamSlice.actions;
export const { setGroupId } = teamSlice.actions;
export const { setLoadingNeededTeams } = teamSlice.actions;
export const { setLoadingNeededCompanyMembers } = teamSlice.actions;

export const selectTeams = state =>  state.team.teams;
export const selectTeamMembers = state => state.team.teamMembers;
export const selectCompanyMembers = state => state.team.companyMembers;
export const selectGroupId = state => state.team.groupId;
export const selectLoadingNeededTeams = state => state.team.loadingNeededTeams;
export const selectLoadingNeededCompanyMembers = state => state.team.loadingNeededCompanyMembers;

export default teamSlice.reducer;