import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authPopupVisible: false,
        isLogged: false,

    },
    mutations: {
        showPopup(state) {
            state.authPopupVisible = true;
        },
        closePopup(state) {
            state.authPopupVisible = false;
        },
    },
    actions: {
        authRequest(state, payload) {},
    },
    getters: {
        getLoggedState: state => state.isLogged,
        getPopupVisibility: state => state.authPopupVisible,
    },
})
