//自己创造的弹窗插件

import Toast from "./Toast.vue"

const plugins = {}; //创造一个弹窗对象

// 安装弹窗对象
plugins.install = Vue => {
    //1.创建Toast组件构造器
    const ToastConstructor = Vue.extend(Toast);

    //2. 根据组件构造器，创造出来一个组件对象
    const toast = new ToastConstructor();

    //3. 将组件对象，用$mount方法手动挂载到某个DIV中
    toast.$mount(document.createElement('div'));

    //4. 将toast.vue的$el添加到body中
    document.body.appendChild(toast.$el)

    //5.创造外部引用原型$toast
    Vue.prototype.$toast = toast;
}



export default plugins; //导出弹窗对象