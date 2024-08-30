import React from "react";

function Button() {
    return (
        <a
            role="link"
            tabIndex="0"
            className="
    flex items-center justify-center 
    bg-gray-900 text-white 
    rounded-lg shadow-none cursor-pointer
    text-sm font-medium 
    h-8 max-w-full px-1.5 
    no-underline
    transform-gpu
  "
        >
            <span className="block text-white overflow-hidden px-1.5 whitespace-nowrap text-ellipsis">
                Learn
            </span>
        </a>
    );
}

export default Button;
