import myRequestApi from '@/api/myRequest';

const myRequestModule = {
  namespaced: true,
  state: {
    getPageInfo: {},
    getServiceInfo: {},
    getSlaSendInfo: {},
  },
  mutations: {
    setPageData(state, pageData) {
      state.getPageInfo = pageData;
    },
    setServiceData(state, serviceInfo) {
      state.getServiceInfo = serviceInfo;
    },
    setSlaSendData(state, salSendData) {
      state.getSlaSendInfo = salSendData;
    },
  },
  actions: {
    // 查询日志列表
    getPageInfo({
      commit,
    }, {
      mobile,
      userId,
      vin,
      startTime,
      endTime,
      pageIndex,
      pageSize,
      moudle,
      status,
    }) {
      // eslint-disable-next-line max-len
      return myRequestApi.pagePlate(mobile, userId, vin, startTime, endTime, pageIndex, pageSize, moudle, status).then((res) => {
        if (res.data.code === '000000') {
          commit('setPageData', res.data);
        }
        return res;
      });
    },
    // 查询服务列表
    // eslint-disable-next-line no-empty-pattern
    getServiceInfo({ commit }, {}) {
      return myRequestApi.servicePlate().then((res) => {
        if (res.data.code === '000000') {
          commit('setServiceData', res.data);
        }
        return res;
      });
    },
    // 下发sla指令
    getSlaSendInfo({ commit }, {
      executSalServiceReq,
    }) {
      return myRequestApi.slaSendPlate(executSalServiceReq).then((res) => {
        if (res.data.code === '000000') {
          commit('setSlaSendData', res.data);
        }
      });
    },
  },
};
export default myRequestModule;
