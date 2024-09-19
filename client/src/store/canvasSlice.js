import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: "",
    index: 0,
};

const canvasSlice = createSlice({
    name: "canvas",
    initialState: initialState,
    reducers: {
        updateCanvas: (state, action) => {
            state.history = action.payload.hist;
            state.index = action.payload.index;
        },
    },
});

export const { updateCanvas } = canvasSlice.actions;

export default canvasSlice.reducer;