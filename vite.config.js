import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base precisa bater com o nome do repositório, porque o site é publicado em /englishflix/ no GitHub Pages
export default defineConfig({
  base: "/englishflix/",
  plugins: [react()],
});
