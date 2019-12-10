import {VueConstructor} from "vue/types/vue";



declare module 'vue/types/vue' {
    interface VueConstructor {
        $store: {
            getters: {
                SUGGESTIONS_GET_EMAIL_LIST: [{
                    value: string
                }],
                SUGGESTIONS_LOADER: {
                  b_day: boolean,
                  email: boolean,
                  passport: boolean,
                  code_division: boolean,
                  location: boolean,
                  house: boolean
                }
            }
        }
    }

    interface Store {
        commit(type: 'SUGGESTIONS_SET_EMAIL_LIST', payload: [{
            value: string
        }]): void;
        commit(type: 'SUGGESTIONS_TRUNCATE_EMAIL'): void;
        commit(type: 'SUGGESTIONS_SET_LOADER', {b_day: boolean}): void;
        commit(type: 'SUGGESTIONS_SET_LOADER', {email: boolean}): void;
        commit(type: 'SUGGESTIONS_SET_LOADER', {passport: boolean}): void;
        commit(type: 'SUGGESTIONS_SET_LOADER', {code_division: boolean}): void;
        commit(type: 'SUGGESTIONS_SET_LOADER', {location: boolean}): void;
        commit(type: 'SUGGESTIONS_SET_LOADER', {house: boolean}): void;

        dispatch(type: 'SUGGESTIONS_GET_EMAIL', payload: string) : XMLHttpRequest
        dispatch(type: 'SUGGESTIONS_GET_PASSPORT', payload: string) : XMLHttpRequest
        dispatch(type: 'SUGGESTIONS_GET_CODE_DIVISION', payload: string) : XMLHttpRequest
        dispatch(type: 'SUGGESTIONS_GET_ADDRESS', payload: string) : XMLHttpRequest
    }
}
