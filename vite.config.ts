import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import http from "https";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://get.taaghche.com/v2",
        changeOrigin: true,
        secure: false,
        agent: new http.Agent(),
      },
    },
  },
});
