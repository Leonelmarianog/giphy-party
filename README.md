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

**Important**: Remember to create a build before running UI tests `npm run gulp:build`.

```
npm run test:dev # Run Jest Unit Tests
npm run test # Get Jest code coverage
npm run test:ui # Run UI tests (headless)
npm run test:ui:dev # Run UI tests
```

# Deployment to GH-pages with Gulp

Deployment is made using gulp plugin [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages). Check the documentation to see how to add a custom commit message and specify the folder you want to deploy to gh-pages.

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

# Deployment with Codeship and Gulp

Deployment to GH-pages with Codeship is done with a custom script. Make sure you set a git username and email with access to your repository in your script before running the deploy command, otherwise it will not work.

Steps:

1. Create a gh-branch

```
git checkout --orphan gh-pages
git rm -rf .
touch README.md
git add README.md
git commit -m "Init gh-pages --skip-ci"
git push --set-upstream origin gh-pages
git checkout master
```

**Note**: The "--skip-ci" tells Codeship to skip the current build.

2. On Codeship, in your project configuration , select the deploy tab, then select the "script" option and paste the following:

```
git config --global user.email "a git user email"
git config --global user.name "a git user name"
npm run gulp:deploy
```

Now, Codeship will deploy to the gh-pages branch everytime a build passes all specified tests. The commit message and the files deployed are specified in the gulp-gh-pages plugin.
