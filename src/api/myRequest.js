import baseRequest from './baseRequest';

/**
 * 查询日志列表
 * @param {*}
 */
function pagePlate(mobile, userId, vin, startTime, endTime, pageIndex, pageSize, moudle, status) {
  return baseRequest.slaServer.get('/acesslog/list/page', {
    params: {
      mobile,
      userId,
      vin,
      startTime,
      endTime,
      pageIndex,
      pageSize,
      moudle,
      status,
    },
  });
}

/**
 * 查询服务列表
 * @param {*}
 */
function servicePlate() {
  return baseRequest.slaServer.get('/service/list', {

  });
}

/**
 * 下发sla指令
 * @param {*}
 */
// function slaSendPlate(curlUrl, exeCount, intervalTime, keyword, reqType, serviceCode) {
//   return baseRequest.slaServer.post('/sla/execut', {
//     curlUrl,
//     exeCount,
//     intervalTime,
//     keyword,
//     reqType,
//     serviceCode,
//   });
// }
function slaSendPlate(executSalServiceReq) {
  return baseRequest.slaServer.post('/sla/execut', {
    executSalServiceReq,
  });
}

/**
 * sla执行结果列表查询
 * @param {*}
 */
function slaViewPlate(testSlaReqeustReq) {
  return baseRequest.slaServer.post('/sla/list', {
    testSlaReqeustReq,
  });
}

/**
 * 查询traceLog记录
 * @param {*}
 */
function traceLogFindPlate(vin, startTime, endTime, pageIndex, pageSize) {
  return baseRequest.slaServer.get('/traceLog/find', {
    vin,
    startTime,
    endTime,
    pageIndex,
    pageSize,
  });
}

/**
 * traceLog记录log下载
 * @param {*}
 */
function traceLogDownloadPlate(fileName) {
  return baseRequest.slaServer.get(`/traceLog/${fileName}/download`, {

  });
}

export default {
  pagePlate,
  servicePlate,
  slaSendPlate,
  slaViewPlate,
  traceLogFindPlate,
  traceLogDownloadPlate,
};
