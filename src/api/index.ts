import request from '@/service';
import { Config } from "./types";
export const SetConfig = (data: Config) => {
    return request<Config, any>({
        url: '/setconfig',
        method: 'put',
        data
    })
}


export const GetRealTime = () => {
    return request<Config, any>({
        url: '/realtime',
        method: 'get',
    })
}
