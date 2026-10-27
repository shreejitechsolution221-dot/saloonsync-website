const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const compiled = ts.transpileModule(fs.readFileSync('src/app/api/enquiry/route.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const valid = { name: 'Jamie', email: 'jamie@example.com', salon: 'The Studio', locations: '1', message: 'Please show the appointment workflow.', consent: true };

function handler({ key = 'test-key', failure = false, throws = false } = {}) {
  const sent = [];
  const exports = {};
  class MockResend {
    emails = { send: async (email) => {
      sent.push(email);
      if (throws) throw new Error('Mock provider unavailable');
      return failure ? { error: { message: 'Mock rejection' } } : { data: { id: `mock-${sent.length}` } };
    } };
  }
  const requireMock = name => {
    if (name === 'resend') return { Resend: MockResend };
    if (name === '@/lib/enquiry-consent') return { ENQUIRY_CONSENT_TEXT: 'Enquiry consent test text' };
    return require(name);
  };
  vm.runInNewContext(compiled, { exports, require: requireMock, process: { env: { RESEND_API_KEY: key } }, TextEncoder, URL, console: { info() {}, error() {} } });
  return { post: exports.POST, sent };
}
function request(body, headers = {}) {
  return new Request('http://localhost:3000/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
}
for (const [label, payload, status] of [
  ['null body', null, 400], ['array body', [], 400],
  ['missing consent', { ...valid, consent: undefined }, 422],
  ['unchecked consent', { ...valid, consent: false }, 422],
  ['string consent', { ...valid, consent: 'true' }, 422],
  ['blank name', { ...valid, name: ' ' }, 422],
  ['object name', { ...valid, name: {} }, 422],
  ['invalid email', { ...valid, email: 'not-an-email' }, 422],
  ['missing salon', { ...valid, salon: '' }, 422],
  ['blank message', { ...valid, message: ' ' }, 422],
  ['oversized field', { ...valid, message: 'x'.repeat(1501) }, 422],
  ['oversized body', { ...valid, message: 'x'.repeat(17000) }, 413],
]) test(`rejects ${label} without sending mail`, async () => {
  const { post, sent } = handler();
  assert.equal((await post(request(payload))).status, status);
  assert.equal(sent.length, 0);
});
test('rejects malformed JSON', async () => {
  const { post, sent } = handler();
  assert.equal((await post(new Request('http://localhost:3000/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' }))).status, 400);
  assert.equal(sent.length, 0);
});
test('rejects a foreign origin and non-JSON content', async () => {
  const { post, sent } = handler();
  assert.equal((await post(request(valid, { origin: 'https://other.example' }))).status, 403);
  assert.equal((await post(request(valid, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal(sent.length, 0);
});
test('honeypot silently drops spam', async () => {
  const { post, sent } = handler();
  assert.equal((await post(request({ ...valid, website: 'spam' }))).status, 200);
  assert.equal(sent.length, 0);
});
test('missing email configuration returns 503 without crashing the route', async () => {
  const { post, sent } = handler({ key: '' });
  assert.equal((await post(request(valid))).status, 503);
  assert.equal(sent.length, 0);
});
for (const demo of [false, true]) test(`valid ${demo ? 'demo' : 'contact'} request uses mocked email delivery`, async () => {
  const { post, sent } = handler();
  assert.equal((await post(request({ ...valid, demo }, { origin: 'http://localhost:3000' }))).status, 200);
  assert.equal(sent.length, 2);
  assert.deepEqual(Array.from(sent[1].to), [valid.email]);
  assert.ok(sent[0].text.includes('Enquiry consent: checked at'));
  assert.ok(sent[0].subject.includes(demo ? 'Demo Enquiry' : 'Contact Enquiry'));
});
test('escapes user input in both email templates', async () => {
  const { post, sent } = handler();
  const response = await post(request({ ...valid, name: '<b>Jamie</b>', salon: '<img src=x>', message: '<script>bad</script>&' }));
  assert.equal(response.status, 200);
  for (const email of sent) {
    assert.ok(!email.html.includes('<b>Jamie</b>'));
    assert.ok(!email.html.includes('<img src=x>'));
    assert.ok(!email.html.includes('<script>bad</script>'));
    assert.ok(email.html.includes('&lt;'));
  }
});
test('provider rejection and exceptions do not produce success', async () => {
  const rejected = handler({ failure: true });
  assert.equal((await rejected.post(request(valid))).status, 502);
  const broken = handler({ throws: true });
  assert.equal((await broken.post(request(valid))).status, 500);
});
