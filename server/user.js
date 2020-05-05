/**
 * 用户的数据模型，限制用户的输入，并保存在数据库中
 */

//导入mongoose
var mongoose = require('mongoose')

//1. 导入和连接数据库

//指定连接的数据库，当插入第一条数据库后自动被创建出来
mongoose.connect('mongodb://localhost/mymall', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
    console.log("连接数据库成功.");
});

//2. 设计文档结构（表结构）
var Scheme = mongoose.Schema;

userSchema = new Scheme({
    //登录账号
    phone: {
        type: String,
        require: true
    },
    //昵称
    nickname: {
        type: String,
        require: true
    },
    //登录密码
    password: {
        type: String,
        require: true,
        //select: false
    },
    //头像
    avatar: {
        type: String,
        default: 'http://192.168.0.104:8888/resource/logo.png'
    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now
    },
    //修改时间
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    //登录权限
    status: {
        type: Number,
        // 0 没有权限限制
        // 1 不可以评论
        // 2 不可以登录
        enum: [0, 1, 2],
        default: 0
    }
})

//3. 将文档结构发布为模型
module.exports = mongoose.model('User', userSchema)