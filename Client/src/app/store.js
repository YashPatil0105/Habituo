// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasksSlice';
import challengesReducer from '../features/challengesSlice';
import { notificationsApiSlice } from '../features/notificationsApiSlice';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/authSlice';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    auth : authReducer,
    tasks: tasksReducer,
    challenges: challengesReducer,
    notifications: notificationsApiSlice,
  },
  middleware : getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true // switch to false for production
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredPaths: ['notifications.0.timestamp'],
  //     },
  //   }),
});

export default store;
