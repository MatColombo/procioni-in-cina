(() => {
  'use strict';
  const data = window.CHINA_PHRASES;
  if (!data) return;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const esc = (value='') => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
  const byContext = Object.fromEntries(data.categories.map(c => [c.id,c]));
  const phraseById = Object.fromEntries(data.phrases.map(p => [p.id,p]));
  const state = {
    context:'all', query:'', essentials:false, favoritesOnly:false, recentOnly:false,
    favorites:new Set(JSON.parse(localStorage.getItem('chinaPhraseFavorites') || '[]')),
    recent:JSON.parse(localStorage.getItem('chinaPhraseRecent') || '[]').filter(id => phraseById[id]).slice(0,20),
    pinyin:localStorage.getItem('chinaPhrasePinyin') !== '0',
    night:localStorage.getItem('chinaPhraseNight') === '1',
    visible:[], currentIndex:0, wakeLock:null
  };
  const root = $('#phrases-root');
  const contexts = $('#context-strip');
  const search = $('#phrase-search');
  const count = $('#phrase-count');
  const dialog = $('#phrase-dialog');
  const toast = $('#phrase-toast');
  let toastTimer;

  const googleTranslate = phrase => `https://translate.google.com/?sl=zh-CN&tl=it&text=${encodeURIComponent(phrase.zh)}&op=translate`;
  const saveFavorites = () => localStorage.setItem('chinaPhraseFavorites', JSON.stringify([...state.favorites]));
  const saveRecent = () => localStorage.setItem('chinaPhraseRecent', JSON.stringify(state.recent.slice(0,20)));
  function showToast(message) { toast.textContent=message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),1700); }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); showToast('Copiato negli appunti'); }
    catch { const area=document.createElement('textarea'); area.value=text; area.style.position='fixed'; area.style.opacity='0'; document.body.append(area); area.select(); document.execCommand('copy'); area.remove(); showToast('Copiato negli appunti'); }
  }
  function speak(phrase) {
    if (!('speechSynthesis' in window)) { showToast('Sintesi vocale non disponibile'); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.zh);
    utterance.lang='zh-CN'; utterance.rate=.82; utterance.pitch=1;
    const voices=window.speechSynthesis.getVoices();
    const zh=voices.find(v=>/^zh(-|_)/i.test(v.lang)); if(zh) utterance.voice=zh;
    window.speechSynthesis.speak(utterance); showToast('Riproduzione in cinese');
  }
  function addRecent(id) { state.recent=[id,...state.recent.filter(x=>x!==id)].slice(0,20); saveRecent(); if(state.recentOnly) applyFilters(); }
  function card(p) {
    const c=byContext[p.context];
    return `<article class="phrase-card${state.favorites.has(p.id)?' is-favorite':''}" id="phrase-${p.id}" data-id="${p.id}" data-context="${p.context}" data-search="${esc([p.zh,p.pinyin,p.it,c.name,...p.tags].join(' ').toLowerCase())}">
      <div class="phrase-card__top"><span class="phrase-context"><i class="ti ${c.icon}"></i> ${esc(c.name)}</span><button class="favorite-btn${state.favorites.has(p.id)?' active':''}" data-action="favorite" aria-label="Aggiungi ai preferiti"><i class="ti ${state.favorites.has(p.id)?'ti-star-filled':'ti-star'}"></i></button></div>
      <h3 class="phrase-zh" lang="zh-CN">${esc(p.zh)}</h3><p class="phrase-pinyin">${esc(p.pinyin)}</p><p class="phrase-it">${esc(p.it)}</p>
      <div class="tag-list">${p.tags.map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}${p.essential?'<span class="tag">#essenziale</span>':''}</div>
      <div class="phrase-actions"><button class="phrase-action big" data-action="open"><i class="ti ti-maximize"></i>Grande</button><button class="phrase-action" data-action="copy"><i class="ti ti-copy"></i>Copia</button><button class="phrase-action" data-action="speak"><i class="ti ti-volume"></i>Audio</button><a class="phrase-action" data-action="translate" href="${googleTranslate(p)}" target="_blank" rel="noopener"><i class="ti ti-language"></i>Translate</a></div>
    </article>`;
  }
  function render() {
    const sections=data.categories.map(c=>{
      const list=data.phrases.filter(p=>p.context===c.id);
      return `<section class="phrase-section" data-section="${c.id}" id="context-${c.id}"><header class="phrase-section-head"><h2><span>${esc(c.cn)}</span>${esc(c.name)}</h2><p>${list.length} frasi</p></header><div class="phrase-grid">${list.map(card).join('')}</div></section>`;
    }).join('');
    root.innerHTML=sections;
    contexts.innerHTML=`<button class="context-chip active" data-context="all"><span class="cn">全</span> Tutte <small>${data.phrases.length}</small></button>`+data.categories.map(c=>`<button class="context-chip" data-context="${c.id}"><i class="ti ${c.icon}"></i><span class="cn">${esc(c.cn)}</span>${esc(c.name)}<small>${c.count}</small></button>`).join('');
    applyViewPrefs(); applyFilters();
  }
  function filteredPhrases() {
    const q=state.query.trim().toLowerCase();
    return data.phrases.filter(p=>{
      const c=byContext[p.context];
      const hay=[p.zh,p.pinyin,p.it,c.name,...p.tags].join(' ').toLowerCase();
      return (state.context==='all'||p.context===state.context) && (!q||hay.includes(q)) && (!state.essentials||p.essential) && (!state.favoritesOnly||state.favorites.has(p.id)) && (!state.recentOnly||state.recent.includes(p.id));
    });
  }
  function applyFilters() {
    state.visible=filteredPhrases(); const visibleIds=new Set(state.visible.map(p=>p.id));
    $$('.phrase-card').forEach(el=>el.classList.toggle('hidden',!visibleIds.has(el.dataset.id)));
    $$('.phrase-section').forEach(section=>section.classList.toggle('hidden',!$$('.phrase-card:not(.hidden)',section).length));
    count.textContent=`${state.visible.length} ${state.visible.length===1?'frase':'frasi'}`;
    $('#phrase-empty').classList.toggle('show',state.visible.length===0);
    $$('.context-chip').forEach(b=>b.classList.toggle('active',b.dataset.context===state.context));
    $('#essential-toggle').classList.toggle('active',state.essentials);
    $('#favorites-toggle').classList.toggle('active',state.favoritesOnly);
    $('#recent-toggle').classList.toggle('active',state.recentOnly);
  }
  function applyViewPrefs(){document.body.classList.toggle('hide-pinyin',!state.pinyin);document.body.classList.toggle('night-mode',state.night);$('#pinyin-toggle').classList.toggle('active',state.pinyin);$('#night-toggle').classList.toggle('active',state.night)}
  function toggleFavorite(id) { state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id); saveFavorites(); const cardEl=$(`[data-id="${id}"]`); cardEl?.classList.toggle('is-favorite',state.favorites.has(id)); const btn=cardEl?.querySelector('[data-action="favorite"]'); if(btn){btn.classList.toggle('active',state.favorites.has(id));btn.innerHTML=`<i class="ti ${state.favorites.has(id)?'ti-star-filled':'ti-star'}"></i>`} if(dialog.open&&state.visible[state.currentIndex]?.id===id) updateDialog(); if(state.favoritesOnly) applyFilters(); showToast(state.favorites.has(id)?'Aggiunta ai preferiti':'Rimossa dai preferiti'); }
  async function requestWakeLock(){try{if('wakeLock'in navigator)state.wakeLock=await navigator.wakeLock.request('screen')}catch{} }
  async function releaseWakeLock(){try{await state.wakeLock?.release()}catch{}state.wakeLock=null}
  function openPhrase(id) { const idx=Math.max(0,state.visible.findIndex(p=>p.id===id)); state.currentIndex=idx; addRecent(id); updateDialog(); dialog.showModal(); requestWakeLock(); dialog.querySelector('.display-main').focus({preventScroll:true}); }
  function updateDialog() {
    const p=state.visible[state.currentIndex]||state.visible[0]; if(!p)return; const c=byContext[p.context];
    $('#display-context').innerHTML=`<i class="ti ${c.icon}"></i> ${esc(c.name)}`; $('#display-zh').textContent=p.zh; $('#display-pinyin').textContent=p.pinyin; $('#display-it').textContent=p.it; $('#display-tags').innerHTML=p.tags.map(t=>`<span class="tag">#${esc(t)}</span>`).join(''); $('#display-index').textContent=`${state.currentIndex+1} / ${state.visible.length}`; $('#display-translate').href=googleTranslate(p); $('#display-favorite').classList.toggle('active',state.favorites.has(p.id)); $('#display-favorite').innerHTML=`<i class="ti ${state.favorites.has(p.id)?'ti-star-filled':'ti-star'}"></i>`; dialog.dataset.phraseId=p.id;
  }
  function moveDialog(delta){if(!state.visible.length)return;state.currentIndex=(state.currentIndex+delta+state.visible.length)%state.visible.length;addRecent(state.visible[state.currentIndex].id);updateDialog()}

  render();
  search.addEventListener('input',()=>{state.query=search.value;applyFilters()});
  contexts.addEventListener('click',e=>{const b=e.target.closest('[data-context]');if(!b)return;state.context=b.dataset.context;applyFilters();document.querySelector('.phrase-toolbar').scrollIntoView({behavior:'smooth',block:'start'})});
  $('#essential-toggle').addEventListener('click',()=>{state.essentials=!state.essentials;applyFilters()});
  $('#favorites-toggle').addEventListener('click',()=>{state.favoritesOnly=!state.favoritesOnly;applyFilters()});
  $('#recent-toggle').addEventListener('click',()=>{state.recentOnly=!state.recentOnly;applyFilters()});
  $('#reset-phrases').addEventListener('click',()=>{state.context='all';state.query='';state.essentials=false;state.favoritesOnly=false;state.recentOnly=false;search.value='';applyFilters();search.focus()});
  $('#pinyin-toggle').addEventListener('click',()=>{state.pinyin=!state.pinyin;localStorage.setItem('chinaPhrasePinyin',state.pinyin?'1':'0');applyViewPrefs()});
  $('#night-toggle').addEventListener('click',()=>{state.night=!state.night;localStorage.setItem('chinaPhraseNight',state.night?'1':'0');applyViewPrefs()});
  root.addEventListener('click',e=>{const action=e.target.closest('[data-action]');if(!action)return;const cardEl=e.target.closest('.phrase-card');const p=phraseById[cardEl?.dataset.id];if(!p)return;if(action.dataset.action==='favorite')toggleFavorite(p.id);if(action.dataset.action==='open')openPhrase(p.id);if(action.dataset.action==='copy')copyText(p.zh);if(action.dataset.action==='speak')speak(p)});
  $('#display-close').addEventListener('click',()=>dialog.close()); $('#display-prev').addEventListener('click',()=>moveDialog(-1)); $('#display-next').addEventListener('click',()=>moveDialog(1)); $('#display-copy').addEventListener('click',()=>copyText(state.visible[state.currentIndex].zh)); $('#display-copy-all').addEventListener('click',()=>{const p=state.visible[state.currentIndex];copyText(`${p.zh}\n${p.pinyin}\n${p.it}`)}); $('#display-speak').addEventListener('click',()=>speak(state.visible[state.currentIndex])); $('#display-favorite').addEventListener('click',()=>toggleFavorite(state.visible[state.currentIndex].id));
  $('#display-fullscreen').addEventListener('click',async()=>{try{if(!document.fullscreenElement)await dialog.requestFullscreen?.();else await document.exitFullscreen?.()}catch{showToast('La modalità cartello è già a schermo intero')}});
  dialog.addEventListener('close',()=>{window.speechSynthesis?.cancel?.();releaseWakeLock()});
  document.addEventListener('keydown',e=>{if(!dialog.open)return;if(e.key==='ArrowLeft')moveDialog(-1);if(e.key==='ArrowRight')moveDialog(1);if(e.key==='c')copyText(state.visible[state.currentIndex].zh);if(e.key===' ') {e.preventDefault();speak(state.visible[state.currentIndex])}});
  let touchX=0;dialog.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});dialog.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>55)moveDialog(d>0?-1:1)},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&dialog.open)requestWakeLock()});
})();
