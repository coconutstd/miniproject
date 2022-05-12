console.log("Loading function")

const AWS = require("aws-sdk")
const config = require("./config")

const dynamodb = new AWS.DynamoDB()

function getUser(email, fn) {
    dynamodb.getItem(
        {
            TableName: config.DDB_TABLE,
            Key: {
                email: {
                    S: email,
                },
            },
        },
        function (err, data) {
            if (err) return fn(err)
            else {
                if ("Item" in data) {
                    const verified = data.Item.verified.BOOL
                    let verifyToken = null
                    if (!verified) {
                        verifyToken = data.Item.verifyToken.S
                    }
                    fn(null, verified, verifyToken)
                } else {
                    fn(null, null)
                }
            }
        }
    )
}

function updateUser(email, fn) {
    dynamodb.updateItem(
        {
            TableName: config.DDB_TABLE,
            Key: {
                email: {
                    S: email,
                },
            },
            AttributeUpdates: {
                verified: {
                    Action: "PUT",
                    Value: {
                        BOOL: true,
                    },
                },
                verifyToken: {
                    Action: "DELETE",
                },
            },
        },
        fn
    )
}

exports.handler = (event, context, callback) => {
    const email = event.email
    const verifyToken = event.verify

    getUser(email, function (err, verified, correctToken) {
        if (err) {
            callback("Error in getUser: " + err)
        } else if (verified) {
            console.log("User already verified: " + email)
            callback(null, { verified: true })
        } else if (verifyToken === correctToken) {
            updateUser(email, function (err, data) {
                if (err) {
                    callback("Error in updateUser: " + err)
                } else {
                    console.log("User verified: " + email)
                    callback(null, { verified: true })
                }
            })
        } else {
            console.log("User not verified: " + email)
            callback(null, { verified: false })
        }
    })
}
