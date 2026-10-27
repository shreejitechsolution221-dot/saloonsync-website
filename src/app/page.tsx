import { PageGuide } from '@/components/page-guide';
import { Footer } from '@/components/footer';
import { MotionScene } from '@/components/motion-scene';
import { featurePages } from '@/lib/content';
import { Header } from '@/components/header';
import { Icon } from '@/components/icon';
import { ProductPreview } from '@/components/product-preview';
import { site } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saloonsync — Make room for what you love',
  description: 'Bring your salon appointments, team, customers, billing and inventory together with Saloonsync. A clearer way to manage the business behind your craft.',
  keywords: [
    'salon management software', 'salon booking system', 'salon appointments', 'salon POS',
    'salon inventory management', 'salon staff management', 'beauty salon software',
    'hair salon management', 'salon business software', 'Saloonsync',
  ],
  openGraph: {
    title: 'Saloonsync — Your salon, beautifully in sync',
    description: 'A clearer way to manage appointments, customers, your team and everyday salon operations.',
    type: 'website',
    siteName: 'Saloonsync',
    ...(site.url ? { url: site.url } : {}),
  },
};

const features = [
  { icon: 'calendar', title: 'A calmer calendar.', text: 'Keep appointments organized and give your team a clear view of the day.', detail: 'Appointments', tone: 'pink' },
  { icon: 'people', title: 'Know your people.', text: 'Bring customer information together, ready for the next conversation.', detail: 'Customer management', tone: 'green' },
  { icon: 'spark', title: 'Your team, in sync.', text: 'Keep staff and services connected to your everyday salon operations.', detail: 'Staff management', tone: 'purple' },
  { icon: 'card', title: 'Finish on a good note.', text: 'Bring billing into the same workspace as the rest of your salon business.', detail: 'Billing & POS', tone: 'peach' },
  { icon: 'box', title: 'A place for every product.', text: 'Keep inventory organized alongside your services and daily operations.', detail: 'Inventory management', tone: 'yellow' },
  { icon: 'chart', title: 'See the bigger picture.', text: 'Bring business reporting into view so you can plan your next steps.', detail: 'Reports & analytics', tone: 'blue' },
];
const faqs = [
  ['What is Saloonsync?', 'Saloonsync is salon management software that brings appointments, staff, customers, services, billing, inventory and business operations into one workspace.'],
  ['Is Saloonsync a website for one salon?', 'No. Saloonsync is a platform for salon businesses. Each salon works within its own business workspace; this website introduces the platform.'],
  ['Is this the salon management application?', 'This is the Saloonsync marketing website. The Salon OS and customer booking experience are separate applications.'],
  ['Will I need different accounts for each application?', 'Saloonsync uses a shared identity. Owners, staff and booking customers can use the same identity across Saloonsync applications, with access determined by their assigned roles.'],
  ['Where can I find pricing?', 'Confirmed pricing has not been published on this website yet. Plan details will be added when available.'],
];

