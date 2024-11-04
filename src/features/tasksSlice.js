// src/features/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, name: 'Complete coding assignment', completed: false },
  { id: 2, name: 'Read 20 pages of a book', completed: false },
  { id: 3, name: 'Workout for 30 minutes', completed: false },
];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    resetTasks: (state) => {
      return state.map(task => ({ ...task, completed: false }));
    },
  },
});

export const { addTask, toggleTask, resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
