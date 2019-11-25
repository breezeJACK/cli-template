<template>
  <div class="loginSystem">
    <div class="main">
      <div class="login">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      if (userName && password) {
        sessionStorage.setItem("userName", userName);
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss">
</style>