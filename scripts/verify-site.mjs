import { readFile } from 'node:fs/promises';
const manifest = JSON.parse(await readFile('.next-production/prerender-manifest.json', 'utf8'));
const paths = Object.keys(manifest.routes).filter(path => !path.startsWith('/_') && !path.includes('.'));
const failures = [];
const linkedPaths = new Set();
for (const path of paths) {
 const response = await fetch(`http://localhost:3000${path}`);
 const html = await response.text();
 if (response.status !== 200) failures.push(`${path}: HTTP ${response.status}`);
 if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) failures.push(`${path}: expected one h1`);
 if (!html.includes('<title>') || !html.includes('name="description"')) failures.push(`${path}: missing metadata`);
 for (const match of html.matchAll(/<link\b[^>]*href="([^"]+\.css(?:\?[^"]*)?)"[^>]*>/g)) {
  const asset = await fetch(new URL(match[1].replaceAll('&amp;', '&'), 'http://localhost:3000'));
  if (asset.status !== 200 || !asset.headers.get('content-type')?.includes('text/css')) failures.push(`${path}: stylesheet ${match[1]} failed (${asset.status})`);
 }
 if (/GlowDesk|glowdesk/.test(html)) failures.push(`${path}: old branding`);
 for (const match of html.matchAll(/href="(\/[^"?#]*)/g)) {
  const target = match[1];
  if (!target.startsWith('/_next/') && !target.includes('.')) linkedPaths.add(target);
 }
}
for (const path of linkedPaths) {
 const response = await fetch(`http://localhost:3000${path}`);
 if (response.status !== 200) failures.push(`Link ${path}: HTTP ${response.status}`);
}
const missing = await fetch('http://localhost:3000/not-a-real-page');
if (missing.status !== 404) failures.push('Unknown routes must return 404');
console.log(JSON.stringify({pages:paths.length,internalLinkDestinations:linkedPaths.size,failures},null,2));
if(failures.length) process.exitCode=1;
