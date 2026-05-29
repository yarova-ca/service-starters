import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite()],
    preview: { headers: { 'Cache-Control': 'public, max-age=600' } },
  };
});
