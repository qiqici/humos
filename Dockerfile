FROM dev-registry.ocp.csvw.com:5000/svw/node:8.11.2

MAINTAINER Xu Erhu <u <xuerhu@csvw.com>
USER root
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY webapp /opt/app-root/src/webapp
COPY server /opt/app-root/src/server
COPY package.json /opt/app-root/src/package.json
COPY startup.json /opt/app-root/src/startup.json

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install --production && cnpm install pm2 -g

RUN mkdir /var/log/app && \
  chgrp -R 0 ${APP_ROOT} /var/log/app && \
  chmod -R g=u ${APP_ROOT} /var/log/app

ENV NPM_RUN startup:docker
USER default

ENTRYPOINT ["sh","-c","/usr/libexec/s2i/run"]
