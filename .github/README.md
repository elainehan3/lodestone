#### Lodestone’s GitHub Actions Workflows

Below is an overview of Lodestone’s workflows:

1. **ci.yml**

    - **Triggers**: on commit to either dev or main.

    - This workflow, like its name suggests, is the main Continuous Integration workflow for the repository.    

    - ci.yml executes the workspace-check.yml workflow to ensure both the frontend dashboard and Lodestone Core build without error. 

    - It then executes core-cargo-test which runs the test cases in Lodestone Core (the dashboard does not have any test cases). 

    - Finally, if everything passes without error, it executes the dashboard-build-and-draft.yml and core-build-and-draft.yml that produces a developer preview build for the Lodestone Desktop and Core respectively.

2. **dashboard-build-and-draft.yml**

    - **Triggers**: None, used by other workflows.

    - This workflow produces a build for Lodestone Desktop, and uploads the executable and installer to an unpublished draft pre-release to serve as a developer preview build. 
    
    - This workflow has a fundamental flaw in that a newer run will overwrite the artifacts produced previously, so the developer preview will contain the latest build of the run, which is not the correct behaviour.

3. **core-build-and-draft.yml**

    - **Triggers**: None, used by other workflows.

    - This workflow is the exact same as dashboard-build-and-draft.yml, but for Lodestone Core. It suffers the same problems as dashboard-build-and-draft.yml.

4. **pr.yml**

    - **Triggers**: on PR open to dev, main, or any branch starting with release/.

    - This workflow is very similar to ci.yml. The only difference is that it is triggered when a PR opens to any of the branches above.

5. **core-release-docker.yml**

    - **Triggers**: On a new published release.

    - This workflow takes the newest release of Core and packages it into a Docker image, which it then publishes to ghcr.io.

6. **dashboard-release-docker.yml**

    - **Triggers**: On a new published release.

    - This workflow takes the newest release of the dashboard and packages it into a Docker image, which it then publishes to ghcr.io.

7. **release.yml**

    - **Triggers**: On push of a tag starting with v. For example, v0.5.0.

    - This workflow is a combination of dashboard-build-and-draft.yml and core-build-and-draft.yml. The only difference is the release is named “rc” for release candidate and not developer preview, thus the artifact is stored in a different place than developer preview.