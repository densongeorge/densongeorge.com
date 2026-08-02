import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://densongeorge.com",
  output: "static",
  trailingSlash: "always",
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [sitemap()],
});
