import Link from 'next/link';
import { pageGuides } from '@/lib/page-guides';
import { Icon } from './icon';

export function PageGuide({ path }: { path: string }) {
  const guide = pageGuides[path];
  if (!guide) return null;
  return <>
    <section className="page-guide"><div className="container"><div className="guide-heading"><span className="eyebrow">{guide.eyebrow}</span><h2>{guide.heading}</h2><p>{guide.intro}</p></div><div className="guide-panels">{guide.panels.map((panel, index) => <article key={panel.title} className={`guide-panel guide-panel-${index}`}><span className="guide-icon"><Icon name={panel.icon} size={25} /></span><span className="guide-index">0{index + 1}</span><h3>{panel.title}</h3><p>{panel.text}</p></article>)}</div><div className="guide-checklist"><span>BRING THE RIGHT CONTEXT</span><ul>{guide.checklist.map(item => <li key={item}><Icon name="check" size={15} />{item}</li>)}</ul></div></div></section>
    {guide.faqs.length > 0 && <section className="container guide-faq"><div><span className="eyebrow">A FEW MORE DETAILS</span><h2>Before your<br /><em>next step.</em></h2><Link className="text-button" href={path === '/help' ? '/contact' : '/help'}>{path === '/help' ? 'Contact the team' : 'Visit the help center'}<Icon name="arrow" size={17} /></Link></div><div className="faq-list">{guide.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>}
  </>;
}
