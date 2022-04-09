const AWS = require("aws-sdk")
const express = require("express")
const serverless = require("serverless-http")
const cognitoIdentityProvider = require("@aws-sdk/client-cognito-identity-provider")
const credentialProvider = require("@aws-sdk/credential-providers")

const app = express()
app.use(express.json())

const CLIENT_ID = process.env.ClientId
const REGION = process.env.DefaultRegion
const IDENTITY_POOL_ID = process.env.identityPoolId

const client = new cognitoIdentityProvider.CognitoIdentityProviderClient({
  region: REGION,
  credentials: credentialProvider.fromCognitoIdentityPool({
    clientConfig: { region: REGION },
    identityPoolId: IDENTITY_POOL_ID,
  }),
})

app.post("/signup", async (req, res) => {
  const command = new cognitoIdentityProvider.SignUpCommand({
    CLIENT_ID,
    Username: input.username,
    Password: input.password,
    UserAttributes: [{ Name: "email", Value: input.email }],
  })

  try {
    const response = await client.send(command)
    if (response.$metadata.httpStatusCode === 200) {
      res.json({ response })
    } else {
      res.status(404).json({ error: response })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "오류" })
  }
})

app.post("/confirm", async (req, res) => {
  const command = new cognitoIdentityProvider.ConfirmSignUpCommand({
    CLIENT_ID,
    ConfirmationCode: confirmCode,
    Username: username,
  })

  try {
    const response = await client.send(command)
    if (response.$metadata.httpStatusCode === 200) {
      res.json({ response })
    } else {
      res.status(404).json({ error: response })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "오류" })
  }
})

app.post("/login", async (req, res) => {
  const command = new cognitoIdentityProvider.InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    CLIENT_ID,
    AuthParameters: {
      USERNAME: input.username,
      PASSWORD: input.password,
    },
  })

  try {
    const response = await client.send(command)
    if (response.$metadata.httpStatusCode === 200) {
      res.json({ response })
    } else {
      res.status(404).json({ error: response })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "오류" })
  }
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  })
})

module.exports.handler = serverless(app)
