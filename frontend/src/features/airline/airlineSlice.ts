import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./../../app/store";
import { Airline } from "./../../types.d";
import airlineService from "./airlinesAPI";

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
