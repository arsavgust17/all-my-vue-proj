import axios from 'axios'
import Store from '@/store'
import * as types from '@/store/mutation-types'
import errorMapper from '@/utils/error_mapper/index'
import get from 'lodash/get'
import env from './methods/env';
import * as ApiMethods from './methods/index';
const BASE_URL = env().base;
console.log('ENV', env());


const routeMapper = { // Маппер роутов АПИ слева аргументы функций getData, postData и.т.д. справа - рельные роуты.
  'accounts': 'accounts',
  'loan/count': 'loan/count',
  'loan/create': 'loan/create',
  'loan/edit': 'loan/edit',
  'loan/get': 'loan/get',
  'loan/sign': 'loan/sign',
  'user/login': 'user/login',
  'user/create': 'user/create',
  'user/edit': 'user/edit',
  'user/restore': 'user/restore',
  'user/get': 'user/get',
  'user/changepass': 'user/changepass',
  'socialnetwork/user': 'socialnetwork/user'
}

class BackError extends Error { // Класс ошибки в errors ошибки с бэка после маппинга (см. ниже)
  constructor (errors, ...args) {
    super(...args)
    this.errors = errors
    this.response = {}
  }
}

//const getServiceName = (url) => url.match(/\/\/.*?\/api\/([^/]*)/)[1] // Функция получения имени микросервиса

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false,
  params: {} // Нужно пустое тело, не удалять
})

// 3 повтора для свалившегося запроса
// axiosRetry(instance, { retries: 3 })

// Exponential back-off retry delay between requests

// axiosRetry(instance, {
//   retryDelay: axiosRetry.exponentialDelay
// })
//
// axiosRetry(instance, { retryDelay: (retryCount) => {
//   return retryCount * 10000
// }})

// Перехват запросок для добавления токена:
console.log('env().env === \'dev\'', env().env === 'dev');
instance.interceptors.request.use(function (config) {
  let token = Store.state.auth.token
  const isTokenNeededForRequest = config.url !== 'https://api.webbankir.com/v3/suggest/address'
  if (['dev', 'test'].includes(env().env) && config.url.indexOf('webbankir.partners') === -1) {
    config.headers.common['is-test-request'] = 1;
    console.log('%capi::is-test-request = 1', 'color: orange;font-weight: bold;');
  }
  if (token && isTokenNeededForRequest) {
    config.headers.common['Authorization'] = 'Bearer ' + token

    // config.headers.common['user_id'] = 800
    // config.headers.common['user_id'] = '5393975'
    // config.headers.common['Access-Control-Allow-Origin'] = '*'
  } else {
    // Use application/x-www-form-urlencoded for login
    config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  config.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  Store.commit(types.UNSET_ERRORS) // Сбрасываем ошибки в vuex

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

const mapErrors = (errors, mapObject) => errors.map((error) => ({
  code: error.code + get(error, 'field', ''),
  field: get(mapObject[error.code], 'field', 'mainErrorBlock'), // Если нет такой ошибки в справочнике то поле будет mainErrorBlock
  message: get(mapObject[error.code], 'message', error.message)})) // Преобрауем код ошибки в человекочитаемое отображение, если не находим у себя то оставляем то что прислал сервер

instance.interceptors.response.use((response) => response, (error) => {
  console.log('Intercepted error:', error)
  if (!error.response) {
    Store.commit(types.SET_ERRORS500, [{code: 'serverError', message: 'Произошла непредвиденная ошибка на сервере'}]) // 500е ошибки кидаем в глобальное состояние, в app.vue компонент ErrorOverlay отобразит её
    return Promise.reject(error)
  }
  console.log(error.response);
  if (error.response && error.response.status === 401  && !error?.config?.url?.indexOf('webbankir.partners')) {
    Store.dispatch(types.AUTH_LOGOUT);
    Store.commit('SET_REG_STEP', 1)
    return
  }
  console.log('error.response', error.response);
  if (error.response && error.response.status === 400) {
    if (error.response.data && Array.isArray(error.response.data.errors)) {
      console.log('SET_BACKEND_ERRORS', error.response.data.errors);
      Store.commit('SET_BACKEND_ERRORS', error.response.data.errors);
    }
    try {
      // const service = getServiceName(error.config.url)
      const service = '';
      // console.log('service', service) // Определяем сервис по первому роуту
      const errorMapperForThisService = get(errorMapper, service, {}) // Берём маппер ошибок для этого сервиса
      const errors = error.response.data.errors
      const mappedErrors = mapErrors(errors, errorMapperForThisService) // Получаем пребразованные ошибки (/utils/error_mapper)
      // console.log('MAPPED ERROR', errorMapper, '!!!!', mappedErrors[0].field)
      Store.commit(types.SET_ERRORS, mappedErrors)
      const e = new BackError(mappedErrors)
      console.warn('errors', error.response.data.errors)
      e.errors = error.response.data.errors
      e.response = error.response
      return Promise.reject(e)
    } catch (e) {
      console.warn(e);
      return Promise.reject(new BackError([{code: 0, field: 'mainErrorBlock', message: 'Непредвиденная ошибка'}]))
    } // На всех вариантах ошибок возвращаем преобразованные ошибки туда где они возникли. Обработка всех ошибок кроме 500 в компонентах где они возникли
  }
  if (error.response && error.response.status >= 500) {
    Store.commit(types.SET_ERRORS500, [{code: 'serverError', message: 'Произошла непредвиденная ошибка на сервере'}])
    return Promise.reject(error)
  }
  return Promise.reject(error.response)
})

// get, post, patch, put, delete and login
export default {
  api: ApiMethods[env().env],
  getDoc(data, filename) {
    const blob = new Blob([data], {type: 'application/octet-stream'});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      window.navigator.msSaveBlob(blob, filename);
    }
    else {
      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', filename);

      // Safari thinks _blank anchor are pop ups. We only want to set _blank
      // target if the browser does not support the HTML5 download attribute.
      // This allows you to download files in desktop safari if pop up blocking
      // is enabled.
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }

      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }
  },
  getPDF (action) {
    return instance.get(action, {
      responseType: 'blob'
    })
  },
  getData (action, base_url, blob = false) {
    const mappedAction = get(routeMapper, action, action)
    let url = ''
    if (base_url) {
      url = base_url
    } else {
      url = `${BASE_URL}`
    }
    url += mappedAction;
    const options = {};
    if (blob) {
      options.responseType = 'blob';
    }
    return instance.get(url, options)
  },
  postData (action, data, base_url) {
    const mappedAction = get(routeMapper, action, action)
    let url = ''
    if (base_url) {
      url = base_url
    } else {
      url = `${BASE_URL}`
    }
    url += mappedAction
    return instance.post(url, data)
  },
  patchData (action, data) {
    const mappedAction = get(routeMapper, action, action)
    let url = `${BASE_URL}`
    url += mappedAction
    return instance.patch(url, data)
  },
  putData (action, data, base_url) {
    const mappedAction = get(routeMapper, action, action)
    let url = ''
    if (base_url) {
      url = base_url
    } else {
      url = `${BASE_URL}`
    }
    url += mappedAction
    return instance.put(url, data)
  },
  deleteData (action) {
    const mappedAction = get(routeMapper, action, action)
    let url = `${BASE_URL}`
    url += mappedAction
    return instance.delete(url)
  },
  login (action, data) {
    const mappedAction = get(routeMapper, action, action)
    let url = `${BASE_URL}`
    url += mappedAction
    return instance.get(url, data)
  },
  instance
}
