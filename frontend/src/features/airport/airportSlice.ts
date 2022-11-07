import { createSlice } from "@reduxjs/toolkit";
import airportService from "../../app/services/airportsAPI";
import { AppThunk } from "../../app/store";
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

export const initializeAirports = (): AppThunk => {
  return async (dispatch) => {
    const airports = await airportService.getAll();
    dispatch(setAirports(airports));
  };
};

export default airportSlice.reducer;
