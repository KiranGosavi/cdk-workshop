# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains API gateway with a lambda function.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Prerequisits
1. Install latest [AWS-CLI] (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) 
2. Check if the installation is successful: `$ aws --version`
3. [Configure] (https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) your aws CLI.


# Step-by-step guide to create serverless deployment using API gateway and lambda

1. Create a project : `mkdir cdk-workshop && cd cdk-workshop`
2. Intialize typescript project:  `cdk init sample-app --language typescript`
3. Typescript sources needs to be compile to javascript, to do so use command: `npm run watch`
4. To install the bootstrap stack into an environment : `cdk bootstrap`
5. Write your application logic in a lambda function in `lambda/hello.js`
```tsx
exports.handler = async function(event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}\n`
  };
};
```
5. Create a API gategay and lambda both resources by updating `lib/cdk-workshop-stack.ts` file.
```tsx
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'hello.handler'                // file is "hello", function is "handler"
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });

  }
}
```
6. Install missing construct libraries: `npm install @aws-cdk/aws-apigateway && npm install @aws-cdk/aws-lambda && npm install @aws-cdk/core@latest`
7. Deploy the stack using command: `cdk deploy`
8. Test the deployment using the endpoint you receive after the deployment is successful: `curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/`
9. Clean the resources: `cdk destroy`
