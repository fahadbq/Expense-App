import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authenticationReducer from "../../features/authentication/authenticationSlice";
import expenseReducer from "../../features/Expense/expenseSlice";
import settingsReducer from "../../features/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    expenses: expenseReducer,
    settings: settingsReducer,
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
