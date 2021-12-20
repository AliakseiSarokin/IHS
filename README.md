E2e test definition
------------------

* tests end user experience
* tests component integration (i.e. integration testing is submerged into e2e tests)
* run by protractor runner
* written with jasmine test framework


### Requirements
 * `Node` version >= 8.9
 * `Java` verion >= 8


Running tests
-------------

1. Clone the project
git clone https://dev.azure.com/pdd-ihsmarkit/ElectronicParts/_git/bomtest

2. After clonning the peorject delete all folders and files under bomtest

3. Checkout to the  test branch

4. Run 'npm i'

5. Also install protractor, typescript and karma globaly: npm i -g protractor, npm i -g typescript, npm install -g karma-cli

6. To run all e2e run 'npm run protractor'

6. To run a suite run 'npm run protractor -- --suite=suiteName'
To find a suite name go to config directory, protractor.conf.js file scroll to suites



Writing e2e test
----------------

1) Create new *.e2e.spec.ts file in `./test/e2e` folder and use existing one

2) Write your test code to created file

**Example file: `./test/integration/searchForm.e2e.spec.ts`**



Framework structure

---------------------
bussinesLayer - contains steps and bussiness  logic
components - base controls like button, input and more complex widgets like modal, slider, shade
elements - contains all elements
config - reporters
helper - allure, waiters
test - contains tests
testData - contains test files and constants for tests
utils - contains classes with utils

Reporters:
Allure
Html Reporter