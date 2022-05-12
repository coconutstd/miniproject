<template>
  <div>
    <h1>로그인</h1>
    <form class="form">
      <input v-model="username" type="text" class="border-2 bg-gray-200" />
      <input v-model="password" type="password" class="border-2 bg-gray-200" />
      <button class="bg-gray-200" @click="login">로그인</button>
    </form>
  </div>
</template>

<script>
import { signIn } from "../src/cognito"

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  created() {
    window.addEventListener("submit", (e) => e.preventDefault())
  },
  methods: {
    async login(e) {
      e.preventDefault()
      const response = await signIn({
        username: this.username,
        password: this.password,
      })
      console.log(response)
    },
  },
}
</script>

<style></style>
