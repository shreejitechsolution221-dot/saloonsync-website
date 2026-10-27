# Saloonsync marketing

Next.js App Router, TypeScript and Tailwind CSS. Shared components and content-driven static marketing routes; identity pages remain external links only.

## Run

- `npm install`
- `npm run dev`
- `npm run typecheck`
- `npm run build`
- `npm start`

Webpack is selected because Turbopack's CSS worker failed on this Windows environment.

Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS marketing origin to enable canonical URLs and the sitemap. Set `NEXT_PUBLIC_LOGIN_URL` and `NEXT_PUBLIC_REGISTER_URL` to the real shared identity destinations. Until configured, account links lead to the identity notice on the home page.

## Routes and content

`src/lib/content.ts` owns feature and solution content and the public route list. `src/app/[...slug]/page.tsx` statically generates the distinct marketing pages and per-page metadata. The home page remains at `src/app/page.tsx`.

All requested marketing routes are implemented. The journal intentionally has no invented articles. Pricing awaits confirmed plans. Legal routes describe current website behavior and clearly identify missing production policy and service terms details; finalize those with the business before launch. Draft legal content and the empty journal are excluded from indexing and the sitemap.

## Enquiries

Contact and demo forms validate input and prepare a mailto draft addressed to help@saloonsync.vasudevai.in. Visitors must send it through their own email app. No email is sent by this application, no appointment is automatically reserved, and form details are not sent to a server or stored by this website. Email delivery depends on the visitor's mail client. Server-side delivery or a scheduling service can be integrated later.

## Motion

`MotionScene` uses CSS perspective, transform layers and requestAnimationFrame pointer tilt without a 3D dependency. Motion has a pause control, ignores touch tilt and respects system reduced-motion preferences. Product visuals are explicitly illustrative, not working Salon OS controls.

No testimonials, usage statistics, prices, payment integrations or unpublished product capabilities are invented. No analytics, third-party embeds or application-set cookies are included, so this implementation does not add a cookie-consent banner.

## Shared navigation and page depth

`Breadcrumbs` renders a consistent Home / section / page trail above every interior page. `RouteNavigation` resets new routes after commit, including reused catch-all page transitions. It preserves fragment destinations such as `/#identity` and same-page section links. Plain same-page links also return to the top.

`src/lib/page-guides.ts` contains editorial content for all 20 pages: workflow context, practical preparation checklists and page-specific questions. `PageGuide` renders these sections before the final page CTA. The provided logo is used in the shared wordmark, product preview and 3D brand scene through optimized Next.js images.

## Preview and production output

Use `npm run dev` while editing, and `npm run build` then `npm start` for a production preview. Development output uses `.next`; production output uses `.next-production` so building cannot overwrite the running development stylesheet assets. Stop a production preview before rebuilding that production output. `node scripts/verify-site.mjs` checks the active server, including its referenced CSS assets, after a production build.
