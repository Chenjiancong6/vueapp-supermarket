import Vue from 'vue'
import VueRouter from "vue-router"

//1. 通过Vue安装路由
Vue.use(VueRouter)

//2. 懒加载；定义路由映射，导入
const home = () => import('views/home/Home')
const category = () => import('views/category/Category')
const profile = () => import('views/profile/Profile')
const shopcart = () => import('views/shopcart/Shopcart')
const detail = () => import("views/detail/Detail");
const login = () => import("views/login/Login");
const register = () => import("views/register/Register");


const routes = [{
        path: '/',
        redirect: '/home' //重定向， 默认显示
    },
    {
        path: '/home',
        component: home, //注册组件
        name: 'home',
        meta: {
            title: '首页'
        }
    },
    {
        path: '/category',
        component: category,
        name: 'category',
        meta: {
            title: '分类'
        }
    },
    {
        path: '/shopcart',
        component: shopcart,
        name: 'shopcart',
        meta: {
            title: '购物车'
        }
    },
    {
        path: '/profile',
        component: profile,
        name: 'profile',
        meta: {
            title: '我的'
        }

    },
    {
        path: "/detail",
        component: detail,
        name: 'detail',
        meta: {
            title: '详情页'
        }
    },
    {
        path: '/login',
        component: login,
        name: login,
        meta: {
            title: '登录页面'
        }
    },
    {
        path: '/register',
        component: register,
        name: register,
        meta: {
            title: '注册页面'
        }
    }
];

//挂载router路由
const router = new VueRouter({
    mode: 'history', //当 URL 改变时，页面不会重新加载
    base: process.env.BASE_URL,
    routes
})

//动态显示每个页面的标题（全局导航守卫）
router.beforeEach((to, from, next) => {
    document.title = to.matched[0].meta.title;
    next();
});

// 修改路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

// 修改路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

//导出路由
export default router;