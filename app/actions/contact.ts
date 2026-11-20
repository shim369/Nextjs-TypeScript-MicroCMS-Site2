'use server'

import nodemailer from 'nodemailer'

export type ContactInput = {
  name: string
  email: string
  message: string
  googleReCaptchaToken?: string
}

export type ContactResult = { ok: true } | { ok: false; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const verifyRecaptcha = async (secret: string, token: string) => {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token }),
  })
  const result: { success: boolean; score?: number; action?: string } = await res.json()
  const ok = result.success && result.action === 'submit' && (result.score ?? 0) >= 0.5
  if (!ok) console.warn(`reCAPTCHA verification failed: ${JSON.stringify(result)}`)
  return ok
}

/** Server Action: validates the inquiry and sends it by mail (nodemailer). */
export async function sendContact(input: ContactInput): Promise<ContactResult> {
  const name = input.name?.trim()
  const email = input.email?.trim()
  const message = input.message?.trim()

  if (!name || !email || !message) return { ok: false, error: 'Missing required fields' }
  if (!EMAIL_RE.test(email) || name.length > 200 || message.length > 5000) {
    return { ok: false, error: 'Invalid input' }
  }

  const { RECAPTCHA_SECRET_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env

  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    const missing = ['SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL'].filter((k) => !process.env[k])
    console.error(`Missing env: ${missing.join(', ')}`)
    return { ok: false, error: 'Mail is not configured' }
  }

  if (RECAPTCHA_SECRET_KEY) {
    const token = input.googleReCaptchaToken
    if (!token || !(await verifyRecaptcha(RECAPTCHA_SECRET_KEY, token))) {
      return { ok: false, error: 'reCAPTCHA verification failed' }
    }
  }

  const port = Number(SMTP_PORT || '465')
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `【NEXT BASE】お問い合わせ: ${name.replace(/[\r\n]/g, ' ')}`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`,
    })
  } catch (err) {
    console.error('Failed to send contact mail', err)
    return { ok: false, error: 'Failed to send mail' }
  }

  return { ok: true }
}
