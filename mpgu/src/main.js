import Vue from 'vue';
import app from '@/app.vue';
import router from '@/router/router';
import store from '@/store';

import vueGlobalServices from '@/global/vueGlobalServices';
import vueDirectives from '@/global/vueDirectives';
import iViewUI from '@/global/iViewUI';

import currentWorkGroupMixin from '@/mixins/global/currentWorkGroupMixin';

Vue.config.productionTip = false;
Vue.config.devtools = true;

vueGlobalServices(Vue);
vueDirectives(Vue);
iViewUI(Vue);

Vue.mixin(currentWorkGroupMixin);

new Vue({
    router,
    store,
    render: h => h(app),
}).$mount('#app');
