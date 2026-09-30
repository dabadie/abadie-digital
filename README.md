# abadie.digital

Personal website of Daniel Abadie: Digital Public Infrastructure, AI and digital government.

Static HTML + Bootstrap 5.3 (CDN). No build step.

## Structure

```
index.html            Single-page site (hero, focus, journey, work, talks, writing, contact)
404.html              Not-found page
assets/css/site.css   Theme on top of Bootstrap
assets/js/site.js     Progressive enhancements (reveal, click-to-load YouTube, writing filters)
assets/img/           Portrait + favicon
llms.txt              Plain-text profile for AI agents (llmstxt.org)
robots.txt            Allows search engines and AI crawlers
sitemap.xml
CNAME                 Custom domain for GitHub Pages
```

## AI-agent readiness

- `llms.txt` with a full, link-rich profile
- JSON-LD (`Person`, `WebSite`, `ScholarlyArticle`, `VideoObject`) in `index.html`
- Semantic HTML, no content hidden behind JS; videos degrade to plain YouTube links
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot and Google-Extended

## Run locally

```bash
python3 -m http.server 8080
```

## Deploy (GitHub Pages + HTTPS)

1. Repo → Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
2. Custom domain: `abadie.digital` (already set by the `CNAME` file).
3. DNS at your registrar:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` for `www` → `dabadie.github.io`
4. Once the certificate is issued, tick **Enforce HTTPS**.

## Workflow

One branch per feature (`feature/<name>`), PR into `main`.
