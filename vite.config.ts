import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
    },
  },
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        subappsIndex: resolve(__dirname, 'subapps/index.html'),
        subapp0: resolve(__dirname, 'subapps/0.html'),
        subapp1: resolve(__dirname, 'subapps/1.html'),
        subapp2: resolve(__dirname, 'subapps/2.html'),
      },
    },
  },
});