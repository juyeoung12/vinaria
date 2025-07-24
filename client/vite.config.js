// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ✅ 추가

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ 절대경로 alias 추가
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // ✅ 백엔드 서버 주소로 프록시 설정
    },
  },
});
