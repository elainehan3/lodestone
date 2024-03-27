# ⬆️ Deployment Process
---

When the team is satisfied with the state of the build and would like to create a release, someone with a push permission (almost always one of the senior maintainers) will tag a commit with the release’s semantic version, and push the tag to the remote. This will trigger the release.yml workflow, which will produce an unpublished release candidate build. 

Then, one of the senior maintainers will download the builds and test it on their machine according to a release checklist. After the maintainer is satisfied with the build, they will fill in the release notes with important changes and publish the release. The end users using the CLI or the desktop client will be notified of the new version upon their next launch of the program and can choose to update.   

After a release is made successfully, the core-release-docker.yml and dashboard-release-docker.yml workflow will run, packaging the release artifacts into a Docker container and publishing it on ghcr.io.