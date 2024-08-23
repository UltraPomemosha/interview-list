import react from "@vitejs/plugin-react-swc";
// import path from 'path'; 
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: "@c", replacement: "/src/components"},
      {find: "@", replacement: "/src"}
    ]
  },
  build: {
    rollupOptions: {
      external: [""]
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/scss/_global.scss" as *;',
      },
    }
  }
});

