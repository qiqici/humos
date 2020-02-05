// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iview from 'iview';
import App from './App';
import store from './store';

import router from './router';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(iview);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
