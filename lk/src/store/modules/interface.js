import Vue from 'vue';
import {CLOSE_MENU, OPEN_MENU, SET_HEADER_CLASS, CLEAR_HEADER_CLASS, TOGGLE_NOTIFICATIONS, ADD_NOTIFICATION} from '../mutation-types'
import {CLEAR_NOTIFICATIONS} from '@/store/mutation-types'
import backendApi from '../../utils/backend-api'

const getters = {
    getHeaderClass: state => state.headerClass,
    getMenuState: state => state.menu,
    getNotificationsState: state => state.notifications.open,
    getNotificationsList: state => state.notifications.list,
    getNotificationsCount: state => state.notifications.list.length,
    getButtonLoading: state => state.buttonLoading,
    getAjaxLoader: state => state.ajaxLoading,
    getLastLoan: state => state.lastLoan,
    viewport: state => state.viewport,
    getWidth: state => state.width,
    getHeight: state => state.height,
    $errors: state => state.errors,
    $interface: state => state,
    $cashback: state => state.cashback,
    $coupons: state => state.coupons,
    $tokenizedCards: state => state.tokenizedCards,
};

const state = {
    // error fields
    errors: [],

    menu: {
        open: false
    },
    notifications: {
        open: false,
        list: [
            // {
            //   type: 'activeLoanChangeStatus',
            //   content: 'Ваш займ одобрен!'
            // }
        ]
    },
    headerClass: '',
    buttonLoading: false,
    ajaxLoading: false,
    activeLoadingComponentExemplars: {},
    lastLoan: { // получает с последнего займа (даже если активного нет) необходимые данные
        status: null, // статус займа
        overdue: null, // был ли просрочен
        number: null // номер платежа по счету
    },
    news: false,
    messageSuccessWindows: {
        messageSuccess: false,
        cross: true,
        text: ''
    },
    messageWarningWindows: {
        messageWarning: false,
        text: ''
    },
    viewport: 'xs',
    isMobile: false,
    width: 0,
    height: 0,
    showInstallment: false,
    tokenizedCards: 0,
    coupons: 1,
    cashback: 0,
	displayConfirmEmailWindow: true,
};

