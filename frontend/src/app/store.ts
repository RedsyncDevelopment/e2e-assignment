import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import airlineSlice from "../features/airline/airlineSlice";
import airportSlice from "../features/airport/airportSlice";
import countrySlice from "../features/country/countrySlice";

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
