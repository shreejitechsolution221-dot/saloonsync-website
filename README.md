# Saloonsync marketing

Next.js App Router, TypeScript, Tailwind CSS and Resend. The public website includes 20 marketing pages. Salon OS, customer booking and shared identity are separate applications; identity links remain configurable.

## Local development

Use Node.js 24 (`.nvmrc` and `package.json`), then:

```sh
npm ci
npm run dev
```

Development output lives in `.next`. Local production output lives in `.next-production` so production builds cannot replace the live development CSS. Stop a production server before rebuilding its output.

## Checks

```sh
npm test
npm run typecheck
npm run build
npm start
npm run verify
```

`npm test` runs 20 API regression tests with a mocked email provider: it never sends real mail. `npm run verify` checks the running server's 20 pages, internal destinations, CSS/JS assets, required consent, metadata, draft noindex tags, resources and 404 behavior. Set `TEST_BASE_URL` to audit another local origin. Build first to generate the route manifest.

See [the QA report](reports/website-audit.md) for browser checks, fixed defects and the limits of verification.

## Vercel hosting

The official Vercel CLI is a pinned development dependency. `vercel.json` selects Next.js and the existing build script. Vercel builds use its standard `.next` output; do not configure a static export or an `out` output directory because the enquiry API requires a server runtime.

1. Sign in using `npx vercel login`, or import the repository through the Vercel dashboard.
2. Select this project directory, Next.js, and Node.js 24. Leave Output Directory at its framework default.
3. Set the environment variables below for the intended Preview and Production environments.
4. Run `npm run deploy:preview` for a preview. When ready, run `npm run deploy:production` to publish to production.
5. Test the hosted origin, enquiry delivery and final domain separately. No hosted deployment was made during this local audit.

Official references: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [Vercel CLI](https://vercel.com/docs/cli), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

### Environment variables

Copy `.env.example` to `.env.local` locally; set values in Vercel's environment settings for hosting. Never commit `.env.local` or expose email credentials with `NEXT_PUBLIC_` names.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Final HTTPS marketing origin, without a trailing slash; used for canonical URLs, sitemap and email links. |
| `NEXT_PUBLIC_LOGIN_URL` | Optional shared identity login URL. |
| `NEXT_PUBLIC_REGISTER_URL` | Optional shared identity registration URL. |
| `RESEND_API_KEY` | Server-only Resend API key. |
| `RESEND_FROM_EMAIL` | Sender using a domain verified with Resend. |
| `ADMIN_EMAIL` | Team inbox that receives enquiries. |

Without identity URLs, links lead to the identity notice on the home page. Without email configuration, valid enquiries receive a meaningful unavailable response; they are never reported as delivered.

## Forms and privacy

Contact and demo forms require unchecked, explicit enquiry consent. The API validates consent, field types, required fields, email, lengths, request size, JSON format and request origin; it drops honeypot submissions. The server sends team and confirmation emails through Resend and includes the consent timestamp in the team notification. User content is escaped in HTML templates. No application database is used for enquiries. Email and hosting providers may retain information.

No marketing subscription is created by enquiry consent. A demo request does not reserve an appointment. Provider acceptance does not guarantee inbox delivery. Public abuse protection/rate limiting should be configured for `/api/enquiry` before broad launch.

## Content and navigation

`src/lib/content.ts` owns feature and solution data. `src/app/[...slug]/page.tsx` statically generates the interior routes and page metadata. `src/lib/page-guides.ts` supplies page-specific explanations and FAQs. `Breadcrumbs` aligns Home / section / page trails. `RouteNavigation` resets new pages to the top while preserving section anchors.

`MotionScene` uses lightweight CSS perspective and pointer tilt, a pause control and reduced-motion preferences. Visuals are labeled as concepts. The user-provided logo is rendered with optimized Next.js images.

Prices, journal articles, identity destinations and complete legal/commercial details still require confirmed business content. Draft legal pages and the empty journal remain noindex. Do not treat this implementation as finalized service terms or a complete production privacy policy.

## Dependency audit

Production dependencies currently have no reported npm advisories. The pinned Vercel CLI has transitive development-tool advisories; a compatible tar 7 override removes the critical tar finding. Remaining findings are documented in the QA report. Do not run a forced major-version audit fix without reviewing compatibility.
