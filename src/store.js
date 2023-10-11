import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todo.Slice";

export const store = configureStore({
  reducer: todoReducer,
});
