import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/mos-mweb/test-center/index.html',
      name: 'sla',
      component: () => import('@/page/sla.vue'),
    },
    {
      path: '/mos-mweb/test-center/slaView',
      name: 'slaView',
      component: () => import('@/page/slaView.vue'),
    },
    // sla执行指令下发
    {
      path: '/mos-mweb/test-center/slaSend',
      name: 'slaSend',
      component: () => import('@/page/slaSend.vue'),
    },
    // operationLog 操作日志
    {
      path: '/mos-mweb/test-center/operationLog',
      name: 'operationLog',
      component: () => import('@/page/operationLog.vue'),
    },
    {
      path: '/mos-mweb/test-center/details',
      name: 'details',
      component: () => import('@/page/details.vue'),
    },
    {
      path: '/mos-mweb/test-center/traceLog',
      name: 'traceLog',
      component: () => import('@/page/traceLog.vue'),
    },
    {
      path: '/mos-mweb/test-center/parkingService',
      name: 'parkingService',
      component: () => import('@/page/parkingService.vue'),
    },
    {
      path: '/mos-mweb/test-center/parkingCarInOut',
      name: 'parkingCarInOut',
      component: () => import('@/page/parkingCarInOut.vue'),
    },
  ],
});
