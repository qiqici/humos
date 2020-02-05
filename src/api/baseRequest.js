import axios from 'axios';

axios.interceptors.response.use(response => response.data, (error) => {
  if (error.response) {
    console.log('服务器响应状态码异常: ', error.response);
  } else if (error.request) {
    console.log('服务器无响应: ', error.request);
  } else {
    console.log('请求发送失败', error.message);
  }
});

// 设置头部token
/* eslint-disable */
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// axios.defaults.headers.common['Did'] = 'Did';
axios.defaults.headers.common['TraceId'] = 'TraceId';
// 设置头部时间戳
const timestamp = new Date().getTime();
axios.defaults.headers.common['timestamp'] = timestamp;
const slaServer = axios.create({
  baseURL: '/mos-mweb/test-center/api/sla/v1',
});

const orderRequest = axios.create({
  baseURL: '/mos-mweb/test-center/api/order/v1',
});
const parkingRequest = axios.create({
  baseURL: '/mos-mweb/test-center/api/app/v1',
});
const licensePlateRequest = axios.create({
  baseURL: '/mos-mweb/test-center/api/simulation/v1',
});
export default {
  slaServer,
  orderRequest,
  parkingRequest,
  licensePlateRequest,
};
