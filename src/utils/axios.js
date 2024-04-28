import axios from 'axios';
//为了使用方便自定义了一个request请求方法 
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
      baseURL:"/api",
    timeout: 5000,
  })
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })
  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  // 3.发送真正的网络请求
  return instance(config)
}

