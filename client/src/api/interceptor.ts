import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const conf: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000/'
}
  
const $host: AxiosInstance = axios.create(conf)

$host.interceptors.request.use()

export default $host