import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true,
    strictPort: true,
    // origin: "http://localhost:5173",
    hmr: {
      clientPort: 3000,
      host: "localhost",
    },
  },
  base: "/react/",
});
