import { useState } from "react";

function Toolbar({ setTool }) {
    const tools = [
        // { name: "Select", icon: "◱" },
        { name: "Rectangle", icon: "□" },
        // { name: "Ellipse", icon: "○" },
        // { name: "Arrow", icon: "→" },
        { name: "Line", icon: "-" },
        // { name: "Freedraw", icon: "✎" },
        // { name: "Text", icon: "T" },
        // { name: "Image", icon: "🖼" },
        // { name: "Eraser", icon: "⌫" },
    ];
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-slate-900 rounded-xl shadow-md">
            <div className="flex p-1">
                {tools.map((tool) => (
                    <button
                        key={tool.name}
                        onClick={() => setTool(tool.name.toLowerCase())}
                        className={`w-9 h-9 flex items-center justify-center rounded-md mx-0.5 text-white hover:bg-gray-100 `}
                        title={tool.name}
                    >
                        {tool.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Toolbar;
