import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    RubyPlugin(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3036,
    strictPort: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws'
    }
  }
})
