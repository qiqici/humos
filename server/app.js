// the agent is started before you require any other modules调用链
process.env.DEBUG = process.env.NODE_ENV !== 'production' ? 'skyapm:*' : 'skyapm:info';
// const collectorServer = `${process.env.COLLECTOR_SERVICE || '10.122.70.111:11800'}`;
// require('skyapm-nodejs').start({
//   serviceName: 'mos-mweb-dealer-maintenance',
//   directServers: collectorServer,
// });

const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const webpack = require("webpack");
const fs = require("fs");
const app = new Koa();
const reverseProxies = require("./middleware/reverseProxies.js");
const proxy = require('./middleware/proxy.js');

async function start(){
  var compiler;
  if(process.env.NODE_ENV&&process.env.NODE_ENV==="development"){
    const koaWebpack = require('koa-webpack');
    const webpackDevConfig = require('../build/webpack.dev.conf.js');
    compiler = webpack(webpackDevConfig);
    const devMW =  await koaWebpack({ 
      compiler:compiler,
      devMiddleware:{
        publicPath: '/',
        // writeToDisk: true,
        logLevel:"info"
      },
    });
    app.use(devMW);
  }

  /**
   * when request`s accept-encoding include gzip, fill will be compressed by gzip
   * response headers inclue ETag and Last-modified to cache assets in browser
   */
  const webRoot = path.resolve(process.cwd(), 'webapp');
  app.use(static(webRoot));

  //导航页面返回index.html
  app.use(async (ctx, next) => {
    const accept = ctx.request.headers.accept;
    if(accept&&accept.indexOf("text/html")>-1&&accept.indexOf("application/json")<0){
      const filePath = path.resolve(__dirname, '../webapp/mos-mweb/test-center/index.html');
      ctx.response.type = 'text/html';
      if(process.env.NODE_ENV&&process.env.NODE_ENV==="development"){
        //ctx.response.body = fs.createReadStream(filePath);
        ctx.response.body = compiler.outputFileSystem.createReadStream(filePath);
      }else{
        ctx.response.body = fs.createReadStream(filePath);
      }
      next();
    }else{
      next();
    }
  });

  //log info middleware调用链log信息
  app.use(async (ctx, next) => {
    console.log(`${ctx.method} -url ${ctx.url} -body ${JSON.stringify(ctx.request.body)}`);
    await next();
  });

  //反向代理中间件
  //https://github.com/chimurai/http-proxy-middleware
  app.use(proxy(reverseProxies.context,{
    target:"http://",//默认target，此处为无效值，全部在router配置中进行re-target
    pathRewrite: reverseProxies.pathRewrite,
    changeOrigin: true,
    logLevel:"info",
    router:reverseProxies.router,//re-target
    onError:function(err, req, res){
      console.log(err);
    },
    onProxyReq:function(proxyReq, req, res){
      var newHost = proxyReq.getHeader("host");
      res.setHeader("Proxy-Host",newHost);
      //console.log("---",res)
      console.log("\033[40;32m Proxy: "+"\033[40;37m"+req.url+"  ->  "+newHost);
    }
  }));

  const port = process.env.PORT || '8080';
  app.listen(port, () => {
    console.log('app listening at %s', port);
  });

};

start();

