import { useLayoutEffect, useState, useRef, useEffect } from "react";
import rough from "roughjs/bundled/rough.esm";
import Toolbar from "../Toolbar/Toolbar";
import BottomToolbar from "../BottomToolbar/BottomToolbar";
import useHistory from "../../hooks/useHistory";
import getStroke from "perfect-freehand";

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

    const nearestPoint = (x, y, x1, y1, name) => {
        return Math.abs(x - x1) < 10 && Math.abs(y - y1) < 10 ? name : null;
    };

    const onLine = (x1, y1, x2, y2, x, y, maxOffset = 1) => {
        const a = { x: x1, y: y1 };
        const b = { x: x2, y: y2 };
        const c = { x, y };
        const offset = distance(a, b) - (distance(a, c) + distance(b, c));
        return Math.abs(offset) < maxOffset ? "inside" : null;
    };

    const positionWithInElement = (x, y, element) => {
        const { x1, y1, x2, y2, type } = element;

        switch (type) {
            case "rectangle":
                const topLeft = nearestPoint(x, y, x1, y1, "tl");
                const topRight = nearestPoint(x, y, x2, y1, "tr");
                const bottonLeft = nearestPoint(x, y, x1, y2, "bl");
                const bottomRight = nearestPoint(x, y, x2, y2, "br");
                const inside =
                    x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
                return (
                    topLeft || topRight || bottonLeft || bottomRight || inside
                );
            case "line":
                const on = onLine(x1, y1, x2, y2, x, y);
                const start = nearestPoint(x, y, x1, y1, "start");
                const end = nearestPoint(x, y, x2, y2, "end");
                return start || end || on;
            case "freedraw":
                const betweenAnyPoint = element.points.some((point, index) => {
                    const nextPoint = element.points[index + 1];
                    if (!nextPoint) return false;
                    return (
                        onLine(
                            point.x,
                            point.y,
                            nextPoint.x,
                            nextPoint.y,
                            x,
                            y,
                            5
                        ) != null
                    );
                });
                return betweenAnyPoint ? "inside" : null;
            default:
                throw new Error(`Unrecognized type: ${type}`);
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

    const adjustmentRequired = (type) => ["line", "rectangle"].includes(type);

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
                    getStroke(element.points, { size: 5, stroke: "#1A1A1A" })
                );
                ctx.fillStyle = "pink";
                ctx.fill(new Path2D(stroke));
                break;
            default:
                throw new Error(`Unrecognized Type: ${type}`);
        }
    };

    const average = (a, b) => (a + b) / 2;

    const getSvgPathFromStroke = (points, closed = true) => {
        const len = points.length;

        if (len < 4) {
            return ``;
        }

        let a = points[0];
        let b = points[1];
        const c = points[2];

        let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
            2
        )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
            b[1],
            c[1]
        ).toFixed(2)} T`;

        for (let i = 2, max = len - 1; i < max; i++) {
            a = points[i];
            b = points[i + 1];
            result += `${average(a[0], b[0]).toFixed(2)},${average(
                a[1],
                b[1]
            ).toFixed(2)} `;
        }

        if (closed) {
            result += "Z";
        }

        return result;
    };

    useEffect(() => {
        const undoRedoFunction = (e) => {
            // console.log(e.metaKey, e.ctrlKey, e.shiftKey, e.key);
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
