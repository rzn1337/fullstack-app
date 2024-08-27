import { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import Toolbar from "../Toolbar/Toolbar";

function Canvas() {
    const generator = rough.generator();

    const [elements, setElements] = useState([]);
    const [drawing, setDrawing] = useState(false); // only tracks mouse when drawing is true
    const [tool, setTool] = useState("line");

    const createElement = (x1, y1, x2, y2) => {
        let roughElement;
        if (tool === "line") {
            roughElement = generator.line(x1, y1, x2, y2);
        } else if (tool === "rectangle") {
            roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
        }
        return { x1, y1, x2, y2, roughElement };
    };

    const handleMouseDown = (e) => {
        setDrawing(true);
        const { clientX, clientY } = e;
        const element = createElement(clientX, clientY, clientX, clientY);
        setElements((elements) => [...elements, element]);
        console.log(elements);
    };

    const handleMouseMove = (e) => {
        if (!drawing) return;

        const { clientX, clientY } = e;

        const i = elements.length - 1;
        const { x1, y1 } = elements[i];

        const updatedElement = createElement(x1, y1, clientX, clientY);
        setElements((elements) => [...elements.slice(0, i), updatedElement]); // update the elements array
        console.log(clientX, clientY);
    };

    const handleMouseUp = (e) => {
        setDrawing(false);
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
