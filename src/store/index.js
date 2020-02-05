import Vue from 'vue';
import Vuex from 'vuex';
import message from './modules/message';
import myRequest from './modules/myRequest';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    message,
    myRequest,
  },
});

export default store;
