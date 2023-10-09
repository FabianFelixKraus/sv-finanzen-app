import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
});
