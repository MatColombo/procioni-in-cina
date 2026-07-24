/* Remote editorial photos shared by Cibi, Itinerario dettagliato and Attrazioni. */
.remote-photo{
  position:relative;
  margin:0 0 13px;
  border-radius:14px;
  overflow:hidden;
  background:linear-gradient(135deg,#ead9bc,#f9f1df);
  border:1px solid rgba(87,48,31,.13);
  aspect-ratio:16/10;
  isolation:isolate;
}
.remote-photo.compact{aspect-ratio:16/9;margin:0 0 10px}
.remote-photo a{display:block;width:100%;height:100%;text-decoration:none}
.remote-photo img{display:block;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.015);transition:opacity .35s ease,transform .5s ease;background:#eadfca}
.remote-photo img.is-loaded{opacity:1;transform:scale(1)}
.remote-photo__placeholder{position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:#715e4d;font:600 11px 'IBM Plex Mono',monospace;padding:18px;z-index:-1}
.remote-photo__placeholder i{display:block;font-size:25px;color:#a22725;margin-bottom:5px}
.remote-photo figcaption{position:absolute;left:7px;right:7px;bottom:7px;display:flex;justify-content:space-between;gap:8px;align-items:center;padding:5px 7px;border-radius:9px;background:rgba(25,20,17,.76);backdrop-filter:blur(8px);color:#fff;font:500 9px 'IBM Plex Mono',monospace;line-height:1.25;opacity:0;transform:translateY(4px);transition:.2s ease}
.remote-photo:hover figcaption,.remote-photo:focus-within figcaption{opacity:1;transform:none}
.remote-photo figcaption span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.remote-photo figcaption i{flex:0 0 auto}
.food-card>.remote-photo{margin:-16px -16px 13px;border-radius:17px 17px 10px 10px;border:0;border-bottom:1px solid rgba(87,48,31,.13);aspect-ratio:16/9}
.timeline-card>.remote-photo{max-width:560px}
.nearby-card>.remote-photo{aspect-ratio:16/9}
.attraction-card .attr-top>.remote-photo{margin:0 0 15px;aspect-ratio:16/8.5}
.photo-data-note{font-size:11px;color:var(--muted,#74685e);line-height:1.45}
@media(max-width:720px){
  .remote-photo figcaption{opacity:1;background:linear-gradient(transparent,rgba(25,20,17,.8));left:0;right:0;bottom:0;border-radius:0;padding:22px 9px 7px}
  .food-card>.remote-photo{aspect-ratio:16/10}
  .timeline-card>.remote-photo{aspect-ratio:16/9}
}
@media(prefers-reduced-motion:reduce){.remote-photo img,.remote-photo figcaption{transition:none}}
@media print{.remote-photo{max-height:190px}.remote-photo figcaption{display:none}}
.food-card:after{pointer-events:none}
