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
      store: path.resolve(__dirname, 'src/store/'),
      css: path.resolve(__dirname, 'src/css/'),
      config: path.resolve(__dirname, 'src/config.ts'),
    },
  },
  server: {
    port: 8000,
  },
  plugins: [react()],
})