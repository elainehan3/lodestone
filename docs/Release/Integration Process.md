# 🧲 Integration Process

---
######Table of Contents:######
* [Pull Requests](#pull-requests)
* [Lodestone’s GitHub Actions Workflows](#lodestones-github-actions-workflows)
* [Netlify](#netlify)
---
The Lodestone project uses GitHub Actions and Netlify for its Continuous Integration and Continuous Delivery system.

GitHub Action workflows can be triggered when an event occurs in the repository, such as a PR or commit being created. Each workflow contains jobs which can be configured to run sequentially or in parallel. Each job runs inside its own virtual machine runner, or inside a container, and has one or more steps that either run a script or an action. Workflows are defined as YAML files placed in the .github/workflows folder of the repository.

Netlify is the hosting service Lodestone uses for the hosted web application. The latest stable version is available at lodestone.cc and the latest beta release is available at dev.lodestone.cc.

Below is a high-level overview of Lodestone’s integration process:

#### Pull Requests

The Lodestone project keeps the code for the latest stable version on the main branch, and latest beta version on the dev branch. Contributors branch off one of these branches depending on the nature of their patch, and create a pull request (PR) to merge their patch back into the respective branch. 

If a PR contains changes to the dashboard’s codebase, the Netlify bot will publish a deployment preview reflective of the changes made. This helps the reviewer in reviewing the PR more efficiently.

Lodestone’s PRs do not adhere to a specific format, leading to a variety of formats being used by individual contributors with varying readability. Each PR needs at least one manual approval from another maintainer and must pass all the release pipeline checks before it can be merged.

{!.github/README.md!}

The above documentation on Github Actions workflows are also visible in the `.github` directory on the [GitHub repo](https://github.com/Lodestone-Team/lodestone/.github/README.md).

#### Netlify

Lodestone provides a hosted version of the latest stable release of the dashboard at [lodestone.cc](https://lodestone.cc), and the latest beta version on [dev.lodestone.cc](https://dev.lodestone.cc). The repository is set up with a Netlify bot observing the latest commits of main and dev. This bot publishes the dashboard to lodestone.cc and dev.lodestone.cc respectively.   

Additionally, Netlify also observes for dashboard changes in any PR to the main or dev branch, and provides a link to the deployment preview in the PR thread.