
const buttons=[...document.querySelectorAll('.filter-btn')];
const cards=[...document.querySelectorAll('.food-card')];
const search=document.querySelector('#food-search');
let category='all';
function applyFilters(){const q=(search?.value||'').trim().toLowerCase();cards.forEach(card=>{const matchCat=category==='all'||card.dataset.category===category;const matchText=!q||card.dataset.search.includes(q);card.classList.toggle('hidden',!(matchCat&&matchText));});document.querySelectorAll('.category').forEach(section=>{const visible=[...section.querySelectorAll('.food-card')].some(c=>!c.classList.contains('hidden'));section.classList.toggle('hidden',!visible);});}
buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');category=btn.dataset.filter;applyFilters();}));
search?.addEventListener('input',applyFilters);
const links=[...document.querySelectorAll('.city-nav a')];
const sections=[...document.querySelectorAll('.city-section')];
const observer=new IntersectionObserver(entries=>{const current=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!current)return;links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current.target.id));},{rootMargin:'-22% 0px -65% 0px',threshold:[0,.1,.3]});sections.forEach(s=>observer.observe(s));
