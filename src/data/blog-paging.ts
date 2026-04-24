import { getCollection, type CollectionEntry } from 'astro:content';

/** Blog index pagination — matches a comfortable grid of 2 columns × 6 rows. */
export const BLOG_POSTS_PER_PAGE = 12;

export async function getSortedPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const all = await getCollection('blog', ({ data }) => !data.draft);
  all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return all;
}
