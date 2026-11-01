import { ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import { SectionLabel } from '../components/ui/SectionLabel'
import { ContactForm } from './ContactForm'
import { useLocalTime } from '../lib/useLocalTime'

export function Contact() {
  const time = useLocalTime(site.timeZone)

  return (
    <section className="section contact theme-dark" id="contact">
      <div className="shell">
        <SectionLabel index="08" label="Contact" />

        <div className="contact__grid">
          <div className="contact__copy">
            <h2 className="contact__title" data-reveal>
              Every great product
              <br />
              starts with <span className="serif">an idea.</span>
            </h2>
            <p className="lead contact__lede" data-reveal>
              Have a project, a problem or an interesting idea? Let&rsquo;s talk about
              building something meaningful.
            </p>

            <div className="contact__links" data-reveal>
              <a href={`mailto:${site.email}`} className="contact__email">
                <span className="caption">Email</span>
                <span className="contact__email-value">{site.email}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>

              <ul className="contact__socials">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-line"
                    >
                      {social.label}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact__meta" data-reveal>
              <span className="status status--live">
                <span className="status__dot" aria-hidden="true" />
                {site.availability.label}
              </span>
              <span className="caption">
                {site.location} — {time} IST
              </span>
            </div>
          </div>

          <div className="contact__form" data-reveal>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
