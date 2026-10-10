import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-root-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '') {
            res.writeHead(302, { Location: '/Wiki-by-D1x2k/' });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  base: '/Wiki-by-D1x2k/',
  server: {
    host: true,
    port: 5173,
  },
})
