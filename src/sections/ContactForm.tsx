import { useRef, useState, type FormEvent } from 'react'
import { AlertCircle, ArrowUpRight, Check, Loader2, Mail } from 'lucide-react'
import { site } from '../data/site'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'draft'

interface Values {
  name: string
  email: string
  message: string
  company: string
}

const initialValues: Values = { name: '', email: '', message: '', company: '' }

function validate(values: Values): Partial<Record<keyof Values, string>> {
  const errors: Partial<Record<keyof Values, string>> = {}
  if (values.name.trim().length < 2) errors.name = 'Please share your name (2+ characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (values.message.trim().length < 20) {
    errors.message = 'A little more detail helps — at least 20 characters.'
  }
  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')
  const startedAt = useRef(Date.now())

  const endpoint = site.contactEndpoint
  const hasEndpoint = Boolean(endpoint)

  const update = (field: keyof Values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
    if (status === 'error' || status === 'success' || status === 'draft') {
      setStatus('idle')
      setFeedback('')
    }
  }

  const buildMailto = () => {
    const subject = encodeURIComponent(`Portfolio enquiry — ${values.name.trim()}`)
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`,
    )
    return `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (values.company) return // honeypot

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setFeedback('Please check the highlighted fields before sending.')
      return
    }

    if (!hasEndpoint) {
      setStatus('draft')
      setFeedback(
        'Your email app should open with this message ready to send. Nothing has been submitted yet.',
      )
      window.location.href = buildMailto()
      return
    }

    setStatus('sending')
    setFeedback('')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          company: values.company,
          startedAt: startedAt.current,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }

      // A 200 alone is not proof of delivery: a misconfigured host can return
      // an HTML fallback. Only an explicit ok:true counts as success.
      if (!response.ok || data.ok !== true) {
        throw new Error(data.error || 'The message could not be delivered.')
      }

      setStatus('success')
      setFeedback('Message delivered. I’ll reply to the email address you shared.')
      setValues(initialValues)
      startedAt.current = Date.now()
    } catch (error) {
      setStatus('error')
      setFeedback(
        error instanceof Error
          ? `${error.message} You can also email me directly — the address is on the left.`
          : 'The message could not be delivered. Please email me directly instead.',
      )
    }
  }

  const sending = status === 'sending'

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__head">
        <span className="caption">Start a conversation</span>
        <span className="caption">All fields required</span>
      </div>

      <div className="field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update('name', event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          maxLength={100}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="field__error" id="contact-name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          maxLength={200}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="field__error" id="contact-email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <div className="field__label-row">
          <label htmlFor="contact-message">Project / message</label>
          <span className="field__count" aria-hidden="true">
            {values.message.length} / 3000
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update('message', event.target.value.slice(0, 3000))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="What are you thinking about building?"
        />
        {errors.message && (
          <p className="field__error" id="contact-message-error">
            {errors.message}
          </p>
        )}
      </div>

      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update('company', event.target.value)}
        />
      </div>

      <button type="submit" className="btn btn--accent contact-form__submit" disabled={sending}>
        {sending ? (
          <>
            Sending
            <Loader2 size={16} className="spin" aria-hidden="true" />
          </>
        ) : hasEndpoint ? (
          <>
            Send message
            <ArrowUpRight size={16} aria-hidden="true" />
          </>
        ) : (
          <>
            Open email draft
            <Mail size={16} aria-hidden="true" />
          </>
        )}
      </button>

      {!hasEndpoint && (
        <p className="contact-form__note">
          No delivery endpoint is configured in this build, so the form opens a prefilled
          email draft instead. Set <code>VITE_CONTACT_ENDPOINT</code> or deploy the included
          Netlify function to enable direct sending.
        </p>
      )}

      <div className="contact-form__status" aria-live="polite" role="status">
        {status === 'success' && (
          <p className="form-feedback form-feedback--ok">
            <Check size={16} aria-hidden="true" />
            {feedback}
          </p>
        )}
        {status === 'error' && (
          <p className="form-feedback form-feedback--error">
            <AlertCircle size={16} aria-hidden="true" />
            {feedback}
            <a href={buildMailto()} className="form-feedback__link">
              Email directly instead
            </a>
          </p>
        )}
        {status === 'draft' && (
          <p className="form-feedback form-feedback--draft">
            <Mail size={16} aria-hidden="true" />
            {feedback}
            <a href={buildMailto()} className="form-feedback__link">
              Reopen draft
            </a>
          </p>
        )}
      </div>
    </form>
  )
}
