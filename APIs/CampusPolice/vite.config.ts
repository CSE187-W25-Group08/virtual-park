import {defineConfig, configDefaults} from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    exclude:[
      ...configDefaults.exclude, 
      'build/*'
    ],
    coverage: {
      include: [
        'src/**',
        'test/**',
      ],
      exclude: [
        'src/server.ts',
        '**/index.ts',
        '**/index.d.ts',
      ],
    },
  },
});