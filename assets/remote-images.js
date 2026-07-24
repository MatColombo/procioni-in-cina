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
    return Math.abs(h >>> 0) % 9000 + 1;
  };

  const normalize = value => String(value || '')
    .replace(/[“”"]/g, ' ')
    .replace(/’/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  const stripDetails = value => normalize(value)
    .replace(/^\s*(mattina|pomeriggio|sera|giornata|sosta|arrivo|partenza)\s*:\s*/i, '')
    .replace(/\s+[—–]\s+.*$/, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();

  const extractHan = value => {
    const input = String(value || '');
    try {
      const matches = input.match(/\p{Script=Han}+/gu);
      if (matches?.length) return matches.join('');
    } catch {}
    return (input.match(/[\u3400-\u9fff\uf900-\ufaff]+/g) || []).join('');
  };

  const ambiguous = /^(central|centro|old town|città vecchia|night market|mercato notturno|railway station|train station|stazione|airport|aeroporto|hotel|parco|park|museum|museo|promenade|lungomare|beach|spiaggia|avenue of stars|bell tower|drum tower|city wall|mura della città|quartiere musulmano|muslim quarter|check-in|relax|tempo libero|free time|pranzo|cena|colazione|in viaggio|trasferimento)$/i;

  const placeQuery = (title, city = '') => {
    let query = stripDetails(title);
    const toward = query.match(/(?:verso|towards?|to)\s+(.+)$/i);
    if (toward) query = stripDetails(toward[1]);
    if (!query) query = normalize(city) || 'China';
    if (ambiguous.test(query) && city && !query.toLowerCase().includes(city.toLowerCase())) query = `${query} ${normalize(city)}`;
    return query;
  };

  const imageUrl = (query, locked = true) => {
    const encoded = encodeURIComponent(normalize(query));
    return `${SERVICE}/960/640/${encoded}${locked ? `?lock=${hash(query)}` : ''}`;
  };
  const sourceUrl = query => `${SOURCE}${encodeURIComponent(normalize(query))}`;

  const svgFallback = label => {
    const safe = normalize(label).slice(0, 70)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ead9bc"/><stop offset="1" stop-color="#f8efe0"/></linearGradient></defs><rect width="960" height="640" fill="url(#g)"/><circle cx="780" cy="105" r="180" fill="none" stroke="#c49a2f" stroke-opacity=".25" stroke-width="4"/><text x="480" y="285" text-anchor="middle" font-family="sans-serif" font-size="34" fill="#7b171a">Foto non disponibile</text><text x="480" y="340" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#5f5146">${safe}</text><text x="480" y="390" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#74685e">Tocca per cercare su Flickr</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  function createFigure(query, label, compact = false) {
    const figure = document.createElement('figure');
    figure.className = `remote-photo${compact ? ' compact' : ''}`;
    figure.dataset.remotePhoto = normalize(query);
    figure.innerHTML = `
      <a href="${sourceUrl(query)}" target="_blank" rel="noopener" aria-label="Cerca fotografie di ${String(label).replace(/"/g, '&quot;')} su Flickr">
        <span class="remote-photo__placeholder"><span><i class="ti ti-photo"></i>Caricamento foto</span></span>
        <img alt="${String(label).replace(/"/g, '&quot;')}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
        <figcaption><span>Foto illustrativa · ${normalize(query)}</span><i class="ti ti-external-link"></i></figcaption>
      </a>`;
    return figure;
  }

  function prepareFoodCards() {
    document.querySelectorAll('.food-card').forEach(card => {
      if (card.querySelector(':scope > .remote-photo')) return;
      const title = card.querySelector('h4')?.textContent?.trim();
      if (!title) return;
      const cn = card.querySelector('.cn-name')?.textContent?.trim() || '';
      const query = extractHan(cn) || extractHan(title) || stripDetails(title);
      card.prepend(createFigure(query, title));
    });
  }

  function prepareTimelineCards() {
    document.querySelectorAll('.timeline-card').forEach(card => {
      if (card.querySelector(':scope > .remote-photo')) return;
      const title = card.querySelector('h4')?.textContent?.trim();
      if (!title) return;
      const city = card.closest('.it-day')?.querySelector('.day-kicker')?.textContent?.split('·')?.pop()?.trim() || '';
      const query = placeQuery(title, city);
      card.prepend(createFigure(query, title, true));
    });
    document.querySelectorAll('.nearby-card').forEach(card => {
      if (card.querySelector(':scope > .remote-photo')) return;
      const title = card.querySelector('a')?.textContent?.trim();
      if (!title) return;
      const city = card.closest('.it-day')?.querySelector('.day-kicker')?.textContent?.split('·')?.pop()?.trim() || '';
      const query = placeQuery(title, city);
      card.prepend(createFigure(query, title, true));
    });
  }

  function prepareAttractionCards() {
    document.querySelectorAll('.attraction-card').forEach(card => {
      const top = card.querySelector('.attr-top');
      if (!top || top.querySelector(':scope > .remote-photo')) return;
      const title = card.querySelector('.attr-title h3')?.textContent?.trim();
      if (!title) return;
      const city = card.querySelector('.attr-tag.city')?.textContent?.trim() || '';
      const query = placeQuery(title, city);
      const figure = createFigure(query, title);
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
      const placeholder = figure.querySelector('.remote-photo__placeholder span');
      if (!img) return;
      let stage = 0;
      let finished = false;
      let loadTimer;
      const showFallback = () => {
        clearTimeout(loadTimer);
        figure.classList.add('has-error');
        if (placeholder) placeholder.innerHTML = '<i class="ti ti-photo-off"></i>Foto non disponibile<br><small>Tocca per cercare su Flickr</small>';
        stage = 2;
        img.src = svgFallback(query);
      };
      const startStage = nextStage => {
        if (finished) return;
        clearTimeout(loadTimer);
        stage = nextStage;
        if (stage > 1) { showFallback(); return; }
        img.src = imageUrl(query, stage === 0);
        loadTimer = window.setTimeout(() => {
          if (!finished && stage === nextStage) startStage(nextStage + 1);
        }, 9000);
      };
      img.addEventListener('load', () => {
        clearTimeout(loadTimer);
        finished = true;
        img.classList.add('is-loaded');
        if (stage < 2) figure.classList.remove('has-error');
      });
      img.addEventListener('error', () => {
        if (!finished) startStage(stage + 1);
      });
      startStage(0);
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
