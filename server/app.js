//登录注册数据后台入口文件

var express = require("express");
var cors = require("cors"); //跨域
var path = require("path");
var bodyParser = require("body-parser"); //post 表单
var router = require("./router");
var session = require("express-session"); //保持登录状态

//引用框架
var app = express();

app.use(cors());

//配置post 表单
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
//把字符串转换为对象
app.use(bodyParser.json());

app.use(
  session({
    // secret: "itcast":配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: "itcast",
    resave: false,
    saveUninitialized: false, // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
  })
);

//把路由容器挂载到app 服务中 (要放到代码的后面)
app.use(router);

//启动服务
app.listen(8888, function () {
  console.log("服务器已经开启，端口是:http://127.0.0.1:8080");
});