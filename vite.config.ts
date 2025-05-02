import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { dependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'md-editor',
      fileName: 'md-editor',
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)],
    },
  },
});
