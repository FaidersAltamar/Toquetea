import { useEffect, useState } from 'react';
import { apis, business, copy, packages, services } from './siteData.js';

const navTargets = ['how-it-works', 'packages', 'apis', 'services', 'why-us', 'faq', 'contact'];

function whatsappLink(message) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

function Price({ value }) {
  const match = value.match(/^(\$\d+)\s?(.*)$/);

  if (!match) {
    return <strong className="price price-text">{value}</strong>;
  }

  return (
    <strong className="price">
      <span>{match[1]}</span>
      {match[2] ? <small>{match[2]}</small> : null}
    </strong>
  );
}

function chunkItems(items, size) {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function App() {
  const [language, setLanguage] = useState('es');
  const [activeTestimonialSlide, setActiveTestimonialSlide] = useState(0);
  const [showAllApis, setShowAllApis] = useState(false);
  const t = copy[language];
  const product = business.productName[language];
  const availableServices = services.filter((service) => service.available);
  const availableApis = apis.filter((api) => api.available);
  const featuredApis = availableApis.filter((api) => api.featured).slice(0, 6);
  const visibleApis = showAllApis ? availableApis : featuredApis;
  const testimonialSlides = chunkItems(t.testimonials, 3);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    setActiveTestimonialSlide(0);
    setShowAllApis(false);
  }, [language]);

  useEffect(() => {
    if (testimonialSlides.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveTestimonialSlide((currentSlide) => (currentSlide + 1) % testimonialSlides.length);
    }, 4800);

    return () => window.clearInterval(intervalId);
  }, [testimonialSlides.length]);

  return (
    <>
      <div className="top-visual">
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
            <div className="brand-app-icon" aria-hidden="true">💗</div>
            <div className="floating-card">
              <div className="card-chip" aria-hidden="true" />
              <strong>{business.brand}</strong>
              <div className="cloud cloud-one" aria-hidden="true" />
              <div className="cloud cloud-two" aria-hidden="true" />
              <div className="cloud cloud-three" aria-hidden="true" />
            </div>
          </div>
        </section>
      </div>

      <main>
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
                <Price value={plan.price} />
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
              <Price value={t.customPrice} />
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

        {availableApis.length > 0 ? (
          <section className="section centered apis" id="apis">
            <p className="eyebrow">{t.apisEyebrow}</p>
            <h2>{t.apisTitle}</h2>
            <p>{t.apisText}</p>
            <div className="api-grid">
              {visibleApis.map((api) => (
                <article className="price-card api-price-card" key={api.id}>
                  <span className="api-category">{api.category}</span>
                  <h3>{api.name}</h3>
                  <p className="credits">{api.usage[language]}</p>
                  <div className="regular-price">
                    <span>{t.apiRegularPrice}</span>
                    <del>{api.originalPrice[language]}</del>
                  </div>
                  <div className="api-discount-price">
                    <small>{t.apiDiscountPrefix}</small>
                    <strong>60% OFF</strong>
                  </div>
                  <ul>
                    {api.features[language].map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    className="button button-wide"
                    href={whatsappLink(`${t.apiMessage} ${api.name}.`)}
                    {...externalLinkProps}
                  >
                    {t.apiCta} {api.name}
                  </a>
                </article>
              ))}
            </div>
            {availableApis.length > featuredApis.length ? (
              <button className="button api-toggle" onClick={() => setShowAllApis((current) => !current)} type="button">
                {showAllApis ? t.apiShowLess : t.apiShowMore}
              </button>
            ) : null}
          </section>
        ) : null}

        {availableServices.length > 0 ? (
          <section className="section centered services" id="services">
            <p className="eyebrow">{t.servicesEyebrow}</p>
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesText}</p>
            <div className="services-grid">
              {availableServices.map((service) => (
                <article className="price-card service-price-card" key={service.id}>
                  <h3>{service.name}</h3>
                  <p className="credits">{service.duration[language]}</p>
                  <Price value={service.price[language]} />
                  <ul>
                    {service.features[language].map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    className="button button-wide"
                    href={whatsappLink(`${t.serviceMessage} ${service.name} (${service.duration[language]}).`)}
                    {...externalLinkProps}
                  >
                    {t.serviceCta} {service.name}
                  </a>
                </article>
              ))}
            </div>
          </section>
        ) : null}

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
          <h2>
            {t.testimonialsTitleStart} <span className="gradient-text">{t.testimonialsTitleAccent}</span> {t.testimonialsTitleEnd}
          </h2>
          <p>{t.testimonialsSubtitle}</p>
          <div className="testimonial-slider">
            <div className="testimonial-track" style={{ transform: `translateX(-${activeTestimonialSlide * 100}%)` }}>
              {testimonialSlides.map((slide, slideIndex) => (
                <div className="testimonial-slide" key={`slide-${slideIndex}`}>
                  <div className="testimonial-grid">
                    {slide.map((review) => (
                      <blockquote key={review.name}>
                        <div className="review-header">
                          <div className="review-avatar">{review.initials}</div>
                          <div>
                            <cite>{review.name}</cite>
                            <span>{review.role}</span>
                          </div>
                        </div>
                        <div className="stars" aria-label="5 stars">★★★★★</div>
                        <p>"{review.quote}"</p>
                      </blockquote>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testimonial-dots" aria-label="Testimonial slides">
            {testimonialSlides.map((_, slideIndex) => (
              <button
                aria-label={`Show testimonial group ${slideIndex + 1}`}
                className={slideIndex === activeTestimonialSlide ? 'active' : ''}
                key={`dot-${slideIndex}`}
                onClick={() => setActiveTestimonialSlide(slideIndex)}
                type="button"
              />
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
