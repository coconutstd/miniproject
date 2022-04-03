AWS.config.region = "us-east-1"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:eccae70a-c851-4951-99b5-9a6f147e0a6c",
})

const lambda = new AWS.Lambda()

async function returnGreetings() {
  document.getElementById("submitButton").disabled = true
  const name = document.getElementById("name")
  let input
  if (name.value === null || name.value === "") {
    input = {}
  } else {
    input = {
      name: name.value,
    }
  }
  console.log("invoke")
  const response = await lambda.invoke(
    {
      FunctionName: "greetingHello",
      Payload: JSON.stringify(input),
    },
    function (err, data) {
      if (err) {
        console.log(err)
      }
    }
  )
  console.log(response)
  const result = document.getElementById("result")
  console.log(result)
}
$button = document
  .getElementById("submitButton")
  .addEventListener("click", () => returnGreetings())

window.addEventListener("submit", (event) => {
  event.preventDefault()
})
