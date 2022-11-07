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
    appendAirport: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setAirports, appendAirport } = airportSlice.actions;

export const initializeAirports = (): AppThunk => {
  return async (dispatch) => {
    const airports = await airportService.getAll();
    dispatch(setAirports(airports));
  };
};

export const createAirport = (content: Airport): AppThunk => {
  return async (dispatch) => {
    const newAirport = await airportService.createNew(content);
    dispatch(appendAirport(newAirport));
  };
};

export default airportSlice.reducer;
