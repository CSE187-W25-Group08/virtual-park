import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    css: true,
    // https://chatgpt.com/g/g-p-6812f0a14ce48191b88ff0acaa65015c-virtual-park-app/c/681d1dc8-b460-8007-8f9a-f725239fd281
    pool: 'vmThreads',
    server: {
      deps: {
        inline: ['@mui/x-data-grid'],
      },
    },
    coverage: {
      include: [
        'src/**',
      ],
      exclude: [
        'src/app/layout.tsx',
      ],
    },
  },
})