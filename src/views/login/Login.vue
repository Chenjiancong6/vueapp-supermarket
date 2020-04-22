<template>
  <div class="login">
    <div class="header">
      <h1>用户登录</h1>
    </div>
    <form action method="post" id="login_form">
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
        <label for="password">密码</label>
        <a href class="pull_right">忘记密码?</a>
        <el-input
          class="el_input"
          placeholder="请输入密码"
          v-model="password"
          maxlength="20"
          show-password
        ></el-input>
        <!-- <input type="password" class="from-control" name="password" placeholder="输入密码" /> -->
      </div>
      <div class="btn_div">
        <el-row>
          <el-button
            type="submit"
            class="btn_login"
            size="medium"
            @click="login()"
            >登录</el-button
          >
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
      phone: "",
      password: "",
    };
  },
  methods: {
    registerClick() {
      this.$router.push("/register");
    },
    login() {
      console.log("sdasdas");
      //获取表单内容
      var formData = {
        phone: this.phone,
        password: this.password,
      };

      // 发起请求
      fetch("http://localhost:8888/login", {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        headers: new Headers({
          "Content-type": "application/json",
        }),
        mode: "cors",
        // referrer: "no-referrer",
        body: JSON.stringify(formData),
      })
        // .then(function(res) {
        //   //then()，res接收后端处理后的数据,并且展示在前端中
        //   return res.body;
        // })
        .then((data) => {
          console.log(data.body);
          var err_code = data.err_code;
          if (err_code === 0) {
            this.$toast.show("登录成功！");
            this.$router.push("/profile");
            window.location.href = "/profile";
            window.alert("哈哈哈");
          } else if (err_code === 1) {
            this.$toast.show("号码或密码错误");
            window.alert("哈哈哈");
          } else if (err_code === 500) {
            this.$toast.show("服务器忙，请稍后再试!");
          }
          if (data.status === 200) {
            this.$toast.show("哈哈哈");
            window.alert("哈哈哈");
          }
        })
        .catch(function(err) {
          //catch()主要处理后端网络请求不成功后的数据返回
          console.log(err);
          if (err.status === 404) {
            this.$toast.show("找不到页面，404");
          }
        });
    },
  },
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
