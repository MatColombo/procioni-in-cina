
(() => {
  const data = window.CHINA_TRAVEL_DATA;
  if (!data) return;
  const root = document.getElementById('attractions-root');
  const cityNav = document.getElementById('attraction-city-nav');
  const search = document.getElementById('attraction-search');
  const cityFilter = document.getElementById('city-filter');
  const typeFilter = document.getElementById('type-filter');
  const count = document.getElementById('attraction-count');
  const editorial = window.CHINA_ATTRACTION_EDITORIAL;

  const esc = (value = '') => String(value).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[ch]));

  const googleMap = obj => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(obj.mapQuery || obj.name)}`;
  const amap = obj => `https://uri.amap.com/search?keyword=${encodeURIComponent(obj.mapQuery || obj.name)}&city=${encodeURIComponent(obj.amapCity || '')}&view=map&src=Cina2026&callnative=1`;
  const googleSearch = obj => `https://www.google.com/search?q=${encodeURIComponent(`"${obj.name}" "${data.cities[obj.city].name}"`)}`;

  const occurrences = {};
  const addOccurrence = (id, occurrence) => {
    if (!occurrences[id]) occurrences[id] = [];
    const key = `${occurrence.dayId}|${occurrence.anchor}|${occurrence.kind}`;
    if (!occurrences[id].some(o => `${o.dayId}|${o.anchor}|${o.kind}` === key)) occurrences[id].push(occurrence);
  };

  data.days.forEach(day => {
    day.zones.forEach(zone => {
      zone.items.forEach((item, index) => {
        if (item.place && data.attractions[item.place]) {
          addOccurrence(item.place, {
            dayId:day.id, date:day.date, city:day.city, zone:zone.name, kind:'Tappa',
            label:item.title, anchor:`stop-${day.id}-${zone.id}-${item.place}-${index}`
          });
        }
      });
      zone.nearby.forEach(n => {
        if (data.attractions[n.place]) {
          addOccurrence(n.place, {
            dayId:day.id, date:day.date, city:day.city, zone:zone.name, kind:'Nei dintorni',
            label:data.attractions[n.place].name, anchor:`nearby-${day.id}-${zone.id}-${n.place}`
          });
        }
      });
    });
  });

  const types = [...new Set(Object.values(data.attractions).map(a => a.type))].sort((a,b) => a.localeCompare(b,'it'));
  typeFilter.innerHTML = `<option value="">Tutti i tipi</option>${types.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('')}`;
  cityFilter.innerHTML = `<option value="">Tutte le città</option>${Object.entries(data.cities).map(([id,c]) => `<option value="${id}">${esc(c.name)}</option>`).join('')}`;

  cityNav.innerHTML = Object.entries(data.cities).map(([id,c]) =>
    `<a href="#attr-city-${id}" data-city-nav="${id}"><span>${esc(c.cn)}</span> ${esc(c.name)}</a>`
  ).join('');

  function backlinks(a) {
    const list = occurrences[a.id] || [];
    return list.map(o =>
      `<a class="backlink" href="itinerario-dettagliato.html#${esc(o.anchor)}"><i class="ti ti-route"></i>${esc(o.date)} · ${esc(o.kind)}</a>`
    ).join('');
  }

  function card(a) {
    const city = data.cities[a.city];
    const occ = occurrences[a.id] || [];
    const firstRoute = occ[0] ? `itinerario-dettagliato.html#${occ[0].anchor}` : 'itinerario-dettagliato.html';
    const article = editorial?.compose ? editorial.compose(a, city) : {
      history:[a.history], anecdotes:[a.anecdote], practical:a.tip, words:0, minutes:2
    };
    const searchable = [
      a.name,a.cn,a.type,a.address,a.summary,a.history,a.anecdote,a.tip,city.name,
      ...article.history,...article.anecdotes,article.practical
    ].join(' ').toLowerCase();
    return `
      <article class="attraction-card" id="attr-${esc(a.id)}" data-city="${esc(a.city)}" data-type="${esc(a.type)}" data-search="${esc(searchable)}">
        <div class="attr-top">
          <div class="attr-tags"><span class="attr-tag">${esc(a.type)}</span><span class="attr-tag city">${esc(city.name)}</span></div>
          <div class="attr-title"><h3>${esc(a.name)}</h3><span class="attr-cn">${esc(a.cn)}</span></div>
          <p class="attr-summary">${esc(a.summary)}</p>
          <div class="attr-facts">
            <div class="attr-fact address"><span>Indirizzo</span><b>${esc(a.address)}</b></div>
            <div class="attr-fact"><span>Ingresso</span><b>${esc(a.price)}</b></div>
            <div class="attr-fact"><span>Tempo consigliato</span><b>${esc(a.duration)}</b></div>
            <div class="attr-fact"><span>Orari</span><b>${esc(a.hours)}</b></div>
            <div class="attr-fact"><span>Presenze nel piano</span><b>${occ.length} riferimento${occ.length === 1 ? '' : 'i'}</b></div>
          </div>
          <div class="attr-links">
            <a class="attr-link route" href="${firstRoute}"><i class="ti ti-route"></i>Itinerario</a>
            <a class="attr-link google" href="${googleMap(a)}" target="_blank" rel="noopener"><i class="ti ti-brand-google-maps"></i>Google Maps</a>
            <a class="attr-link amap" href="${amap(a)}" target="_blank" rel="noopener"><i class="ti ti-navigation"></i>高德 AMap</a>
            <a class="attr-link search" href="${googleSearch(a)}" target="_blank" rel="noopener"><i class="ti ti-search"></i>Google esatto</a>
            ${a.official ? `<a class="attr-link official" href="${esc(a.official)}" target="_blank" rel="noopener"><i class="ti ti-external-link"></i>${esc(a.officialLabel || 'Sito ufficiale')}</a>` : ''}
          </div>
        </div>
        <details class="attr-details">
          <summary><span>Leggi il mini-saggio</span><span class="read-time"><i class="ti ti-clock"></i>${article.minutes} min · ${article.words} parole</span></summary>
          <div class="attr-detail-body">
            <div class="essay-intro">
              <span class="essay-kicker">Guida culturale</span>
              <h4>${esc(a.name)}: storia, significato e chiavi di lettura</h4>
              <p>Un breve approfondimento da leggere prima della visita o durante una pausa, pensato per collegare ciò che si vede al contesto della città.</p>
            </div>
            <section class="story-block longform">
              <h4><i class="ti ti-books"></i>Storia e contesto</h4>
              ${article.history.map((paragraph, index) => `<p${index === 0 ? ' class="lead-paragraph"' : ''}>${esc(paragraph)}</p>`).join('')}
            </section>
            <section class="story-block longform anecdote-section">
              <h4><i class="ti ti-bulb"></i>Aneddoti e memoria del luogo</h4>
              ${article.anecdotes.map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}
            </section>
            <section class="story-block practical-note">
              <h4><i class="ti ti-compass"></i>Come osservarla durante la visita</h4>
              <p>${esc(article.practical)}</p>
            </section>
            <section class="story-block"><h4><i class="ti ti-link"></i>Collegamenti con l'itinerario</h4><div class="backlinks">${backlinks(a)}</div></section>
          </div>
        </details>
      </article>`;
  }

  root.innerHTML = Object.entries(data.cities).map(([cityId,city]) => {
    const list = Object.values(data.attractions).filter(a => a.city === cityId)
      .sort((a,b) => a.name.localeCompare(b.name,'it'));
    return `
      <section class="attraction-city" id="attr-city-${cityId}" data-city-section="${cityId}">
        <header class="attr-city-head">
          <span class="seal">${esc(city.cn)}</span>
          <div><h2>${esc(city.name)}</h2><p>${esc(city.intro)} · ${list.length} luoghi collegati al piano dettagliato.</p></div>
        </header>
        <div class="attractions-grid">${list.map(card).join('')}</div>
      </section>`;
  }).join('');

  function applyFilters() {
    const q = search.value.trim().toLowerCase();
    const city = cityFilter.value;
    const type = typeFilter.value;
    let visible = 0;
    document.querySelectorAll('.attraction-card').forEach(card => {
      const show = (!q || card.dataset.search.includes(q))
        && (!city || card.dataset.city === city)
        && (!type || card.dataset.type === type);
      card.classList.toggle('hidden', !show);
      if (show) visible += 1;
    });
    document.querySelectorAll('.attraction-city').forEach(section => {
      const hasVisible = [...section.querySelectorAll('.attraction-card')].some(c => !c.classList.contains('hidden'));
      section.classList.toggle('hidden', !hasVisible);
    });
    count.textContent = `${visible} ${visible === 1 ? 'attrazione' : 'attrazioni'}`;
    document.getElementById('no-attractions').classList.toggle('show', visible === 0);
  }
  [search,cityFilter,typeFilter].forEach(el => el.addEventListener('input', applyFilters));

  document.getElementById('expand-attractions')?.addEventListener('click', () => {
    document.querySelectorAll('.attr-details:not(.hidden)').forEach(d => d.open = true);
  });
  document.getElementById('collapse-attractions')?.addEventListener('click', () => {
    document.querySelectorAll('.attr-details').forEach(d => d.open = false);
  });

  const navLinks = [...cityNav.querySelectorAll('a')];
  const citySections = [...document.querySelectorAll('.attraction-city')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.cityNav === visible.target.dataset.citySection));
    }, {rootMargin:'-28% 0px -60% 0px',threshold:[0,.1,.3]});
    citySections.forEach(s => observer.observe(s));
  }

  function revealHash() {
    if (!location.hash.startsWith('#attr-')) return;
    search.value = '';
    cityFilter.value = '';
    typeFilter.value = '';
    applyFilters();
    const target = document.querySelector(location.hash);
    if (!target) return;
    const details = target.querySelector('.attr-details');
    if (details) details.open = true;
    target.classList.add('flash');
    setTimeout(() => target.classList.remove('flash'),2600);
    setTimeout(() => target.scrollIntoView({block:'center'}),100);
  }
  window.addEventListener('hashchange', revealHash);
  revealHash();
  applyFilters();
})();
