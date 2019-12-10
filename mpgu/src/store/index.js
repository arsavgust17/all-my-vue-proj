import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import actions from './actions';
import mutations from './mutations';

import workGroups from './modules/workGroups';
import twoFa from './modules/twoFa';

Vue.use(Vuex);

export default new Vuex.Store({
    devtools: true,
    state,
    mutations,
    actions,
    modules: {
        workGroups,
        twoFa,
    },
});
