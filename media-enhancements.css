(() => {
  'use strict';
  const SERVICE = 'https://loremflickr.com';
  const SOURCE = 'https://www.flickr.com/search/?text=';
  const hash = value => {
    let h = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return Math.abs(h >>> 0) % 999999 + 1;
  };
  const cleanTerms = value => String(value || '')
    .replace(/[“”"'’]/g, ' ')
    .replace(/[()\[\]\/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 9)
    .join(',');
  const urlFor = query => `${SERVICE}/960/640/${encodeURIComponent(cleanTerms(query))}?lock=${hash(query)}`;
  const fallbackFor = query => `${SERVICE}/960/640/china,travel?lock=${hash(`fallback-${query}`)}`;
  const sourceFor = query => `${SOURCE}${encodeURIComponent(query)}`;

  function createFigure(query, label, compact = false) {
    const figure = document.createElement('figure');
    figure.className = `remote-photo${compact ? ' compact' : ''}`;
    figure.dataset.remotePhoto = query;
    figure.innerHTML = `
      <a href="${sourceFor(query)}" target="_blank" rel="noopener" aria-label="Cerca fotografie di ${label} su Flickr">
        <span class="remote-photo__placeholder"><span><i class="ti ti-photo"></i>Caricamento foto</span></span>
        <img alt="${String(label).replace(/"/g, '&quot;')}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
        <figcaption><span>Foto illustrativa · Flickr</span><i class="ti ti-external-link"></i></figcaption>
      </a>`;
    return figure;
  }

  function prepareFoodCards() {
    document.querySelectorAll('.food-card').forEach(card => {
      if (card.querySelector(':scope > .remote-photo')) return;
      const title = card.querySelector('h4')?.textContent?.trim();
      if (!title) return;
      const cn = card.querySelector('.cn-name')?.textContent?.trim() || '';
      const city = card.closest('.city-section')?.querySelector('.city-title h2')?.textContent?.trim()
        || card.closest('.city-section')?.id || 'Cina';
      const query = `${cn} ${title} ${city} Chinese food dish`;
      card.prepend(createFigure(query, `${title} — ${city}`));
    });
  }

  function prepareTimelineCards() {
    document.querySelectorAll('.timeline-card').forEach(card => {
      if (card.querySelector(':scope > .remote-photo')) return;
      const title = card.querySelector('h4')?.textContent?.trim();
      if (!title) return;
      const day = card.closest('.it-day');
      const city = day?.querySelector('.day-kicker')?.textContent?.split('·')?.pop()?.trim() || 'China';
      const linkedAttraction = card.querySelector('h4 a[href*="attrazioni"]');
      const query = linkedAttraction
        ? `${title} ${city} China landmark travel`
        : `${title} ${city} China travel`;
      card.prepend(createFigure(query, `${title} — ${city}`, true));
    });
    document.querySelectorAll('.nearby-card').forEach(card => {
      if (card.querySelector(':scope > .remote-photo')) return;
      const title = card.querySelector('a')?.textContent?.trim();
      if (!title) return;
      const city = card.closest('.it-day')?.querySelector('.day-kicker')?.textContent?.split('·')?.pop()?.trim() || 'China';
      card.prepend(createFigure(`${title} ${city} China landmark`, `${title} — ${city}`, true));
    });
  }

  function prepareAttractionCards() {
    document.querySelectorAll('.attraction-card').forEach(card => {
      const top = card.querySelector('.attr-top');
      if (!top || top.querySelector(':scope > .remote-photo')) return;
      const title = card.querySelector('.attr-title h3')?.textContent?.trim();
      if (!title) return;
      const city = card.querySelector('.attr-tag.city')?.textContent?.trim() || 'China';
      const figure = createFigure(`${title} ${city} China landmark travel`, `${title} — ${city}`);
      const titleNode = top.querySelector('.attr-title');
      if (titleNode) titleNode.insertAdjacentElement('afterend', figure);
      else top.prepend(figure);
    });
  }

  function loadImages() {
    const figures = [...document.querySelectorAll('.remote-photo[data-remote-photo]')];
    const load = figure => {
      if (figure.dataset.loaded) return;
      figure.dataset.loaded = '1';
      const query = figure.dataset.remotePhoto;
      const img = figure.querySelector('img');
      if (!img) return;
      img.addEventListener('load', () => img.classList.add('is-loaded'), {once:true});
      img.addEventListener('error', () => {
        if (img.dataset.fallback) return;
        img.dataset.fallback = '1';
        img.src = fallbackFor(query);
      });
      img.src = urlFor(query);
    };
    if (!('IntersectionObserver' in window)) { figures.forEach(load); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      load(entry.target);
      observer.unobserve(entry.target);
    }), {rootMargin:'650px 0px'});
    figures.forEach(figure => observer.observe(figure));
  }

  function init() {
    prepareFoodCards();
    prepareTimelineCards();
    prepareAttractionCards();
    loadImages();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
