import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion', 'lenis'],
          'vendor-geo': ['d3-geo'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
