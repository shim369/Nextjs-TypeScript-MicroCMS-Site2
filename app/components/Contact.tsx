"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { FocusEvent, FormEvent } from 'react'
import styles from '../styles/page.module.scss'

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
  const [isSending, setIsSending] = useState(false)

  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name as FieldName
    setErrors((prev) => ({ ...prev, [key]: rules[key](event.target.value) }))
  }

  const onSubmit = async (event: FormEvent) => {
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

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    setIsSending(true)
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_NEWT_FORM_ENDPOINT + '',
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        },
      )

      if (response.ok) {
        router.push('/thanks')
      } else {
        router.push('/error')
      }
    } catch (err) {
      router.push('/error')
    } finally {
      setIsSending(false)
    }
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
