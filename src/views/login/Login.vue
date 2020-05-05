<template>
  <div class="login">
    <div class="header">
      <h1>用户登录</h1>
    </div>
    <form action method="post" id="login_form">
      <div class="form-group">
        <label for="email">号码</label>
        <el-input class="el_input" placeholder="请输入号码" v-model="phone" maxlength="20" clearable></el-input>
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
      </div>
      <div class="btn_div">
        <el-row>
          <el-button type="submit" class="btn_login" size="medium" @click="login()">登录</el-button>
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
      password: ""
    };
  },
  methods: {
    registerClick() {
      this.$router.push("/register");
    },
    login() {
      //const than = this;
      //获取表单内容
      var formData = {
        phone: this.phone,
        password: this.password
      };

      // 发起请求
      fetch("http://192.168.0.104:8888/login", {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        // credentials: "include", //发送cookie
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        headers: new Headers({
          "Content-type": "application/json"
        }),
        mode: "cors",
        // referrer: "no-referrer",
        body: JSON.stringify(formData) //把表单内容转为json格式
      })
        .then(res => {
          //then()，res接收后端处理后的数据,并且展示在前端中

          return res.json(); //把返回的后端数据变成json格式，并传给下一个then
        })
        .then(data => {
          // console.log(data.body);
          var err_code = data.err_code;
          console.log(data.user);

          //localStorage:本地持久化保存头像
          //setItem()内第一个数据数自定义id，第二个数据是获取的内容
          localStorage.setItem("avatar", data.user.avatar);

          //sessionStorage:保存用户名，当关闭页面后就会销毁
          sessionStorage.setItem("nickname", data.user.nickname);

          if (err_code === 0) {
            this.$toast.show("登录成功！");

            window.location.href = "/profile";
          } else if (err_code === 1) {
            this.$toast.show("号码或密码错误");
          } else if (err_code === 500) {
            this.$toast.show("服务器忙，请稍后再试!");
          }
          // if (data.status === 200) {
          //   this.$toast.show("200");
          // }
        })
        .catch(err => {
          //catch()主要处理后端网络请求不成功后的数据返回
          console.log(err);
          if (err.status === 404) {
            this.$toast.show("找不到页面，404");
          }
        });
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
