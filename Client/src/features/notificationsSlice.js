// src/features/notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { message: "🔔 Don't break your streak!", timestamp: new Date() },
  { message: "🔔 Remember to log your progress today!", timestamp: new Date() },
  { message: "🔔 New challenges available!", timestamp: new Date() },
];

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      // Logic for marking notification as read/unread
    },
    addNotification: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { markAsRead, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
