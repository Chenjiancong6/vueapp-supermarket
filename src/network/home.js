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