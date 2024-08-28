import { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import Toolbar from "../Toolbar/Toolbar";

function Canvas() {
    const generator = rough.generator();

    const [elements, setElements] = useState([]);
    const [action, setAction] = useState("none"); // only tracks mouse when action is true
    const [tool, setTool] = useState("line");
    const [selectedElement, setSelectedElement] = useState(null);

    const createElement = (id, x1, y1, x2, y2, type) => {
        let roughElement;
        if (type === "line") {
            roughElement = generator.line(x1, y1, x2, y2);
        } else if (type === "rectangle") {
            roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
        }
        return { id, x1, y1, x2, y2, type, roughElement };
    };

    const isWithInElement = (x, y, element) => {
        const { x1, y1, x2, y2, type } = element;

        if (type === "rectangle") {
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);
            return x >= minX && x <= maxX && y >= minY && y <= maxY;
        } else if (type === "line") {
            const a = { x: x1, y: y1 };
            const b = { x: x2, y: y2 };
            const c = { x, y };
            const offset = distance(a, b) - (distance(a, c) + distance(b, c));
            return Math.abs(offset) < 1;
        }
    };

    const distance = (a, b) =>
        Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

    const getElementAtPosition = (x, y, elements) => {
        return elements.find((element) => isWithInElement(x, y, element));
    };

    const handleMouseDown = (e) => {
        const { clientX, clientY } = e;
        if (tool === "select") {
            const element = getElementAtPosition(clientX, clientY, elements);
            if (element) {
                const offsetX = clientX - element.x1;
                const offsetY = clientY - element.y1;
                setSelectedElement({ ...element, offsetX, offsetY });
                setAction("moving");
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
            setAction("drawing");
        }
    };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;

        if (tool === "select") {
            event.target.style.cursor = getElementAtPosition(
                clientX,
                clientY,
                elements
            )
                ? "move"
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
        }
    };

    const updateElement = (id, x1, y1, x2, y2, type) => {
        const updatedElement = createElement(id, x1, y1, x2, y2, type);
        const elementsCopy = [...elements];
        elementsCopy[id] = updatedElement;
        setElements(elementsCopy);
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

    const handleMouseUp = (e) => {
        const i = elements.length - 1;
        const { id, type } = elements[i];

        if (action === "drawing") {
            const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[i]);
            updateElement(id, x1, y1, x2, y2, type);
        }
        setAction("none");
        window.localStorage.setItem("canvas", elements);
    };

    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const roughCanvas = rough.canvas(canvas);

        elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
    }, [elements]);

    return (
        <div>
            <Toolbar setTool={setTool} />
            <canvas
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
        </div>
    );
}

export default Canvas;
