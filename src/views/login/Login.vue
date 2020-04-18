<template>
  <div class="login">
    <div class="header">
      <h1>用户登录</h1>
    </div>

    <form action method="post" id="login_form">
      <div class="form-group">
        <label for="email">邮箱</label>
        <el-input class="el_input" placeholder="请输入邮箱" v-model="email" maxlength="20" clearable></el-input>
        <!-- <input type="email" name="email" placeholder="输入邮箱" class="from-control" /> -->
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <a href class="pull_right">忘记密码?</a>
        <el-input class="el_input" placeholder="请输入密码" v-model="input" maxlength="20" show-password></el-input>
        <!-- <input type="password" class="from-control" name="password" placeholder="输入密码" /> -->
      </div>
      <div class="btn_div">
        <el-row>
          <el-button type="submit" class="btn_login" size="medium">登录</el-button>
        </el-row>
      </div>
    </form>
    <div class="message">
      <p>
        没有账号？
        <a class="a_click" @click="registerClick">点击创建</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      input: "",
      email: ""
    };
  },
  methods: {
    registerClick() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
.btn_login {
  background-color: rgb(85, 233, 17);
  color: wheat;
  width: 200px;
  font-size: 16px;
}
.header {
  text-align: center;
}

.btn_div {
  margin: 15px auto;
  text-align: center;
}

.el_input {
  /* 饿了么输入框 */
  display: block;
  margin: 10px auto;
  text-align: center;
}

.pull_right {
  float: right;
  color: green;
}
.message {
  border: 1px solid rgb(200, 187, 187);
  padding: 10px;
}
.a_click {
  color: green;
}
</style>