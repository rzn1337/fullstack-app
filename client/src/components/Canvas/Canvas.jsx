import { useLayoutEffect, useState, useRef } from "react";
import rough from "roughjs/bundled/rough.esm";
import Toolbar from "../Toolbar/Toolbar";
import BottomToolbar from "../BottomToolbar/BottomToolbar";

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
            const updatedState = [...history].slice(0, index + 1)
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

function Canvas() {
    const generator = rough.generator({ stroke: "green" });

    const [elements, setElements, undo, redo] = useHistory([]);

    const [action, setAction] = useState("none"); // only tracks mouse when action is true
    const [tool, setTool] = useState("line");
    const [selectedElement, setSelectedElement] = useState(null);
    const canvasRef = useRef(null);

    const createElement = (id, x1, y1, x2, y2, type) => {
        let roughElement;
        if (type === "line") {
            roughElement = generator.line(x1, y1, x2, y2);
        } else if (type === "rectangle") {
            roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
        }
        return { id, x1, y1, x2, y2, type, roughElement };
    };

    const nearestPoint = (x, y, x1, y1, name) => {
        return Math.abs(x - x1) < 10 && Math.abs(y - y1) < 10 ? name : null;
    };

    const positionWithInElement = (x, y, element) => {
        const { x1, y1, x2, y2, type } = element;
        if (type === "rectangle") {
            const topLeft = nearestPoint(x, y, x1, y1, "tl");
            const topRight = nearestPoint(x, y, x2, y1, "tr");
            const bottonLeft = nearestPoint(x, y, x1, y2, "bl");
            const bottomRight = nearestPoint(x, y, x2, y2, "br");
            const inside =
                x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
            return topLeft || topRight || bottonLeft || bottomRight || inside;
        } else if (type === "line") {
            const a = { x: x1, y: y1 };
            const b = { x: x2, y: y2 };
            const c = { x, y };
            const offset = distance(a, b) - (distance(a, c) + distance(b, c));
            const inside = Math.abs(offset) < 1 ? "inside" : null;
            const start = nearestPoint(x, y, x1, y1, "start");
            const end = nearestPoint(x, y, x2, y2, "end");
            return start || end || inside;
        }
    };

    const distance = (a, b) =>
        Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

    const getElementAtPosition = (x, y, elements) => {
        return elements
            .map((element) => ({
                ...element,
                position: positionWithInElement(x, y, element),
            }))
            .find((element) => element.position !== null);
    };

    const handleMouseDown = (e) => {
        const { clientX, clientY } = e;
        if (tool === "select") {
            const element = getElementAtPosition(clientX, clientY, elements);
            if (element) {
                const offsetX = clientX - element.x1;
                const offsetY = clientY - element.y1;
                setSelectedElement({ ...element, offsetX, offsetY });
                setElements(prev => prev);
                if (element.position === "inside") {
                    setAction("moving");
                } else {
                    setAction("resizing");
                }
            }
        } else {
            const id = elements.length;
            const type = tool;
            const element = createElement(
                id,
                clientX,
                clientY,
                clientX,
                clientY,
                type
            );
            setElements((elements) => [...elements, element]);
            setSelectedElement(element);
            setAction("drawing");
        }
    };

    const cursorForPosition = (position) => {
        switch (position) {
            case "tl":
            case "br":
            case "start":
            case "end":
                return "nwse-resize";
            case "tr":
            case "bl":
                return "nesw-resize";
            default:
                return "move";
        }
    };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;

        if (tool === "select") {
            const element = getElementAtPosition(clientX, clientY, elements);
            e.target.style.cursor = getElementAtPosition(
                clientX,
                clientY,
                elements
            )
                ? cursorForPosition(element.position)
                : "default";
        }

        if (action === "drawing") {
            const i = elements.length - 1;

            const { x1, y1, type } = elements[i];

            updateElement(i, x1, y1, clientX, clientY, type);
        } else if (action === "moving") {
            const { id, x1, x2, y1, y2, type, offsetX, offsetY } =
                selectedElement;
            const width = x2 - x1;
            const height = y2 - y1;
            const newX = clientX - offsetX;
            const newY = clientY - offsetY;
            updateElement(id, newX, newY, newX + width, newY + height, type);
        } else if (action === "resizing") {
            const { id, type, position, ...coordinates } = selectedElement;
            const { x1, y1, x2, y2 } = resizedCoordinates(
                clientX,
                clientY,
                position,
                coordinates
            );
            updateElement(id, x1, y1, x2, y2, type);
        }
    };

    const resizedCoordinates = (clientX, clientY, position, coordinates) => {
        const { x1, y1, x2, y2 } = coordinates;
        switch (position) {
            case "tl":
            case "start":
                return { x1: clientX, y1: clientY, x2, y2 };
            case "tr":
                return { x1, y1: clientY, x2: clientX, y2 };
            case "bl":
                return { x1: clientX, y1, x2, y2: clientY };
            case "br":
            case "end":
                return { x1, y1, x2: clientX, y2: clientY };
            default:
                return null;
        }
    };

    const updateElement = (id, x1, y1, x2, y2, type) => {
        const updatedElement = createElement(id, x1, y1, x2, y2, type);
        const elementsCopy = [...elements];
        elementsCopy[id] = updatedElement;
        setElements(elementsCopy, true);
        console.log(updatedElement);
    };

    const adjustElementCoordinates = (element) => {
        const { type, x1, y1, x2, y2 } = element;
        if (type === "rectangle") {
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);
            return { x1: minX, y1: minY, x2: maxX, y2: maxY };
        } else if (type === "line") {
            if (x1 < x2 || (x1 === x2 && y1 < y2)) {
                return { x1, y1, x2, y2 };
            } else {
                return { x1: x2, y1: y2, x2: x1, y2: y1 };
            }
        }
    };

    const handleMouseUp = () => {
        if (selectedElement) {
            const i = selectedElement.id;
            const { id, type } = elements[i];

            if (action === "drawing" || action === "resizing") {
                const { x1, y1, x2, y2 } = adjustElementCoordinates(
                    elements[i]
                );
                updateElement(id, x1, y1, x2, y2, type);
            }
        }
        setAction("none");
        setSelectedElement(null);
        window.localStorage.setItem("canvas", elements);
    };

    useLayoutEffect(() => {
        // const canvas = document.getElementById("canvas");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // const config = { stroke: "green" };

        const roughCanvas = rough.canvas(canvasRef.current);

        elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
    }, [elements]);

    return (
        <div>
            <Toolbar setTool={setTool} />
            <canvas
                ref={canvasRef}
                id="canvas"
                // style={{ backgroundColor: "gray" }}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                Canvas
            </canvas>
            <BottomToolbar undo={undo} redo={redo} />
        </div>
    );
}

export default Canvas;
