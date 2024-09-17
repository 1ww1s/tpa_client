import {
    InternalAxiosRequestConfig,
} from "axios";
  

import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL_API,
    withCredentials: true,
})

const $authHost = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL_API,
    withCredentials: true,
})

const authInterceptor = (config:  InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.response.use((config) => { 
    return config
}, async (error) => {
    const originalRequest = error.config;

    if((error.response?.status === 401) && error.config && !originalRequest._isRetry) {
        try {
            originalRequest._isRetry = true;
            const data = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/user/refresh`,
            {
                withCredentials: true
            });  
            localStorage.setItem('token', data.data.accessToken)
            return $authHost.request(originalRequest);
        }
        catch(e) {
            throw e
        }
    }
    throw error
})


$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}