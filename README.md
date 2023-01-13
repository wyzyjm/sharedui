---
ArtifactType: nupkg, azure-web-app  
Documentation: https://aka.ms/csstudio   
Language: typescript  
Platform: windows  
Stackoverflow: TBD  
Tags: TBD  
---

# Azure Cognitive Services Studios : Shared Components

Build faster, more consistent experiences, with fewer distinct bugs for the studio UX investments by delivering shared components that can be reused across the studios (e.g. authentication, sign-in, navigation, breadcrumbs, grid view, lists, etc.).​

Eg: Reduce duplicate accessibility bugs across studios that have distinct resolutions (e.g. studio X uses button for some breadcrumbs, studio B uses link for breadcrumbs). Both get accessibility bugs and must be resolved independently to achieve our grade C goal.

## <u>For developers wanting to integrate the shared components into their repo</u>

### Step 1: Update your artifact feed:
Please add "CognitiveServicesSharedComponents" feed as an upstream feed to your feed. 
- Open your feed page from Azure devops and click on "Settings" button
- Select "Upstream Sources" tab
- Click on the "+ Add Upstream" button
- If your feed stays in the "msazure" organization, select "Azure artifact feeds in this organization"
    - select the "CognitiveServicesSharedComponents" feed from the dropdown, "Local" as the view, "npm" as the package
- If your feed isnt part of "msazure" organization, select "Azure artifact feed in a different organization"
    - enter the feed locator as "azure-feed://msazure/CognitiveServicesSharedComponents@Local", "npm" as the package
     - if the above doesnt work, try: "azure-feed://msazure/Cognitive%20Services/CognitiveServicesSharedComponents@Local", "npm" as the package

[More help]: 
Q. How to find "your feed"? In your project, there should be a nuget.config file which would have the name of the registry. For example: https://msazure.pkgs.visualstudio.com/a531312f-ba7b-4573-ab4f-d468b740a319/_packaging/*CognitiveIbizaPortalExtension*/nuget/v3/index.json

Q. How do I open "your feed page"? Open your ADO -> click artifacts -> select the name in the dropdown to be "your feed" 

### Step 2: Install the npm package:
Using your terminal navigate to the repository's ClientApp folder(or folder where you have your package.json file)
Run: 'yarn install sharedui.studios' or 'npm install sharedui.studios'

If you face authentication issues while running the install, please run 'vsts-npm-auth -config .npmrc' in the folder where you have .npmrc file.

### Step 3: Integrate with your project: 
The next step would be to use the component from the shared component repo. 
Import the component in your TSX file as, for example: 

'import { HaTSArea, HaTSInteraction, HatsProps } from "sharedui.studios/dist/package/index";'

and then use the component as you would use any other Fluent UI component. 

### Sample PR: 
https://msazure.visualstudio.com/Cognitive%20Services/_git/Platform-OpenAIPortal/commit/904a300dc2d8fda23e5feb271ded4af7862531ee?refName=refs/heads/main&path=/src/OpenAI.Portal/ClientApp/package.json&_a=compare


## <u>For developers wanting to contribute to the project</u> 

## Getting Started

### Built With

- Storybook
- Microsoft fluent ui
- Typescript
- React

### Step 1: Prerequisites

Visual Studio Code
Access to the repo: myaccess (17811, 18072, 19352)

### Step 2: Installing
In your terminal/cmd: 
'cd src/SharedUI.Studios/ClientApp'
'yarn startup'

### Step 3: Running the project
In your terminal/cmd:
'yarn start'


## Running the tests

Steps to test a component:

* If adding a new test, write the tests in '<component-name>.spec.ts' under 'tests' folder. 
From the `ClientApp` folder, run: 
* 'npx playwright test <test-name>' to run a particular test.
* 'npx playwright test' runs all tests.
* 'npx playwright show-report' displays the HTML report.
* 'npx playwright codegen <URL>' helps in generating the tests.
* 'npx playwright test --trace on' helps in tracing the tests.
* 'npx playwright test tests/components/core/ItemList/ItemList.spec.tsx' runs tests only in the ItemList.spec.tsx file

## Deployment

Currently, deployment is manually done from the dev machine. 
We publish the storybook artifacts to our storage account.
We run npm publish for publishing a new npm package.

## Process for publishing storybook:
1. Run the command: 
yarn production

2. In the dist folder, right click the "storybook" folder and publish to Azure static website. 

## Process for publishing a package to NPM (typically DIF contributions):
1. Do not deploy from local, as it wont have localized files. Hence, we need to download the "dist/package" folder
from the successful build artifacts. Once downloaded, replace the package folder in our "dist" folder.

2. npm publish -registry https://msazure.pkgs.visualstudio.com/a531312f-ba7b-4573-ab4f-d468b740a319/_packaging/CognitiveServicesSharedComponents/npm/registry/

3. Run `npm version patch`

If the above doesnt work: This can be done from VSCode. Get the latest master branch for the repo/package you want to publish. Install all dependencies and ensure that it builds and passes all tests.
1. `npm adduser` - add your NPM user details to the VSCode session, this should include entering 2FA.
2. `npm version patch` - updates the version of the repo.
3. `npm publish` - this publishes the package. You should be challenged for 2FA again. If not means you don't have 2FA enabled on your NPM account. Do so for next time.
4. `git commit` version change.

## Versioning and changelog

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [npm feed](https://msazure.visualstudio.com/Cognitive%20Services/_artifacts/feed/CognitiveServicesSharedComponents/Npm/sharedui.studios/versions).


## Authors

Refer [owners.txt](https://msazure.visualstudio.com/Cognitive%20Services/_git/Cognitive-Services-Shared-UI-Components?path=/owners.txt)

## Troubleshooting

Below are some of the most common installation issues and instructions on how to solve them.

Issue: An unexpected error occurred: "https://msazure.pkgs.visualstudio.com/_packaging/AzurePortal/npm/registry/yarn-audit-fix/-/yarn-audit-fix-9.3.6.tgz: Request failed \"404 Not Found\"".
Solution: 
* yarn config set registry https://registry.npmjs.org
* rm yarn.lock
* yarn
