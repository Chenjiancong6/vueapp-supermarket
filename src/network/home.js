//首页数据的网络请求封装

import {
    request
} from "./request";

//轮播图数据
export function getHomeMultidata() {
    return request({
        url: "/home/multidata"
    })
}

//首页商品数据请求
export function getGoodsData(type, page) {
    //例子： type: pop  ; page:1
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}