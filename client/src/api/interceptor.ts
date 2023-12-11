import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const conf: AxiosRequestConfig = {
    baseURL: 'localhost:8080/'
}
  
const $host: AxiosInstance = axios.create(conf)

$host.interceptors.request.use()

export default $host