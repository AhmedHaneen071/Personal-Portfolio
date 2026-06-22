import { useState, useEffect } from 'react'

const EMAILJS_PUBLIC_KEY = 'V0dpa80BvmhtMjre7'
const EMAILJS_SERVICE_ID = 'service_ztm16ra'
const EMAILJS_TEMPLATE_ID = 'template_0wm199a'

export default function Contact() {
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.emailjs) {
      window.emailjs.init(EMAILJS_PUBLIC_KEY)
      setReady(true)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!ready) {
      setStatus({ type: 'error', message: 'Email service not ready. Try again in a moment.' })
      return
    }

    setSending(true)
    setStatus({ type: '', message: '' })

    const form = e.target

    try {
      const res = await window.emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form
      )

      if (res.status === 200) {
        setStatus({ type: 'success', message: "Message sent successfully! I'll get back to you soon." })
        form.reset()
      } else {
        throw new Error('Send failed')
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to send. Please email me directly at shaikhhaneen18@gmail.com' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Let's Talk</div>
          <h2>Contact Me</h2>
        </div>
        <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <input placeholder="Name" name="form_name" type="text" required />
            <input placeholder="Email" name="from_email" type="email" required />
          </div>
          <textarea name="message" placeholder="Your message..." required></textarea>
          <button type="submit" className="btn btn-primary" disabled={sending || !ready}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
          {status.message && (
            <div className={`form-status ${status.type}`}>{status.message}</div>
          )}
        </form>
      </div>
    </section>
  )
}
