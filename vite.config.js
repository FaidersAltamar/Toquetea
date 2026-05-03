import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Raíz del dominio (Hostinger public_html, dominio propio). Para GitHub Pages en /Toquetea/ usa: npm run build:gh-pages
export default defineConfig({
  base: '/',
  plugins: [react()],
});
