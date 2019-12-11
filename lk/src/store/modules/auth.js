import backend from '@/utils/backend'
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT, SET_AUTH_STATE} from '../mutation-types'
import Router from '@/router'
import Vue from 'vue'
import * as cookie from 'tiny-cookie';

const {api} = backend;

const state = {
  // token: localStorage.getItem('user-token') || '',
  // tokenExpired: localStorage.getItem('user-expired') || '',
  // authState: localStorage.getItem('user-token') && 'authorized',
  // status: ''
  token: '',
  tokenExpired: '',
  authState: '',
  status: '',
  id: '',
  type: null,
  additionalFields: {
    code: null
  },
  alien: false
}

const getters = {
  getAuthStatus: (state) => state.authState,
  $auth: (state) => {
    return Object.assign(state, {isAuth: state.authState === "authorized"});
  },
  $authId: (state) => state.id,
  $alien: (state) => state.alien
}

const mutations = {
  [AUTH_REQUEST]: (state) => state.status = 'request',
  [AUTH_SUCCESS]: (state, {data, authState}) => {
    state.authState = authState
    state.status = 'success'
    state.id = data.userId
    state.token = data.token
    state.tokenExpired = data.tokenExpired
    state.type = data.type || null
    state.additionalFields = data?.additionalFields || null
    if (data.userId === '') {
      window.location.reload()
    }
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    cookie.remove('user_id');
    state.authState = ''
    state.token = ''
    state.tokenExpired = ''
    state.status = ''
  },
  [SET_AUTH_STATE]: (state, authState) => {
    state.authState = authState
    console.log(state.authState)
  },
  TOGGLE_ALIEN: (state, status) => state.alien = status
}
// action
const actions = {
  [AUTH_REQUEST]: ({commit}, creds) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      creds.referer = Vue.prototype.$cookie.get('site_referer')
      // creds.site_referer = Vue.prototype.$cookie.get('site_referer')
      api.user.login(creds).then(({data}) => {
        commit(AUTH_SUCCESS, {...data, authState: 'authorized'})
        localStorage.setItem('user-token', data.data.token)
        localStorage.setItem('token-expired', data.data.tokenExpired)
        resolve(data)
      }).catch(response => {
        reject(response)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit}) => {
    localStorage.removeItem('user-token')
    localStorage.removeItem('token-expired')
    commit(AUTH_LOGOUT);
      commit('CLEAR_LOAN_DATA');
      commit('CLEAR_CR_DATA');

      if(Router.currentRoute.meta.auth) {
		  Router.push('/')
	  }
  },
  loginAsUser: (arg, data) => {
    arg.state = {
      ...arg.state,
      authState: 'authorized',
      data: {
        userId: '',
        token: data[0],
        tokenExpired: data[1]
      }
    }
    arg.commit(AUTH_SUCCESS, arg.state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
