// const slaServer = `http://${process.env.DASHBOARD_SERVICE || 'mos-gvs-exp-vcs-config.testapps.aliocp.csvw.com'}`;
const testCenter = `http://${ process.env.DASHBOARD_SERVICE || 'mos-ops-ivi-diganostic.testapps.opsocp.csvw.com'}`;
// const orderServer = `http://${ process.env.ORDERSERVER || 'mos-exp-misc-kongproxy.testapps.aliocp.csvw.com/mos-brm-exp-uos'}`;
const parkingServer = `http://${ process.env.PARKING_SERVER || 'mos-cspm-exp-parking.testapps.aliocp.csvw.com'}`;
const licensePlate = `http://${ process.env.VEHICLE_SERVER || 'mos-cso-itgr-parking.testapps.aliocp.csvw.com'}`;
const reverseProxies = {
    context:"/mos-mweb/test-center/api", 
  router: {
      //router context, 按照pathRewrite之前的url进行映射  http://mos-cso-itgr-parking.testapps.aliocp.csvw.comparkingServer
      // '/mos-mweb/test-center/api/sla' : slaServer, //以/api/order开始的请求被代理到orderServer
      // '/mos-mweb/test-center/api/order': orderServer,
      '/mos-mweb/test-center/api/app': parkingServer,
      '/mos-mweb/test-center/api/simulation': licensePlate,
      '/mos-mweb/test-center/api/sla': testCenter,
    },
    pathRewrite: function(path, req) {
      const matchString =  path.match(/(mos-mweb\/test-center\/api\/([^\/]+))\//)[1];
      return path.replace(matchString, 'api');
    },
};
module.exports = reverseProxies;