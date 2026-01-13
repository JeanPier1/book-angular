/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import path from 'path';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['tests/test-setup.ts'],
    include: ['**/*.spec.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.d.ts', 'setup-*.ts'],
    },
    css: false,
    server: {
      deps: {
        inline: [
          '@angular/core',
          '@angular/common',
          '@angular/platform-browser',
          '@angular/compiler',
        ],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@core': path.resolve(__dirname, 'src/app/core'),
      '@shared': path.resolve(__dirname, 'src/app/shared'),
      '@env': path.resolve(__dirname, 'src/environments'),
      '@enviroment': path.resolve(__dirname, 'src/app/enviroment'),
    },
  },
  define: {
    ngJitMode: 'true',
  },
  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/compiler',
      '@angular/common/http',
      '@angular/common/http/testing',
    ],
  },
});
