# selfheal-demo-app

This is the demo web application for BrowserStack Self-Heal feature demos.

## Local Development

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the dev server:
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173/selfheal-demo-app/](http://localhost:5173/selfheal-demo-app/)

## Deploy to GitHub Pages (Production)

1. Build the app:
   ```sh
   npm run build
   ```
2. Deploy to GitHub Pages:
   ```sh
   npm run deploy
   ```
   This will push the latest `dist` build to the `gh-pages` branch and update the live production demo site directly. You can verify the deployment by checking the commit history on the `gh-pages` branch in your repository.
3. (Recommended) Commit and push your code changes to the `master` branch as well:
   ```sh
   git add .
   git commit -m "Update app code"
   git push origin master
   ```
   This ensures your source code is up to date in the main branch.
   
   If you do not have direct access to the `master` branch, create a Pull Request (PR) with your changes and get it reviewed and merged by a repository maintainer.

## Notes
- Make sure the `base` in `vite.config.ts` is set to `/selfheal-demo-app/` for correct asset paths on GitHub Pages.
- Use the toggle button in the UI to simulate locator changes for self-heal demos.
- This repo is private and intended for internal/demo use only.
