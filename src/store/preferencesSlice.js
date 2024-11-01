import { createSlice } from "@reduxjs/toolkit";

function extractMostVoted(preferences) {
  const newPreferences = [...preferences];
  newPreferences.sort((a,b) => b.votes - a.votes);
  return newPreferences.slice(0,3);
}

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: { allPreferences: [], lastPreferences: [], mostVotedPreferences: [] },
  reducers: {
    addPreference: (state, action) => {
      const newPreference = { text: action.payload, votes: 0 };
      const newListOfPreferences = [...state.allPreferences, newPreference];
      state.allPreferences = newListOfPreferences;
      state.lastPreferences = newListOfPreferences.slice(-3);
      state.mostVotedPreferences = extractMostVoted(state.allPreferences);
    },
    registerVote: (state, action) => {
      const preferenceToChange = state.allPreferences.find(pref => pref.text === action.payload);
      preferenceToChange.votes++;
      state.lastPreferences = state.allPreferences.slice(-3);
      state.mostVotedPreferences = extractMostVoted(state.allPreferences);
    }
  }
});