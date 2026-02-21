import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./components/redux/reducers/main";

const store = configureStore({
  reducer: rootReducer,
});

export default store;

