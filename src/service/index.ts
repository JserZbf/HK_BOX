//@thx https://github.com/ywanzhou/vue3-template

import { AxiosResponse } from 'axios'
import Request from './request'

import type { RequestConfig } from './request/types'

export interface ServiceResponse<T> {
    code: number
    msg: string
    result: T
}

// 重写返回类型
interface ServiceRequestConfig<T, R> extends RequestConfig<ServiceResponse<R>> {
    data?: T
}
console.log(import.meta.env)
const request = new Request({
    // baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 1000 * 60 * 5,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => config,
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            return result
        },
    },
})

const ServiceRequest = <D = any, T = any>(config: ServiceRequestConfig<D, T>) => {
    const { method = 'GET' } = config
    if (method === 'get' || method === 'GET') {
        config.params = config.data
    }
    return request.request<ServiceResponse<T>>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
    return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
    return request.cancelAllRequest()
}

export default ServiceRequest
