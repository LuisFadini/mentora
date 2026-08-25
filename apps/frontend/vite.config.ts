import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});
