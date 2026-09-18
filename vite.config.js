import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["192.168.100.20:5173", "aerospace-lyrically-parade.ngrok-free.dev", "192.168.100.20"]
  }
});