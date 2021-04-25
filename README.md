# Mailer Service (Backend)

This project is mainly focused on sending emails by using different mail service providers (eg: `sendgrid`). This codebase is mailer back-end service (API codebase). Currently, for this project, we are supporting 2 different mail providers which are `sendgrid` and `mailgun`.


### How to run it locally

```js
// setup local environment variables
create `.env` file under the `root` folder, and add following variables inside `.env` file
* Note: (Please contact Damon to get the credentials)

SENDGRID_API_KEY=
MAILGUN_API_KEY=
MAILGUN_API_BASE_URL=
MAILGUN_DOMAIN=

// install npm packages and start locally
npm install && npm run dev

// download front end codebase and run it locally
* Note: (please download the front-end codebase (<a href="https://github.com/DamengRandom/mail-frontend" target="_blank">mail-frontend</a>) and run it locally)

// run test locally
npm run test
```


### Major functionalities

1. API route for sending email via different service provider: `http://localhost:6437/api/:provider`
2. API route for test api locally: `http://localhost:6437/api/test`


### Codebase architecture

1. major structure: `src/server/index.js` -> routes folder -> controller -> services [I would reckon this structure for node api]
2. utils: helper functions, eg: input validator (backend validation)
3. tests: unit tests for testing different mail providers


### Future improvements

1. Implement Dependency Injection pattern for this codebase, it will be useful when codebase is getting bigger and bigger
2. Add linter functionality for current codebase
3. Add unit test coverage when running unit tests
4. Add swagger documentation for other developers to view the current APIs


### resources:
1. https://express-validator.github.io/docs/index.html
2. https://mailchimp.com/developer/transactional/guides/quick-start/
3. why I didn't use SES? It only can send same email address (not able to send multiple emails)
https://stackoverflow.com/questions/10040632/ses-not-working-on-localhost
4. https://stackoverflow.com/questions/54805319/mocha-error-no-test-files-found-test-npm-err-test-failed/54833824
5. https://stackoverflow.com/questions/59463875/how-to-mock-mailgun-messages-send-using-jest
