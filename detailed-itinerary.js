
/* Shared styles for the detailed itinerary and attractions pages. */
.itinerary-page .hero:before{content:"程"}
.attractions-page .hero:before{content:"景"}
.itinerary-page .hero,.attractions-page .hero{min-height:310px}
.hero .hero-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}
.hero .hero-action{display:inline-flex;align-items:center;gap:7px;text-decoration:none;border:1px solid rgba(255,248,229,.30);background:rgba(255,248,229,.10);padding:9px 13px;border-radius:999px;font:600 11px 'IBM Plex Mono',monospace;color:#FFF8E6}
.hero .hero-action:hover{background:rgba(255,248,229,.18)}
.page-note{font-size:12.5px;color:var(--muted);margin:7px 0 0}
.content-wide{min-width:0}
.sidebar .day-nav{display:flex;flex-direction:column;gap:4px;margin-top:10px;max-height:calc(100vh - 180px);overflow:auto;padding-right:3px}
.sidebar .day-nav a{display:grid;grid-template-columns:52px minmax(0,1fr);gap:7px;text-decoration:none;border:1px solid transparent;border-radius:11px;padding:8px 7px;font-size:12px;line-height:1.25}
.sidebar .day-nav a:hover{background:var(--gold-light)}
.sidebar .day-nav a.active{background:var(--seal);color:#fff}
.sidebar .day-nav .nav-date{font:600 10.5px 'IBM Plex Mono',monospace}
.sidebar .day-nav .nav-city{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.legend-mini{display:grid;gap:7px;margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}
.legend-mini span{display:flex;align-items:center;gap:7px;font-size:10.5px;color:var(--muted)}
.legend-dot{width:9px;height:9px;border-radius:50%;flex:0 0 auto}
.legend-dot.core{background:var(--seal)}
.legend-dot.extra{background:var(--gold)}
.legend-dot.transfer{background:var(--jade)}
.page-tools{position:sticky;top:58px;z-index:32;display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:rgba(248,241,227,.94);backdrop-filter:blur(14px);border:1px solid var(--line);box-shadow:0 8px 24px rgba(73,35,22,.07);border-radius:16px;padding:10px;margin-bottom:20px}
.tool-btn{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(183,45,36,.22);background:#FFF8E8;color:var(--seal-dark);border-radius:999px;padding:8px 11px;font:600 10.5px 'IBM Plex Mono',monospace;cursor:pointer}
.tool-btn:hover,.tool-btn.active{background:var(--seal);color:#fff}
.tools-spacer{flex:1}
.updated-pill{font:600 10px 'IBM Plex Mono',monospace;color:var(--jade-dark);background:var(--jade-light);border-radius:999px;padding:7px 10px}
.it-day{scroll-margin-top:126px;margin:0 0 42px;background:rgba(255,253,247,.90);border:1px solid rgba(73,45,31,.13);border-radius:22px;box-shadow:var(--shadow);overflow:hidden}
.day-cover{position:relative;padding:21px 22px 18px;background:linear-gradient(135deg,#FFF9E9 0%,#F5E3C0 100%);border-bottom:1px solid rgba(196,154,47,.25)}
.day-cover:after{content:attr(data-cn);position:absolute;right:16px;top:-25px;font:700 110px 'Noto Serif TC',serif;color:rgba(183,45,36,.065);pointer-events:none}
.day-kicker{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font:600 11px 'IBM Plex Mono',monospace;color:var(--seal-dark);text-transform:uppercase;letter-spacing:.06em}
.day-number{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--seal);color:white}
.day-cover h2{position:relative;font:700 clamp(25px,4vw,38px) 'Noto Serif TC',serif;line-height:1.1;margin:9px 0 7px;max-width:780px}
.day-intro{position:relative;max-width:790px;color:var(--muted);font-size:13.5px;margin:0}
.day-meta{position:relative;display:flex;flex-wrap:wrap;gap:7px;margin-top:13px}
.meta-chip{display:inline-flex;align-items:center;gap:5px;background:rgba(255,253,247,.74);border:1px solid rgba(73,45,31,.12);border-radius:999px;padding:6px 9px;font:600 10.5px 'IBM Plex Mono',monospace;color:var(--jade-dark)}
.meta-chip.bike-yes{background:var(--jade-light);color:var(--jade-dark)}
.meta-chip.bike-no{background:var(--seal-light);color:var(--seal-dark)}
.meta-chip.bike-conditional{background:var(--gold-light);color:#76570d}
.day-alert{margin:16px 20px 0;border:1px solid rgba(183,45,36,.22);border-left:4px solid var(--seal);background:#FFF4EE;border-radius:13px;padding:12px 14px;font-size:12.5px;color:#6d312d}
.day-alert strong{display:flex;align-items:center;gap:6px;color:var(--seal-dark);margin-bottom:3px}
.dynamic-tool{margin:16px 20px 0;background:linear-gradient(135deg,var(--jade-light),#F5EEDB);border:1px solid rgba(33,106,88,.18);border-radius:14px;padding:12px 14px}
.dynamic-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.dynamic-head label{font:600 11px 'IBM Plex Mono',monospace;color:var(--jade-dark)}
.dynamic-head input{border:1px solid rgba(33,106,88,.25);background:white;border-radius:9px;padding:7px 9px;font:600 13px 'IBM Plex Mono',monospace;color:var(--ink)}
.dynamic-events{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}
.dynamic-event{background:rgba(255,255,255,.72);border:1px solid rgba(33,106,88,.15);border-radius:9px;padding:6px 8px;font-size:10.5px;color:var(--muted)}
.dynamic-event b{font:600 11px 'IBM Plex Mono',monospace;color:var(--jade-dark);margin-right:4px}
.day-map-panel{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(230px,.75fr);gap:14px;padding:18px 20px 4px}
.map-frame{position:relative;min-height:360px;border-radius:17px;overflow:hidden;border:1px solid rgba(33,106,88,.18);background:linear-gradient(135deg,#E9F0E9,#F4EAD6)}
.day-map{height:360px;width:100%;z-index:1}
.map-loading{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:30px;color:var(--jade-dark);font-size:12px;z-index:0}
.map-loading i{display:block;font-size:30px;margin-bottom:7px}
.map-side{display:flex;flex-direction:column;gap:10px}
.route-list{background:#FBF5E8;border:1px solid rgba(196,154,47,.20);border-radius:15px;padding:12px}
.route-list h3{display:flex;align-items:center;gap:7px;font:700 15px 'Noto Serif TC',serif;color:var(--seal-dark);margin:0 0 9px}
.route-stop{display:grid;grid-template-columns:26px minmax(0,1fr);gap:8px;align-items:start;padding:6px 0;border-top:1px dashed rgba(73,45,31,.12);font-size:11.5px}
.route-stop:first-of-type{border-top:0}
.route-no{display:grid;place-items:center;width:23px;height:23px;border-radius:50%;background:var(--seal);color:#fff;font:600 10px 'IBM Plex Mono',monospace}
.route-no.return{background:var(--gold);font-size:14px}
.route-stop b{display:block;font-size:11.5px;line-height:1.3}
.route-stop small{display:block;color:var(--muted);line-height:1.35;margin-top:2px}
.map-actions{display:flex;gap:6px;flex-wrap:wrap}
.map-action{display:inline-flex;align-items:center;gap:5px;text-decoration:none;border-radius:999px;padding:7px 9px;font:600 10px 'IBM Plex Mono',monospace;border:1px solid}
.map-action.google{color:#245DB0;border-color:rgba(52,105,210,.25);background:#F5F8FF}
.map-action.amap{color:#1677A5;border-color:rgba(22,119,165,.25);background:#F2FBFF}
.map-note{font-size:10.5px;color:var(--muted);line-height:1.45;padding:2px 3px}
.number-marker{background:none!important;border:0!important}
.number-marker span{display:grid;place-items:center;width:29px;height:29px;border-radius:50% 50% 50% 5px;transform:rotate(-45deg);background:var(--seal);color:#fff;border:2px solid #FFF9E9;box-shadow:0 4px 12px rgba(70,20,20,.28);font:700 11px 'IBM Plex Mono',monospace}
.number-marker span b{transform:rotate(45deg)}
.leaflet-popup-content-wrapper{border-radius:12px;font-family:'IBM Plex Sans',sans-serif}
.leaflet-popup-content{font-size:12px;line-height:1.4}
.zones{padding:12px 20px 22px}
.zone{border:1px solid rgba(73,45,31,.12);border-radius:16px;background:rgba(255,255,255,.54);margin-top:12px;overflow:hidden}
.zone[open]{background:rgba(255,253,247,.94)}
.zone summary{list-style:none;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px 16px;cursor:pointer}
.zone summary::-webkit-details-marker{display:none}
.zone summary:after{content:"+";display:grid;place-items:center;width:27px;height:27px;border-radius:50%;background:var(--gold-light);color:#76570d;font:700 17px 'IBM Plex Mono',monospace}
.zone[open] summary:after{content:"−"}
.zone-title{font:700 18px 'Noto Serif TC',serif;color:var(--seal-dark)}
.zone-subtitle{display:block;font-size:11.5px;color:var(--muted);margin-top:2px}
.zone-body{padding:0 16px 16px}
.timeline{position:relative;margin:3px 0 0}
.timeline:before{content:"";position:absolute;left:50px;top:8px;bottom:8px;width:2px;background:linear-gradient(var(--seal),var(--gold),var(--jade))}
.timeline-item{position:relative;display:grid;grid-template-columns:42px 18px minmax(0,1fr);gap:8px;padding:9px 0}
.timeline-time{font:600 10px 'IBM Plex Mono',monospace;color:var(--seal-dark);text-align:right;line-height:1.35;padding-top:2px;white-space:normal}
.timeline-dot{position:relative;z-index:1;width:13px;height:13px;border-radius:50%;margin:2px auto 0;background:var(--seal);border:3px solid #FFFDF7;box-shadow:0 0 0 1px rgba(183,45,36,.25)}
.timeline-item.kind-transfer .timeline-dot,.timeline-item.kind-train .timeline-dot,.timeline-item.kind-flight .timeline-dot{background:var(--jade)}
.timeline-item.kind-relax .timeline-dot,.timeline-item.kind-meal .timeline-dot{background:var(--gold)}
.timeline-card{background:#FFFDF8;border:1px solid rgba(73,45,31,.10);border-radius:13px;padding:11px 12px;min-width:0}
.timeline-card h4{font:700 15px 'Noto Serif TC',serif;margin:0 0 4px;line-height:1.3}
.timeline-card h4 a{text-decoration:none;color:var(--seal-dark);border-bottom:1px dotted rgba(183,45,36,.35)}
.timeline-card p{font-size:12px;color:var(--muted);margin:0;line-height:1.48}
.timeline-card .item-note{margin-top:7px;padding:7px 8px;border-radius:9px;background:var(--gold-light);color:#6c5417;font-size:10.5px}
.transfer-line{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.transfer-chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:5px 7px;font:600 9.5px 'IBM Plex Mono',monospace;background:var(--jade-light);color:var(--jade-dark)}
.item-links{display:flex;gap:5px;flex-wrap:wrap;margin-top:9px}
.item-link{display:inline-flex;align-items:center;gap:4px;text-decoration:none;border-radius:999px;padding:6px 8px;font:600 9.5px 'IBM Plex Mono',monospace;border:1px solid rgba(73,45,31,.14);background:#fff}
.item-link.details{color:var(--seal-dark);background:var(--seal-light);border-color:rgba(183,45,36,.18)}
.item-link.google{color:#245DB0;background:#F5F8FF;border-color:rgba(52,105,210,.22)}
.item-link.amap{color:#1677A5;background:#F2FBFF;border-color:rgba(22,119,165,.22)}
.nearby-eyelet{margin-top:14px;border:1px dashed rgba(196,154,47,.45);background:linear-gradient(135deg,#FFF9E9,#F7E8C8);border-radius:14px;padding:12px}
.nearby-eyelet h4{display:flex;align-items:center;gap:6px;font:700 14px 'Noto Serif TC',serif;color:#76570d;margin:0 0 8px}
.nearby-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
.nearby-card{scroll-margin-top:150px;background:rgba(255,255,255,.75);border:1px solid rgba(196,154,47,.22);border-radius:11px;padding:9px}
.nearby-card a{font:700 12px 'Noto Serif TC',serif;color:var(--seal-dark);text-decoration:none}
.nearby-distance{display:block;font:600 9.5px 'IBM Plex Mono',monospace;color:#76570d;margin:3px 0}
.nearby-card p{font-size:10.5px;color:var(--muted);line-height:1.4;margin:0}
.bike-panel{margin:0 20px 20px;display:flex;align-items:flex-start;gap:10px;border-radius:14px;padding:12px 14px;border:1px solid rgba(33,106,88,.18);background:var(--jade-light)}
.bike-panel.no{background:var(--seal-light);border-color:rgba(183,45,36,.16)}
.bike-panel.conditional{background:var(--gold-light);border-color:rgba(196,154,47,.22)}
.bike-panel i{font-size:21px;color:var(--jade-dark);margin-top:1px}
.bike-panel.no i{color:var(--seal-dark)}
.bike-panel.conditional i{color:#76570d}
.bike-panel b{display:block;font:700 13px 'Noto Serif TC',serif}
.bike-panel p{font-size:11.5px;color:var(--muted);margin:2px 0 0}
.source-box{margin-top:36px;background:rgba(255,253,247,.83);border:1px solid var(--line);border-top:4px solid var(--gold);border-radius:18px;padding:17px;box-shadow:var(--shadow)}
.source-box h2{font:700 20px 'Noto Serif TC',serif;margin:0 0 8px}
.source-box p,.source-box li{font-size:12px;color:var(--muted)}
.source-box a{color:var(--seal-dark)}
/* Attractions */
.attraction-controls{position:sticky;top:57px;z-index:32;display:grid;grid-template-columns:minmax(220px,1fr) auto auto auto;gap:8px;background:rgba(248,241,227,.94);backdrop-filter:blur(14px);border:1px solid var(--line);box-shadow:0 8px 24px rgba(73,35,22,.07);border-radius:16px;padding:10px;margin-bottom:22px}
.attraction-controls input,.attraction-controls select{border:1px solid var(--line);background:#fff;border-radius:10px;padding:9px 10px;font:13px 'IBM Plex Sans',sans-serif;color:var(--ink);min-width:0}
.attraction-count{display:flex;align-items:center;justify-content:center;background:var(--jade-light);color:var(--jade-dark);border-radius:10px;padding:8px 10px;font:600 10px 'IBM Plex Mono',monospace;white-space:nowrap}
.attraction-city{scroll-margin-top:132px;margin:34px 0 50px}
.attr-city-head{display:flex;align-items:flex-start;gap:13px;margin-bottom:14px}
.attr-city-head .seal{width:56px;height:56px;font-size:21px}
.attr-city-head h2{font:700 clamp(27px,4vw,39px) 'Noto Serif TC',serif;margin:0}
.attr-city-head p{font-size:13px;color:var(--muted);margin:3px 0 0}
.attractions-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
.attraction-card{scroll-margin-top:135px;background:rgba(255,253,247,.95);border:1px solid rgba(73,45,31,.12);border-radius:18px;box-shadow:var(--shadow);overflow:hidden;transition:.18s ease}
.attraction-card:hover{transform:translateY(-2px)}
.attraction-card.flash{animation:cardFlash 2.4s ease}
@keyframes cardFlash{0%,35%{box-shadow:0 0 0 4px rgba(196,154,47,.55),var(--shadow)}100%{box-shadow:var(--shadow)}}
.attr-top{padding:15px 16px 12px}
.attr-tags{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px}
.attr-tag{font:600 9.5px 'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.04em;padding:4px 7px;border-radius:999px;background:var(--gold-light);color:#76570d}
.attr-tag.city{background:var(--jade-light);color:var(--jade-dark)}
.attr-title{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}
.attr-title h3{font:700 18px 'Noto Serif TC',serif;line-height:1.25;margin:0}
.attr-cn{font:700 15px 'Noto Serif TC',serif;color:var(--seal);white-space:nowrap}
.attr-summary{font-size:12.5px;color:var(--muted);margin:8px 0 0}
.attr-facts{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:11px}
.attr-fact{background:#FBF4E7;border:1px solid rgba(196,154,47,.15);border-radius:10px;padding:8px}
.attr-fact.address{grid-column:1/-1}
.attr-fact span{display:block;font:600 9px 'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
.attr-fact b{display:block;font-size:11px;line-height:1.35;margin-top:2px}
.attr-links{display:flex;gap:5px;flex-wrap:wrap;margin-top:11px}
.attr-link{display:inline-flex;align-items:center;gap:4px;text-decoration:none;border:1px solid;border-radius:999px;padding:6px 8px;font:600 9.5px 'IBM Plex Mono',monospace}
.attr-link.google{color:#245DB0;border-color:rgba(52,105,210,.24);background:#F5F8FF}
.attr-link.amap{color:#1677A5;border-color:rgba(22,119,165,.24);background:#F2FBFF}
.attr-link.official{color:var(--jade-dark);border-color:rgba(33,106,88,.22);background:var(--jade-light)}
.attr-link.search{color:#5C4D42;border-color:rgba(73,45,31,.18);background:#F8F3EA}
.attr-link.route{color:var(--seal-dark);border-color:rgba(183,45,36,.20);background:var(--seal-light)}
.attr-details{border-top:1px solid var(--line);background:#FFF9EE}
.attr-details summary{list-style:none;display:flex;justify-content:space-between;gap:8px;align-items:center;padding:10px 16px;cursor:pointer;font:600 10.5px 'IBM Plex Mono',monospace;color:var(--seal-dark)}
.attr-details summary::-webkit-details-marker{display:none}
.attr-details summary:after{content:"+";font-size:16px}
.attr-details[open] summary:after{content:"−"}
.attr-detail-body{padding:0 16px 15px}
.story-block{padding:9px 0;border-top:1px dashed rgba(73,45,31,.13)}
.story-block:first-child{border-top:0}
.story-block h4{display:flex;align-items:center;gap:5px;font:700 13px 'Noto Serif TC',serif;margin:0 0 3px;color:var(--seal-dark)}
.story-block p{font-size:11.5px;color:var(--muted);line-height:1.5;margin:0}
.backlinks{display:flex;gap:5px;flex-wrap:wrap;margin-top:9px}
.backlink{display:inline-flex;align-items:center;gap:4px;text-decoration:none;border-radius:999px;background:var(--seal-light);color:var(--seal-dark);padding:6px 8px;font:600 9px 'IBM Plex Mono',monospace}
.no-results{display:none;background:rgba(255,253,247,.85);border:1px solid var(--line);border-radius:18px;padding:30px;text-align:center;box-shadow:var(--shadow)}
.no-results.show{display:block}
.attr-source-note{margin-bottom:20px}
/* Shared focus target */
:target{scroll-margin-top:140px}
@media(max-width:980px){
  .day-map-panel{grid-template-columns:1fr}
  .map-side{display:grid;grid-template-columns:1fr 1fr}
  .nearby-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:860px){
  .sidebar .day-nav{flex-direction:row;max-height:none;overflow-x:auto;margin:0}
  .sidebar .day-nav a{grid-template-columns:auto;gap:2px;min-width:105px;background:rgba(255,255,255,.72);border-color:var(--line)}
  .sidebar .day-nav .nav-city{white-space:normal}
  .legend-mini{display:none}
  .page-tools,.attraction-controls{top:108px}
  .it-day,.attraction-city{scroll-margin-top:178px}
  .attraction-card{scroll-margin-top:180px}
}
@media(max-width:720px){
  .day-cover{padding:18px 16px 16px}
  .day-alert,.dynamic-tool{margin-left:14px;margin-right:14px}
  .day-map-panel{padding:14px 14px 3px}
  .zones{padding:9px 14px 16px}
  .bike-panel{margin-left:14px;margin-right:14px}
  .map-side{display:flex}
  .nearby-grid{grid-template-columns:1fr}
  .attraction-controls{grid-template-columns:1fr 1fr}
  .attraction-controls input{grid-column:1/-1}
  .attraction-count{grid-column:1/-1}
  .attractions-grid{grid-template-columns:1fr}
}
@media(max-width:520px){
  .itinerary-page .hero,.attractions-page .hero{min-height:0}
  .day-cover:after{font-size:78px;top:-12px}
  .day-map{height:300px}.map-frame{min-height:300px}
  .timeline:before{left:42px}
  .timeline-item{grid-template-columns:34px 16px minmax(0,1fr);gap:6px}
  .timeline-time{font-size:9px}
  .timeline-card{padding:10px}
  .zone summary{padding:12px}
  .zone-body{padding:0 11px 12px}
  .attraction-controls{grid-template-columns:1fr}
  .attraction-controls input,.attraction-controls select,.attraction-count{grid-column:auto}
  .attr-facts{grid-template-columns:1fr}
  .attr-fact.address{grid-column:auto}
}
@media print{
  .quicknav,.sidebar,.page-tools,.attraction-controls,.hero-actions,.map-actions{display:none!important}
  .shell{display:block;max-width:none}
  .it-day,.attraction-card{box-shadow:none;break-inside:avoid}
  .zone{break-inside:avoid}
  .zone:not([open]) .zone-body,.attr-details:not([open]) .attr-detail-body{display:block}
  .day-map-panel{grid-template-columns:1fr}
  .day-map{height:260px}
}

/* Long-form attraction essays */
.attr-details summary{padding:13px 16px;align-items:center}
.attr-details summary>span:first-child{font-size:11.5px;letter-spacing:.02em}
.attr-details summary .read-time{display:inline-flex;align-items:center;gap:5px;margin-left:auto;margin-right:8px;color:var(--muted);font-weight:500;white-space:nowrap}
.attr-details summary .read-time i{font-size:14px;color:var(--gold)}
.attr-detail-body{padding:0 18px 20px}
.essay-intro{margin:3px -2px 17px;padding:17px 18px 16px;border-radius:12px;background:linear-gradient(135deg,rgba(143,29,29,.08),rgba(169,130,44,.11));border:1px solid rgba(143,29,29,.12)}
.essay-intro .essay-kicker{display:block;margin-bottom:5px;font:600 10px 'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.11em;color:var(--seal)}
.essay-intro h4{margin:0 0 6px;font:700 18px/1.25 'Noto Serif TC',serif;color:var(--ink)}
.essay-intro p{margin:0;font-size:12.5px;line-height:1.55;color:var(--muted)}
.story-block{padding:15px 0;border-top:1px dashed rgba(73,45,31,.16)}
.story-block h4{font-size:15px;margin-bottom:9px}
.story-block.longform p,.story-block.practical-note p{font-size:13.5px;line-height:1.78;color:#51483f;margin:0 0 12px;max-width:76ch}
.story-block.longform p:last-child,.story-block.practical-note p:last-child{margin-bottom:0}
.story-block.longform .lead-paragraph::first-letter{float:left;font:700 40px/.82 'Noto Serif TC',serif;color:var(--seal);padding:7px 7px 0 0}
.anecdote-section{position:relative}
.anecdote-section:before{content:'“';position:absolute;right:5px;top:1px;font:700 58px/1 'Noto Serif TC',serif;color:rgba(169,130,44,.16)}
.practical-note{margin-top:3px;padding:14px 15px;background:rgba(63,99,85,.07);border:1px solid rgba(63,99,85,.13);border-radius:10px}
.practical-note h4{color:var(--jade-dark)}
@media (max-width:680px){
  .attr-details summary{flex-wrap:wrap}
  .attr-details summary .read-time{order:3;width:100%;margin:2px 0 0;font-size:9.5px}
  .attr-detail-body{padding:0 14px 16px}
  .essay-intro{padding:15px}
  .essay-intro h4{font-size:16px}
  .story-block.longform p,.story-block.practical-note p{font-size:13px;line-height:1.72}
}
