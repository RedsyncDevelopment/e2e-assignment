import { createSlice } from "@reduxjs/toolkit";
import { Airport } from "./../../types.d";

const initialState: Airport[] = [];

const airportSlice = createSlice({
  name: "airport",
  initialState,
  reducers: {
    setAirports: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAirports } = airportSlice.actions;

export default airportSlice.reducer;
