/**
 * Site navigation — aligned with ref/oursky-com-2023.webflow (index.html .navbar).
 * Home + Blog: hidden in the header nav below md (768px); phone uses in-nav logo chip for home.
 * Tablet (768px+) shows separate logo pill + Home + Blog in the list again.
 * Contact is a CTA pill, not a main-nav link.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Hidden below md (768px) — trim phone nav (Home: logo chip is home; Blog: space) */
  narrowHidden?: boolean;
}

export const mainNav: NavLink[] = [
  { label: 'Home',     href: '/',          narrowHidden: true },
  { label: 'About',    href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Blog',     href: '/blog/',     narrowHidden: true },
  { label: 'Works',    href: '/works/' },
];

export const ctaLink = { label: 'Contact', href: '/contact/' };

export interface FooterSection {
  heading: string;
  links: { label: string; href: string }[];
}

export const footerSections: FooterSection[] = [
  {
    heading: 'Works',
    links: [
      { label: 'All Works', href: '/works/' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Software Development', href: '/service/software-development/' },
      { label: 'UI / UX Design',       href: '/service/ui-ux-design/' },
      { label: 'AI',                   href: '/service/ai/' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'FormX',    href: 'https://formx.ai/', target: '_blank' },
      { label: 'Authgear', href: 'https://authgear.com/', target: '_blank' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',       href: '/about/' },
      { label: 'Blog',        href: '/blog/' },
      { label: 'Open Source', href: '/open-source/' },
      { label: 'Contact',     href: '/contact/' },
    ],
  },
];

export interface OfficeInfo {
  company: string;
  locations: string[];
}

export const offices: OfficeInfo[] = [
  { company: 'Oursky',    locations: ['Hong Kong', 'Taipei', 'Canada'] },
  { company: 'Skymakers', locations: ['London', 'Manchester', 'Tokyo'] },
];
