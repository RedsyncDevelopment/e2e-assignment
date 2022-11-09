import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import airlineSlice from "../reducers/airlineSlice";
import airportSlice from "../reducers/airportSlice";
import countrySlice from "../reducers/countrySlice";

export const store = configureStore({
  reducer: {
    airline: airlineSlice,
    airport: airportSlice,
    country: countrySlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
