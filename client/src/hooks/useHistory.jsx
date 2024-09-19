import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCanvas } from "../store/canvasSlice";

const useHistory = (initState) => {
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState([initState]);
    const dispatch = useDispatch();

    const setState = (action, overwrite = false) => {
        const newState =
            typeof action === "function" ? action(history[index]) : action;
        if (overwrite) {
            const historyCopy = [...history];
            historyCopy[index] = newState;
            console.log("historyCopy: ", historyCopy);
            setHistory(historyCopy);
            // dispatch(updateCanvas({ history, index }));
        } else {
            const updatedState = [...history].slice(0, index + 1);
            console.log("history: ", [...updatedState, newState]);
            console.log("index: ", index + 1);
            setHistory([...updatedState, newState]);
            setIndex((index) => index + 1);
            // dispatch(updateCanvas({ history, index }));
        }
    };

    const updateState = () => {
        const hist = history;
        dispatch(updateCanvas({ hist, index }));
    };

    const undo = () => {
        index > 0 && setIndex((index) => index - 1);
        updateState();
    };
    const redo = () => {
        index < history.length - 1 && setIndex((index) => index + 1);
        updateState();
    };

    return [history[index], setState, undo, redo, updateState];
};

export default useHistory;
