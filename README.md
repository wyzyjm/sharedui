---
ArtifactType: nupkg, azure-web-app
Documentation: URL  // TODO mukeshag: put the PPE storybook url here
Language: typescript
Platform: windows
Stackoverflow: URL
Tags: cognitive-services-studios
---

# Azure Cognitive Services Studios : Shared Components

Build faster, more consistent experiences, with fewer distinct bug for the studio UX investments by delivering shared components that can be reused across the studios (e.g. authentication, sign-in, navigation, breadcrumbs, grid view, lists, etc.).​

Eg: Reduce duplicate accessibility bugs across studios that have distinct resolutions (e.g. studio X uses button for some breadcrumbs, studio B uses link for breadcrumbs). Both get accessibility bugs and must be resolved independently to achieve our grade C goal.

## Getting Started

### Prerequisites

Visual Studio Code
Access to the repo: TODO sharad - add the steps

### Installing

'cd src/SharedUI.Studios/ClientApp'
'yarn startup'
'yarn start'

## Running the tests

Steps to test a component:

* If adding a new test, write the tests in '<component-name>.spec.ts' under 'tests' folder.
* Run 'npx playwright test <test-name>' to run a particular test.
* 'npx playwright test' runs all tests.
* 'npx playwright show-report' displays the HTML report.
* 'npx playwright codegen <URL>' helps in generating the tests.
* 'npx playwright test --trace on' helps in tracing the tests.

## Deployment

TODO mukeshag
Add additional notes about how to deploy this on a live system

## Built With

- storybook
- microsoft fluent ui

## Versioning and changelog
TODO mukeshag

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](link-to-tags-or-other-release-location).

It is a good practice to keep `CHANGELOG.md` file in repository that can be updated as part of a pull request.

## Authors

Refer [owners.txt](https://msazure.visualstudio.com/Cognitive%20Services/_git/Cognitive-Services-Shared-UI-Components?path=/owners.txt)

## Troubleshooting

Below are some of the most common installation issues and instructions on how to solve them.

Issue: An unexpected error occurred: "https://msazure.pkgs.visualstudio.com/_packaging/AzurePortal/npm/registry/yarn-audit-fix/-/yarn-audit-fix-9.3.6.tgz: Request failed \"404 Not Found\"".
Solution: 
* yarn config set registry https://registry.npmjs.org
* rm yarn.lock
* yarn
