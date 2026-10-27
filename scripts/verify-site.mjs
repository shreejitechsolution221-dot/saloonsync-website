import { readFile } from 'node:fs/promises';
const origin = process.env.TEST_BASE_URL || 'http://localhost:3000';
const manifest = JSON.parse(await readFile('.next-production/prerender-manifest.json', 'utf8'));
const paths = Object.keys(manifest.routes).filter(path => !path.startsWith('/_') && !path.includes('.'));
const failures = [];
const linkedPaths = new Set();
const assets = new Set();
const titles = new Set();
const pages = new Map();
for (const path of paths) {
 const response = await fetch(new URL(path, origin));
 const html = await response.text();
 pages.set(path,html);
 if (response.status !== 200) failures.push(`${path}: HTTP ${response.status}`);
 if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) failures.push(`${path}: expected one h1`);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];
 if (!title || !html.includes('name="description"')) failures.push(`${path}: missing metadata`);
 if (titles.has(title)) failures.push(`${path}: duplicate page title`);
 titles.add(title);
 if (!html.includes('property="og:title"')) failures.push(`${path}: missing Open Graph title`);
 for (const match of html.matchAll(/(?:href|src)="(\/_next\/static\/[^"?]+\.(css|js)(?:\?[^\"]*)?)"/g)) assets.add(match[1].replaceAll('&amp;', '&'));
 if (/GlowDesk|glowdesk/.test(html)) failures.push(`${path}: old branding`);
 for (const match of html.matchAll(/href="(\/[^"?#]*)(?:#([^\"]*))?/g)) {
  const target = match[1];
  if (!target.startsWith('/_next/') && !target.includes('.')) linkedPaths.add(target);
 }
 if (path === '/contact' || path === '/book-a-demo') {
  const consent = [...html.matchAll(/<input\b[^>]*>/g)].map(match => match[0]).find(tag => /type="checkbox"/.test(tag) && /name="consent"/.test(tag));
  if (!consent || !/\brequired(?:=|\s|\/?>)/.test(consent)) failures.push(`${path}: missing required consent`);
 }
 if (['/privacy','/terms','/blog'].includes(path) && !/name="robots" content="[^"]*noindex/.test(html)) failures.push(`${path}: draft content must remain noindex`);
}
for (const path of linkedPaths) {
 const response = await fetch(new URL(path, origin));
 if (response.status !== 200) failures.push(`Link ${path}: HTTP ${response.status}`);
}
for (const path of assets) {
 const response = await fetch(new URL(path, origin));
 const type=response.headers.get('content-type') || '';
 if(response.status!==200 || !(path.includes('.css')?type.includes('text/css'):type.includes('javascript'))) failures.push(`Asset ${path}: ${response.status} ${type}`);
}
for(const path of ['/robots.txt','/sitemap.xml','/saloonsync-logo.png']){
 const response=await fetch(new URL(path,origin));
 if(response.status!==200) failures.push(`${path}: HTTP ${response.status}`);
}
const robots=await (await fetch(new URL('/robots.txt',origin))).text();
if(robots.includes('Disallow: /_next/'))failures.push('robots.txt blocks rendering assets');
const missing = await fetch(new URL('/not-a-real-page',origin));
if (missing.status !== 404) failures.push('Unknown routes must return 404');
console.log(JSON.stringify({pages:paths.length,internalLinkDestinations:linkedPaths.size,staticAssets:assets.size,failures},null,2));
if(failures.length) process.exitCode=1;
