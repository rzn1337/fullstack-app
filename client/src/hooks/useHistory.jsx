import {useState} from 'react'

const useHistory = (initState) => {
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState([initState]);

    const setState = (action, overwrite = false) => {
        const newState =
            typeof action === "function" ? action(history[index]) : action;
        if (overwrite) {
            const historyCopy = [...history];
            historyCopy[index] = newState;
            setHistory(historyCopy);
        } else {
            const updatedState = [...history].slice(0, index + 1);
            setHistory([...updatedState, newState]);
            setIndex((index) => index + 1);
        }
    };

    const undo = () => {
        index > 0 && setIndex((index) => index - 1);
    };
    const redo = () => {
        index < history.length - 1 && setIndex((index) => index + 1);
    };

    return [history[index], setState, undo, redo];
};

export default useHistory