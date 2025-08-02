import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000", // ✅ your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  server: {
    historyApiFallback: true, // Optional: ensures fallback to index.html
  }
});
