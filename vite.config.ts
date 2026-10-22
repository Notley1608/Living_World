import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

const src = (p: string) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig({
  root: src('client'),
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  plugins: [vue()],
  resolve: {
    alias: { '@shared': src('shared/index.ts'), '@sim': src('sim/index.ts') },
  },
  server: {
    proxy: { '/ws': { target: 'ws://localhost:3000', ws: true } },
  },
  build: {
    outDir: fileURLToPath(new URL('./dist/client', import.meta.url)),
    emptyOutDir: true,
  },
  test: {
    dir: fileURLToPath(new URL('./src', import.meta.url)),
  },
});
