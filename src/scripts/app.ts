/* Runs on every page load AND after every Astro View Transition.
   We can't rely on DOMContentLoaded once VT is in play — it only fires once.
   astro:page-load fires on initial load and after every VT navigation. */

declare const gsap: any;

// All page-scoped listeners (scroll, click, keydown, IntersectionObservers)
// register against this signal so they're cleanly aborted on next navigation,
// instead of accumulating. GSAP ScrollTrigger was previously used for the nav
// class + .reveal animations, but its global scroll listener doesn't survive
// Astro View Transitions — after a nav, scrolling never updated the internal
// cache, so nav.scrolled never re-applied and reveals stayed hidden.
let pageAbort: AbortController | null = null;

function init() {
  if (pageAbort) pageAbort.abort();
  pageAbort = new AbortController();
  const { signal } = pageAbort;

  // Hero entrance (no scroll involvement — GSAP timeline is fine here)
  if (window.gsap) {
    const tl = gsap.timeline({ delay: 0.15 });
    const tag = document.querySelector('#htag');
    const head = document.querySelector('#hhead');
    const strip = document.querySelector('#hstrip');
    if (tag) tl.to('#htag', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' });
    if (head) tl.to('#hhead', { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, '-=0.25');
    if (strip) tl.to('#hstrip', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35');
  } else {
    document.querySelectorAll('#htag, #hhead, #hstrip').forEach(el => {
      (el as HTMLElement).style.opacity = '1';
    });
  }

  // Reveals + nav-scrolled share one scroll listener. Vanilla bounding-rect
  // check is bulletproof — IntersectionObserver had inconsistent behavior on
  // long pages (e.g. /about with 45 reveals) after Astro VT.
  const pending = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  const nav = document.querySelector('nav');
  const showThreshold = () => window.innerHeight * 0.9; // 10% margin from bottom

  const update = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    if (!pending.length) return;
    const limit = showThreshold();
    for (let i = pending.length - 1; i >= 0; i--) {
      const el = pending[i];
      const r = el.getBoundingClientRect();
      if (r.top < limit && r.bottom > 0) {
        el.classList.add('is-shown');
        pending.splice(i, 1);
      }
    }
  };
  update(); // initial state (catches anything already in view + sets nav class)
  window.addEventListener('scroll', update, { passive: true, signal });
  window.addEventListener('resize', update, { passive: true, signal });

  // Theme
  const root = document.documentElement;
  const KEY = 'theme';
  const btns = document.querySelectorAll<HTMLButtonElement>('[data-set-theme]');
  let current: string;
  try { current = localStorage.getItem(KEY) || 'inkwell'; } catch { current = 'inkwell'; }
  root.setAttribute('data-theme', current);

  function sync(name: string) {
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setTheme === name)));
  }
  sync(current);
  btns.forEach(b => {
    b.addEventListener('click', () => {
      const name = b.dataset.setTheme!;
      root.setAttribute('data-theme', name);
      try { localStorage.setItem(KEY, name); } catch {}
      sync(name);
    });
  });

  // Toolbar popovers
  const tbBtns = document.querySelectorAll<HTMLButtonElement>('[data-popover]');
  const popovers = document.querySelectorAll<HTMLElement>('[data-popover-target]');

  function closeAll() {
    tbBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
    popovers.forEach(p => p.classList.remove('is-open'));
  }
  tbBtns.forEach(b => {
    b.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      const name = b.dataset.popover!;
      const isOpen = b.getAttribute('aria-expanded') === 'true';
      closeAll();
      if (!isOpen) {
        b.setAttribute('aria-expanded', 'true');
        document.querySelector(`[data-popover-target="${name}"]`)?.classList.add('is-open');
      }
    });
  });
  popovers.forEach(p => p.addEventListener('click', e => e.stopPropagation()));
  document.addEventListener('click', closeAll, { signal });
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeAll();
  }, { signal });
}

// astro:page-load fires after both initial load and every VT navigation
document.addEventListener('astro:page-load', init);
