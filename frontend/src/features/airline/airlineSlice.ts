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
    appendAirline: (state, action) => {
      state.push(action.payload);
    },
    viewAirline: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { setAirlines, appendAirline, viewAirline } = airlineSlice.actions;

export const initializeAirlines = (): AppThunk => {
  return async (dispatch) => {
    const airlines = await airlineService.getAll();
    dispatch(setAirlines(airlines));
  };
};

export const createAirline = (content: Airline): AppThunk => {
  return async (dispatch) => {
    const newAirline = await airlineService.createNew(content);
    dispatch(appendAirline(newAirline));
  };
};

export default airlineSlice.reducer;
