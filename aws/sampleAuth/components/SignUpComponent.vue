<template>
  <div class="signup-component">
    <h1 class="greeting">가입페이지</h1>
    <p class="greeting-text">
      안전한 사용자 환경을 위해 <br />
      최소한의 정보만 받습니다.
    </p>
    <button class="facebook-login">페이스북 가입하기</button>
    <span>Or</span>
    <form class="signup-form">
      <input
        v-model="formData.username"
        type="username"
        placeholder="아이디를 입력해주세요"
        class="username flex-item"
      />
      <input
        v-model="formData.password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        class="password flex-item"
      />
      <input
        v-model="formData.passwordConfirm"
        type="password"
        placeholder="비밀번호를 한 번 더 입력해주세요"
        class="password-confirm flex-item"
      />
      <input
        v-model="formData.email"
        type="email"
        placeholder="이메일 주소를 입력해주세요"
        class="email flex-item"
      />
      <input
        v-if="isUserCreated"
        v-model="registrationCode"
        type="text"
        maxlength="6"
        placeholder="전송된 코드를 입력해주세요"
        class="flex-item"
      />
      <button
        v-if="!isUserCreated"
        type="submit"
        class="submit"
        @click="onClick"
      >
        인증코드 전송
      </button>
      <button
        v-if="isUserCreated"
        type="submit"
        class="submit"
        @click="submitCode"
      >
        가입
      </button>
    </form>
  </div>
</template>

<script>
import { signup, confirm } from "../src/cognito"

export default {
  name: "SignUpComponent",
  data() {
    return {
      formData: {
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
      },
      registrationCode: "",
      isUserCreated: false,
    }
  },
  methods: {
    async onClick(e) {
      e.preventDefault()
      const response = await signup(this.formData)
      if (response.$metadata.httpStatusCode === 200) {
        this.showRegisterCode()
      }
    },
    showRegisterCode() {
      this.isUserCreated = true
    },
    async submitCode(e) {
      e.preventDefault()
      const response = await confirm(
        this.registrationCode,
        this.formData.username
      )
      if (response.$metadata.httpStatusCode === 200) {
        alert("가입성공")
      }
    },
  },
}
</script>

<style scoped>
.signup-component {
  width: 647px;
  height: 871px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #c8d1e5;
  border-radius: 5px;
}

.signup-component h1 {
  font-size: 36px;
  font-weight: 600;
  width: 254px;
  max-height: 90px;
  margin-bottom: 29px;
  text-align: center;
}

.signup-component p {
  font-size: 20px;
  font-weight: 400;
  width: 381px;
  height: 50px;
  line-height: 1.25em;
  padding: 0 20px;
  margin-bottom: 30px;
  text-align: center;
}

.signup-component .facebook-login {
  width: 364px;
  height: 61px;
  color: white;
  background-color: #4968ad;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
}

.signup-component span {
  font-size: 18px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
}

.signup-component form {
  max-width: 364px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.signup-component input {
  border: 2px solid #c8d1e5;
  border-radius: 5px;
  padding: 19px 25px;
  color: #1b1c40;
  font-size: 18px;
  font-weight: 500;
}

.signup-component form .name-group {
  display: flex;
  justify-content: space-between;
}

.signup-component form .name-group :first-child {
  width: 177px;
}

.signup-component form .name-group :last-child {
  width: 177px;
}

.signup-component form .flex-item {
  margin-bottom: 22px;
}

.signup-component .submit {
  width: 364px;
  height: 61px;
  color: white;
  background-color: #1e2c4b;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.signup-component button {
  cursor: pointer;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
