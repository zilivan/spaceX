import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//'/spaseX/'  gh-page
//'/'   vercel
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

    base: '/spaseX/',
});
