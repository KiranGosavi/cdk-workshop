
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import { Code } from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   const hello=new lambda.Function(this,'TestHandler',{
     runtime:lambda.Runtime.NODEJS_10_X,
     code: lambda.Code.fromAsset('lambda'), 
     handler:'hello.handler'
   });

   new apigw.LambdaRestApi(this,'Endpoint',{
     handler:hello
   });
  }
}
