import messageApi from '@/api/message';


const messageModule = {
  namespaced: true,
  state: {
    mediaFlowType: 'media',
    flowType: 'wifi',
    vipType: 'music',
    vipTypeRadio: 'radio',
    licensePlate: '',
    remainData: {},
    mediaData: {},
    countOrdeData: '',
    paymentData: {},
    flowsListData: [],
    productsData: [],
    vipInfoData: {},
    vipInfoDataRadio: {},
    goodDetailsData: {},
    codeDataVip: '',
    codeDataRadio: '',
    licenseplateData: {},
    registerInfo: {},
    regStatusList: {},
    registerStatusData: {},
    checkData: {},
    sigCodData: {},
    VehicleBasicData: {},
    bgMode: false,
  },
  mutations: {
    getRemainDataInfo(state, remainData) {
      state.remainData = remainData;
    },
    getMediaDataInfo(state, mediaData) {
      state.mediaData = mediaData;
    },
    setCountOrd(state, countOrdeData) {
      state.countOrdeData = countOrdeData;
    },
    setFlowsList(state, flowsListData) {
      state.flowsListData = flowsListData;
    },
    setProductsData(state, productsData) {
      state.productsData = productsData;
    },
    getPaymentInfo(state, paymentData) {
      state.paymentData = paymentData;
    },
    setVipInfo(state, vipInfoData) {
      state.vipInfoData = vipInfoData;
    },
    setVipInfoCode(state, codeDataVip) {
      state.codeDataVip = codeDataVip;
    },
    setVipInfoRadio(state, vipInfoDataRadio) {
      state.vipInfoDataRadio = vipInfoDataRadio;
    },
    setVipInfoRadioCode(state, codeDataRadio) {
      state.codeDataRadio = codeDataRadio;
    },
    setGoodDetails(state, goodDetailsData) {
      state.goodDetailsData = goodDetailsData;
    },
    setVehicleBasicData(state, vehicleBasicData) {
      state.VehicleBasicData = vehicleBasicData;
    },
    setplateData(state, plateData) {
      state.licenseplateData = plateData;
    },
    setregisterData(state, registerData) {
      state.registerInfo = registerData;
    },
    setPayListData(state, payListData) {
      state.regStatusList = payListData;
    },
    setregisterStatusData(state, registerStatusInfo) {
      state.registerStatusData = registerStatusInfo;
    },
    setSignQRcodData(state, signCodData) {
      state.sigCodData = signCodData;
    },
    setcheckData(state, checkDataInfo) {
      state.checkData = checkDataInfo;
    },
    updateBgMode(state, modeType) {
      state.bgMode = modeType;
    },
  },
  actions: {
    getRemainWifi({
      commit,
      state,
    }, {
      vin,
    }) {
      return messageApi.getRemain(vin, state.flowType).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('getRemainDataInfo', res.data.data);
        }
        return res;
      });
    },
    mediaData({
      commit,
      state,
    }, {
      vin,
    }) {
      return messageApi.getRemain(vin, state.mediaFlowType).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('getMediaDataInfo', res.data.data);
        }
        return res;
      });
    },
    getCountOrder({
      commit,
    }, {
      orderStatus,
      orderCategory,
      userId,
      vin,
    }) {
      return messageApi.getCountOrder(orderStatus, orderCategory, userId, vin).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setCountOrd', res.data.data);
        }
        return res;
      });
    },
    getFlowsListData({
      commit,
    }, {
      vin,
      userId,
    }) {
      return messageApi.getFlowsList(vin, userId).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setFlowsList', res.data.data);
        }
        return res;
      });
    },
    getProductsData({
      commit,
    }, {
      vin,
      userId,
      brand,
      productType,
    }) {
      return messageApi.getProductList(vin, userId, brand, productType).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setProductsData', res.data.data.goodsCategories);
        }
        return res;
      });
    },
    fetchPayment({
      commit,
    }, {
      goodsId,
      quantity,
      vin,
      userId,
    }) {
      return messageApi.getPayment(goodsId, quantity, vin, userId).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('getPaymentInfo', res.data.data);
        }
        return res;
      });
    },
    getVipInfoData({
      commit,
      state,
    }, {
      Authorization,
      vin,
    }) {
      return messageApi.getVipInfo(Authorization, vin, state.vipType).then((res) => {
        commit('setVipInfoCode', res.data.code);
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setVipInfo', res.data.data);
        }
        return res;
      });
    },
    getVipInfoDataRadio({
      commit,
      state,
    }, {
      Authorization,
      vin,
    }) {
      return messageApi.getVipInfo(Authorization, vin, state.vipTypeRadio).then((res) => {
        commit('setVipInfoRadioCode', res.data.code);
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setVipInfoRadio', res.data.data);
        }
        return res;
      });
    },
    getGoodsDetailData({
      commit,
    }, {
      goodsId,
    }) {
      return messageApi.getGoodsDetail(goodsId).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setGoodDetails', res.data.data);
        }
        return res;
      });
    },
    delplate({
      commit,
    }, {
      plateNum,
      userId,
    }) {
      return messageApi.removePlate(plateNum, userId).then((res) => {
        if (res.data.code === '000000') {
          commit('setVehicleBasicData', res.data.data);
        }
        return res;
      });
    },
    getsimulationInfo({
      commit,
    }, {
      plateNumber,
    }) {
      return messageApi.simulation(plateNumber).then((res) => {
        if (res.data.code === '000000') {
          commit('setplateData', res.data);
        }
        return res;
      });
    },
    getRegisterInfo({
      commit,
    }, {
      plateNum,
      userId,
      vin,
    }) {
      return messageApi.registerPlate(plateNum, userId, vin).then((res) => {
        if (res.data.code === '000000') {
          commit('setregisterData', res.data);
        }
        return res;
      });
    },
    getRegisterStatusInfo({
      commit,
    }, {
      userId,
      vin,
    }) {
      return messageApi.getRegisterStatus(userId, vin).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setregisterStatusData', res.data.data);
        }
        return res;
      });
    },
    getPayList({
      commit,
    }, {
      userId,
    }) {
      return messageApi.getSignStatus(userId).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setPayListData', res.data.data.spSignStatus);
        }
        return res;
      });
    },
    getSignQRcodeData({
      commit,
    }, {
      userId,
      payChannel,
      spType,
      source,
    }) {
      return messageApi.getSignQRcode(userId, payChannel, spType, source).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setSignQRcodData', res.data.data);
        } else {
          commit('setSignQRcodData', '');
        }
        return res;
      });
    },
    getCheckData({
      commit,
    }, {
      userId,
      payType,
      spType,
    }) {
      return messageApi.getcheck(userId, payType, spType).then((res) => {
        // eslint-disable-next-line no-undef
        if (res.data.code === bussinessCode.success) {
          commit('setcheckData', res.data);
        }
        return res;
      });
    },
  },
};
export default messageModule;
