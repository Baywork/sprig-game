import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import * as fs from "node:fs"
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(),
      {
        name: "raw-asset-loader",
        transform(src, id) {
          if (id.endsWith('.png') && !id.includes('?raw')) {
            const content = fs.readFileSync(id, 'utf-8');
            return `export default ${JSON.stringify(content)}`;
          }
        }
      }]
  },
  root: "./app",
  srcDir: "./app/src",
  integrations: [react()]
});