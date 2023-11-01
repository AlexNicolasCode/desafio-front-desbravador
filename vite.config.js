import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  root: 'src',
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: '~bootstrap', replacement: path.resolve(__dirname, 'node_modules/bootstrap') },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ]
  },
  build: {
    outDir: '../dist' 
  },
  plugins: [react()],
})
