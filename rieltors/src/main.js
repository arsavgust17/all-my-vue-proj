import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'


Vue.config.productionTip = false;
Vue.config.devtools = true;

import vueDirectives from '@/global/vueDirectives';
import ElementUI from '@/global/ElementUI';

vueDirectives(Vue);
ElementUI(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
