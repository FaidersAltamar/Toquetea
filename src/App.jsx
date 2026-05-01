import { useEffect, useState } from 'react';
import { business, copy, packages } from './siteData.js';

const navTargets = ['how-it-works', 'packages', 'why-us', 'faq', 'contact'];

function whatsappLink(message) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

function App() {
  const [language, setLanguage] = useState('es');
  const t = copy[language];
  const product = business.productName[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label={t.navAria}>
          <a className="brand" href="#home" aria-label={t.homeAria}>
            <span className="brand-mark">T</span>
            {business.brand}
          </a>
          <div className="nav-links">
            {t.nav.map((item, index) => (
              <a key={item} href={`#${navTargets[index]}`}>
                {item}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button className="language-toggle" type="button" onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}>
              {t.language}
            </button>
            <a className="button button-small button-whatsapp" href={whatsappLink(t.orderMessage)} {...externalLinkProps}>
              WhatsApp
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-text">{t.heroText}</p>
            <div className="hero-actions">
              <a className="button" href="#packages">
                {t.primaryCta}
              </a>
              <a className="button button-ghost button-whatsapp" href={whatsappLink(t.infoMessage)} {...externalLinkProps}>
                {t.whatsappCta}
              </a>
            </div>
            <ul className="trust-list" aria-label={t.highlightsAria}>
              {t.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div className="hero-card" aria-label={t.heroVisualAria}>
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="credit-panel">
              <span className="panel-label">{t.panelLabel}</span>
              <strong>{t.panelValue}</strong>
              <p>{t.panelText}</p>
            </div>
            <div className="mini-card top">{t.miniTop}</div>
            <div className="mini-card bottom">{t.miniBottom}</div>
          </div>
        </section>

        <section className="stats-band" aria-label={t.statsAria}>
          <h2>{t.trustTitle}</h2>
          <div className="stats-grid">
            {t.stats.map((stat) => (
              <strong key={stat}>{stat}</strong>
            ))}
          </div>
        </section>

        <section className="section centered" id="how-it-works">
          <p className="eyebrow">{t.processEyebrow}</p>
          <h2>{t.stepsTitle}</h2>
          <p>{t.stepsText}</p>
          <div className="steps-grid">
            {t.steps.map(([title, text], index) => (
              <article className="glass-card" key={title}>
                <span className="step-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section centered" id="packages">
          <p className="eyebrow">{t.pricingEyebrow}</p>
          <h2>{t.packagesTitle}</h2>
          <p>{t.packagesText}</p>
          <div className="pricing-grid">
            {packages.map((plan) => (
              <article className={`price-card ${plan.highlighted ? 'featured' : ''}`} key={plan.id}>
                {plan.highlighted ? <span className="badge">{t.featuredBadge}</span> : null}
                <h3>{plan.name[language]}</h3>
                <p className="credits">{plan.credits} {t.creditsLabel}</p>
                <strong className="price">{plan.price}</strong>
                <ul>
                  {plan.features[language].map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a
                  className="button button-wide"
                  href={whatsappLink(`${t.buyMessage} ${plan.name[language]} (${plan.credits} ${t.creditsLabel} - ${plan.price}).`)}
                  {...externalLinkProps}
                >
                  {t.buy} {plan.name[language]}
                </a>
              </article>
            ))}
            <article className="price-card custom-card">
              <h3>{t.customTitle}</h3>
              <p className="credits">{t.unlimited}</p>
              <strong className="price">{t.customPrice}</strong>
              <p>{t.customText}</p>
              <ul>
                {t.customFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className="button button-wide" href={whatsappLink(t.customMessage)} {...externalLinkProps}>
                {t.quote}
              </a>
            </article>
          </div>
        </section>

        <section className="section split" id="why-us">
          <div>
            <p className="eyebrow">{t.trustEyebrow}</p>
            <h2>{t.whyTitle}</h2>
            <p>{t.whyText}</p>
          </div>
          <div className="reason-grid">
            {t.reasons.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section centered testimonials" aria-label={t.testimonialsAria}>
          <p className="eyebrow">{t.testimonialsEyebrow}</p>
          <h2>{t.testimonialsTitle}</h2>
          <div className="testimonial-grid">
            {t.testimonials.map(([quote, author]) => (
              <blockquote key={author}>
                <p>"{quote}"</p>
                <cite>{author}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="section faq" id="faq">
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2>{t.faqTitle}</h2>
          <div className="faq-list">
            {t.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div>
            <p className="eyebrow">{t.contactEyebrow}</p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
          </div>
          <div className="contact-card">
            <a href={whatsappLink(t.contactMessage)} {...externalLinkProps}>{business.whatsappDisplay}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </div>
        </section>
      </main>

      <footer>
        <p>{t.disclaimer}</p>
        <p>© {business.year} {business.brand}. {t.footerRights}</p>
      </footer>
    </>
  );
}

export default App;
