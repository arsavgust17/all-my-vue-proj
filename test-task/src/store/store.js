import Vue from 'vue';
import Vuex from 'vuex';

import Rating from '@/store/modules/rating';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  strict: true,
  devtools: true,
  modules: {
    Rating,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
