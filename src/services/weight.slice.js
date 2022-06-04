import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
};


export const weightSlice = createSlice({
  name: 'weight',
  initialState,
  reducers: {
    setWeight: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setWeight } = weightSlice.actions;

export const selectWeight = state => state.weight.value;

export default weightSlice.reducer;
