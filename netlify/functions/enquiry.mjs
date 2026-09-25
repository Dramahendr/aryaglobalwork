// Enquiry form handler for Arya Global Workforce (Netlify Functions v2).
// Emails each website enquiry to the team via the Resend API.
// Environment:
//   RESEND_API_KEY (required) — API key from https://resend.com/api-keys
//   ENQUIRY_TO      (optional) — recipient (default dramahendra71@gmail.com)
//   ENQUIRY_FROM    (optional) — verified sender (default onboarding@resend.dev)

const RESEND_KEY = process.env.RESEND_API_KEY || process.env.Resend_API_KEY;
const TO = process.env.ENQUIRY_TO || 'dramahendra71@gmail.com';
// onboarding@resend.dev works without domain verification but can ONLY deliver
// to the Resend account owner's address. Verify a domain to send to anyone.
const FROM = process.env.ENQUIRY_FROM || 'Arya Global Workforce <onboarding@resend.dev>';

const MAX_BODY_CHARS = 8000;
const RESEND_TIMEOUT_MS = 9000; // stay inside Netlify's 10 s synchronous limit

const LIMITS = { full_name: 120, mobile: 40, email: 160, trade: 120, message: 2000 };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/\u0000/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Header-injection guard for the free-text fields that go near email headers.
function isSafeLine(s) {
  return !/[\r\n]/.test(s);
}

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  // Only this site's own pages may call the endpoint.
  const origin = req.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(req.url).host) return json({ error: 'Forbidden' }, 403);
    } catch {
      return json({ error: 'Forbidden' }, 403);
    }
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_CHARS) return json({ error: 'Request too large' }, 413);

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  // Honeypot: real people leave this hidden field empty.
  if (clean(body && body.company, 100)) return json({ ok: true });

  const full_name = clean(body && body.full_name, LIMITS.full_name);
  const mobile = clean(body && body.mobile, LIMITS.mobile);
  const email = clean(body && body.email, LIMITS.email);
  const trade = clean(body && body.trade, LIMITS.trade);
  const message = clean(body && body.message, LIMITS.message);

  if (!full_name || !mobile || !email) return json({ error: 'Missing required fields' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !isSafeLine(email)) {
    return json({ error: 'Invalid email' }, 400);
  }

  if (!RESEND_KEY) {
    console.error('Enquiry not configured: RESEND_API_KEY missing');
    return json({ error: 'Enquiry is not configured' }, 503);
  }

  const rows = [
    ['Name', full_name],
    ['Mobile', mobile],
    ['Email', email],
    ['Trade / profession', trade || '—'],
    ['Message', message || '—'],
  ];

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#141414;line-height:1.6">' +
    '<h2 style="margin:0 0 12px">New enquiry — Arya Global Workforce</h2>' +
    '<table style="border-collapse:collapse">' +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;vertical-align:top;color:#666;font-weight:bold">${escapeHtml(
            k
          )}</td><td style="padding:6px 0">${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`
      )
      .join('') +
    '</table>' +
    '<p style="margin-top:16px;color:#888;font-size:12px">Sent from the website enquiry form. Reply to this email to reach the applicant.</p>' +
    '</div>';

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: isSafeLine(full_name) ? `${full_name} <${email}>` : email,
        subject: `New enquiry: ${full_name}${trade ? ' — ' + trade : ''}`.slice(0, 200),
        html,
        text,
      }),
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error('Resend error', res.status, (await res.text()).slice(0, 500));
      return json({ error: 'Could not send. Please try WhatsApp.' }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('Resend request failed', err && err.name, err && err.message);
    return json({ error: 'Could not send. Please try WhatsApp.' }, 504);
  }
};

export const config = {
  path: '/api/enquiry',
  // Per visitor IP: at most 5 enquiries a minute (Netlify code-based rate limiting).
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
