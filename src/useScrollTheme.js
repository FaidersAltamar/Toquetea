import { useEffect } from 'react';

const THEME_STOPS = [
  { pink: '#ff4d8d', violet: '#7c4dff', blue: '#6ba3ff', cyan: '#4de3ff', orange: '#ffb36b', pinkStrong: '#ff2f7d' },
  { pink: '#ff6b5c', violet: '#6366f1', blue: '#38bdf8', cyan: '#2dd4bf', orange: '#fcd34d', pinkStrong: '#f43f5e' },
  { pink: '#e879f9', violet: '#22d3ee', blue: '#60a5fa', cyan: '#5eead4', orange: '#fdba74', pinkStrong: '#d946ef' },
  { pink: '#38bdf8', violet: '#a78bfa', blue: '#818cf8', cyan: '#f472b6', orange: '#fbbf24', pinkStrong: '#0ea5e9' },
  { pink: '#ff4d8d', violet: '#7c4dff', blue: '#6ba3ff', cyan: '#4de3ff', orange: '#ffb36b', pinkStrong: '#ff2f7d' },
];

const THEME_KEYS = ['pink', 'violet', 'blue', 'cyan', 'orange', 'pinkStrong'];

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHex(r, g, b) {
  const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
  return `#${[r, g, b].map((x) => clamp(x).toString(16).padStart(2, '0')).join('')}`;
}

function lerpHex(from, to, t) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return rgbToHex(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t);
}

function applyTheme(root, stopA, stopB, t) {
  for (const key of THEME_KEYS) {
    const cssName = key === 'pinkStrong' ? 'pink-strong' : key;
    root.style.setProperty(`--${cssName}`, lerpHex(stopA[key], stopB[key], t));
  }
}

function clearTheme(root) {
  for (const key of THEME_KEYS) {
    const cssName = key === 'pinkStrong' ? 'pink-strong' : key;
    root.style.removeProperty(`--${cssName}`);
  }
}

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) {
    return 0;
  }
  return Math.min(1, Math.max(0, window.scrollY / max));
}

export function useScrollTheme() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const root = document.documentElement;
    let raf = 0;

    const paint = () => {
      raf = 0;
      const p = scrollProgress();
      const n = THEME_STOPS.length - 1;
      const f = p * n;
      const i = Math.min(Math.floor(f), n - 1);
      const t = f - i;
      applyTheme(root, THEME_STOPS[i], THEME_STOPS[i + 1], t);
    };

    const schedule = () => {
      if (raf === 0) {
        raf = window.requestAnimationFrame(paint);
      }
    };

    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf !== 0) {
        window.cancelAnimationFrame(raf);
      }
      clearTheme(root);
    };
  }, []);
}
