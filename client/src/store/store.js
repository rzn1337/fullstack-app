import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import canvasSlice from "./canvasSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        canvas: canvasSlice,
    },
});

export default store;