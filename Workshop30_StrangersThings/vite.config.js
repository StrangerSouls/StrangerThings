import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public', // Specify the output directory for production builds
    assetsDir: '',    // Set to an empty string to prevent assets from being placed in a subdirectory
    minify: 'terser',  // Use Terser for minification (recommended for production)
  },
})
