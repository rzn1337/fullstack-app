function Button({ children = "Button", bgColor = "bg-gray-900", ...props }) {
    return (
        <button 
            className={`relative inline-flex items-center justify-center overflow-hidden px-4 py-2 border border-gray-800 ${bgColor} text-white text-sm font-semibold rounded-full transition-all duration-400 ease-out outline-none hover:border-gray-600 hover:bg-gray-800 whitespace-nowrap`} 
            {...props}
        >
            {children}
            <span className="absolute inset-0 bg-radial from-white/25 to-transparent scale-0 transition-transform duration-500 ease-out group-hover:scale-400"></span>
        </button>
    );
}

export default Button;
