# densongeorge.com

The personal portfolio for [densongeorge.com](https://densongeorge.com), built as a static Astro site.

## Stack

- Astro and strict TypeScript for the static site, metadata, and routing
- CSS for the responsive visual system and light/dark themes
- Astro’s sitemap integration for search-engine discovery

## Local development

Use Node.js 24 (the minimum supported version is 22.12) and npm.

```sh
npm install
npm run dev
```

The development server runs at `http://localhost:4321`. Other useful commands:

| Command                | Purpose                             |
| ---------------------- | ----------------------------------- |
| `npm run format`       | Format the project with Prettier    |
| `npm run format:check` | Check formatting without changes    |
| `npm run check`        | Run Astro and TypeScript checks     |
| `npm run build`        | Check and build the production site |
| `npm run preview`      | Preview the production build        |

## Cloudflare Pages

Connect this repository to a Cloudflare Pages project and use:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Root directory:** repository root

No environment variables or Astro adapter are required. The `.nvmrc` file pins the build to Node.js 24. After the first deployment, add `densongeorge.com` as the custom domain in Cloudflare Pages and complete any DNS prompts Cloudflare provides.

## Ship checklist

1. Open a pull request from `densongeorge-build-personal-site`.
2. Merge the pull request into `main`.
3. Connect Cloudflare Pages to `densongeorge/densongeorge.com`.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Add `densongeorge.com` and `www.densongeorge.com` as custom domains.
7. Verify HTTPS, redirect `www` to the canonical domain, and confirm static assets are cached.
