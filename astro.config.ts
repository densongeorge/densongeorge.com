import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

export default defineConfig({
  site: "https://densongeorge.com",
  output: "static",
  trailingSlash: "always",
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [sitemap(), react({ experimentalDisableStreaming: true })],
});
