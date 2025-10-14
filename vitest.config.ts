// vitest.config.ts
import { defineConfig } from 'vitest/config'; // <-- Импорт из 'vitest/config'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // <-- Теперь 'test' известен как опция Vitest
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
