import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageGuide } from '@/components/page-guide';
import { PageCTA } from '@/components/marketing-pages';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AboutPage, BlogPage, ContactPage, DetailPage, FeatureIndex, HelpPage, LegalPage, PricingPage, SolutionsIndex } from '@/components/marketing-pages';
import { featurePages, pagePaths, solutions } from '@/lib/content';
import { site } from '@/lib/site';

const descriptions: Record<string, [string, string]> = {
  '/features': ['Salon management features', 'Explore Saloonsync appointments, customer management, staff, billing, inventory, reporting and online booking.'],
  '/solutions': ['Solutions for your salon', 'Explore Saloonsync for small salon teams and multi-branch salon businesses.'],
  '/pricing': ['Pricing', 'Discuss your salon requirements and request current Saloonsync pricing.'],
  '/about': ['About Saloonsync', 'Get to know the thinking behind a connected workspace for the business of beautiful.'],
  '/contact': ['Contact us', 'Contact Saloonsync at help@saloonsync.vasudevai.in with product, pricing or support questions.'],
  '/book-a-demo': ['Book a demo', 'Prepare a Saloonsync demo enquiry and explore your salon workflow with our team.'],
  '/help': ['Help center', 'Search common Saloonsync questions about accounts, demonstrations, pricing and support.'],
  '/blog': ['The Saloonsync Journal', 'The Saloonsync Journal. Our first articles are still ahead; explore our product and philosophy.'],
  '/privacy': ['Website privacy notice', 'How the current Saloonsync marketing website handles contact forms, cookies and account links.'],
  '/terms': ['Website terms', 'Information about the Saloonsync marketing website and the status of service terms.'],
};

const pageKeywords: Record<string, string[]> = {
  '/features': ['salon management features', 'salon appointments', 'salon customer management', 'salon staff management', 'salon billing', 'salon inventory', 'salon reports', 'online booking'],
  '/solutions': ['salon solutions', 'small salon software', 'multi-branch salon', 'salon business management'],
  '/pricing': ['salon software pricing', 'salon management cost', 'salon software plans', 'Saloonsync pricing'],
  '/about': ['about Saloonsync', 'salon management platform', 'salon software company', 'beauty tech'],
  '/contact': ['contact Saloonsync', 'salon software support', 'salon software enquiry'],
  '/book-a-demo': ['salon software demo', 'book Saloonsync demo', 'salon management demo'],
  '/help': ['Saloonsync help', 'salon software help center', 'salon management FAQ'],
  '/blog': ['salon business blog', 'Saloonsync journal', 'salon management insights'],
  '/privacy': ['Saloonsync privacy', 'salon software privacy policy'],
  '/terms': ['Saloonsync terms', 'salon software terms of use'],
};

export const dynamicParams = false;
export function generateStaticParams() { return pagePaths.map(path => ({ slug: path.slice(1).split('/') })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug.join('/')}`;
  const siteUrl = site.url || 'https://saloonsync.vasudevai.in';
  const item = path.startsWith('/features/') ? featurePages.find(f => f.slug === slug[1]) : path.startsWith('/solutions/') ? solutions.find(s => s.slug === slug[1]) : undefined;
  const [name, description] = item ? [item.name, item.description] : descriptions[path] || ['Page not found', ''];
  const title = `${name} — Saloonsync`;
  const canonicalUrl = `${siteUrl}${path}`;
  const ogImageUrl = `${siteUrl}/saloonsync-logo.png`;
  const keywords = item
    ? [...(path.startsWith('/features/') ? ['salon ' + item.name.toLowerCase(), item.name + ' management', 'salon management', 'Saloonsync ' + item.name.toLowerCase()] : ['salon ' + item.name.toLowerCase(), 'Saloonsync solutions', item.name + ' salon'])]
    : (pageKeywords[path] || ['Saloonsync', 'salon management software']);
  return {
    title: name,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Saloonsync',
      locale: 'en_IN',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${name} — Saloonsync` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    ...(site.url ? { alternates: { canonical: canonicalUrl } } : {}),
    ...(['/privacy', '/terms', '/blog'].includes(path) ? { robots: { index: false, follow: true } } : {}),
  };
}
export default async function MarketingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = `/${slug.join('/')}`;
  if (!pagePaths.includes(path)) notFound();
  let content;
  if (path.startsWith('/features/')) { const item = featurePages.find(f => f.slug === slug[1]); if (!item) notFound(); content = <DetailPage item={item} />; }
  else if (path.startsWith('/solutions/')) { const item = solutions.find(s => s.slug === slug[1]); if (!item) notFound(); content = <DetailPage item={item} solution />; }
  else { const pages: Record<string, React.ReactNode> = { '/features': <FeatureIndex />, '/solutions': <SolutionsIndex />, '/pricing': <PricingPage />, '/about': <AboutPage />, '/contact': <ContactPage />, '/book-a-demo': <ContactPage demo />, '/help': <HelpPage />, '/blog': <BlogPage />, '/privacy': <LegalPage privacy />, '/terms': <LegalPage /> }; content = pages[path]; }
  return <><Header loginUrl={site.loginUrl} registerUrl={site.registerUrl} /><main id="main" tabIndex={-1}><Breadcrumbs path={path} />{content}<PageGuide path={path} />{!['/privacy', '/terms'].includes(path) && <PageCTA />}</main><Footer /></>;
}


