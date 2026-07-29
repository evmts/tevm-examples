import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mud } from "vite-plugin-mud";

export default defineConfig({
  plugins: [react(), mud({ worldsFile: "../contracts/worlds.json" })],
  build: {
    target: "es2022",
    minify: true,
    sourcemap: true,
    // @tevm/mud has not reached npm yet. Keep its runtime imports external until the first release.
    rollupOptions: {
      external: [/^@tevm\/mud(?:\/.*)?$/],
    },
  },
});
