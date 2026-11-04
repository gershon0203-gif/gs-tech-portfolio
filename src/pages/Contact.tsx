import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'
import { ContactForm } from '../sections/ContactForm'
import { site } from '../data/site'
import { useLocalTime } from '../lib/useLocalTime'

export default function Contact() {
  const time = useLocalTime(site.timeZone)

  return (
    <>
      <section className="dw-contact" id="top">
        <div className="shell">
          <div className="dw-page-hero__topline">
            <span className="dw-hud">
              <span>04 / Contact</span>
            </span>
            <span className="dw-hud">Chennai, IN — {time} IST</span>
            <span className="dw-hud">The hall stays open</span>
          </div>

          <div className="dw-contact__grid">
            <div className="dw-contact__copy">
              <p className="dw-kicker">
                <span>An open door</span>
                <span aria-hidden="true">/</span>
                <span>Real inbox</span>
              </p>
              <h1 className="dw-page-title dw-contact__title" data-reveal-lines>
                <span className="reveal-line">
                  <span>The last</span>
                </span>
                <span className="reveal-line">
                  <span>
                    <em>door.</em>
                  </span>
                </span>
              </h1>

              <p className="dw-contact__lede">
                A project, a problem or an unfinished idea — I&rsquo;m interested in
                the point where a clear thought becomes something people can use.
                Tell me what you are thinking about.
              </p>

              <a href={`mailto:${site.email}`} className="dw-contact__email">
                <span className="dw-hud">Write directly</span>
                <span className="dw-contact__email-value">{site.email}</span>
                <ArrowUpRight size={24} aria-hidden="true" />
              </a>

              <div className="dw-contact__socials" data-stagger>
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="dw-social"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>

              <div className="dw-contact__meta">
                <span className="dw-hud">
                  <i aria-hidden="true" />
                  {site.availability.open
                    ? 'Open to internships & collaborations'
                    : 'Currently unavailable'}
                </span>
                <span className="dw-hud">
                  {site.location} / {time} IST
                </span>
              </div>
            </div>

            <div className="dw-contact__form" data-reveal>
              <div className="dw-contact__form-head">
                <span className="dw-hud">
                  <Mail size={13} aria-hidden="true" /> Transmission form / 04
                </span>
                <span className="dw-hud">Reply within 1–2 days</span>
              </div>
              <ContactForm />
            </div>
          </div>

          <div className="dw-contact__foot">
            <div>
              <span className="dw-hud">What happens next</span>
              <p>
                I read every message. If there is a fit, the next step is a short
                conversation about the problem, the constraints and what a useful
                outcome looks like.
              </p>
            </div>
            <div className="dw-contact__foot-links">
              <Link to="/projects" className="dw-text-link">
                Review the work first
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/about" className="dw-text-link">
                Read the story
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="dw-contact-close">
        <div className="dw-contact-close__light" aria-hidden="true" />
        <div className="shell">
          <span className="dw-hud">End of the hall / GS TECH</span>
          <p className="dw-contact-close__line">
            See you on the <em>other side.</em>
          </p>
          <div className="dw-contact-close__foot">
            <span>© {new Date().getFullYear()} GS TECH — Gershon S</span>
            <Link to="/" className="dw-text-link">
              Return home
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
