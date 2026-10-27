'use client';
import { useState, useRef, type FormEvent } from 'react';
import { Icon } from './icon';
import { ENQUIRY_CONSENT_TEXT } from '@/lib/enquiry-consent';

type State = 'idle' | 'loading' | 'success' | 'error';

export function EnquiryForm({ demo = false }: { demo?: boolean }) {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const [consentError, setConsentError] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setConsentError(false);
    setState('loading');

    const data      = new FormData(event.currentTarget);
    const name      = String(data.get('name')      || '').trim();
    const email     = String(data.get('email')     || '').trim();
    const salon     = String(data.get('salon')     || '').trim();
    const locations = String(data.get('locations') || '').trim();
    const message   = String(data.get('message')   || '').trim();
    const website   = String(data.get('website')   || '').trim(); // honeypot
    const consent = data.get('consent') === 'on';

    // Client-side guard
    if (!name || !email || !salon || !message) {
      setError('Please fill in your name, email, salon, and message.');
      setState('error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid work email address.');
      setState('error');
      return;
    }

    if (!consent) {
      setError('Please tick the consent checkbox before sending your enquiry.');
      setConsentError(true);
      setState('error');
      consentRef.current?.focus();
      return;
    }

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, salon, locations, message, website, demo, consent }),
      });

      const json: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || json.ok !== true) {
        setError(json.error || 'Something went wrong. Please try again or email us directly.');
        setState('error');
        return;
      }

      setState('success');
      formRef.current?.reset();
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
      setState('error');
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────
  if (state === 'success') {
    return (
      <div className="enquiry-form enquiry-success">
        <span className="feature-icon green" style={{ marginBottom: '1.5rem' }}>
          <Icon name="check" size={26} />
        </span>
        <div className="form-heading">
          <span className="eyebrow">{demo ? 'REQUEST RECEIVED' : 'MESSAGE RECEIVED'}</span>
          <h2>{demo ? "We\u2019ll be in touch soon." : 'Thanks for reaching out.'}</h2>
        </div>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
          {demo
            ? "We\u2019ve received your demo request and submitted a confirmation email for delivery. Our team will be in touch to arrange a time."
            : "We\u2019ve received your message and submitted a confirmation email for delivery. We\u2019ll reply as soon as we can."}
        </p>
        <a
          className="text-button"
          href="mailto:help@saloonsync.vasudevai.in"
          style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          Email us directly <Icon name="arrow" size={16} />
        </a>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────
  return (
    <form className="enquiry-form" onSubmit={submit} ref={formRef} method="post" action="/api/enquiry">
      <div className="form-heading">
        <span className="eyebrow">{demo ? "LET\u2019S EXPLORE YOUR WORKSPACE" : "LET\u2019S START A CONVERSATION"}</span>
        <h2>{demo ? 'Tell us about your salon.' : "What\u2019s on your mind?"}</h2>
      </div>

      {/* Honeypot — hidden from real users, catches bots */}
      <label style={{ display: 'none' }} aria-hidden="true">
        Leave this empty
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="form-row">
        <label>
          Your name
          <input name="name" autoComplete="name" required maxLength={100} placeholder="Full name" disabled={state === 'loading'} />
        </label>
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@your-salon.com" disabled={state === 'loading'} />
        </label>
      </div>

      <label>
        Salon or business name
        <input name="salon" autoComplete="organization" required maxLength={150} placeholder="Your salon" disabled={state === 'loading'} />
      </label>

      <label>
        Number of locations
        <select name="locations" defaultValue="1" disabled={state === 'loading'}>
          <option value="1">One location</option>
          <option value="2\u20135">2\u20135 locations</option>
          <option value="6+">6 or more locations</option>
          <option value="Planning">Planning my first salon</option>
        </select>
      </label>

      <label>
        {demo ? 'What would you like to explore?' : 'Your message'}
        <textarea
          name="message"
          required
          maxLength={1500}
          rows={4}
          placeholder={demo ? 'Tell us about your workflow and what you need from Saloonsync.' : 'How can we help?'}
          disabled={state === 'loading'}
        />
      </label>

      <p className="form-note">
        Your details are sent securely to our team. We&rsquo;ll also send a confirmation to your email address.{' '}
        <a href="/privacy">Read our privacy notice.</a>
      </p>

      <div className="form-consent">
        <label>
          <input
            ref={consentRef}
            type="checkbox"
            name="consent"
            required
            disabled={state === 'loading'}
            aria-invalid={consentError || undefined}
            aria-describedby={consentError ? 'enquiry-consent-help enquiry-error' : 'enquiry-consent-help'}
            onChange={() => { if (consentError) { setConsentError(false); setError(''); setState('idle'); } }}
          />
          <span>{ENQUIRY_CONSENT_TEXT} <span className="consent-required">(required)</span></span>
        </label>
        <p id="enquiry-consent-help">Read our <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy notice<span className="sr-only"> (opens in a new tab)</span></a> and <a href="/terms" target="_blank" rel="noopener noreferrer">website terms<span className="sr-only"> (opens in a new tab)</span></a>. This consent is for your enquiry, not marketing subscriptions.</p>
      </div>

      <button type="submit" className="button" disabled={state === 'loading'}>
        {state === 'loading' ? (
          <>Sending&hellip; <Icon name="clock" size={18} /></>
        ) : (
          <>{demo ? 'Send demo request' : 'Send message'} <Icon name="arrow" size={18} /></>
        )}
      </button>

      {state === 'error' && error && (
        <p id="enquiry-error" className="form-status form-status-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
