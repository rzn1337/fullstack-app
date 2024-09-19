import {
    PencilLine,
    Minus,
    RectangleHorizontal,
    Move,
    Scaling,
} from "lucide-react";

function Toolbar({ setTool }) {
    const tools = [
        { name: "Select", icon: <Move strokeWidth={2} color="black" /> },
        {
            name: "Rectangle",
            icon: <RectangleHorizontal strokeWidth={2} color="black" />,
        },
        { name: "Line", icon: <Minus strokeWidth={2} color="black" /> },
        {
            name: "Freedraw",
            icon: <PencilLine strokeWidth={2} color="black" />,
        },
    ];

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white backdrop-blur-lg rounded-lg shadow-lg p-1">
            <div className="flex gap-2">
                {tools.map((tool) => (
                    <button
                        key={tool.name}
                        onClick={() => setTool(tool.name.toLowerCase())}
                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-white text-white hover:bg-slate-800 transition-colors duration-300 transform hover:scale-110 active:scale-95`}
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














