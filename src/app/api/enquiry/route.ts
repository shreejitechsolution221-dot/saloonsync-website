import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ENQUIRY_CONSENT_TEXT } from '@/lib/enquiry-consent';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'help@saloonsync.vasudevai.in';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Saloonsync <noreply@saloonsync.vasudevai.in>';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saloonsync.vasudevai.in';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) {
    return NextResponse.json({ error: 'This enquiry must be sent from this website.' }, { status: 403 });
  }
  if (!req.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ error: 'A JSON enquiry is required.' }, { status: 415 });
  }
  if (Number(req.headers.get('content-length')) > 16_384) {
    return NextResponse.json({ error: 'Enquiry is too large.' }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (new TextEncoder().encode(raw).length > 16_384) return NextResponse.json({ error: 'Enquiry is too large.' }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // ── Honeypot spam trap ──────────────────────────────────────────────────
  if (body.website) {
    return NextResponse.json({ ok: true }); // Silent drop
  }

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const salon = sanitize(body.salon);
  const locations = sanitize(body.locations);
  const message = sanitize(body.message);
  const isDemo = body.demo === true;

  // ── Field validation ────────────────────────────────────────────────────
  if (body.consent !== true) return NextResponse.json({ error: 'Consent is required before sending an enquiry.' }, { status: 422 });
  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 422 });
  if (!email || !validateEmail(email)) return NextResponse.json({ error: 'A valid email is required.' }, { status: 422 });
  if (!salon) return NextResponse.json({ error: 'Salon name is required.' }, { status: 422 });
  if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 422 });
  if (name.length > 100 || email.length > 200 || salon.length > 150 || locations.length > 50 || message.length > 1500) return NextResponse.json({ error: 'One or more fields exceed the allowed length.' }, { status: 422 });
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Mail service is not configured. Please email us directly.' }, { status: 503 });
  }

  const subjectTag = isDemo ? 'Demo Enquiry' : 'Contact Enquiry';
  const consentAt = new Date().toISOString();
  const adminSubject = `[Saloonsync] New ${subjectTag} from ${name} — ${salon}`;

  // ── Admin notification HTML ─────────────────────────────────────────────
  const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(adminSubject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ed;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ed;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1714;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #2e2a26;">
            <img src="${SITE_URL}/saloonsync-logo.png" alt="Saloonsync" width="40" height="40" style="display:inline-block;vertical-align:middle;border-radius:8px;filter:invert(1);" />
            <span style="vertical-align:middle;margin-left:12px;font-size:18px;font-weight:700;color:#f9f6f2;letter-spacing:-0.3px;">Saloonsync</span>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 40px 0;">
            <span style="display:inline-block;background:${isDemo ? '#7c3aed' : '#15803d'};color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:5px 12px;border-radius:100px;text-transform:uppercase;">${subjectTag}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px 28px;">
            <h1 style="margin:0;font-size:26px;font-weight:700;color:#f9f6f2;line-height:1.3;">
              New ${isDemo ? 'demo request' : 'message'}<br/>from ${escapeHtml(name)}
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#252018;border-radius:12px;overflow:hidden;">
              <tr><td style="padding:20px 24px 0;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#8a7f74;letter-spacing:1.2px;text-transform:uppercase;">Contact Details</p>
                <p style="margin:8px 0;font-size:12px;color:#c5b9ad;">Enquiry consent: checked at ${consentAt}<br/>${ENQUIRY_CONSENT_TEXT}</p>
              </td></tr>
              <tr><td style="padding:12px 24px;border-bottom:1px solid #2e2a26;">
                <p style="margin:0;font-size:12px;color:#8a7f74;letter-spacing:0.8px;text-transform:uppercase;">Name</p>
                <p style="margin:4px 0 0;font-size:15px;color:#f9f6f2;font-weight:500;">${escapeHtml(name)}</p>
              </td></tr>
              <tr><td style="padding:12px 24px;border-bottom:1px solid #2e2a26;">
                <p style="margin:0;font-size:12px;color:#8a7f74;letter-spacing:0.8px;text-transform:uppercase;">Email</p>
                <p style="margin:4px 0 0;font-size:15px;color:#f9f6f2;font-weight:500;">${escapeHtml(email)}</p>
              </td></tr>
              <tr><td style="padding:12px 24px;border-bottom:1px solid #2e2a26;">
                <p style="margin:0;font-size:12px;color:#8a7f74;letter-spacing:0.8px;text-transform:uppercase;">Salon</p>
                <p style="margin:4px 0 0;font-size:15px;color:#f9f6f2;font-weight:500;">${escapeHtml(salon)}</p>
              </td></tr>
              <tr><td style="padding:12px 24px;border-bottom:1px solid #2e2a26;">
                <p style="margin:0;font-size:12px;color:#8a7f74;letter-spacing:0.8px;text-transform:uppercase;">Locations</p>
                <p style="margin:4px 0 0;font-size:15px;color:#f9f6f2;font-weight:500;">${escapeHtml(locations || '—')}</p>
              </td></tr>
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#8a7f74;letter-spacing:1.2px;text-transform:uppercase;">Message</p>
                <p style="margin:0;font-size:15px;color:#f9f6f2;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;">
            <a href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: ' + adminSubject)}" style="display:inline-block;background:#f9f6f2;color:#1a1714;font-size:14px;font-weight:700;padding:13px 28px;border-radius:100px;text-decoration:none;">Reply to ${escapeHtml(name)} →</a>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #2e2a26;">
            <p style="margin:0;font-size:12px;color:#5a5248;">Automated notification · Saloonsync website · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ── Sender auto-reply HTML ──────────────────────────────────────────────
  const firstName = name.split(' ')[0];
  const senderSubject = isDemo
    ? `We received your demo request, ${firstName} — Saloonsync`
    : `Thanks for reaching out, ${firstName} — Saloonsync`;

  const senderHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light only" />
  <title>${escapeHtml(senderSubject)}</title>
</head>
<body style="margin:0;padding:0;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f4;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;max-width:560px;width:100%;">

        <!-- Heading -->
        <tr>
          <td style="padding:48px 48px 8px;">
            <h1 style="margin:0;font-size:26px;font-weight:600;color:#111111;line-height:1.3;letter-spacing:-0.3px;">
              ${isDemo ? "We've got your demo request." : 'Thanks for getting in touch.'}
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:20px 48px 8px;">
            <p style="margin:0 0 16px;font-size:16px;color:#111111;line-height:1.7;">Hi ${escapeHtml(firstName)},</p>
            ${isDemo
      ? `<p style="margin:0 0 16px;font-size:16px;color:#444444;line-height:1.7;">We've received your demo request for <strong style="color:#111111;font-weight:600;">${escapeHtml(salon)}</strong>. Our team will review what you've shared and reach out shortly to arrange a time that works for you.</p>
                 <p style="margin:0;font-size:16px;color:#444444;line-height:1.7;">The best demos start with a real salon workflow, so the more context you included, the better the conversation will be.</p>`
      : `<p style="margin:0 0 16px;font-size:16px;color:#444444;line-height:1.7;">We've received your message and will get back to you as soon as we can.</p>
                 <p style="margin:0;font-size:16px;color:#444444;line-height:1.7;">In the meantime, the help center is a good place to start if you have a quick question.</p>`
    }
          </td>
        </tr>

        <!-- Summary -->
        <tr>
          <td style="padding:32px 48px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ebebe8;">
              <tr>
                <td width="110" valign="top" style="padding:16px 0;border-bottom:1px solid #ebebe8;font-size:14px;color:#8a8a85;">Salon</td>
                <td valign="top" style="padding:16px 0;border-bottom:1px solid #ebebe8;font-size:14px;color:#111111;font-weight:500;">${escapeHtml(salon)}</td>
              </tr>
              <tr>
                <td width="110" valign="top" style="padding:16px 0;border-bottom:1px solid #ebebe8;font-size:14px;color:#8a8a85;">Locations</td>
                <td valign="top" style="padding:16px 0;border-bottom:1px solid #ebebe8;font-size:14px;color:#111111;font-weight:500;">${escapeHtml(locations || '—')}</td>
              </tr>
              <tr>
                <td width="110" valign="top" style="padding:16px 0;border-bottom:1px solid #ebebe8;font-size:14px;color:#8a8a85;">Message</td>
                <td valign="top" style="padding:16px 0;border-bottom:1px solid #ebebe8;font-size:14px;color:#444444;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Actions -->
        <tr>
          <td style="padding:28px 48px 48px;">
            <a href="${SITE_URL}/help" style="display:inline-block;background:#111111;color:#ffffff;font-size:14px;font-weight:600;padding:13px 24px;border-radius:8px;text-decoration:none;">Visit the help center</a>
            <a href="${SITE_URL}/features" style="display:inline-block;color:#111111;font-size:14px;font-weight:600;padding:13px 16px;text-decoration:underline;">See features</a>
          </td>
        </tr>

      </table>

      <!-- Footer -->
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td style="padding:24px 48px;text-align:center;font-size:12px;color:#8a8a85;line-height:1.7;">
            You received this because you submitted an enquiry on the Saloonsync website.<br />
            Questions? Reply to this email or write to <a href="mailto:${ADMIN_EMAIL}" style="color:#555555;">${ADMIN_EMAIL}</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ── Plain-text fallbacks ────────────────────────────────────────────────
  const adminText = [
    `New ${subjectTag}`,
    ``,
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Salon:     ${salon}`,
    `Locations: ${locations || '—'}`,
    `Enquiry consent: checked at ${consentAt}`,
    ENQUIRY_CONSENT_TEXT,
    ``,
    message,
  ].join('\n');

  const senderText = isDemo
    ? [
      `Hi ${firstName},`,
      ``,
      `We've received your demo request for ${salon}.`,
      `Our team will review what you shared and reach out shortly to arrange a time.`,
      ``,
      `In the meantime, explore the workspace: ${SITE_URL}/features`,
      ``,
      `— The Saloonsync Team`,
      ADMIN_EMAIL,
    ].join('\n')
    : [
      `Hi ${firstName},`,
      ``,
      `Thanks for reaching out. We've received your message and will get back to you shortly.`,
      ``,
      `Visit the help center if you have a quick question: ${SITE_URL}/help`,
      ``,
      `— The Saloonsync Team`,
      ADMIN_EMAIL,
    ].join('\n');

  // ── Send both emails ────────────────────────────────────────────────────
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const [adminResult, senderResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        replyTo: email,
        subject: adminSubject,
        html: adminHtml,
        text: adminText,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        replyTo: ADMIN_EMAIL,
        subject: senderSubject,
        html: senderHtml,
        text: senderText,
      }),
    ]);

    console.info('[enquiry] Admin email id:', adminResult.data?.id);
    console.info('[enquiry] Sender email id:', senderResult.data?.id);

    if (adminResult.error || senderResult.error) {
      console.error('[enquiry] Resend error:', adminResult.error ?? senderResult.error);
      return NextResponse.json(
        { error: 'Failed to send one or more emails. Please email us directly at ' + ADMIN_EMAIL },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, message: 'Emails sent successfully.' });
  } catch (err) {
    console.error('[enquiry] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again or email us directly.' },
      { status: 500 },
    );
  }
}
