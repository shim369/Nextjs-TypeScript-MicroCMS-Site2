"use client";
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { FocusEvent, FormEvent } from 'react'
import styles from '../styles/page.module.scss'
import { sendContact } from '../actions/contact'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (key: string, opts: { action: string }) => Promise<string>
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

/** Loads reCAPTCHA v3 on submit and returns a token (undefined when not configured) */
const getRecaptchaToken = (): Promise<string | undefined> => {
  if (!SITE_KEY) return Promise.resolve(undefined)
  return new Promise((resolve) => {
    const run = () =>
      window.grecaptcha!.ready(() =>
        window
          .grecaptcha!.execute(SITE_KEY, { action: 'submit' })
          .then(resolve)
          .catch(() => resolve(undefined)),
      )
    if (window.grecaptcha) return run()
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.onload = run
    script.onerror = () => resolve(undefined)
    document.head.appendChild(script)
  })
}

type FieldName = 'name' | 'email' | 'message'
type Errors = Partial<Record<FieldName, string>>

const rules: Record<FieldName, (value: string) => string> = {
  name: (v) => (v.trim() ? '' : 'REQUIRED'),
  email: (v) => (!v.trim() ? 'REQUIRED' : validateEmail(v) ? '' : 'INVALID EMAIL'),
  message: (v) => (v.trim().length >= 10 ? '' : 'MIN 10 CHARS'),
}

/** Dark contact block: intro + external links on the left, form on the right. */
export const Contact = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Errors>({})
  // Stays pending through the Server Action and the following navigation
  const [isSending, startTransition] = useTransition()

  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name as FieldName
    setErrors((prev) => ({ ...prev, [key]: rules[key](event.target.value) }))
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      name: { value: string }
      email: { value: string }
      message: { value: string }
    }
    const data = {
      name: target.name.value,
      email: target.email.value,
      message: target.message.value,
    }

    const nextErrors: Errors = {
      name: rules.name(data.name),
      email: rules.email(data.email),
      message: rules.message(data.message),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    startTransition(async () => {
      try {
        const googleReCaptchaToken = await getRecaptchaToken()
        const result = await sendContact({ ...data, googleReCaptchaToken })
        router.push(result.ok ? '/thanks' : '/error')
      } catch {
        router.push('/error')
      }
    })
  }

  const fieldClass = (key: FieldName) =>
    `${styles.field} ${errors[key] ? styles.fieldError : ''}`

  return (
    <div className={styles.contactGrid}>
      <div data-reveal>
        <span className={`${styles.mono} ${styles.dim}`}>( Contact )</span>
        <h2>Would you like to try the <span className={styles.hot}>latest</span> technology?</h2>
        <p className={styles.lead}>Tell me about your idea or challenge. I&apos;ll reply as soon as possible.</p>
        <div className={styles.extLinks}>
          <a href="https://github.com/shim369" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href="https://sohtani.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">Tech Blog <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <div data-reveal="1">
        <form onSubmit={onSubmit} className={styles.form} noValidate>
          <div className={fieldClass('name')}>
            <input id="name" name="name" type="text" placeholder=" " autoComplete="name" required onBlur={onBlur}
              aria-invalid={!!errors.name} aria-describedby="name-error" />
            <label htmlFor="name">01 / NAME <b>*</b></label>
            <span id="name-error" className={styles.err}>{errors.name}</span>
          </div>
          <div className={fieldClass('email')}>
            <input id="email" name="email" type="email" placeholder=" " autoComplete="email" required onBlur={onBlur}
              aria-invalid={!!errors.email} aria-describedby="email-error" />
            <label htmlFor="email">02 / EMAIL <b>*</b></label>
            <span id="email-error" className={styles.err}>{errors.email}</span>
          </div>
          <div className={fieldClass('message')}>
            <textarea id="message" name="message" placeholder=" " required onBlur={onBlur}
              aria-invalid={!!errors.message} aria-describedby="message-error" />
            <label htmlFor="message">03 / MESSAGE <b>*</b></label>
            <span id="message-error" className={styles.err}>{errors.message}</span>
          </div>
          <button type="submit" className={styles.submit} disabled={isSending}>
            {isSending ? 'Sending…' : 'Submit'} <span aria-hidden="true">→</span>
          </button>
          {SITE_KEY && (
            <p className={styles.recaptchaNote}>
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (regex.test(email)) {
    return true;
  }
  return false;
};
