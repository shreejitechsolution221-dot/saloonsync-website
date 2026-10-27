'use client';
import { useState } from 'react';

const questions = [
  ['What is Saloonsync?', 'Saloonsync is a salon management platform for appointments, customers, staff, services, billing, inventory and business operations.'],
  ['Where do I log in?', 'Use the Log in link to access the shared identity service once it is connected. Identity destinations are not yet published on this website.'],
  ['Do customers and salon staff use the same application?', 'The customer booking experience and Salon OS are separate applications. They use a shared Saloonsync identity, with access determined by assigned roles.'],
  ['How do I request a demo?', 'Go to Book a demo and prepare an enquiry. Send the draft through your email app to help@saloonsync.vasudevai.in. No appointment is automatically scheduled.'],
  ['Where can I find pricing?', 'Confirmed plans and prices have not been published. Contact the team to discuss your salon and request pricing information.'],
  ['How do I contact support?', 'Email help@saloonsync.vasudevai.in. Include a description of your question. Never include passwords or sensitive customer information.'],
];
export function HelpSearch() {
  const [query, setQuery] = useState('');
  const matches = questions.filter(q => q.join(' ').toLowerCase().includes(query.toLowerCase().trim()));
  return <div className="help-search"><label htmlFor="help-query">Search common questions</label><input id="help-query" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try “login”, “demo” or “pricing”" /><p className="search-count" role="status">{matches.length} {matches.length === 1 ? 'answer' : 'answers'} found</p><div className="faq-list">{matches.map(([q, a]) => <details key={q}><summary>{q}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>{!matches.length && <div className="empty-state"><h3>No matching answers yet.</h3><p>Try another word or <a href="/contact">contact our team</a>.</p></div>}</div>;
}

