console.log("Loading function")

const AWS = require("aws-sdk")
const crypto = require("crypto")
const cryptoUtils = require("./lib/cryptoUtils")
const config = require("./config")

const dynamodb = new AWS.DynamoDB()
const ses = new AWS.SES()

function storeUser(email, password, salt, fn) {
    const len = 128
    crypto.randomBytes(len, function (err, token) {
        if (err) return fn(err)
        token = token.toString("hex")
        dynamodb.putItem(
            {
                TableName: config.DDB_TABLE,
                Item: {
                    email: {
                        S: email,
                    },
                    passwordHash: {
                        S: password,
                    },
                    passwordSalt: {
                        S: salt,
                    },
                    verified: {
                        BOOL: false,
                    },
                    verifyToken: {
                        S: token,
                    },
                },
                ConditionExpression: "attribute_not_exists (email)",
            },
            function (err, data) {
                if (err) return fn(err)
                else fn(null, token)
            }
        )
    })
}

function sendVerificationEmail(email, token, fn) {
    const subject = "Verification Email for" + config.EXTERNAL_NAME
    const verificationLink =
        config.VERIFICATION_PAGE +
        "?email=" +
        encodeURIComponent(email) +
        "&verify=" +
        token
    ses.sendEmail(
        {
            Source: config.EMAIL_SOURCE,
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Html: {
                        Data: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${subject}</title>
                    </head>
                    <body>
                        Please <a href="${verificationLink}">click here to verify your email address</a> or copy & paste the following link in a browser:<br><br>
                        <a href="${verificationLink}">verificationLink</a>
                    </body>
                    </html>
                    `,
                    },
                },
            },
        },
        fn
    )
}

exports.handler = (event, context, callback) => {
    var email = event.email
    var clearPassword = event.password

    cryptoUtils.computeHash(clearPassword, function (err, salt, hash) {
        if (err) {
            callback("Error in hash: " + err)
        } else {
            storeUser(email, hash, salt, function (err, token) {
                if (err) {
                    if (err.code == "ConditionalCheckFailedException") {
                        // userId already found
                        callback(null, { created: false })
                    } else {
                        callback("Error in storeUser: " + err)
                    }
                } else {
                    sendVerificationEmail(email, token, function (err, data) {
                        if (err) {
                            callback("Error in sendVerificationEmail: " + err)
                        } else {
                            callback(null, { created: true })
                        }
                    })
                }
            })
        }
    })
}
