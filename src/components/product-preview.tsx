import Image from 'next/image';
import { Icon } from './icon';

const appointments = [
  { name: 'Olivia Martin', service: 'Cut & finish · 60 min', time: '09:00', tone: 'pink', initials: 'OM', column: 0, top: 22, height: 91 },
  { name: 'Emma Wilson', service: 'Balayage · 120 min', time: '09:30', tone: 'purple', initials: 'EW', column: 1, top: 65, height: 144 },
  { name: 'Amelia Clark', service: 'Hair treatment · 45 min', time: '10:00', tone: 'green', initials: 'AC', column: 0, top: 146, height: 82 },
  { name: 'Sophia Davis', service: 'Cut & finish · 60 min', time: '09:00', tone: 'peach', initials: 'SD', column: 2, top: 22, height: 91 },
  { name: 'Mia Thompson', service: 'Blow dry · 45 min', time: '10:30', tone: 'pink', initials: 'MT', column: 2, top: 230, height: 79 },
];

export function ProductPreview() {
  return <div className="preview-stage"><div className="preview-caption"><span className="live-dot" /> A little clarity for your everyday.</div><div className="product-window" role="img" aria-label="Illustrative Saloonsync appointment calendar showing example appointments across three stylists. This is a product concept, not a live application.">
    <aside className="product-sidebar"><span className="mini-brand"><Image src="/saloonsync-logo.png" alt="" width={24} height={24} sizes="24px" /> saloonsync</span><div className="salon-selector"><span className="salon-avatar">S</span><span>The Studio<small>Your workspace</small></span><Icon name="chevron" size={13} /></div><span className="sidebar-label">WORKSPACE</span>{[['chart', 'Overview'], ['calendar', 'Appointments'], ['people', 'Customers'], ['people', 'Team'], ['card', 'Billing & POS'], ['box', 'Inventory']].map(([icon, label]) => <div key={label} className={`sidebar-item ${label === 'Appointments' ? 'active' : ''}`}><Icon name={icon} size={15} />{label}</div>)}<div className="sidebar-bottom"><span className="salon-avatar">JD</span><span>Jamie Davis<small>Salon owner</small></span></div></aside>
    <div className="product-main"><div className="product-topbar"><span>Workspace <span className="muted">/ Appointments</span></span><span className="example-tag">ILLUSTRATIVE PREVIEW</span></div><div className="calendar-heading"><div><h3>A good day starts here.</h3><p>Your team, your appointments. All in view.</p></div><span className="mock-button">+ New appointment</span></div><div className="calendar-toolbar"><strong>Tuesday, 27 October</strong><span>‹ &nbsp; Today &nbsp; ›</span><span className="day-pill">Day <Icon name="chevron" size={12} /></span></div>
      <div className="staff-row"><span /><span><b className="staff-avatar pink">JL</b>Jamie L.</span><span><b className="staff-avatar green">SK</b>Sarah K.</span><span><b className="staff-avatar peach">AM</b>Alex M.</span></div>
      <div className="calendar-grid"><div className="time-labels">{['9 AM', '10 AM', '11 AM', '12 PM'].map(t => <span key={t}>{t}</span>)}</div><div className="appointment-area">{[0, 1, 2].map(n => <div className="calendar-column" key={n} />)}{appointments.map(a => <div key={a.name} className={`appointment ${a.tone}`} style={{ left: `calc(${a.column * 33.333}% + 6px)`, top: a.top, height: a.height }}><small>{a.time}</small><strong>{a.name}</strong><span>{a.service}</span></div>)}<div className="time-line"><i /><span /></div></div></div>
    </div></div><div className="preview-note"><span className="note-icon"><Icon name="check" size={18} /></span><span>Less juggling.<strong>More time for your craft.</strong></span><Icon name="spark" size={24} /></div></div>;
}


