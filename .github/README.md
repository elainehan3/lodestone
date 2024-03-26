Documenting the Existing Release Pipeline
2.1 Build Process

The Lodestone project aims to make it convenient for the average user with no IT experience to self-host game servers. Therefore, it is important for Lodestone to provide precompiled binaries for as many major platforms as possible. Currently, Lodestone aims to build the precompiled binary for the above three components (Dashboard, Core, Desktop) available for the following platforms and architectures:

Lodestone Core:
x86 Windows11
x86 MacOS
x86 Linux
aarch Linux

Dashboard:
Web

Lodestone Desktop
x86 Windows11
x86 MacOS

2.1.1 Building Lodestone Core with Cargo

The codebase of Lodestone Core is a Cargo project. Cargo is Rust’s build system and a package manager that also provides functionalities such as testing; it is similar to Maven in the Java space. Cargo, being a framework-driven build tool, does the majority of heavy lifting in building Lodestone Core. Unlike lower level tools, such as make or cmake, the developers do not have to worry themselves about the dependency graph, platform specific behaviours, or linking external packages. The vast majority of configuration, such as project name, dependencies, and license, is done via the Cargo.toml file situated in the package root.

Cargo can be configured to produce either a debug build or a release build. A debug build is less optimized for speed and binary size, but is faster to produce. A release build contains more optimizations but is much slower to produce. Release builds are produced by the release pipeline and delivered to the end user, while debug builds are more commonly used for developers to test the software locally.
Cargo also provides many functionalities via subcommands. For instance, the clean subcommand will remove all build artifacts and intermediate files to effectively restore the codebase to the state when it was cloned. The test subcommand will build and run all test cases defined in the project. The check subcommand will check the codebase for compilation errors without actually building the binary itself.

It is important to note that due to Lodestone Core’s rich feature set, it has a lot of dependencies, and by extension even more transitive dependencies (1126 to be exact). Thus the building of Lodestone Core is a highly resource intensive process. Below is a compressed image of the dependency graph of Lodestone Core to demonstrate its complexity:


2.1.2 Building Dashboard with npm

The codebase of Lodestone’s dashboard is an npm project. npm is a widely used package manager for JavaScript and TypeScript projects. With npm, developers do not have to concern themselves with the dependency graph, external package management, and platform specific behaviour. The developer declares the project’s configuration, such as name and dependencies in the package.json file situated in the project root. To build the Dashboard, Lodestone uses Webpack and Babel.

2.1.3 Building Lodestone Desktop with Cargo

The codebase of Lodestone Desktop is a cargo project that has both the dashboard and Lodestone Core included in its dependencies. Lodestone Desktop is powered by Tauri, a framework similar to Electron that allows one to combine a native web application with a backend in Rust to produce a desktop app. Tauri’s build process requires the build artifacts of the dashboard, which is obtained by building via npm first, and outputs both an executable and an installer for the platform specified.

Since Lodestone Desktop includes Tauri and Lodestone Core as a dependency on top, the build process is intensive - with a total of 2000+ transitive dependencies on Windows. This build takes well over an hour to complete on the release pipeline with cached intermediate build artifacts. 

2.2 Integration Process

The Lodestone project uses GitHub Actions and Netlify for its Continuous Integration and Continuous Delivery system.

GitHub Action workflows can be triggered when an event occurs in the repository, such as a PR or commit being created. Each workflow contains jobs which can be configured to run sequentially or in parallel. Each job runs inside its own virtual machine runner, or inside a container, and has one or more steps that either run a script or an action. Workflows are defined as YAML files placed in the .github/workflows folder of the repository.

Netlify is the hosting service Lodestone uses for the hosted web application. The latest stable version is available at lodestone.cc and the latest beta release is available at dev.lodestone.cc.

Below is a high-level overview of Lodestone’s integration process:

2.2.1 Pull Requests

The Lodestone project keeps the code for the latest stable version on the main branch, and latest beta version on the dev branch. Contributors branch off one of these branches depending on the nature of their patch, and create a pull request (PR) to merge their patch back into the respective branch. 

If a PR contains changes to the dashboard’s codebase, the Netlify bot will publish a deployment preview reflective of the changes made. This helps the reviewer in reviewing the PR more efficiently.

Lodestone’s PRs do not adhere to a specific format, leading to a variety of formats being used by individual contributors with varying readability. Each PR needs at least one manual approval from another maintainer and must pass all the release pipeline checks before it can be merged.

2.2.2 Lodestone’s GitHub Actions Workflows

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

2.2.3 Netlify

Lodestone provides a hosted version of the latest stable release of the dashboard at lodestone.cc, and the latest beta version on dev.lodestone.cc. The repository is set up with a Netlify bot observing the latest commits of main and dev. This bot publishes the dashboard to lodestone.cc and dev.lodestone.cc respectively.

Additionally, Netlify also observes for dashboard changes in any PR to the main or dev branch, and provides a link to the deployment preview in the PR thread.

2.3 Release Process
When the team is satisfied with the state of the build and would like to create a release, someone with a push permission (almost always one of the senior maintainers) will tag a commit with the release’s semantic version, and push the tag to the remote. This will trigger the release.yml workflow, which will produce an unpublished release candidate build. Then, one of the senior maintainers will download the builds and test it on their machine according to a release checklist. After the maintainer is satisfied with the build, they will fill in the release notes with important changes and publish the release. The end users using the CLI or the desktop client will be notified of the new version upon their next launch of the program and can choose to update.

After a release is made successfully, the core-release-docker.yml and dashboard-release-docker.yml workflow will run, packaging the release artifacts into a Docker container and publishing it on ghcr.io.
2.4 Monitoring Process
2.4.1 Reporting Issues
If a user encounters issues while using any of Lodestone’s products, they can file an issue on the project repository. Maintainers will be notified of an issue’s creation by email and by Discord via a webhook in the internal Lodestone Team Discord server. A user can also start a thread in the support-forum channel in the public Lodestone community Discord server.
2.4.2 Logging
Lodestone Core is equipped with the tracing logging framework, which records logs to the user’s file system. A user can choose to include this log when submitting an issue to better aid in the developer’s investigation.
