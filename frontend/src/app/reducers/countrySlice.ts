import { createSlice } from "@reduxjs/toolkit";
import countryService from "../../services/countriesAPI";
import { Country } from "../../types";
import { AppThunk } from "../store";

const initialState: Country[] = [];

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;

export const initializeCountries = (): AppThunk => {
  return async (dispatch) => {
    const countries = await countryService.getAll();
    dispatch(setCountries(countries));
  };
};

export default countrySlice.reducer;
