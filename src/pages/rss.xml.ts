import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../consts";
import { getPublishedPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: `${SITE_NAME} — Writing`,
    description: SITE_DESCRIPTION,
    site: context.site ?? SITE_URL,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
    customData: "<language>en</language>",
  });
}