const mutations = {
  INTERFACE_SHOW_INSTALLMENT: (state, data) => {
    state.showInstallment = data;
  },

  'SET_BACKEND_ERRORS': (state, data) => {
      const regex = /Field (.*) required/i;
      const regex2 = /Required fields (.*) is not set/i;
      const errors = [];
      console.log('data errors', data);
      // backendApi.putData('errorlog-front', {
      //   lk_log: "error_400",
      //   options: data
      // }, 'https://new.webbankir.com/');
      data.forEach((e) => {
        if(typeof e === "object" && e.message) {
            if(regex.test(e.message)) {
              errors.push(e.message.match(regex)[1]);
            }

            console.log(regex2.test(e.message))
            if(regex2.test(e.message)) {
              errors.push(e.message.match(regex2)[1]);
            }
        }
      })
    state.errors = errors;
  },
  'SET_BODY_WIDTH': (state, data) => state.width = data,
  'SET_BODY_HEIGHT': (state, data) => state.height = data,
  /**
   * Используется для кнопок, которые нужно делать в стейт лоадинг
   * @param state
   * @param data
   * @returns {*}
   * @constructor
   */
  'BUTTON_LOADING': (state, data) => state.buttonLoading = data,
  /**
   * Из любого компонента можно поставить аякс лоадер
   * @param state
   * @param data
   * @returns {*}
   * @constructor
   */
  AJAX_LOADING: (state, data) => {
	  /*если аргумент Boolean - работа с видимостью корневого индикатора загрузки приложения*/
	  if(typeof data === 'boolean') {
		  state.ajaxLoading = data;
		  return;
	  }
	  let {name, isShow, waitingTitle, caption} = data;

	  if(isShow === undefined) {
	      isShow = true;
      }

      if (name === undefined) {
	      name = 'rootFixed';
      }

	  let loaderComponentExemplar = null;
	  if(name) {
		  loaderComponentExemplar = state.activeLoadingComponentExemplars[name];
	  }
	  /*если не найден определённый компонент индикатора загрузки*/
	  if(!loaderComponentExemplar) {
		  /*если явно указано - не показывать/скрыть индикатор*/
		  if(typeof isShow === 'boolean') {
			  /*расчитано для показа/скрытия корневого фиксированого индикатора*/
			  state.ajaxLoading = isShow;
		  }
	  }
	  Vue.nextTick(() => {
		  /*если указано имя индикатора загрузки*/
		  if(name) {
			  loaderComponentExemplar = state.activeLoadingComponentExemplars[name];
		  }
		  /*если найден определённый компонент индикатора загрузки*/
		  if(loaderComponentExemplar) {
			  /*если явно указано - не показывать индикатор*/
			  if(isShow === false) {
				  loaderComponentExemplar.hide();
			  }
			  if('waitingTitle' in data) {
				  loaderComponentExemplar.waitingTitleContent = waitingTitle;
			  }
			  if('caption' in data) {
				  loaderComponentExemplar.captionContent = caption;
			  }
		  }
	  });
  },

    ADD_ACTIVE_LOADER_COMPONENT_EXEMPLAR: (state, loaderData) => {
		Vue.set(state.activeLoadingComponentExemplars, loaderData.name, loaderData.componentExemplar);
	},
	REMOVE_ACTIVE_LOADER_COMPONENT_EXEMPLAR: (state, loaderName) => {
        const loaderComponentExemplar = state.activeLoadingComponentExemplars[loaderName];
        if(!loaderComponentExemplar) {
          return;
        }
		Vue.delete(state.activeLoadingComponentExemplars, loaderName);
		loaderComponentExemplar.isVisible = false;
	},

  SET_VIEWPORT: (state, viewport) => {
      state.viewport = viewport;

      state.isMobile = (['mobile', 'tablet']).includes(viewport);
  },
    [OPEN_MENU]: (state) => {
        state.menu.open = true;
        const chat = document.querySelector('.sender-connect.bottom-right');
        if(chat) {
            chat.style.setProperty("display", "none");
        }

    },
  [CLOSE_MENU]: (state) => {
    state.menu.open = false;
      const chat = document.querySelector('.sender-connect.bottom-right');
      if(chat) {
          chat.style.setProperty("display", "block");
      }
  },
  [SET_HEADER_CLASS]: (state, className) => {
    state.headerClass = className
  },
  [CLEAR_HEADER_CLASS]: (state) => {
    state.headerClass = ''
  },
  [TOGGLE_NOTIFICATIONS]: ({notifications}) => {
    notifications.open = !notifications.open
  },
  CLOSE_NOTIFICATIONS: ({notifications}) => {
    notifications.open = false
  },
  [ADD_NOTIFICATION]: ({notifications}, newNotification) => {
    notifications.push(newNotification)
  },
  [CLEAR_NOTIFICATIONS]: ({notifications}) => {
    notifications.list = []
  },
  CALL_SUCCESS_WINDOW: (state, text, cross = true) => {
    state.messageSuccessWindows.messageSuccess = true
    state.messageSuccessWindows.text = text
    state.messageSuccessWindows.cross = cross
    setTimeout(() => {
      state.messageSuccessWindows.messageSuccess = false
      state.messageSuccessWindows.text = ''
    }, 60000)
  },
  CALL_WARNING_WINDOW: (state, text) => {
    state.messageWarningWindows.messageWarning = true
    state.messageWarningWindows.text = text
    setTimeout(() => {
      state.messageWarningWindows.messageWarning = false
      state.messageWarningWindows.text = ''
    }, 60000)
  },
  SHOW_TOKENIZED_CARDS: (state, status) => {
    state.tokenizedCards = status;
  },
  SHOW_BANNER: (state, status) => {
    state.cashback = status;
  },
  SHOW_COUPONS: (state, status) => {
    state.coupons = status;
  }
};

const actions = {
  getDataLastLoan: async ({state}) => {
   return await backendApi.getData('loan/get/latest/pdl').then(({data}) => {
     state.lastLoan.status = data.data.status
     state.lastLoan.overdue = data.data.daysDelay
     state.lastLoan.number = data.data.num
   })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
