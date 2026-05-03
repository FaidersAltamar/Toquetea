import { useState } from 'react';
import {
  SiAlibabacloud,
  SiBrave,
  SiCanva,
  SiCoursera,
  SiDeepgram,
  SiElevenlabs,
  SiFreepik,
  SiGooglegemini,
  SiGooglemaps,
  SiN8N,
  SiOpenai,
  SiPerplexity,
  SiReddit,
  SiX,
  SiYoutube,
} from 'react-icons/si';
import { brandSvgById } from './brandSvgData.js';
import { providerFaviconDomainById } from './providerFaviconDomains.js';

function BrandSvg({ id, title, className, size }) {
  const data = brandSvgById[id];
  if (!data) {
    return null;
  }

  const dimension = `${size}px`;

  return (
    <svg
      className={className}
      role="img"
      viewBox="0 0 24 24"
      width={dimension}
      height={dimension}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <path fill="currentColor" d={data.path} />
    </svg>
  );
}

const reactIconById = {
  'chatgpt-plus': SiOpenai,
  reddit: SiReddit,
  n8n: SiN8N,
  'canva-pro': SiCanva,
  'canva-business': SiCanva,
  'coursera-plus': SiCoursera,
  'openai-api': SiOpenai,
  'gemini-api': SiGooglegemini,
  'elevenlabs-api': SiElevenlabs,
  'grok-api': SiX,
  'perplexity-api': SiPerplexity,
  'qwen-api': SiAlibabacloud,
  'freepik-api': SiFreepik,
  'deepgram-api': SiDeepgram,
  'brave-api': SiBrave,
  'google-api': SiGooglemaps,
  'youtube-api': SiYoutube,
};

function monogram(name) {
  const letters = name
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
  return letters.toUpperCase() || '?';
}

function faviconUrlsForDomain(domain) {
  const trimmed = domain.trim();
  const host = trimmed.replace(/^www\./i, '');
  return [
    `https://icons.duckduckgo.com/ip3/${host}.ico`,
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(trimmed)}&sz=128`,
  ];
}

function FaviconOrMonogram({ id, name, size, className }) {
  const domain = providerFaviconDomainById[id];
  const [urlIndex, setUrlIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const dimension = `${size}px`;
  const fallbackClass = `provider-logo provider-logo-fallback ${className}`.trim();

  if (!domain || failed) {
    return (
      <span className={fallbackClass} style={{ width: dimension, height: dimension }} aria-hidden>
        {monogram(name || id)}
      </span>
    );
  }

  const urls = faviconUrlsForDomain(domain);
  const src = urls[Math.min(urlIndex, urls.length - 1)];

  return (
    <img
      alt=""
      className={`provider-logo provider-logo-img ${className}`.trim()}
      decoding="async"
      height={size}
      loading="lazy"
      onError={() => {
        if (urlIndex + 1 < urls.length) {
          setUrlIndex((current) => current + 1);
        } else {
          setFailed(true);
        }
      }}
      referrerPolicy="no-referrer"
      src={src}
      width={size}
    />
  );
}

export function ProviderLogo({ id, name, size = 28, className = '' }) {
  const dimension = `${size}px`;
  const baseClass = `provider-logo ${className}`.trim();

  if (brandSvgById[id]) {
    return <BrandSvg className={baseClass} id={id} size={size} title={name} />;
  }

  const Icon = reactIconById[id];
  if (Icon) {
    return <Icon aria-hidden className={baseClass} size={size} />;
  }

  if (providerFaviconDomainById[id]) {
    return <FaviconOrMonogram className={className} id={id} name={name} size={size} />;
  }

  return (
    <span className={`provider-logo provider-logo-fallback ${className}`.trim()} style={{ width: dimension, height: dimension }} aria-hidden>
      {monogram(name || id)}
    </span>
  );
}
