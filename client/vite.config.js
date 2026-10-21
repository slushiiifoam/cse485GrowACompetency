import { defineConfig } from 'vite'

// Vite serves the client during development and builds it into the server's
// public directory so Express can serve the finished site in production.
export default defineConfig({
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  },
  server: {
    proxy: {
      // Forward API requests and detail pages to Express during development.
      '/api': {
        target: 'http://localhost:3001'
      },
      '/plants': {
        target: 'http://localhost:3001'
      }
    }
  }
})

