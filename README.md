# Texas Space Society

A one-page, space-themed home for Texas Space Society at The University of Texas at Austin.

## Included

- Full-screen launch-sequence intro with a skip control
- Animated canvas starfield, orbital motion, scroll reveals, and responsive layouts
- Mission, programs, membership, board placeholders, and contact sections
- Original Texas Space Society mark included under `dist/assets/`
- Root `index.html` is prewired to load the full site from `dist/` for GitHub Pages
- GitHub Pages workflow included in `.github/workflows/pages.yml`

## Edit the placeholders

Open `dist/index.html` and replace the five board cards marked `Board member placeholder` with names, roles, photos, and links when ready.

## Run locally

Because this is a static site, open `index.html` for the GitHub Pages-compatible entrypoint, or open `dist/index.html` directly for the hosted Site build.

## Publish with GitHub Pages

1. Push this project to a repository.
2. In GitHub, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main`, and choose `/ (root)`.

The root `index.html` loads the full animated site while the GitHub Actions workflow remains available as an alternative deployment path.

The workflow publishes the `dist` folder without needing a build step.
