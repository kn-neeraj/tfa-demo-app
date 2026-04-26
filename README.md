# tfa-demo-app

Demo storefront app used for BrowserStack TFA (Test Failure Analysis) demos. Replica of the original `selfheal-demo-app` with extra QA hooks.

[![Deploy to GitHub Pages](https://github.com/kn-neeraj/tfa-demo-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/kn-neeraj/tfa-demo-app/actions/workflows/deploy.yml)

Live: <https://kn-neeraj.github.io/tfa-demo-app/>

## Quick start

```sh
npm install
npm run dev
```

App is served at `http://localhost:5173/tfa-demo-app/`.

## Build

```sh
npm run build
```

Produces a static bundle in `dist/` ready to serve from `/tfa-demo-app/`.

## Deploy

Pushes to `main` are auto-deployed to GitHub Pages by `.github/workflows/deploy.yml`.

For manual deploys:

```sh
npm run deploy
```

## Notes

- `base` in `vite.config.ts` must be `/tfa-demo-app/` for correct asset paths on GitHub Pages.
- Toggle buttons in the UI simulate locator changes for self-heal scenarios.
