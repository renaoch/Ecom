import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer"; // This is still useful

// Import tailwindcss statically
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()], // Vite React plugin
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Use TailwindCSS as a PostCSS plugin
        autoprefixer(), // Autoprefixer for compatibility
      ],
    },
  },
});
