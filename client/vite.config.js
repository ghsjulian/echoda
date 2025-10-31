import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],server : {
        port : 5000,
        allowedHosts: [
      'f4789e2e6bb4.ngrok-free.app' // 👈 Add your ngrok domain here
    ],
    },
    define: {
        global: "window", 
    },
})
