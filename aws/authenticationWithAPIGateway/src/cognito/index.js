import * as cognito from "amazon-cognito-identity-js"
import poolData from "../config.js"

const userPool = new cognito.CognitoUserPool(poolData)

export const signUp = (data) => {
    const attributeList = [{ Name: "email", Value: data.username }]
    userPool.signUp(
        data.username,
        data.password,
        attributeList,
        null,
        signUpcallBack
    )
}

const signUpcallBack = (err, result) => {
    if (err) {
        console.log(err)
    } else {
        window.location.assign(
            `http://localhost:5500/aws/authenticationWithAPIGateway/pages/verify.html?username=${result.user.username}`
        )
    }
}

export const verify = (verificationCode) => {
    const username = new URLSearchParams(window.location.search).get("username")
    const userData = {
        Pool: userPool,
        Username: username,
    }
    console.log(userData)
    const cognitoUser = new cognito.CognitoUser(userData)
    cognitoUser.confirmRegistration(verificationCode, true, verifyCallback)
}

const verifyCallback = (err, result) => {
    if (err) {
        console.log(err)
    } else {
        alert("가입 성공")
        window.location.assign(
            `http://localhost:5500/aws/authenticationWithAPIGateway/`
        )
    }
}