export default function Home() {
  return <><Header loginUrl={site.loginUrl} registerUrl={site.registerUrl} /><main id="main">
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span /> THE BUSINESS SIDE OF BEAUTIFUL</div><h1>Your salon.<br />Beautifully<br /><em>in sync.</em></h1><p>More time for your craft. Less time managing it.<br className="desktop-break" /> Bring your appointments, people, and everyday<br className="desktop-break" /> operations together with Saloonsync.</p><div className="hero-actions"><a className="button" href={site.registerUrl || '/book-a-demo'}>Find your flow <Icon name="arrow" size={18} /></a><a className="text-button" href="#how-it-works"><span className="play-icon">▶</span>Take a closer look</a></div><div className="hero-benefits"><span><Icon name="check" size={14} /> One connected workspace</span><span><Icon name="check" size={14} /> Made for salon businesses</span></div></div><MotionScene className="home-motion"><ProductPreview /></MotionScene></div><div className="container hero-foot"><span>FOR THE PEOPLE BEHIND THE CHAIR.</span><p>The appointments. The people. The details.<br /><strong>Finally, a place for it all.</strong></p><a href="#features" aria-label="Explore features">↓</a></div></section>
    <section className="section container" id="features"><div className="section-heading"><div><span className="eyebrow">LESS BUSYWORK. MORE BEAUTIFUL WORK.</span><h2>All the moving parts.<br /><em>One beautiful rhythm.</em></h2></div><p>Running a salon takes more than great service.<br />Give the business behind it a little more clarity.</p></div><div className="feature-grid">{features.map((f, i) => <article className="feature-card" key={f.title}><span className={`feature-icon ${f.tone}`}><Icon name={f.icon} size={24} /></span><h3>{f.title}</h3><p>{f.text}</p><a className="feature-label" href={`/features/${featurePages[i].slug}`}>{f.detail} ↗</a></article>)}</div></section>
    <section className="workflow-section" id="how-it-works"><div className="container workflow-grid"><div className="workflow-art" aria-label="Illustration of a salon day organized in one workspace"><div className="art-label"><Icon name="spark" size={18} /> A LITTLE MORE HEADSPACE</div><h3>From the first hello.<br />To the final touch.</h3><div className="journey-row"><span className="journey-icon pink"><Icon name="calendar" /></span><div><strong>A day with direction</strong><p>Appointments & services</p></div><span className="journey-check"><Icon name="check" size={16} /></span></div><div className="journey-row"><span className="journey-icon green"><Icon name="people" /></span><div><strong>A team on the same page</strong><p>People & customers</p></div><span className="journey-check"><Icon name="check" size={16} /></span></div><div className="journey-row"><span className="journey-icon purple"><Icon name="card" /></span><div><strong>The details, brought together</strong><p>Billing & inventory</p></div><span className="journey-check"><Icon name="check" size={16} /></span></div><span className="art-footnote">Illustrative workflow</span></div><div className="workflow-copy"><span className="eyebrow">MAKE SPACE FOR WHAT MATTERS</span><h2>You bring the talent.<br /><em>We bring it together.</em></h2><p>Your best work happens when you can focus on the person in your chair. Saloonsync gives the business side of your salon a shared home.</p><ol className="steps"><li><span>01</span><div><h3>Bring your day into focus</h3><p>See appointments and services in context.</p></div></li><li><span>02</span><div><h3>Connect the people behind it</h3><p>Keep your team and customer information together.</p></div></li><li><span>03</span><div><h3>Make room for the bigger picture</h3><p>Keep everyday operations part of the conversation.</p></div></li></ol></div></div></section>
    <section className="section container" id="solutions"><div className="center-heading"><span className="eyebrow">YOUR BUSINESS. YOUR NEXT CHAPTER.</span><h2>Big ambitions.<br /><em>A little more breathing room.</em></h2><p>For the owners building something beautiful, every day.</p></div><div className="solutions-grid"><article className="solution-card solution-light"><span className="solution-number">01 / SMALL SALONS</span><h3>Small team.<br />Full days.</h3><p>Give appointments, customers and the everyday details a shared home, so you can keep your attention on your craft.</p><a className="text-button" href="/solutions/small-salons">Explore your workspace <Icon name="arrow" size={18} /></a><div className="solution-drawing"><span>Appointments</span><span>Customers</span><span>Your craft <Icon name="spark" size={16} /></span></div></article><article className="solution-card solution-dark"><span className="solution-number">02 / MULTI-BRANCH BUSINESSES</span><h3>More locations.<br />One clear vision.</h3><p>Bring a connected approach to the people and operations behind your salon business as you plan its next chapter.</p><a className="text-button" href="/solutions/multi-branch-salons">Discover Saloonsync <Icon name="arrow" size={18} /></a><div className="branches-art" aria-hidden="true"><span>YOUR BUSINESS</span><div><i>Salon 01</i><i>Salon 02</i><i>Salon 03</i></div></div></article></div></section>
    <PageGuide path="/" /><section className="faq-section container" id="questions"><div><span className="eyebrow">A LITTLE MORE CLARITY</span><h2>Good questions.<br /><em>Clear answers.</em></h2><p>Get to know the business<br />behind your next chapter.</p></div><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
    <section className="container cta-wrap" id="get-started"><div className="cta-section"><span className="eyebrow">LESS JUGGLING. MORE GLOW.</span><h2>Your next chapter<br />looks <em>beautiful.</em></h2><p>Make room for the work you love.</p>{site.registerUrl ? <a className="button button-cream" href={site.registerUrl}>Get started with Saloonsync <Icon name="arrow" size={18} /></a> : <a className="button button-cream" href="/book-a-demo">Book a demo <Icon name="arrow" size={18} /></a>}<Icon name="spark" size={150} /></div><div id="identity" className="identity-note"><strong>One Saloonsync identity.</strong><p>{site.loginUrl || site.registerUrl ? 'Use the account links to continue to your Saloonsync identity.' : 'Login and registration links will be available here when the Saloonsync identity service is connected.'}</p>{site.loginUrl && <a href={site.loginUrl}>Log in ↗</a>}{site.registerUrl && <a href={site.registerUrl}>Register ↗</a>}</div></section>
  </main><Footer /></>;
}




