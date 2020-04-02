/**
 * 详情页网络资源数据
 **/

import {
    request
} from './request'

// 详情页轮播图
export function getDetail(iid) {
    return request({
        url: './detail',
        params: {
            iid
        }
    })
}