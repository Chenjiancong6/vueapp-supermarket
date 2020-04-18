<template>
  <div class="Register">
    <div class="header">
      <h1>用户注册</h1>
    </div>

    <form action method="post" id="Register_form">
      <div class="form-group">
        <label for="email">邮箱</label>
        <el-input class="el_input" placeholder="请输入邮箱" v-model="email" maxlength="20" clearable></el-input>
        <!-- <input type="email" name="email" placeholder="输入邮箱" class="from-control" /> -->
      </div>

      <div class="form-group">
        <label for="text">昵称</label>
        <el-input class="el_input" placeholder="请输入昵称" v-model="input" maxlength="20"></el-input>
      </div>

      <div class="form-group">
        <label for="passwords">密码</label>
        <el-input class="el_input" placeholder="请输入密码" v-model="input" maxlength="20" show-password></el-input>
        <!-- <input type="password" class="from-control" name="password" placeholder="输入密码" /> -->
      </div>
      <div class="btn_div">
        <el-row>
          <el-button type="submit" class="btn_Register" size="medium">注册</el-button>
        </el-row>
      </div>
    </form>
    <div class="message">
      <p>
        已有账号？
        <a class="a_click" @click="loginClick">点击登录</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      input: "",
      email: ""
    };
  },
  methods: {
    loginClick() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.btn_Register {
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

.message {
  border: 1px solid rgb(200, 187, 187);
  padding: 10px;
}
.a_click {
  color: green;
}
</style>