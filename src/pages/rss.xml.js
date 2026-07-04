import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('articles'))
    .filter(p => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Sean Yalda — Articles',
    description:
      'Decision essays on agent systems, key custody, and production web engineering — why each choice was made and what it cost.',
    site: context.site,
    items: posts.map(p => ({
      title: [p.data.title, p.data.titleEm].filter(Boolean).join(' ').replace(/\.$/, ''),
      description: p.data.deck,
      pubDate: p.data.date,
      link: `/articles/${p.id}/`,
    })),
  });
}
