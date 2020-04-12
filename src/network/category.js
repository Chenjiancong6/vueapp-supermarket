//分类页 网络资源请求

import {
    request
} from './request';

export function getCategory() {
    return request({
        url: '/category'
    })
}

//2.右边上部二维图片数据
export function getSubcategory(maitKey) {
    return request({
        url: "/subcategory",
        params: {
            maitKey
        }
    })
}

//3.分类底部详情数据
export function getCategoryDetail(miniWallkey, type) {
    return request({
        url: "/subcategory/detail",
        params: {
            miniWallkey,
            type
        }
    });
}