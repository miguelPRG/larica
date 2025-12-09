import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      // Redireciona requisições para "/api" para o backend
      "/api": {
        target: "https://larica-backend.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove "/api" do início
      },
    },
  },
});
