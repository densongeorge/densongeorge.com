# densongeorge.com

The personal portfolio for [densongeorge.com](https://densongeorge.com), built as a static Astro site.

## Stack

- Astro for the static shell, metadata, routing, and sitemap
- React and TypeScript for the compact interactive stack disclosure
- Fluent UI 9 for its tabs, design tokens, and accessibility behavior

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

## Design provenance

The public [/colophon](https://densongeorge.com/colophon/) records every design or engineering reference adopted by the site and how it was independently reinterpreted. High-level principles were reviewed from:

- [Fluent 2](https://fluent2.microsoft.design/design-tokens) for the documented component and token system
- [Anthony Fu](https://antfu.me/) for the general principle of using a technology stack as an identity signal
- [Josh W. Comeau](https://www.joshwcomeau.com/) for the general principle of interaction as technical evidence
- [Derek Sivers’ `/now` convention](https://sive.rs/now) for present-focus framing
- [Astro’s islands architecture](https://docs.astro.build/en/concepts/islands/) for the static-shell/interactive-island implementation

No source copy, code, visual assets, measurements, or distinctive layouts were reused.
