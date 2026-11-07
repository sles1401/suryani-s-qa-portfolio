# Suryani Lestari — QA Portfolio

Personal portfolio for **Suryani Lestari**, QA Engineer (manual + automation).
Live at **[suryani-lestari.my.id](https://suryani-lestari.my.id)**.

The site is a bilingual (ID/EN) single-page application with light/dark themes. It covers the
profile, QA experience, selected projects, sanitized testing evidence, a downloadable CV, and two
interactive QA playgrounds.

## Highlights

- **Featured projects** — Hauling Management System work, manual test-case documentation, and QA Tech Hub.
- **Sanitized evidence** — test-management dashboard, bug-report, and regression-checklist samples with client data redacted.
- **Bug Hunter** — an interactive challenge where visitors inspect a mock app and log the planted defects.
- **API Console** — a simulated request/response console for methods, headers, payloads, and status codes (no network calls).
- **Resume** — experience, education, skills, and a one-page ATS-friendly CV.
- **Contact** — validated form delivered through FormSubmit, with a mailto fallback.
- **Accessibility** — skip link, keyboard-tested navigation, reduced-motion support, and axe checks in CI.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Radix UI · React Router · Framer Motion

## Routes

| Route | Description |
| --- | --- |
| `/` | Profile, metrics, featured projects, evidence, tools, experience |
| `/projects` | Project details, sanitized bug reports, audit results |
| `/resume` | Experience, education, skills, CV download |
| `/contact` | Contact details and validated form |
| `/bug-hunter` | Interactive bug-hunting challenge |
| `/api-console` | Simulated API testing console |

## Getting started

```sh
bun install
bun run dev        # http://localhost:8080
bun run build      # production build to dist/
bun run preview    # preview the production build
```

`npm install` and `npm run ...` work as well.

## Testing

```sh
bunx vitest run                       # unit tests
bunx playwright test                  # end-to-end + axe accessibility checks
bun run perf:bundle                   # bundle-size budget
bun run perf:lighthouse               # Lighthouse budgets (light theme)
```

CI (`.github/workflows/ci.yml`) runs Vitest, Playwright with axe across Chromium/Firefox/WebKit,
bundle budgets, and Lighthouse on every push to `main`.

## Deployment

Deployed on Vercel. [`vercel.json`](vercel.json) provides the SPA fallback (so deep links such as
`/resume` work on refresh), long-lived caching for hashed assets, and security headers (CSP, HSTS,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`).

SEO/share assets live in `public/`: `robots.txt`, `sitemap.xml`, and a 1200×630 `og-image.jpg`.

## CV

The CV is generated from [`cv/cv.html`](cv/cv.html) and served at
`/cv/Suryani-Lestari-QA-CV.pdf`. To regenerate after editing the HTML:

```sh
chrome --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/cv/Suryani-Lestari-QA-CV.pdf cv/cv.html
```

## Project structure

```
cv/cv.html                     CV source (A4, one page)
public/                        favicon, robots.txt, sitemap.xml, og-image.jpg, cv/
src/components/home/           home sections (metrics, projects, evidence, tools, experience)
src/components/layout/         header, footer, page shell
src/contexts/                  language and theme providers
src/hooks/use-page-meta.ts     per-route title, description, canonical, Open Graph
src/pages/                     route pages
e2e/                           Playwright + axe specs and visual snapshots
```

## Contact

- Email: [suryanilestari123@gmail.com](mailto:suryanilestari123@gmail.com)
- LinkedIn: [linkedin.com/in/suryani-lestari](https://www.linkedin.com/in/suryani-lestari)
- GitHub: [github.com/sles1401](https://github.com/sles1401)
