import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: "",
    index: 0,
    id: null,
};

const canvasSlice = createSlice({
    name: "canvas",
    initialState: initialState,
    reducers: {
        updateCanvas: (state, action) => {
            state.history = action.payload.hist;
            state.index = action.payload.index;
        },
        setID: (state, action) => {
            console.log(action)
            state.id = action.payload.id;
        },
        unsetID: (state) => {
            state.id = null;
        },
    },
});

export const { updateCanvas, setID, unsetID } = canvasSlice.actions;

export default canvasSlice.reducer;
