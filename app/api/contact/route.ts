import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

type ContactBody = {
  name?: string
  email?: string
  message?: string
  googleReCaptchaToken?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const verifyRecaptcha = async (secret: string, token: string) => {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token }),
  })
  const result: {
    success: boolean
    score?: number
    action?: string
    'error-codes'?: string[]
  } = await res.json()
  const ok = result.success && result.action === 'submit' && (result.score ?? 0) >= 0.5
  if (!ok) console.warn(`reCAPTCHA verification failed: ${JSON.stringify(result)}`)
  return ok
}

export async function POST(req: Request) {
  let body: ContactBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email) || name.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { RECAPTCHA_SECRET_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env

  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    const missing = ['SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL'].filter((k) => !process.env[k])
    console.error(`Missing env: ${missing.join(', ')}`)
    return NextResponse.json({ error: 'Mail is not configured' }, { status: 500 })
  }

  if (RECAPTCHA_SECRET_KEY) {
    const token = body.googleReCaptchaToken
    if (!token || !(await verifyRecaptcha(RECAPTCHA_SECRET_KEY, token))) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 403 })
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
      subject: `【NEXT TECH】お問い合わせ: ${name.replace(/[\r\n]/g, ' ')}`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`,
    })
  } catch (err) {
    console.error('Failed to send contact mail', err)
    return NextResponse.json({ error: 'Failed to send mail' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
