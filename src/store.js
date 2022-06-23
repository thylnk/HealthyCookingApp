import { configureStore } from '@reduxjs/toolkit';
import esp8266Slice from './services/esp8266.slice';
import weightSlice from './services/weight.slice';

export const store = configureStore({
  reducer: {
    weight: weightSlice,
    esp8266: esp8266Slice
  },
});