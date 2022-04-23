import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import goalReducer from "../features/goal/GoalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
  },
});
