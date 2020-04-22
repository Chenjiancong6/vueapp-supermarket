<template>
  <div class="Register">
    <div class="header">
      <h1>用户注册</h1>
    </div>

    <form action method="post" id="Register_form">
      <div class="form-group">
        <label for="email">号码</label>
        <el-input
          class="el_input"
          placeholder="请输入号码"
          v-model="phone"
          maxlength="20"
          clearable
        ></el-input>
        <!-- <input type="email" name="email" placeholder="输入号码" class="from-control" /> -->
      </div>

      <div class="form-group">
        <label for="text">昵称</label>
        <el-input
          class="el_input"
          placeholder="请输入昵称"
          v-model="nickname"
          maxlength="20"
        ></el-input>
      </div>

      <div class="form-group">
        <label for="passwords">密码</label>
        <el-input
          class="el_input"
          placeholder="请输入密码"
          v-model="password"
          maxlength="20"
          show-password
        ></el-input>
      </div>
      <div class="btn_div">
        <el-row>
          <el-button
            @click="register()"
            type="submit"
            class="btn_Register"
            size="medium"
            >注册</el-button
          >
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
      nickname: "",
      phone: "",
      password: "",
    };
  },
  methods: {
    loginClick() {
      this.$router.push("/login");
    },
    //获取输入框内容
    register() {
      //获取表单内容
      var formData = {
        phone: this.phone,
        nickname: this.nickname,
        password: this.password,
      };
      fetch("http://localhost:8888/register", {
        method: "POST",
        credentials: "same-origin",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        headers: new Headers({
          "Content-type": "application/json",
        }),
        mode: "cors",
        body: JSON.stringify(formData),
      })
        .then(function(data) {
          //then()，res接收后端处理后的数据,并且展示在前端中
          var err_code = data.err_code;
          if (err_code === 0) {
            this.$toast.show("注册成功！");
            window.alert("哈哈哈");
          } else if (err_code === 1) {
            this.$toast.show("号码或昵称已经存在！");
          } else if (err_code === 500) {
            this.$toast.show("服务器忙，请稍后再试!");
          }
        })
        .catch(function(err) {
          //catch()主要处理后端网络请求不成功后的数据返回
          if (err.status === 404) {
            this.$toast.show("找不到页面，404");
          }
        });
    },
  },
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
