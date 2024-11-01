import { configureStore } from '@reduxjs/toolkit';
import { preferencesSlice } from './preferencesSlice';

export const store = configureStore({
  reducer: {
    preferences: preferencesSlice.reducer,
  }
});

export const actions = {
  preferences: preferencesSlice.actions,
}
