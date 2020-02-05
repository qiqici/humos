import baseRequest from './baseRequest';

/**
 * sla
 * @param {*} vin 车架号
 */
function slaSwitch(vin, serviceName, interval, count) {
  return baseRequest.slaServer.post('/SlaSwitch', {
    vin,
    serviceName,
    interval,
    count,
  });
}
/**
 * 开通停车缴费服务
 * @param {*}
 */
function registerPlate(plateNum, userId, vin) {
  return baseRequest.parkingRequest.post('/app/register', {
    plateNum,
    userId,
    vin,
  });
}
/**
 * 解绑停车缴费服务
 * @param {*}
 */
function removePlate(plateNum, userId) {
  return baseRequest.parkingRequest.post('/app/plateNum/remove', {
    plateNum,
    userId,
  });
}
/**
 *
模拟进出场
 * @param {*}
 */
function simulation(plateNumber) {
  return baseRequest.parkingRequest.post('/etcp-business/simulation', {
    plateNumber,
  });
}
/**
 * 统计订单
 * @param {*} orderStatus
 * @param {*} orderCategory
 * * @param {*} userId
 * @param {*} vin
 */
function getCountOrder(orderStatus, orderCategory, userId, vin) {
  return baseRequest.orderRequest.post('/orderCount', {
    orderStatus,
    orderCategory,
    userId,
    vin,
  });
}
/**
 * 查询流量包详情
 * @param {*} vin
 * @param {*} userId
 */
function getFlowsList(vin, userId) {
  return baseRequest.paymentRequest.get('/getFlowsDetail', {
    params: {
      vin,
      userId,
    },
  });
}

/**
 * 支付
 * @param {*} goodsId
 * @param {*} quantity
 * @param {*} vin
 *  * @param {*} userId
 */
function getPayment(goodsId, quantity, vin, userId) {
  return baseRequest.orderRequest.post('/orderCreate', {
    goodsId,
    quantity,
    vin,
    userId,
  });
}

/**
 * 获取第三方会员信息
 * @param {*} 1-Authorization
 * @param {*} 2-vin
 * @param {*} 3-vipType
 */
function getVipInfo(Authorization, vin, vipType) {
  return baseRequest.paymentRequest.get('/getVipInfo', {
    params: {
      Authorization,
      vin,
      vipType,
    },
  });
}

/**
 * 商品详情
 * @param {*} goodsId
 */
function getGoodsDetail(goodsId) {
  return baseRequest.paymentRequest.get('/getGoodsDetail', {
    params: {
      goodsId,
    },
  });
}

/**
检验停车缴费服务开通状态
 * @param {*}
 */
function getRegisterStatus(userId, vin) {
  return baseRequest.parkingRequest.get('/app/registerStatus', {
    params: {
      userId,
      vin,
    },
  });
}
/**
 * 设置或修改车牌号
 * @param {*}
 */
function setLicenseplate(plate, userId, vin) {
  return baseRequest.licensePlateRequest.post('/customer/plateNum/update', {
    plate,
    userId,
    vin,
  });
}

/**
获取无感支付列表
 * @param {*}
 */
function getSignStatus(userId) {
  return baseRequest.parkingRequest.get('/app/signStatus', {
    params: {
      userId,
    },
  });
}
/**
查询停车签约状态
 * @param {*}
 */
function getcheck(userId, payType, spType) {
  return baseRequest.parkingRequest.get('/app/agreement/result/check', {
    params: {
      userId,
      payType,
      spType,
    },
  });
}
/**
获取签约二维码
"payChannel": 支付渠道(1：支付宝, 2：微信),
  "source": 0,
  "spType": 停车服务商(ezp,etcp),
  "userId": 1
 * @param {*}
 */
function getSignQRcode(userId, payChannel, spType, source) {
  return baseRequest.parkingRequest.post('/getSignQRCode', {
    userId,
    payChannel,
    spType,
    source,
  });
}
export default {
  slaSwitch,
  simulation,
  removePlate,
  getCountOrder,
  getPayment,
  getFlowsList,
  getVipInfo,
  getGoodsDetail,
  setLicenseplate,
  registerPlate,
  getRegisterStatus,
  getSignStatus,
  getcheck,
  getSignQRcode,
};
