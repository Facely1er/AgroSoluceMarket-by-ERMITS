import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist/agrosoluce',
    assetsDir: 'assets',
    copyPublicDir: true
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});

