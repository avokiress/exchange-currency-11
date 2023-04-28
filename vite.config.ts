import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      context: path.resolve(__dirname, 'src/context/'),
      layouts: path.resolve(__dirname, 'src/layouts/'),
    },
  },
  server: {
    port: 8000,
  },
  plugins: [react()],
})