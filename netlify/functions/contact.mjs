/**
 * Contact form handler — Netlify Functions (ESM).
 *
 * Sends the message through Resend (https://resend.com) using its HTTP API.
 * No npm dependency is required; the platform's fetch is used directly.
 *
 * Required environment variables (set them in Netlify → Site settings → Environment):
 *   RESEND_API_KEY     — Resend API key (starts with "re_")
 *   CONTACT_TO_EMAIL   — inbox that receives enquiries
 *   CONTACT_FROM_EMAIL — verified sender, e.g. "GS TECH <hello@gstech.dev>"
 *
 * The function only reports success after Resend accepts the message. If the
 * service is not configured it returns 503, so the form can fall back to email
 * instead of pretending a message was delivered.
 */

const MAX = {
  name: 100,
  email: 200,
  message: 3000,
  body: 12_000,
}

const MIN_ELAPSED_MS = 2_500
const MAX_ELAPSED_MS = 60 * 60 * 1000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
    body: JSON.stringify(body),
  }
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function stripNewlines(value) {
  return value.replace(/[\r\n]+/g, ' ')
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' })
  }

  const rawLength = Number(event.headers?.['content-length'] || 0)
  if (rawLength > MAX.body) {
    return json(413, { error: 'That message is too large to send.' })
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid request body.' })
  }

  const name = clean(payload.name)
  const email = clean(payload.email)
  const message = clean(payload.message)
  const company = clean(payload.company)
  const startedAt = Number(payload.startedAt)

  // Honeypot: bots fill hidden fields. Return the same generic success shape
  // without sending anything, so the bot cannot learn it was rejected.
  if (company) {
    return json(200, { ok: true })
  }

  // Timing trap: submissions faster than a human could type are discarded.
  const elapsed = Date.now() - startedAt
  if (!Number.isFinite(startedAt) || elapsed < MIN_ELAPSED_MS || elapsed > MAX_ELAPSED_MS) {
    return json(400, { error: 'The form session expired. Please reload the page and try again.' })
  }

  if (name.length < 2 || name.length > MAX.name) {
    return json(400, { error: 'Please enter a name between 2 and 100 characters.' })
  }
  if (email.length > MAX.email || !EMAIL_RE.test(email)) {
    return json(400, { error: 'Please enter a valid email address.' })
  }
  if (message.length < 20 || message.length > MAX.message) {
    return json(400, { error: 'Please write a message between 20 and 3000 characters.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    return json(503, {
      error:
        'Email delivery is not configured on this deployment yet. Please use the direct email link instead.',
    })
  }

  const safeName = stripNewlines(name)
  const subject = `Portfolio enquiry — ${safeName}`

  const text = [
    message,
    '',
    '—',
    `Name:  ${name}`,
    `Email: ${email}`,
  ].join('\n')

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6; color: #151412;">
      <p style="white-space: pre-wrap; margin: 0 0 24px;">${escapeHtml(message)}</p>
      <hr style="border: none; border-top: 1px solid #ded3bf; margin: 24px 0;" />
      <p style="margin: 0; font-size: 14px; color: #6f675b;">
        <strong style="color: #151412;">${escapeHtml(name)}</strong><br />
        <a href="mailto:${escapeHtml(email)}" style="color: #a62e0f;">${escapeHtml(email)}</a>
      </p>
      <p style="margin: 24px 0 0; font-size: 12px; color: #857c6f;">
        Sent from the GS TECH portfolio contact form.
      </p>
    </div>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error('Resend rejected the message:', response.status, detail)
      return json(502, {
        error: 'The email service rejected the message. Please try again or email me directly.',
      })
    }

    return json(200, { ok: true })
  } catch (error) {
    console.error('Contact function failed:', error)
    return json(500, {
      error: 'The message could not be delivered right now. Please email me directly instead.',
    })
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
