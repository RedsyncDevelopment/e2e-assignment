import { createSlice } from "@reduxjs/toolkit";
import airlineService from "../../app/services/airlinesAPI";
import { AppThunk } from "./../../app/store";
import { Airline } from "./../../types.d";

const initialState: Airline[] = [];

const airlineSlice = createSlice({
  name: "airline",
  initialState,
  reducers: {
    setAirlines: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAirlines } = airlineSlice.actions;

export const initializeAirlines = (): AppThunk => {
  return async (dispatch) => {
    const airlines = await airlineService.getAll();
    dispatch(setAirlines(airlines));
  };
};

export default airlineSlice.reducer;
