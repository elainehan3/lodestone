# 🧲 Integration Process

=======================

######Table of Contents:######
* [Pull Requests](#pull-requests)
* [Lodestone’s GitHub Actions Workflows](#lodestones-github-actions-workflows)
* [Netlify](#netlify)

=======================

The Lodestone project uses GitHub Actions and Netlify for its Continuous Integration and Continuous Delivery system.

GitHub Action workflows can be triggered when an event occurs in the repository, such as a PR or commit being created. Each workflow contains jobs which can be configured to run sequentially or in parallel. Each job runs inside its own virtual machine runner, or inside a container, and has one or more steps that either run a script or an action. Workflows are defined as YAML files placed in the .github/workflows folder of the repository.

Netlify is the hosting service Lodestone uses for the hosted web application. The latest stable version is available at lodestone.cc and the latest beta release is available at dev.lodestone.cc.

Below is a high-level overview of Lodestone’s integration process:

#### Pull Requests

The Lodestone project keeps the code for the latest stable version on the main branch, and latest beta version on the dev branch. Contributors branch off one of these branches depending on the nature of their patch, and create a pull request (PR) to merge their patch back into the respective branch. 

If a PR contains changes to the dashboard’s codebase, the Netlify bot will publish a deployment preview reflective of the changes made. This helps the reviewer in reviewing the PR more efficiently.

Lodestone’s PRs do not adhere to a specific format, leading to a variety of formats being used by individual contributors with varying readability. Each PR needs at least one manual approval from another maintainer and must pass all the release pipeline checks before it can be merged.

#### Lodestone’s GitHub Actions Workflows

Currently, Lodestone’s workflows are unnecessarily complex. They are over-designed for the task they are meant to do, lack comments and documentation, and some workflows lack purpose or are not used entirely. Below is an overview of Lodestone’s workflows:

ci.yml

Triggers: on commit to either dev or main.

This workflow, like its name suggests, is the main Continuous Integration workflow for the repository. ci.yml executes the workspace-check.yml workflow to ensure both the frontend dashboard and Lodestone Core build without error. It then executes core-cargo-test which runs the test cases in Lodestone Core. The dashboard does not have any test cases. Finally, if everything passes without error, it executes the dashboard-build-and-draft.yml and core-build-and-draft.yml that produces a developer preview build for the Lodestone Desktop and Core respectively.

dashboard-build-and-draft.yml

Triggers: None, used by other workflows.

This workflow produces a build for Lodestone Desktop, and uploads the executable and installer to an unpublished draft pre-release to serve as a developer preview build. This workflow has a fundamental flaw in that a newer run will overwrite the artifacts produced previously, so the developer preview will contain the latest build of the run, which is not the correct behaviour.

core-build-and-draft.yml

Triggers: None, used by other workflows.

This workflow is the exact same as dashboard-build-and-draft.yml, but for Lodestone Core. It suffers the same problems as dashboard-build-and-draft.yml.

pr.yml

Triggers: on PR open to dev, main, or any branch starting with release/.

This workflow is very similar to ci.yml. The only difference is that it is triggered when a PR opens to any of the branches above.

core-release-docker.yml

Triggers: On a new published release.

This workflow takes the newest release of Core and packages it into a Docker image, which it then publishes to ghcr.io.

dashboard-release-docker.yml

Triggers: On a new published release.

This workflow takes the newest release of the dashboard and packages it into a Docker image, which it then publishes to ghcr.io.

release.yml

Triggers: On push of a tag starting with v. For example, v0.5.0.

This workflow is a combination of dashboard-build-and-draft.yml and core-build-and-draft.yml. The only difference is the release is named “rc” for release candidate and not developer preview, thus the artifact is stored in a different place than developer preview.

#### Netlify

Lodestone provides a hosted version of the latest stable release of the dashboard at lodestone.cc, and the latest beta version on dev.lodestone.cc. The repository is set up with a Netlify bot observing the latest commits of main and dev. This bot publishes the dashboard to lodestone.cc and dev.lodestone.cc respectively.   

Additionally, Netlify also observes for dashboard changes in any PR to the main or dev branch, and provides a link to the deployment preview in the PR thread.