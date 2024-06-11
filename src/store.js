// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // Importez le middleware thunk correctement
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Utilisez thunk comme middleware
});

export default store;
