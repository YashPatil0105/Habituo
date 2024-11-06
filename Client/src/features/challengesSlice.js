// src/features/challengesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalDays: 21,
  completedDays: new Array(21).fill(false),
  currentProgress: 0,
};

export const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    updateProgress: (state) => {
      const completedCount = state.completedDays.filter(day => day).length;
      state.currentProgress = completedCount;
    },
    toggleDay: (state, action) => {
      state.completedDays[action.payload] = !state.completedDays[action.payload];
    },
    resetChallenge: (state) => {
      state.completedDays.fill(false);
      state.currentProgress = 0;
    },
  },
});

export const { updateProgress, toggleDay, resetChallenge } = challengesSlice.actions;
export default challengesSlice.reducer;
