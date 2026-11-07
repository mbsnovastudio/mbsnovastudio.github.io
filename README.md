# MBS Nova Studio — website

Source of https://mbsnovastudio.com (GitHub Pages, custom domain in `CNAME`). Plain static HTML/CSS/JS, no build step.

| Path | Page |
|---|---|
| `index.html` | Studio home: products, studio, contact |
| `jewelia/index.html` | Jewelia product page |
| `kasa/index.html` | MBS Kasa product page |
| `404.html` | Not-found page |

- Turkish and English live in the same page: every text has a `lang="tr"` and a `lang="en"` twin; CSS shows the
  active language (`html[data-lang]`), `assets/js/site.js` switches it and remembers the choice.
- Shared styles: `assets/css/site.css`. Fonts (Inter, Playfair Display; OFL) are self-hosted in `assets/fonts/`.
- Images in `assets/img/` are web copies (WebP, 540x960 screenshots) of the store assets of each app.
- Keep at the root: `CNAME`, `app-ads.txt` (AdMob), `google8c3ea22be4a5908c.html` (Search Console).
- `/jewelia-privacy/` is served from the separate `mbsnovastudio/jewelia-privacy` repository; do not add a folder
  with that name here.
- Local preview: `python -m http.server 8080`, then open http://localhost:8080 (paths are root-absolute).
