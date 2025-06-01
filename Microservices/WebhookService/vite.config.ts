import {defineConfig, configDefaults} from 'vitest/config';
import swc from 'unplugin-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    swc.vite(),
  ],
  test: {
    environment: 'node',
    exclude:[
      ...configDefaults.exclude, 
      'build/*'
    ],
    coverage: {
      include: [
        'src/**',
      ],
      exclude: [
        'src/server.ts',
        'src/db.ts',
        '**/index.ts',
        '**/index.d.ts',
      ],
    },
  },
});
