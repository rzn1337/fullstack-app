import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: null,
    index: 0,
};

const canvasSlice = createSlice({
    name: "canvas",
    initialState: initialState,
    reducers: {
        updateCanvas: (state, action) => {
            state.history = action.payload.history;
            state.index = action.payload.index;
        },
    },
});

export const { updateCanvas } = canvasSlice.actions;

export default canvasSlice.reducer;