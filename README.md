# Serverless Framework AWS NodeJS Example
## About

Cost-efficient and flexible API for a link shortener application. Uses AWS technologies to:
* Be easily replicated to multiple AWS regions
* Handles sudden traffic spikes

### Technologies
* Express
* DynamoDB
* AWS Lambda
* AWS SQS
* AWS SES
* AWS EventBridge
* TypeScript
* JsonWebToken
* Serverless framework
## API Docs
You can check our API documentation by this link: https://y5136xhfy7.execute-api.eu-central-1.amazonaws.com/dev/api-docs/
## Installation

Install `serverless` module via NPM:

```bash
npm install -g serverless
```

## Creating A Service

To create project, run the `serverless` command below, then follow the prompts.

```base
serverless --template-url=https://github.com/VladJav/serverless-shortlinker.git
```

Please note that you can use `serverless` or `sls` to run Serverless Framework commands.

Download all node dependencies in api and auth folders.
```bash
npm install
cd api
npm install
cd ../auth
npm install
```
Then you need to fill .env file like this:
```dosini
JWT_ACCESS_SECRET="secret"
JWT_REFRESH_SECRET="secret2"
# YOUR VERIFIED EMAIL. https://eu-central-1.console.aws.amazon.com/ses/home?region=eu-central-1#/verified-identities
SOURCE_EMAIL="example@gmail.com"
# If you wan you can specify TTL for JWT Access Token:
# JWT_ACCESS_TTL="60m"
```
## Deploying

If you haven't done so already within the `serverless` command, you can deploy the project at any time by running:

```bash
sls deploy
```

The deployed AWS Lambda functions and other essential information such as API Endpoint URLs will be displayed in the command output.
