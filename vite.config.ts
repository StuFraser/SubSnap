import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',               // For React DOM testing
    setupFiles: './src/setupTests.ts',  // Optional setup file
    globals: true,                      // Enables global expect, describe, etc.
    include: ['src/**/*.{test,spec}.{ts,tsx}'], // Where to look for tests
  },
})
