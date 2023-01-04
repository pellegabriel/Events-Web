export type AmplifyDependentResourcesAttributes = {
  api: {
    weeout: {
      GraphQLAPIKeyOutput: 'string'
      GraphQLAPIIdOutput: 'string'
      GraphQLAPIEndpointOutput: 'string'
    }
  }
  auth: {
    userPoolGroups: {
      betatestGroupRole: 'string'
    }
    weeout921a0308: {
      IdentityPoolId: 'string'
      IdentityPoolName: 'string'
      UserPoolId: 'string'
      UserPoolArn: 'string'
      UserPoolName: 'string'
      AppClientIDWeb: 'string'
      AppClientID: 'string'
    }
  }
  function: {
    weeout921a0308CreateAuthChallenge: {
      Name: 'string'
      Arn: 'string'
      LambdaExecutionRole: 'string'
      Region: 'string'
      LambdaExecutionRoleArn: 'string'
    }
    weeout921a0308DefineAuthChallenge: {
      Name: 'string'
      Arn: 'string'
      LambdaExecutionRole: 'string'
      Region: 'string'
      LambdaExecutionRoleArn: 'string'
    }
    weeout921a0308VerifyAuthChallengeResponse: {
      Name: 'string'
      Arn: 'string'
      LambdaExecutionRole: 'string'
      Region: 'string'
      LambdaExecutionRoleArn: 'string'
    }
  }
  storage: {
    s3weeout01storage2ebbc512: {
      BucketName: 'string'
      Region: 'string'
    }
  }
}
