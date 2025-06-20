import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, "src"),
      '@components': resolve(__dirname, "src/components"),
      "@store": resolve(__dirname, "src/store"),
      "@assets": resolve(__dirname, "src/assets")
    }
  }
})
