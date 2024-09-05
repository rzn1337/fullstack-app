import { useLayoutEffect, useState, useRef, useEffect } from "react";
import rough from "roughjs/bundled/rough.esm";
import Toolbar from "../Toolbar/Toolbar";
import BottomToolbar from "../BottomToolbar/BottomToolbar";
import useHistory from "../../hooks/useHistory";
import getStroke from "perfect-freehand";
import {
    cursorForPosition,
    getSvgPathFromStroke,
    adjustmentRequired,
    getElementAtPosition,
    resizedCoordinates,
    adjustElementCoordinates,
} from "./utils";

function Canvas() {
    const generator = rough.generator({ stroke: "green" });

    const [elements, setElements, undo, redo] = useHistory([]);

    const [action, setAction] = useState("none"); // only tracks mouse when action is true
    const [tool, setTool] = useState("line");
    const [selectedElement, setSelectedElement] = useState(null);
    const canvasRef = useRef(null);

    const createElement = (id, x1, y1, x2, y2, type) => {
        switch (type) {
            case "line":
            case "rectangle":
                const roughElement =
                    type === "line"
                        ? generator.line(x1, y1, x2, y2)
                        : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
                return { id, x1, y1, x2, y2, type, roughElement };
            case "freedraw":
                console.log("dodod");
                return { id, type, points: [{ x: x1, y: y1 }] };
            default:
                throw new Error(`Unrecognized type ${type}`);
        }
    };

    const handleMouseDown = (e) => {
        const { clientX, clientY } = e;
        if (tool === "select") {
            const element = getElementAtPosition(clientX, clientY, elements);
            if (element) {
                if (element.type === "freedraw") {
                    const xOffsets = element.points.map(
                        (point) => clientX - point.x
                    );
                    const yOffsets = element.points.map(
                        (point) => clientY - point.y
                    );
                    setSelectedElement({ ...element, xOffsets, yOffsets });
                } else {
                    const offsetX = clientX - element.x1;
                    const offsetY = clientY - element.y1;
                    setSelectedElement({ ...element, offsetX, offsetY });
                }
                setElements((prev) => prev);

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
            if (selectedElement.type === "freedraw") {
                const newPoints = selectedElement.points.map((_, index) => {
                    return {
                        x: clientX - selectedElement.xOffsets[index],
                        y: clientY - selectedElement.yOffsets[index],
                    };
                });
                const elementsCopy = [...elements];
                elementsCopy[selectedElement.id] = {
                    ...elementsCopy[selectedElement.id],
                    points: newPoints,
                };
                setElements(elementsCopy, true);
            } else {
                const { id, x1, x2, y1, y2, type, offsetX, offsetY } =
                    selectedElement;
                const width = x2 - x1;
                const height = y2 - y1;
                const newX = clientX - offsetX;
                const newY = clientY - offsetY;
                updateElement(
                    id,
                    newX,
                    newY,
                    newX + width,
                    newY + height,
                    type
                );
            }
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

    const updateElement = (id, x1, y1, x2, y2, type) => {
        const elementsCopy = [...elements];

        switch (type) {
            case "line":
            case "rectangle":
                elementsCopy[id] = createElement(id, x1, y1, x2, y2, type);
                break;
            case "freedraw":
                elementsCopy[id].points = [
                    ...elementsCopy[id].points,
                    { x: x2, y: y2 },
                ];
                break;
            default:
                throw new Error(`Unrecognized type: ${type}`);
        }
        setElements(elementsCopy, true);
    };

    const handleMouseUp = () => {
        if (selectedElement) {
            const i = selectedElement.id;
            const { id, type } = elements[i];

            if (
                (action === "drawing" || action === "resizing") &&
                adjustmentRequired(type)
            ) {
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

        // elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
        console.log(elements);
        elements.forEach((element) => drawElement(roughCanvas, ctx, element));
    }, [elements]);

    const drawElement = (roughCanvas, ctx, element) => {
        console.log(element);
        const { type } = element;
        switch (type) {
            case "line":
            case "rectangle":
                roughCanvas.draw(element.roughElement);
                break;
            case "freedraw":
                const stroke = getSvgPathFromStroke(
                    getStroke(element.points, { size: 10, stroke: "#1A1A1A" })
                );
                ctx.fillStyle = "pink";
                ctx.fill(new Path2D(stroke));
                break;
            default:
                throw new Error(`Unrecognized Type: ${type}`);
        }
    };

    useEffect(() => {
        const undoRedoFunction = (e) => {
            if (e.metaKey || e.ctrlKey) {
                if (e.key === "y") {
                    redo();
                } else if (e.key === "z") {
                    undo();
                }
            }
        };
        document.addEventListener("keydown", undoRedoFunction);
        return () => {
            document.removeEventListener("keydown", undoRedoFunction);
        };
    }, [undo, redo]);

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
