import Link from 'next/link';
import { featurePages, solutions } from '@/lib/content';

const names: Record<string, string> = {
  features: 'Features', solutions: 'Solutions', pricing: 'Pricing', about: 'About us',
  contact: 'Contact us', 'book-a-demo': 'Book a demo', help: 'Help center',
  blog: 'Journal', privacy: 'Privacy notice', terms: 'Website terms',
};
export function Breadcrumbs({ path }: { path: string }) {
  const segments = path.split('/').filter(Boolean);
  const entries = [{ href: '/', label: 'Home' }, ...segments.map((segment, index) => ({
    href: '/' + segments.slice(0, index + 1).join('/'),
    label: names[segment] || [...featurePages, ...solutions].find(item => item.slug === segment)?.name || segment,
  }))];
  return <div className="breadcrumb-bar"><nav className="container breadcrumb-nav" aria-label="Breadcrumb"><ol>{entries.map((entry, index) => <li key={entry.href}>{index > 0 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}{index === entries.length - 1 ? <span aria-current="page">{entry.label}</span> : <Link href={entry.href}>{entry.label}</Link>}</li>)}</ol></nav></div>;
}
