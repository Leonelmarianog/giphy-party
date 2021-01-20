# Giphy-Party

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Codeship Status for Leonelmarianog/giphy-party](https://app.codeship.com/projects/ec40374a-84e2-4eaf-b659-445804fee2d6/status?branch=master)](https://app.codeship.com/projects/424254)

A webpage where you can search gifs provided by [Giphy](https://giphy.com/).

See it live! [Giphy-Party](https://leonelmarianog.github.io/giphy-party/).

<img src="https://i.imgur.com/NVp5CCL.png" width="800px">

# Installation

```
npm install # Install required dependencies.
```

# How to run this project

```
npm run gulp # Run project in production mode.
npm run gulp:dev # Run project in development mode.
```

# Tests

This project uses [Cypress](https://www.cypress.io/) for E2E testing and [Jest](https://jestjs.io/) for Unit Tests.

**Important**: Remember to create a build before running UI tests! `npm run gulp:build`.

```
npm run test:dev # Run Jest Unit Tests
npm run test # Get Jest code coverage
npm run test:ui # Run UI tests (headless)
npm run test:ui:dev # Run UI tests
```

# Deployment to GH-pages with Gulp

Deployment is made using [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages). Check the documentation to see how to add a custom commit message and specify the folder you want to deploy to gh-pages.

Steps:

1. Create a gh-pages branch

```
git checkout --orphan gh-pages
git rm -rf .
touch README.md
git add README.md
git commit -m "Init gh-pages"
git push --set-upstream origin gh-pages
git checkout master
```

2. Run `npm run gulp:deploy`.
