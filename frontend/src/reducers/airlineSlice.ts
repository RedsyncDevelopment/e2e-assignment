import { createSlice } from "@reduxjs/toolkit";
import airlineService from "../app/services/airlinesAPI";
import airportService from "../app/services/airportsAPI";
import { AppThunk } from "../app/store";
import { Airline } from "../types";
import { setAirports } from "./airportSlice";

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
    removeAirline: (state, action) => {
      return state.filter((airline) => airline.id !== action.payload);
    },
    updateAirlineState: (state, action) => {
      const updatedAirline = action.payload;
      const airlineToUpdate = state.find(
        (airline) => airline.id === updatedAirline.id
      );

      const airlineToDisplay = { ...updatedAirline };
      return state.map((airline) =>
        airline.id !== airlineToUpdate?.id ? airline : airlineToDisplay
      );
    },
  },
});

export const { setAirlines, appendAirline, removeAirline, updateAirlineState } =
  airlineSlice.actions;

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

export const deleteAirline = (id: string): AppThunk => {
  return async (dispatch) => {
    await airlineService.deleteOne(id);
    dispatch(removeAirline(id));
  };
};

export const updateAirline = (id: string, airline: Airline): AppThunk => {
  return async (dispatch) => {
    const updatedAirline = await airlineService.updateOne(id, airline);
    dispatch(updateAirlineState(updatedAirline));
    // hmm?? not sure if it's correct way of updating airports
    const airports = await airportService.getAll();
    dispatch(setAirports(airports));
  };
};

export default airlineSlice.reducer;
