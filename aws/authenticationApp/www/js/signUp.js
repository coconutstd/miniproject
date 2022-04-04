AWS.config.region = "us-east-1"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:b0690ab0-1acf-4fc5-a55b-45ed26e7704d",
})
const lambda = new AWS.Lambda()

function signup() {
    const $result = document.getElementById("result")
    const $email = document.getElementById("email")
    const $password = document.getElementById("password")
    const $verifyPassword = document.getElementById("verify-password")

    $result.innerHTML = "Sign Up..."

    if ($email.value === null || $email.value === "") {
        $result.innerHTML = "Please specify your email address."
    } else if ($password.value === null || $password.value === "") {
        $result.innerHTML = "Please specify a password."
    } else if ($password.value !== $verifyPassword.value) {
        $result.innerHTML = "Passwords are <b>different</b>, please check"
    }

    const input = {
        email: $email.value,
        password: $password.value,
    }

    lambda.invoke(
        {
            FunctionName: "sampleAuthCreateUser",
            Payload: JSON.stringify(input),
        },
        function (err, data) {
            if (err) console.log(err, err.stack)
            else {
                const output = JSON.parse(data.Payload)
                console.log(output)
                if (output.created) {
                    $result.innerHTML =
                        "User " +
                        input.email +
                        " created. Please check your email to validate the use and enable login"
                } else {
                    $result.innerHTML = "User <b>not</b> created"
                }
            }
        }
    )
}

const $form = document.getElementById("signup-form")
$form.addEventListener("submit", (event) => {
    event.preventDefault()
    signup()
})
