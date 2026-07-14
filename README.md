[![codecov](https://codecov.io/gh/hexa-tools/hexawyn-web/branch/main/graph/badge.svg?token=U74SIK9CTB)](https://codecov.io/gh/hexa-tools/hexawyn-web)

# hexawyn-web

[![Tests](https://img.shields.io/badge/tests-38_passed-brightgreen.svg)]()
[![codecov](https://codecov.io/gh/hexa-tools/hexawyn-web/branch/main/graph/badge.svg)](https://codecov.io/gh/hexa-tools/hexawyn-web)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)

> Less dashboards. More answers.

The marketing site for **hexawyn** — the open-source, self-hostable Kubernetes assistant that diagnoses incidents in seconds.

![hexawyn website](docs/site-hexawyn.png)

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Vitest + Testing Library

## Development

```bash
npm install
npm run dev        # start the dev server on http://localhost:3000
```

## Scripts

```bash
npm run lint           # ESLint (next lint)
npm run typecheck      # tsc --noEmit
npm run test           # unit tests
npm run test:coverage  # unit tests + coverage report
npm run build          # production build
npm run badge          # refresh the tests badge in this README
```

## Deployment

Continuous deployment is handled by Netlify's Git integration: pull requests get
Deploy Previews and merges to `main` ship to production. CI (lint, typecheck,
tests, coverage → Codecov) runs on GitHub Actions.
