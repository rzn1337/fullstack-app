/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "dots-pattern":
                    "radial-gradient(currentColor 1px, transparent 1px)",
            },
            backgroundSize: {
                "dots-size": "20px 20px",
            },
        },
    },
    plugins: [],
};
