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
    removeAirport: (state, action) => {
      return state.filter((airport) => airport.id !== action.payload);
    },
    updateAirportState: (state, action) => {
      const updatedAirport = action.payload;
      const airportToUpdate = state.find(
        (airport) => airport.id === updatedAirport.id
      );
      const airportToDisplay = { ...updatedAirport };
      return state.map((airport) =>
        airport.id !== airportToUpdate?.id ? airport : airportToDisplay
      );
    },
  },
});

export const { setAirports, appendAirport, removeAirport, updateAirportState } =
  airportSlice.actions;

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

export const deleteAirport = (id: string): AppThunk => {
  return async (dispatch) => {
    await airportService.deleteOne(id);
    dispatch(removeAirport(id));
  };
};

export const updateAirport = (id: string, airport: Airport): AppThunk => {
  return async (dispatch) => {
    const updatedAirport = await airportService.updateOne(id, airport);
    dispatch(updateAirportState(updatedAirport));
  };
};

export default airportSlice.reducer;
