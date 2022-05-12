import {
  SignUpCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"

const ClientId = "1idr5uq92lnnirr5025e3qe89i"

const client = new CognitoIdentityProviderClient({
  region: "ap-northeast-2",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: "ap-northeast-2" },
    identityPoolId: "ap-northeast-2:c9a16e39-87ea-4a3e-b1f9-08ce7842cca0",
  }),
})

async function signup(input) {
  const command = new SignUpCommand({
    ClientId,
    Username: input.username,
    Password: input.password,
    UserAttributes: [{ Name: "email", Value: input.email }],
  })

  try {
    const response = await client.send(command)
    return response
  } catch (err) {
    console.log(err)
  }
}

async function confirm(confirmCode, username) {
  const command = new ConfirmSignUpCommand({
    ClientId,
    ConfirmationCode: confirmCode,
    Username: username,
  })
  try {
    const response = await client.send(command)
    return response
  } catch (err) {
    console.log(err)
  }
}

export { signup, confirm }
