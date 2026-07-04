// Shipped, self-initiated products. Shown on /work; the newest also appear
// in the home page's Now feed. Entries graduate to full case studies (and
// out of this list) once their write-ups are published.
export interface ProductLink {
  href: string;
  label: string;
}

export interface Product {
  name: string;
  status: string;
  description: string;
  links: ProductLink[];
}

export const products: Product[] = [
  {
    name: 'Breaking Changes',
    status: 'Live · Open source',
    description:
      'Give it a GitHub dependency and two versions; it turns fifty releases of changelog into an upgrade plan your team can run. Web app, zero-dependency CLI, and a Claude Code skill — the skill needs no API key at all.',
    links: [
      { href: 'https://breakingchanges.ai', label: 'breakingchanges.ai' },
      { href: 'https://github.com/Seanathon/breakingchanges', label: 'GitHub' },
    ],
  },
  {
    name: 'Board',
    status: 'v0.2 alpha · Open source',
    description:
      'Self-hosted curation where the AI composes an opinionated board from whatever you collect. Single node, SQLite you can copy and walk away with — and it stays useful with the AI turned off.',
    links: [{ href: 'https://github.com/Seanathon/board', label: 'GitHub' }],
  },
  {
    name: 'The Cube',
    status: 'Live · HYWN',
    description:
      'A 4,000-year-old imagining ritual as an async web experience. Play it, and an oil painting of what you pictured comes back with a personal interpretation.',
    links: [{ href: 'https://cube.hywn.com', label: 'cube.hywn.com' }],
  },
];
