
(() => {
  const data = window.CHINA_TRAVEL_DATA;
  if (!data) return;

  const root = document.getElementById('itinerary-root');
  const nav = document.getElementById('day-nav');
  const cityNames = data.cities;

  const esc = (value = '') => String(value).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[ch]));

  const entity = id => data.attractions[id] || data.places[id];
  const isAttraction = id => Boolean(data.attractions[id]);

  const googleMap = obj => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(obj.mapQuery || obj.name)}`;
  const amap = obj => `https://uri.amap.com/search?keyword=${encodeURIComponent(obj.mapQuery || obj.name)}&city=${encodeURIComponent(obj.amapCity || obj.cityName || '')}&view=map&src=Cina2026&callnative=1`;
  const directions = route => {
    const resolved = route.map(entity).filter(Boolean);
    if (resolved.length < 2) return '';
    const unique = [];
    const seen = new Set();
    resolved.forEach(p => {
      const key = `${p.coords[0].toFixed(5)},${p.coords[1].toFixed(5)}`;
      if (!seen.has(key)) { seen.add(key); unique.push(p); }
    });
    if (unique.length < 2) return '';
    const limited = unique.length > 10
      ? [unique[0], ...unique.slice(1, 9), unique[unique.length - 1]]
      : unique;
    const origin = encodeURIComponent(limited[0].mapQuery || limited[0].name);
    const destination = encodeURIComponent(limited[limited.length - 1].mapQuery || limited[limited.length - 1].name);
    const waypoints = limited.slice(1, -1).map(p => encodeURIComponent(p.mapQuery || p.name)).join('|');
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}`;
  };

  const kindIcon = kind => ({
    transfer:'ti-arrows-transfer-down', train:'ti-train', flight:'ti-plane',
    meal:'ti-bowl-chopsticks', relax:'ti-armchair', visit:'ti-map-pin'
  }[kind] || 'ti-map-pin');

  const bikeLabel = status => ({
    yes:'Bici consigliata', no:'Bici sconsigliata', conditional:'Bici solo in parte'
  }[status] || 'Bici: valutare');

  function routeMarkup(day) {
    const seen = new Map();
    let number = 0;
    return day.route.map((id) => {
      const p = entity(id);
      if (!p) return '';
      if (seen.has(id)) {
        return `<div class="route-stop"><span class="route-no return">↩</span><div><b>${esc(p.name)}</b><small>Rientro / passaggio ripetuto</small></div></div>`;
      }
      number += 1;
      seen.set(id, number);
      const detail = isAttraction(id) ? data.attractions[id].type : (p.kind || 'tappa');
      return `<div class="route-stop"><span class="route-no">${number}</span><div><b>${esc(p.name)}</b><small>${esc(detail)}</small></div></div>`;
    }).join('');
  }

  function itemMarkup(day, zone, item, index) {
    const p = item.place ? entity(item.place) : null;
    const anchor = p ? `stop-${day.id}-${zone.id}-${item.place}-${index}` : '';
    const title = p && isAttraction(item.place)
      ? `<a href="attrazioni.html?v=20260722-4#attr-${esc(item.place)}">${esc(item.title)}</a>`
      : esc(item.title);
    const entityLine = p && item.title !== p.name
      ? `<div class="entity-name"><small>${esc(p.name)}</small></div>` : '';
    const transfer = [item.mode, item.transfer].filter(Boolean).map(text =>
      `<span class="transfer-chip"><i class="ti ti-route"></i>${esc(text)}</span>`
    ).join('');
    const links = p ? `
      <div class="item-links">
        ${isAttraction(item.place) ? `<a class="item-link details" href="attrazioni.html?v=20260722-4#attr-${esc(item.place)}"><i class="ti ti-info-circle"></i>Dettagli</a>` : ''}
        <a class="item-link google" href="${googleMap(p)}" target="_blank" rel="noopener"><i class="ti ti-brand-google-maps"></i>Google Maps</a>
        <a class="item-link amap" href="${amap(p)}" target="_blank" rel="noopener"><i class="ti ti-navigation"></i>高德 AMap</a>
      </div>` : '';
    return `
      <article class="timeline-item kind-${esc(item.kind)}" ${anchor ? `id="${anchor}"` : ''}>
        <time class="timeline-time">${esc(item.time)}</time>
        <span class="timeline-dot" aria-hidden="true"></span>
        <div class="timeline-card">
          <h4>${title}</h4>
          ${entityLine}
          <p>${esc(item.description)}</p>
          ${transfer ? `<div class="transfer-line">${transfer}</div>` : ''}
          ${item.note ? `<div class="item-note">${esc(item.note)}</div>` : ''}
          ${links}
        </div>
      </article>`;
  }

  function nearbyMarkup(day, zone) {
    if (!zone.nearby || !zone.nearby.length) return '';
    return `
      <aside class="nearby-eyelet">
        <h4><i class="ti ti-sparkles"></i>Altre idee nelle vicinanze</h4>
        <div class="nearby-grid">
          ${zone.nearby.map(n => {
            const a = data.attractions[n.place];
            if (!a) return '';
            const anchor = `nearby-${day.id}-${zone.id}-${n.place}`;
            return `<article class="nearby-card" id="${anchor}">
              <a href="attrazioni.html?v=20260722-4#attr-${esc(a.id)}">${esc(a.name)}</a>
              <span class="nearby-distance">${esc(n.distance)}</span>
              <p>${esc(n.reason)}</p>
              <div class="item-links">
                <a class="item-link google" href="${googleMap(a)}" target="_blank" rel="noopener">Google</a>
                <a class="item-link amap" href="${amap(a)}" target="_blank" rel="noopener">AMap</a>
              </div>
            </article>`;
          }).join('')}
        </div>
      </aside>`;
  }

  function dynamicMarkup(day) {
    if (!day.dynamic) return '';
    return `
      <section class="dynamic-tool" data-dynamic="${esc(day.id)}">
        <div class="dynamic-head">
          <label for="time-${esc(day.id)}"><i class="ti ti-clock-edit"></i> ${esc(day.dynamic.label)}</label>
          <input id="time-${esc(day.id)}" type="time" value="${esc(day.dynamic.default)}">
        </div>
        <div class="dynamic-events" aria-live="polite"></div>
      </section>`;
  }

  function dayMarkup(day, dayIndex) {
    const googleRoute = directions(day.route);
    const first = entity(day.route[0]);
    return `
      <section class="it-day" id="${esc(day.id)}" data-day="${esc(day.id)}">
        <header class="day-cover" data-cn="${esc(day.cn)}">
          <div class="day-kicker"><span class="day-number">${dayIndex + 1}</span>${esc(day.date)} · ${esc(day.weekday)} · ${esc(day.city)}</div>
          <h2>${esc(day.title)}</h2>
          <p class="day-intro">${esc(day.intro)}</p>
          <div class="day-meta">
            <span class="meta-chip"><i class="ti ti-bed"></i>${esc(day.sleep)}</span>
            <span class="meta-chip bike-${esc(day.bike.status)}"><i class="ti ti-bike"></i>${esc(bikeLabel(day.bike.status))}</span>
            <span class="meta-chip"><i class="ti ti-map-pin-number"></i>${new Set(day.route).size} punti in mappa</span>
          </div>
        </header>
        ${day.alert ? `<div class="day-alert"><strong><i class="ti ti-alert-triangle"></i>${esc(day.alert.title)}</strong>${esc(day.alert.text)}</div>` : ''}
        ${dynamicMarkup(day)}
        <div class="day-map-panel">
          <div class="map-frame">
            <div class="map-loading"><div><i class="ti ti-map-2"></i>Mappa giornaliera con tappe numerate</div></div>
            <div class="day-map" id="map-${esc(day.id)}" data-map-day="${esc(day.id)}" aria-label="Mappa del ${esc(day.date)}"></div>
          </div>
          <aside class="map-side">
            <div class="route-list">
              <h3><i class="ti ti-list-numbers"></i>Ordine delle tappe</h3>
              ${routeMarkup(day)}
            </div>
            <div class="map-actions">
              ${googleRoute ? `<a class="map-action google" href="${googleRoute}" target="_blank" rel="noopener"><i class="ti ti-route"></i>Sequenza Google</a>` : ''}
              ${first ? `<a class="map-action amap" href="${amap(first)}" target="_blank" rel="noopener"><i class="ti ti-navigation"></i>Prima tappa AMap</a>` : ''}
            </div>
            <p class="map-note">${esc(day.mapNote || data.meta.mapNote)}</p>
          </aside>
        </div>
        <div class="zones">
          ${day.zones.map(zone => `
            <details class="zone" id="zone-${esc(day.id)}-${esc(zone.id)}" open>
              <summary><span><span class="zone-title">${esc(zone.name)}</span><span class="zone-subtitle">${esc(zone.subtitle)}</span></span></summary>
              <div class="zone-body">
                <div class="timeline">
                  ${zone.items.map((item, index) => itemMarkup(day, zone, item, index)).join('')}
                </div>
                ${nearbyMarkup(day, zone)}
              </div>
            </details>`).join('')}
        </div>
        <aside class="bike-panel ${esc(day.bike.status)}">
          <i class="ti ti-bike"></i>
          <div><b>${esc(bikeLabel(day.bike.status))}</b><p>${esc(day.bike.text)}</p></div>
        </aside>
      </section>`;
  }

  nav.innerHTML = data.days.map((day, i) =>
    `<a href="#${esc(day.id)}" data-nav-day="${esc(day.id)}"><span class="nav-date">${esc(day.date.replace(' agosto',' ago'))}</span><span class="nav-city">${esc(day.city)}</span></a>`
  ).join('');

  root.innerHTML = data.days.map(dayMarkup).join('');

  function updateDynamic(section) {
    const dayId = section.dataset.dynamic;
    const day = data.days.find(d => d.id === dayId);
    const input = section.querySelector('input[type="time"]');
    const target = section.querySelector('.dynamic-events');
    if (!day || !input || !target) return;
    const [h, m] = input.value.split(':').map(Number);
    const base = h * 60 + m;
    const format = total => {
      total = ((total % 1440) + 1440) % 1440;
      return `${String(Math.floor(total / 60)).padStart(2,'0')}:${String(total % 60).padStart(2,'0')}`;
    };
    target.innerHTML = day.dynamic.events.map(ev =>
      `<span class="dynamic-event"><b>${format(base + ev.offset)}</b>${esc(ev.label)}</span>`
    ).join('');
  }
  document.querySelectorAll('[data-dynamic]').forEach(section => {
    updateDynamic(section);
    section.querySelector('input').addEventListener('input', () => updateDynamic(section));
  });

  document.getElementById('open-zones')?.addEventListener('click', () => {
    document.querySelectorAll('.zone').forEach(d => d.open = true);
  });
  document.getElementById('close-zones')?.addEventListener('click', () => {
    document.querySelectorAll('.zone').forEach(d => d.open = false);
  });
  document.getElementById('print-page')?.addEventListener('click', () => window.print());

  const navLinks = [...nav.querySelectorAll('a')];
  const sections = [...document.querySelectorAll('.it-day')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.navDay === visible.target.id));
    }, {rootMargin:'-28% 0px -60% 0px', threshold:[0,.1,.3]});
    sections.forEach(s => observer.observe(s));
  }

  const initialized = new Set();
  function initMap(dayId) {
    if (initialized.has(dayId)) return;
    initialized.add(dayId);
    const day = data.days.find(d => d.id === dayId);
    const el = document.getElementById(`map-${dayId}`);
    if (!day || !el) return;
    if (!window.L) {
      el.innerHTML = '<div class="map-loading"><div><i class="ti ti-map-off"></i>Mappa non disponibile offline. Usa i link Google Maps / AMap delle singole tappe.</div></div>';
      return;
    }
    const resolved = day.route.map(entity).filter(p => p && Array.isArray(p.coords));
    if (!resolved.length) return;
    const map = L.map(el, {scrollWheelZoom:false, zoomControl:true, attributionControl:true});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:19,
      attribution:'&copy; OpenStreetMap contributors'
    }).addTo(map);
    const firstIndex = new Map();
    let num = 0;
    resolved.forEach(p => {
      if (firstIndex.has(p.id)) return;
      num += 1;
      firstIndex.set(p.id, num);
      const icon = L.divIcon({
        className:'number-marker',
        html:`<span><b>${num}</b></span>`,
        iconSize:[30,30],
        iconAnchor:[15,29],
        popupAnchor:[0,-27]
      });
      const popup = `<b>${esc(p.name)}</b><br><small>${esc(p.address || '')}</small><br><a href="${googleMap(p)}" target="_blank" rel="noopener">Google Maps</a> · <a href="${amap(p)}" target="_blank" rel="noopener">AMap</a>`;
      L.marker(p.coords, {icon}).addTo(map).bindPopup(popup);
    });
    const line = resolved.map(p => p.coords);
    if (line.length > 1) L.polyline(line, {color:'#B72D24', weight:3, opacity:.72, dashArray: day.routeMode === 'flight' ? '9 8' : null}).addTo(map);
    const bounds = L.latLngBounds(line);
    map.fitBounds(bounds, {padding:[28,28], maxZoom:14});
    setTimeout(() => map.invalidateSize(), 120);
  }

  const mapEls = [...document.querySelectorAll('[data-map-day]')];
  if ('IntersectionObserver' in window) {
    const mapObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initMap(entry.target.dataset.mapDay);
          mapObserver.unobserve(entry.target);
        }
      });
    }, {rootMargin:'600px 0px'});
    mapEls.forEach(el => mapObserver.observe(el));
  } else {
    mapEls.forEach(el => initMap(el.dataset.mapDay));
  }

  if (location.hash) {
    setTimeout(() => {
      const target = document.querySelector(location.hash);
      if (target) {
        const details = target.closest('details');
        if (details) details.open = true;
        target.scrollIntoView({block:'center'});
      }
    }, 250);
  }
})();
