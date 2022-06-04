import { configureStore } from '@reduxjs/toolkit';
import weightSlice from './services/weight.slice';
export const store = configureStore({
  reducer: {
    weight: weightSlice,
  },
});