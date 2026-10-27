# Website audit — 27 October 2026

## Outcome

Local production build and TypeScript checks passed. All 20 marketing pages, 20 internal link destinations and 12 production CSS/JavaScript assets passed the HTTP verification suite. All 20 API regression tests passed under Node.js 24 without sending real email.

Vercel CLI 65.4.0, deployment scripts, `vercel.json`, Node.js 24 selection, environment documentation and Vercel upload exclusions are configured. No Vercel account was linked and no hosted deployment was created.

## Browser verification

Tested the production build using the in-app Chromium browser on port 3001, separate from the development server on port 3000.

- All 20 pages checked at 320, 390, 768 and 1366 pixel viewport widths: 80 page/viewport combinations.
- No horizontal overflow, duplicate IDs, unnamed visible link/button controls or unlabelled visible fields detected.
- One H1 on every page; unique page titles, descriptions and Open Graph titles present.
- Footer navigation starts at scroll position 0 across every route and width.
- Desktop Features, Solutions and Resources panels open across the full header width; Escape dismisses them.
- Mobile Features menu opens, hides the scrollbar, locks background scrolling, selects a destination and restores background scrolling.
- Breadcrumb baselines align; legal section anchors and cross-page identity fragments reach their targets.
- Motion pause control updates its pressed state. Reduced-motion handling was inspected in code; system preference emulation was not run.
- Help search supports matching results and the no-results state; FAQ opens using keyboard Enter.
- Contact and Demo forms reject malformed email addresses and unchecked required consent in the browser. No live valid submission was sent.
- No JavaScript errors were captured during the browser audit.

These checks are a focused accessibility and responsive smoke audit, not WCAG certification, a pixel-by-pixel review, Lighthouse measurement or testing in every browser. Firefox, Safari and the separate native Chrome profile were not tested in this run.

## API regression tests

20 passing tests cover null/array/malformed bodies, missing/false/string consent, blank and object fields, invalid email, missing salon/message, excessive field/body sizes, foreign origins, non-JSON requests, honeypot drops, absent email configuration, valid contact/demo flows with a mocked provider, HTML escaping and provider rejection/exceptions. Tests never contact Resend.

## Defects fixed

1. Resend initialization could fail when the server key was absent. It is now lazy, with a clear 503 response after request validation.
2. Null JSON and non-string fields could crash or bypass meaningful field validation. Request shape, types and limits are now checked.
3. Names, salon names and other user fields were interpolated into HTML emails without consistent escaping. Both templates now escape untrusted values.
4. Contact, demo, help and privacy content still described the old mailto-draft behavior. It now describes the actual server enquiry flow and email provider.
5. Form success could be shown for a successful HTTP response without `ok: true`; the client now requires the expected success flag.
6. robots.txt blocked `/_next/`, preventing crawlers from accessing rendering assets. Rendering assets are now allowed.
7. Open Graph metadata claimed rectangular dimensions for a square logo; false dimensions were removed, along with unverified social handles and the PNG mask-icon declaration.
8. The initial consent smoke-test assumed a fixed HTML attribute order. The verifier now checks attributes independently.

## Deployment and dependency findings

- Node.js 24 production build and API suite passed locally. Actual Vercel build, environment configuration, domain/DNS and hosted function behavior remain to be verified after linking an account.
- `npm audit --omit=dev`: 0 advisories.
- Full dependency audit after compatible fixes: 33 advisories, comprising 12 moderate and 21 high; 0 critical. These are in the Vercel CLI development dependency tree, not the application runtime dependency set. A scoped, same-major tar 7 patch removes the critical tar advisory. npm's suggested older CLI introduced additional findings, so the current pinned CLI was retained rather than forcing incompatible dependency changes.
- Real Resend delivery, sender-domain verification, inbox placement and confirmation handling were not tested with real mail. A mocked provider verifies application behavior only.
- The enquiry API has no durable application rate limiter or CAPTCHA. Configure platform abuse protection/rate limiting before public launch; origin validation and honeypot checks alone do not prevent direct automated requests.
- Pricing, journal articles and external identity URLs remain pending; complete legal/operator/retention details still need business review.

## Repeat checks

```sh
npm test
npm run typecheck
npm run build
npm start
npm run verify
npm audit --omit=dev
```

For another origin, set `TEST_BASE_URL` before running `npm run verify`. See README for Vercel setup and deployment scripts.
