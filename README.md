# Procioni in Cina — pacchetto GitHub Pages corretto

Build: `navigation-repair-20260722-1`

Questa versione ripristina la corrispondenza canonica tra file e pagine:

- `index.html` → Sintesi
- `itinerario-dettagliato.html` → Itinerario ora per ora, con 14 giornate e mappe
- `cibi.html` → Guida gastronomica con 85 schede
- `attrazioni.html` → 103 attrazioni e approfondimenti

Il menu superiore è ora condiviso e identico sulle quattro pagine. Le ancore specifiche della pagina sono spostate in una seconda riga non sticky, così su telefono non coprono il contenuto. Anche la Sintesi è stata riallineata alla stessa famiglia visiva.

## Pubblicazione

Carica **tutto il contenuto** della cartella nella root del branch `main`, sostituendo i file esistenti. Non caricare la cartella contenitore e non rinominare i file.

Struttura essenziale:

```text
index.html
itinerario-dettagliato.html
cibi.html
attrazioni.html
.nojekyll
assets/
```

Elimina dalla root del repository eventuali copie obsolete di `.js` o `.css`: i file tecnici devono stare soltanto in `assets/`.

## Pulizia della vecchia root

Nel repository attuale sono presenti copie duplicate di JavaScript e CSS nella root. Non sono più usate. Elimina i file elencati in `DELETE-OLD-ROOT-FILES.txt`; conserva invece quelli dentro `assets/`.
