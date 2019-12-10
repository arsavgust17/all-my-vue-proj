import Vue from 'vue';
import App from './App.vue';
import router from '@/router/router';
import store from '@/store/store';

import iViewUI from '@/global/iViewUI';
import vueGlobalServices from '@/global/vueGlobalServices';

Vue.config.productionTip = false;
Vue.config.devtools = true;

iViewUI(Vue);
vueGlobalServices(Vue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
