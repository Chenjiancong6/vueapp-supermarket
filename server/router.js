var express = require("express");
var User = require("./user.js"); // 引用数据库模型
var router = express.Router(); //express的路由插件



router.get('/login:id', function (req, res) {
  console.log(req.params)
  res.json({
    meg: '857'
  })
});

router.post('/login', function (req, res) {
  // 1. 获取表单数据
  var body = req.body;
  console.log(req.body) //获取数据
  //2. 查询数据库用户名密码是否正确
  User.findOne({
      //查询的内容
      phone: body.phone,
      password: body.password
    },
    function (err, user) {
      //user:上面查询的账号和密码

      // 3. 发送响应数据
      //如果网络发生错误，返回500
      if (err) {
        return res.status(500).json({
          err_data: 500, //网络错误
          message: err.message
        })
      }
      //如果查询的信息和数据库不匹配
      if (!user) {
        return res.status(200).json({
          err_code: 1,
          message: '号码或者密码错误'
        })
      }
      // 用户存在，登陆成功，通过 Session 记录登陆状态
      req.session.user = user;

      //如果用户存在，登录成功
      res.status(200).json({
        err_code: 0, // 信息匹配成功
        message: "登录成功",
        user
      });
    }
  )

})

//base64
// multer
//jsonwebtoken  
router.post("/file/upload", async (req, res, next) => {
  var file;
  console.log(req)
  req.file = file
  //隐式
}, async (req, res) => {
  // req.file //拿到上一个中间件的值
})



/**
 * 注册post请求
 */
router.post("/register", function (req, res) {
  //1. 获取表单内容 :req.body
  var body = req.body;
  console.log(req.body) //获取数据
  //2. 查询数据库用户是否存在
  User.findOne({
      $or: [
        //$or 方法查询是否有一个满足条件
        {
          phone: body.phone,
        },
        {
          nickname: body.nickname,
        },
      ],
    },
    function (err, data) {
      // 3. 发送响应数据
      //如果发生错误，返回500
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: "服务端错误",
        });
      }
      //data查询的账号或者昵称
      if (data) {
        return res.status(200).json({
          err_code: 1,
          message: "号码或者密码已经存在",
        });
      }

      //账号或者昵称都不存在，创建一个新的，并保存在数据库
      new User(body).save(function (err, user) {
        if (err) {
          return res.status(500).json({
            err_code: 500,
            message: "网络错误",
          });
        }

        // 注册成功，使用 Session 记录用户的登陆状态
        req.session.user = user;

        //注册成功
        res.status(200).json({
          err_code: 0,
          message: "ok",
        });
      });
    }
  );
});

/**
 * 清除登录状态
 */

// router.get("/logout", function (req, res) {
//     //清除登录状态
//     req.session = null;

//     //重定向到首页
//     res.redirect("/login");
// });

//导出
module.exports = router;