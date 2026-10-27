import type { Metadata } from 'next';
import Link from 'next/link';
import { Brand } from '@/components/header';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: "We couldn't find that page. Head back to Saloonsync and get back in sync.",
  robots: { index: false, follow: true },
};

export default function NotFound() { return <main id="main" className="container not-found"><Brand /><span className="eyebrow">404 / A LITTLE OFF SCHEDULE</span><h1>Let’s get you<br /><em>back in sync.</em></h1><p>We couldn’t find that page. Your next stop is right here.</p><Link className="button" href="/">Back to home ↗</Link><Link href="/help">Visit the help center</Link></main>; }

