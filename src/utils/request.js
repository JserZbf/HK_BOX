import axios from "axios";
axios.defaults.timeout = 10000; //设置超时时间，单位毫秒
const service = axios.create({
  timeout: 10000, // request timeout
});
export default service;
