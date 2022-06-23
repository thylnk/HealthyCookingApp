import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
  ip: null,
};

export const esp8266Slice = createSlice({
  name: 'esp8266',
  initialState,
  reducers: {
    setConnect: (state, action) => {
      state.value = action.payload;
    },
    setIP: (state, action) => {
      state.ip = action.payload;
      console.log(action)
    },
  },
});

export const { setConnect, setIP } = esp8266Slice.actions;


export const selectESP = state => state.esp8266.value;


export default esp8266Slice.reducer;