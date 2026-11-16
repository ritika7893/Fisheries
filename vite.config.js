import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/fisheriesukportal/',
  plugins: [react()],
})
