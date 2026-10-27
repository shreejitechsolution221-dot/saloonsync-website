import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/lib/site';
import { RouteNavigation } from '@/components/route-navigation';

const siteUrl = site.url || 'https://saloonsync.vasudevai.in';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1714' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
  title: {
    default: 'Saloonsync — Make room for what you love',
    template: '%s | Saloonsync',
  },
  description: 'Bring your salon appointments, team, customers, billing and inventory together with Saloonsync. A clearer way to manage the business behind your craft.',
  keywords: [
    'salon management software',
    'salon booking system',
    'salon appointments',
    'salon POS',
    'salon inventory management',
    'salon staff management',
    'salon customer management',
    'beauty salon software',
    'hair salon management',
    'salon business software',
    'Saloonsync',
    'salon OS',
    'salon analytics',
    'salon billing',
    'salon scheduling',
  ],
  authors: [{ name: 'Saloonsync', url: siteUrl }],
  creator: 'Saloonsync',
  publisher: 'Saloonsync',
  category: 'Business Software',
  applicationName: 'Saloonsync',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'Saloonsync — Your salon, beautifully in sync',
    description: 'A clearer way to manage appointments, customers, your team and everyday salon operations.',
    type: 'website',
    siteName: 'Saloonsync',
    url: siteUrl,
    locale: 'en_IN',
    images: [{
      url: `${siteUrl}/saloonsync-logo.png`,
      alt: 'Saloonsync — Salon Management Software',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saloonsync — Your salon, beautifully in sync',
    description: 'More time for your craft. A clearer way to manage your salon.',
    images: [`${siteUrl}/saloonsync-logo.png`],
  },
  icons: {
    icon: [
      { url: '/saloonsync-logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/saloonsync-logo.png', type: 'image/png', sizes: '16x16' },
      { url: '/saloonsync-logo.png', type: 'image/png' },
    ],
    shortcut: '/saloonsync-logo.png',
    apple: [
      { url: '/saloonsync-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: undefined,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Saloonsync',
  url: siteUrl,
  logo: `${siteUrl}/saloonsync-logo.png`,
  description: 'Salon management software that brings appointments, staff, customers, services, billing, inventory and business operations into one connected workspace.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'help@saloonsync.vasudevai.in',
    contactType: 'customer service',
  },
  sameAs: [],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <RouteNavigation />
        {children}
      </body>
    </html>
  );
}

