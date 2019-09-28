import Axios from "axios"

// import request from './request'

const url = name => `https://cnodejs.org/api/v1/${name}`;

// 请求超时
Axios.defaults.timeout = 10000;

//请求拦截
Axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截
Axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)

export const getData = async (data) => {
    const res = await Axios.get(url(data.url), { params:data.params });
    return res.data;
}