import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite';
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
})
