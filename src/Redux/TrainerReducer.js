import { createSlice } from "@reduxjs/toolkit";

const trainersSlice = createSlice({
  name: "trainers",
  initialState: { trainers: [] },
  reducers: {
    addTrainer: (state, action) => {
      state.trainers.push(action.payload);
    },
  },
});

export const { addTrainer } = trainersSlice.actions;

export default trainersSlice.reducer;
