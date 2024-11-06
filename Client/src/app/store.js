// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasksSlice';
import challengesReducer from '../features/challengesSlice';
import notificationsReducer from '../features/notificationsSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    challenges: challengesReducer,
    notifications: notificationsReducer,
  },
});

export default store;
