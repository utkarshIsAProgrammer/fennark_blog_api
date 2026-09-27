import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load client/.env so VITE_PROXY_TARGET can override the dev proxy target
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 5173,
      // Forward all /api requests to the Express server in ../server
      // Override with VITE_PROXY_TARGET in client/.env if your backend runs elsewhere
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://localhost:5500',
          changeOrigin: true,
        },
      },
    },
  };
});
