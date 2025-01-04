import path from "path"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:9000",
            },
        },
    },
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: "./setupTests.js",
    },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
});
