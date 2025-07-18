import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    coverage: {
      include: [
        'src/**',
      ],
      exclude: [
        'src/app/\\[locale\\]/layout.tsx',
        'src/theme.ts',
        'src/components/ThemeWrapper.tsx',
      ],
    },
  },
})
