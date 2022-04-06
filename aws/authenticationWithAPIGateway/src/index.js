import { signUp, verify } from "./cognito/index.js"

const $form = document.querySelector(".signup-form")
const $username = document.querySelector(".email")
const $password = document.querySelector(".password")
const $passwordConfirm = document.querySelector(".password-confirm")
const $submitButton = document.querySelector(".submit")
const $result = document.querySelector(".result")

$submitButton.addEventListener("click", (e) => {
    e.preventDefault()

    if ($password.value !== $passwordConfirm.value) {
        $result.innerHTML = "비밀번호가 서로 다릅니다"
    }

    const input = {
        username: $username.value,
        password: $password.value,
    }
    console.log(signUp(input))
})

const $verify = document.querySelector(".verify")
$verify.addEventListener("click", (e) => {
    e.preventDefault()
    const verficationCode = document.querySelector(".verfication-code").value
    verify(verficationCode)
})
