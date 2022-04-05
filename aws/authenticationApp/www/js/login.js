AWS.config.region = "<REGION>"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "<IDENTITY_POOL_ID>",
})

var lambda = new AWS.Lambda()

function login() {
    const $result = document.getElementById("result")
    const $email = document.getElementById("email")
    const $password = document.getElementById("password")

    $result.innerHTML = "Login..."

    if ($email.value === null || $email.value === "") {
        $result.innerHTML = "Please specify your email address"
    } else if ($password.value === null || $password.value === "") {
        $result.innerHTML = "Please specify a password. "
    } else {
        const input = {
            email: $email.value,
            password: $password.value,
        }

        lambda.invoke(
            {
                FunctionName: "sampleAuthLogin",
                Payload: JSON.stringify(input),
            },
            function (err, data) {
                if (err) console.log(err, err.stack)
                else {
                    const output = JSON.parse(data.Payload)
                    console.log(output)
                    if (!output.login) {
                        $result.innerHTML = "<b>Not</b> logged in"
                    } else {
                        $result.innerHTML =
                            "Logged in with IdentityId: " +
                            output.identityId +
                            "<br>"
                        const creds = AWS.config.credentials
                        creds.params.IdentityId = output.identityId
                        creds.params.Logins = {
                            "cognito-identity.amazonaws.com": output.token,
                        }
                        creds.expired = true
                        console.log(creds)
                    }
                }
            }
        )
    }
}

const $form = document.getElementById("login-form")
$form.addEventListener("submit", (event) => {
    event.preventDefault()
    login()
})
