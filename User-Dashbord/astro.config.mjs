import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  routes: [
    { path: '/', component: 'src/pages/index.astro' },
    { path: '/dashboard', component: 'src/pages/dashboard.astro' },
  ],
});
