import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // GitHub Pages subpath until the domain is bought; set VITE_BASE=/ for a custom domain
  base: mode === 'production' ? (process.env.VITE_BASE || '/saaraswath-academy/') : '/',
  server: {
    port: 5173
  }
}));
