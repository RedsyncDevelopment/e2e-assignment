import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import airlineSlice from "../features/airline/airlineSlice";

export const store = configureStore({
  reducer: {
    airline: airlineSlice,
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
