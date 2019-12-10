import {
    SET_CURRENT_USER_DATA,
    SHOW_QUICKACCESS,
    SET_GLOBAL_SEARCHENATOR_INPUT,
} from '@/store/mutation-types';

export default {
    [SHOW_QUICKACCESS]: (state, payload) => {
        state.quickAccessShown = payload.isEnabled;
    },

    [SET_GLOBAL_SEARCHENATOR_INPUT]: (state, payload) => {
        state.globalSearchenatorInput = payload.value;
    },

    [SET_CURRENT_USER_DATA]: (state, payload) => {
        state.userData = { ...payload };
    },
};
