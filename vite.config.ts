import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base set to relative so it works on any path (e.g. GitHub Pages /repo-name/)
  base: './',
});