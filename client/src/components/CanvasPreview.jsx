import React from "react";

function CanvasPreview({title, lastUpdated = "unknown", onClick}) {
    return (
        <div className="overflow-hidden bg-white rounded-lg shadow-md" onClick={onClick}>
            <div className="p-0">
                <img
                    src="/placeholder.svg"
                    alt="Whiteboard thumbnail"
                    width={400}
                    height={300}
                    className="aspect-video object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div className="bg-gray-100 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="grid gap-0.5">
                        <div className="font-medium">{title}</div>
                        <div className="text-sm text-gray-500">
                            {`Last updated: ${lastUpdated}`}
                        </div>
                    </div>
                    <button className="bg-transparent hover:bg-gray-200 p-1 rounded-full">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CanvasPreview;
