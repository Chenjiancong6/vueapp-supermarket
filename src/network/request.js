/**
 * 网络资源数据请求接口
 * **/

import axios from 'axios'

//promise异步请求的封装
export function request(options) {
    // return new Promise()
    return new Promise((resolve, reject) => {

        //创建axios 的实例对象
        const instance = axios.create({
            baseURL: 'http://123.207.32.32:8000/api/m3',
            timeout: 5000
        });

        //过滤器(拦截器)
        instance.interceptors.response.use(res => {
            return res.data;
        });

        instance(options).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    });
}