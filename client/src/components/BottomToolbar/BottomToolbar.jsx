import { Undo2, Redo2 } from "lucide-react";

function BottomToolbar({ undo, redo }) {
    const tools = [
        { name: "Undo", icon: <Undo2 strokeWidth={2} /> },
        { name: "Redo", icon: <Redo2 strokeWidth={2} /> },
    ];
    const handleOnClick = (name) => {
        name === "Undo" ? undo() : redo();
    };
    return (
        <div className="fixed bottom-4 left-4 bg-slate-900 rounded-xl shadow-md">
            <div className="flex p-1">
                {tools.map((tool) => (
                    <button
                        key={tool.name}
                        onClick={() => handleOnClick(tool.name)}
                        className={`w-9 h-9 flex items-center justify-center rounded-md mx-0.5 text-white hover:bg-gray-100`}
                        title={tool.name}
                    >
                        {tool.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BottomToolbar;
