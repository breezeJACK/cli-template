<template>
  <div class="loginSystem">
    <div class="main">
      <div class="login">
        <el-input v-model="account" placeholder="请输入账号"></el-input>
        <el-input v-model="psw" placeholder="请输入密码"></el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUserInfo } from "@/api/userInfo";
export default {
  data() {
    return {
      account: "",
      psw: ""
    };
  },
  methods: {
    async login() {
      const { token } = await fetchUserInfo({
        username: this.account,
        password: this.psw
      });
      sessionStorage.setItem("userType", token);
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 200px;
  margin: 0 auto;
}
input {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
