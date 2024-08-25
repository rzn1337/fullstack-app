import { useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs";

function Canvas() {
    const canvasRef = useRef(null);

    const [points, setPoints] = useState(null)

    useLayoutEffect(() => {
        let roughCanvas = rough.canvas(canvasRef.current);
        let generator = roughCanvas.generator;

        const line = generator.line(100, 467, 700, 200, { stroke: "red" });

        roughCanvas.draw(line);

        const x = JSON.stringify(line);

        console.log(x);
    }, []);

    const handleMouseDown = (e) => {
        console.log(e);
    };

    const handleMouseMove = (e) => {
        console.log(e);
    };

    const handleMouseUp = (e) => {
        console.log(e);
    };

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="border-2 border-black"
        ></canvas>
    );
}

export default Canvas;
