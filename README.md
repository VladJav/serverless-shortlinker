<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Serverless Framework AWS NodeJS Example
## Installation

Install `serverless` module via NPM:

```bash
npm install -g serverless
```

_If you don’t already have Node.js on your machine, [install it first](https://nodejs.org/). If you don't want to install Node or NPM, you can [install `serverless` as a standalone binary](https://www.serverless.com/framework/docs/install-standalone)._

## Creating A Service

To create your first project (known as a Serverless Framework "Service"), run the `serverless` command below, then follow the prompts.

```bash
# Create a new serverless project
serverless

# Move into the newly created directory
cd your-service-name
```

The `serverless` command will guide you to:

1. Create a new project
2. Configure your [AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
3. Optionally set up a free Serverless Framework account with additional features.

Your new serverless project will contain a `serverless.yml` file. This file features simple syntax for deploying infrastructure to AWS, such as AWS Lambda functions, infrastructure that triggers those functions with events, and additional infrastructure your AWS Lambda functions may need for various use-cases. You can learn more about this in the [Core Concepts documentation](https://www.serverless.com/framework/docs/providers/aws/guide/intro).

The `serverless` command will give you a variety of templates to choose from. If those do not fit your needs, check out the [project examples from Serverless Inc. and our community](https://github.com/serverless/examples). You can install any example by passing a GitHub URL using the `--template-url` option:

```base
serverless --template-url=https://github.com/VladJav/serverless-shortlinker.git
```

Please note that you can use `serverless` or `sls` to run Serverless Framework commands.

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

More details on deploying can be found [here](https://www.serverless.com/framework/docs/providers/aws/guide/deploying).