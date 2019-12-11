import backendApi from '../../utils/backend'
import {errorProfile} from '@/utils/error/profile'
import * as cookie from 'tiny-cookie';
import config from '@/config';
import backend from '@/utils/backend';

/**
 * @type iBackend.api
 */
const api = backend.api;

const defaultState = () => {
  return {
    id: 0,
    isError500: false,
    // РЕГИСТРАЦИЯ
    autologin: false,
    hash: '',
    regStep: 1,
    lastLoginTimeOnTheRegistrationPage: 0,
    final: false,
    smsCode: '',
    smsSend: {
      lastSendDateMs: 0,
      phone: 0,
      total: 0
    },
    qa: false,
    promo: {
      check: false,
      percent: 0,
      code: '',
      count: 3,
    },
    // ИМЯ ПОЛЬЗОВАТЕЛЯ, ЕГО ЛОГИН И НАЧАЛЬНЫЕ ДАННЫЕ
    userInicial: '',
    blankFields: [],
    socialNetworks: {
      networks: {
        fb: false,
        ig: false,
        od: false,
        vk: false
      }
    },
    controlAnswer:'',
    subscriptionOnGroupInSocialNetwork: false, // включает блок на подписку к соц сетям
    login: null,
    firstName: null,
    lastName: null,
    middleName: null,
    bDay: null,
    bPlace: null,
    gender: null,
    mobilePhone: null,
    email: null,
    emailConfirmed: false,
    percent: null,
    // ПАСПОРТНЫЕ ДАННЫЕ

    passport: null,
    passportDivisionCode: null,
    passportDateOfIssue: null,
    passportIssuedBy: null,

    // АДРЕС РЕГИСТРАЦИИ - помещен в defaultStateParams

    // FIAS ID АДРЕСА

    addressFiases: {
      value: null,
      region_fias_id: null,
      area_fias_id: null,
      city_fias_id: null,
      settlement_fias_id: null,
      street_fias_id: null,
      house_fias_id: null
    },

    // ДОПОЛНИТЕЛЬНЫЙ ТЕЛЕФОН

    additionalPhone: null,
    additionalPhoneOwner: null,

    // ИНФОРМАЦИЯ О РАБОТЕ И ДОХОДЕ

    typeOfEmployment: null,
    workSalary: null,
    workINN: null,
    workFullName: null,
    workType: null,
    workScope: null,
    workName: null,
    workPhone: null,
    workNumberOfEmployees: null,
    workPeriod: null,
    workPosition: null,

    // СТАТУС ПОЛЬЗОВАТЕЛЯ
    blocked: false,
    deleted: false,
    // АДРЕС РЕГИСТРАЦИИ
    address: {
      postalCode: null,
      region: null,
      city: null,
      settlement: null,
      street: null,
      doNotHaveStreet: false,
      house: null,
      geoLat: null,
      geoLon: null,
      housing: null,
      building: null,
      flat: null
    },
    // РАБОЧИЙ АДРЕС
    workAddress: {
      postalCode: null,
      region: null,
      city: null,
      settlement: null,
      street: null,
      doNotHaveStreet: false,
      house: null,
      geoLat: null,
      geoLon: null,
      housing: null,
      building: null,
      flat: null
    },
    // ПУБЛИЧНОСТЬ
    publicity: {
      // Публичное должносное лицо
      officialState: false,
      officialOwnerIsMe: false,
      officialName: null,
      // Публичное должностное лицо международной организации
      internationalOrganizationState: false,
      internationalOrganizationOwnerIsMe: false,
      internationalOrganizationName: null,
      // Публичное должностное лицо российской организации
      officialRussiaState: false,
      officialRussiaOwnerIsMe: false,
      officialRussiaName: null,
      // Выгодоприобретатель
      benefitsOfAnotherPerson: false
    },
    // БЕНЕФИЦИАЛ
    beneficial: {
      state: false,
      // В случае, если пользователь указал другого БВ
      lastName: null,
      firstName: null,
      middleName: null,
      passport: null,
      passportDivisionCode: null,
      passportDateOfIssue: null
    },

    workAddressFiases: {
      value: null,
      region_fias_id: null,
      area_fias_id: null,
      city_fias_id: null,
      settlement_fias_id: null,
      street_fias_id: null,
      house_fias_id: null
    },

    // ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ

    snilsOrInn: null,
    maritalStatus: null,
    educationType: null,
    sourceOfInformation: null,
    numberOfChildren: null,
    hasPreviousConviction: null,

    // ПУБЛИЧНОСТЬ - помещен в defaultStateParams

    // БЕНЕФИЦИАРНЫЙ ВЛАДЕЦ - помещен в defaultStateParams

    // ОСТАЛЬНЫЕ ПАРАМЕТРЫ - помещен в defaultStateParams

    validate: {
      step1: {
        firstLastMiddleName: false,
        contactMobilePhone: false,
        contactEmail: false
        // controlQuestionAndAnswer: false //moved to step 4
      },
      step2: {
        birthDate: false,
        passportInformation: false,
        // snils: false, // moved to step 4
        registrationAddress: false
      },
      step3: {
        additionPhone: false,
        workInformation: false,
        additionalInfo: false,
        publicInformation: false,
        beneficialInformation: false
      },
      other: {
        employer: false,
        workAddress: false,
        // businessman: false,
        founderFullName: false
      },
    },
    city_id: 0,
  }
}

const state = defaultState()

// GETTERS

const getters = {
  getUserDataIsSuccess: (state) => state.isError500,
  // получение login'a пользователя
  userLogin: (state) => state.login,
  // получение инициалов пользователя
  userInicial: (state) => state.lastName + ' ' + state.firstName + ' ' + state.middleName,
  // получение процентной ставки пользователя
  userPercent: (state) => state.percent,
  $user: (state) => state,
  $social: (state) => state.socialNetworks.networks
}

// MUTATIONS

const mutations = {
    USER_SET_SOCIAL_NETWORK: (state, data) => {
        state.socialNetworks = data;
    },
    USER_SET_BLANK_FIELDS: (state, fields) => {
        if(Array.isArray(fields)) {
            state.blankFields = fields;
        } else {
            console.warn('State::USER_SET_BLANK_FIELDS invalid data. Wait array, but got ' + typeof fields);
        }
    },
  changeDataOfUserByField: (state, arg) => {
    // console.log('', arg)
    state[arg.key] = arg.text
  },
  changeDataOfUserByAllFields: (state) => state,
  changeDataOfUserByPublicity: ({publicity}, arg) => publicity[arg.key] = arg.text,
  changeDataOfUserByBeneficial: ({beneficial}, arg) => beneficial[arg.key] = arg.text,
  CLEAR_STATE: (state) => {
    Object.assign(state, defaultState())
  },
  USER_RESET: (state) => {
    Object.assign(state, defaultState())
  },
  FINAL_REG: (state, value) => {
    state.regFinal = value;
  },
  SET_REG_STEP: (state, value) => {
    state.regStep = value;
    state.smsCode = '';
  },

  SET_AUTOLOGIN: (state, value) => {
    state.autologin = value;
  },
  SET_USER_HASH: (state) => {
    state.hash = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
  },
  CALL_FORM_SOCIAL_NETWORK: (state, bool) => {
    state.subscriptionOnGroupInSocialNetwork = bool;
  },
  SET_USER_DATA: (state, user) => {
    console.log('set user data', user);
    Object.assign(state, user);
  },
  CHANGE_STATUS_SOCIAL_NETWORK: (state, name) => {
    state = Object.assign(state, {socialNetworks: {networks: {...state.socialNetworks.networks, [name]: true}}})
  },
  SET_USER_POSTAL_CODE (state, postalCode) {
    state.address.postalCode = postalCode;
  },

  SET_USER_WORK_POSTAL_CODE (state, postalCode) {
    state.workAddress.postalCode = postalCode;
  },

  SET_USER_CITY: (state, id) => {
    state.city_id = id;
  },
    INCREMENT_SENDING_SMS_COUNTER: state => {
        state.smsSend.phone++;
        state.smsSend.total++;
    },
    RESET_SENDING_SMS_COUNTER: state => {
        state.smsSend.phone = 0;
        state.smsSend.total = 0;
    },
    //
    ERROR_USER_SET_DATA: (state, isError) => {
        state.isError500 = isError;
    },
	USER_SET_DATA: (state, data) => {
		console.log('State.user::USER_SET_DATA', data);
		state.id = data.data.id;

		cookie.set('user_id', state.id, null, {
			expires: '12h',
			domain: '.webbankir.com'
		});

		// ИМЯ ПОЛЬЗОВАТЕЛЯ, ЕГО ЛОГИН И НАЧАЛЬНЫЕ ДАННЫЕ
		state.userInicial = data.data.lastName + ' ' + data.data.firstName + ' ' + data.data.middleName;
		state.login = data.data.login
		state.blocked = data.data.blocked
		state.deleted = data.data.deleted
		state.firstName = data.data.firstName
		state.lastName = data.data.lastName
		state.middleName = data.data.middleName
		state.fraudster = data.data.fraudster
		state.bDay = data.data.bDay
		state.bPlace = data.data.bPlace
		state.gender = data.data.gender
		state.mobilePhone = transformPhoneToFrontFromBackend(data.data.mobilePhone)
		state.email = data.data.email
		state.emailConfirmed = data.data.emailConfirmed
		state.percent = data.data.percent
		state.qa = data.data.hasSecretWord
		// ПАСПОРТ
		state.passport = transformPassportToFrontFromBackend(data.data.passport)
		state.passportDivisionCode = transformCodeOfPassportToFrontFromBackend(data.data.passportDivisionCode)
		state.passportDateOfIssue = data.data.passportDateOfIssue
		state.passportIssuedBy = data.data.passportIssuedBy
		// ДОПОЛНИТЕЛЬНЫЙ ТЕЛЕФОН
		state.additionalPhone = transformPhoneToFrontFromBackend(data.data.additionalPhone)
		state.additionalPhoneOwner = data.data.additionalPhoneOwner
		// ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ
		state.snilsOrInn = data.data.snilsOrInn// transformSnilsToFrontFromBackend(data.data.snils)
		state.maritalStatus = data.data.maritalStatus
		state.educationType = data.data.educationType
		state.sourceOfInformation = data.data.sourceOfInformation
		state.numberOfChildren = data.data.numberOfChildren
		state.hasPreviousConviction = data.data.hasPreviousConviction
		// АДРЕС РЕГИСТРАЦИИ
		state.address.postalCode = data.data.address.postalCode
		state.address.region = data.data.address.region
		state.address.city = data.data.address.city
		state.address.settlement = data.data.address.settlement
		state.address.street = data.data.address.street
		state.address.doNotHaveStreet = data.data.address.doNotHaveStreet
		state.address.house = data.data.address.house
		state.address.geoLat = data.data.address.geoLat
		state.address.geoLon = data.data.address.geoLon
		state.address.housing = data.data.address.housing
		state.address.building = data.data.address.building
		state.address.flat = data.data.address.flat
		// АДРЕС FIAS ID
		state.addressFiases.area_fias_id = data.data.addressFiases.area_fias_id
		state.addressFiases.city_fias_id = data.data.addressFiases.city_fias_id
		state.addressFiases.house_fias_id = data.data.addressFiases.house_fias_id
		state.addressFiases.region_fias_id = data.data.addressFiases.region_fias_id
		state.addressFiases.settlement_fias_id = data.data.addressFiases.settlement_fias_id
		state.addressFiases.street_fias_id = data.data.addressFiases.street_fias_id
		state.addressFiases.value = data.data.addressFiases.value
		// ИНФОРМАЦИЯ О РАБОТЕ И ДОХОДЕ
		state.typeOfEmployment = data.data.typeOfEmployment
		state.workSalary = data.data.workSalary
		state.workINN = data.data.workINN
		state.workFullName = data.data.workFullName
		state.workType = data.data.workType
		state.workScope = data.data.workScope
		state.workName = data.data.workName
		state.workPhone = transformPhoneToFrontFromBackend(data.data.workPhone)
		state.workNumberOfEmployees = data.data.workNumberOfEmployees
		state.workPeriod = data.data.workPeriod
		state.workPosition = data.data.workPosition
		// АДРЕС МЕСТОНАХОЖДЕНИЯ РАБОТОДАТЕЛЯ
		if (data.data.workAddress !== null) {
			state.workAddress.postalCode = data.data.workAddress.postalCode
			state.workAddress.region = data.data.workAddress.region
			state.workAddress.city = data.data.workAddress.city
			state.workAddress.settlement = data.data.workAddress.settlement
			state.workAddress.street = data.data.workAddress.street
			state.workAddress.doNotHaveStreet = data.data.workAddress.doNotHaveStreet
			state.workAddress.house = data.data.workAddress.house
			state.workAddress.geoLat = data.data.workAddress.geoLat
			state.workAddress.geoLon = data.data.workAddress.geoLon
			state.workAddress.housing = data.data.workAddress.housing
			state.workAddress.building = data.data.workAddress.building
			state.workAddress.flat = data.data.workAddress.flat
		}
		// АДРЕС FIAS ID МЕСТОНАХОЖДЕНИЯ РАБОТОДАТЕЛЯ
		if (data.data.workAddressFiases !== null) {
			state.workAddressFiases.area_fias_id = data.data.workAddressFiases.area_fias_id
			state.workAddressFiases.city_fias_id = data.data.workAddressFiases.city_fias_id
			state.workAddressFiases.house_fias_id = data.data.workAddressFiases.house_fias_id
			state.workAddressFiases.region_fias_id = data.data.workAddressFiases.region_fias_id
			state.workAddressFiases.settlement_fias_id = data.data.workAddressFiases.settlement_fias_id === '0' ? null : data.data.workAddressFiases.settlement_fias_id
			state.workAddressFiases.street_fias_id = data.data.workAddressFiases.street_fias_id
			state.workAddressFiases.value = data.data.workAddressFiases.value
		}
		// ПУБЛИЧНОСТЬ
		// Публичное должносное лицо
		state.publicity.officialState = data.data.publicity.officialState
		state.publicity.officialOwnerIsMe = data.data.publicity.officialOwnerIsMe
		state.publicity.officialName = data.data.publicity.officialName
		// Публичное должностное лицо международной организации
		state.publicity.internationalOrganizationState = data.data.publicity.internationalOrganizationState
		state.publicity.internationalOrganizationOwnerIsMe = data.data.publicity.internationalOrganizationOwnerIsMe
		state.publicity.internationalOrganizationName = data.data.publicity.internationalOrganizationName
		// Публичное должностное лицо российской организации
		state.publicity.officialRussiaState = data.data.publicity.officialRussiaState
		state.publicity.officialRussiaOwnerIsMe = data.data.publicity.officialRussiaOwnerIsMe
		state.publicity.officialRussiaName = data.data.publicity.officialRussiaName
		// Выгодоприобретатель
		state.publicity.benefitsOfAnotherPerson = data.data.publicity.benefitsOfAnotherPerson
		// БЕНЕФИЦИАРНЫЙ ВЛАДЕЦ
		state.beneficial.state = data.data.beneficial.state
		// В случае если пользователь указал другого БВ
		state.beneficial.lastName = data.data.beneficial.lastName
		state.beneficial.firstName = data.data.beneficial.firstName
		state.beneficial.middleName = data.data.beneficial.middleName
		state.beneficial.passport = transformPassportToFrontFromBackend(data.data.beneficial.passport)
		state.beneficial.passportDivisionCode = transformCodeOfPassportToFrontFromBackend(data.data.beneficial.passportDivisionCode)
		state.beneficial.passportDateOfIssue = data.data.beneficial.passportDateOfIssue
		return Promise.resolve()
	},
}

// ACTIONS

const trim = (field, value) => {
  switch(field) {
    case 'mobilePhone':
    case 'passport':
    case 'passportDivisionCode':
    case 'snilsOrInn':
    case 'workPhone':
    case 'additionalPhone':
    case 'beneficial.passport':
    case 'beneficial.passportDivisionCode':
      return value ? value.replace(/[^\d]/g, '') : value;
    default:
      return value;
  }
}

const actions = {
  'CREATE_USER': (context, fields = []) => {
    const data = {};
    if (fields.length) {
      fields.forEach((field) => {
        if (field.indexOf('.') !== -1) {
          let [a,b] = field.split('.');
          data[a] = {
            ...data[a],
            [b]: trim(field, context.state[a][b])
          }
        } else {
          data[field] = trim(field, context.state[field]);
        }
      })
    }

    if (data.final) {
      data.referer = cookie.get('site_referer');
    }

    return api.user.create(data);
  },

  lastLoginTimeOnTheRegistrationPageAndClearVuex: (state) => {
    // let lastEntryTime = state.lastLoginTimeOnTheRegistrationPage
    // console.log('Запущен таймер на сохранение параметров')
    // if (Date.now() - lastEntryTime > 43200000) { // сессия расчитана на 12 часа, после чего происходит очищение vuex'a 43200000
    //   console.log('Таймер сохранения данных истек - данные очищены')
    //   state.commit('USER_RESET')
    // }
  },

  'GET_USER_DATA': ({state, commit}) => {
      return api.user.get().then(async ({data}) => {

        api.user.validate().then(({data}) => {
          state.blankFields = data.data;
        });

        api.user.social().then(({data}) => {
          state.socialNetworks = data.data;
        });


        if (data && typeof data.data === "object") {
          // await backendApi.getData(`v2/user/${data.data.id}`, config.POS_BASE_URL).then(({data}) => {
          //   commit('INTERFACE_SHOW_INSTALLMENT', true);
          //   commit('SET_INSTALLMENT_LIMIT', data.current_limit);
          // }).catch((e) => {
          //   commit('INTERFACE_SHOW_INSTALLMENT', false);
          // })
        }

        // state.id = data.data.id;
		//
        //   cookie.set('user_id', state.id, null, {
        //       expires: '12h',
        //       domain: '.webbankir.com'
        //   });
		//
        //   // ИМЯ ПОЛЬЗОВАТЕЛЯ, ЕГО ЛОГИН И НАЧАЛЬНЫЕ ДАННЫЕ
        // state.userInicial = data.data.lastName + ' ' + data.data.firstName + ' ' + data.data.middleName;
        // state.login = data.data.login
        // state.blocked = data.data.blocked
        // state.deleted = data.data.deleted
        // state.firstName = data.data.firstName
        // state.lastName = data.data.lastName
        // state.middleName = data.data.middleName
        // state.bDay = data.data.bDay
        // state.bPlace = data.data.bPlace
        // state.gender = data.data.gender
        // state.mobilePhone = transformPhoneToFrontFromBackend(data.data.mobilePhone)
        // state.email = data.data.email
        // state.emailConfirmed = data.data.emailConfirmed
        // state.percent = data.data.percent
        // state.qa = data.data.hasSecretWord
        // // ПАСПОРТ
        // state.passport = transformPassportToFrontFromBackend(data.data.passport)
        // state.passportDivisionCode = transformCodeOfPassportToFrontFromBackend(data.data.passportDivisionCode)
        // state.passportDateOfIssue = data.data.passportDateOfIssue
        // state.passportIssuedBy = data.data.passportIssuedBy
        // // ДОПОЛНИТЕЛЬНЫЙ ТЕЛЕФОН
        // state.additionalPhone = transformPhoneToFrontFromBackend(data.data.additionalPhone)
        // state.additionalPhoneOwner = data.data.additionalPhoneOwner
        // // ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ
        // state.snilsOrInn = data.data.snilsOrInn// transformSnilsToFrontFromBackend(data.data.snils)
        // state.maritalStatus = data.data.maritalStatus
        // state.educationType = data.data.educationType
        // state.sourceOfInformation = data.data.sourceOfInformation
        // state.numberOfChildren = data.data.numberOfChildren
        // state.hasPreviousConviction = data.data.hasPreviousConviction
        // // АДРЕС РЕГИСТРАЦИИ
        // state.address.postalCode = data.data.address.postalCode
        // state.address.region = data.data.address.region
        // state.address.city = data.data.address.city
        // state.address.settlement = data.data.address.settlement
        // state.address.street = data.data.address.street
        // state.address.doNotHaveStreet = data.data.address.doNotHaveStreet
        // state.address.house = data.data.address.house
        // state.address.geoLat = data.data.address.geoLat
        // state.address.geoLon = data.data.address.geoLon
        // state.address.housing = data.data.address.housing
        // state.address.building = data.data.address.building
        // state.address.flat = data.data.address.flat
        // // АДРЕС FIAS ID
        // state.addressFiases.area_fias_id = data.data.addressFiases.area_fias_id
        // state.addressFiases.city_fias_id = data.data.addressFiases.city_fias_id
        // state.addressFiases.house_fias_id = data.data.addressFiases.house_fias_id
        // state.addressFiases.region_fias_id = data.data.addressFiases.region_fias_id
        // state.addressFiases.settlement_fias_id = data.data.addressFiases.settlement_fias_id
        // state.addressFiases.street_fias_id = data.data.addressFiases.street_fias_id
        // state.addressFiases.value = data.data.addressFiases.value
        // // ИНФОРМАЦИЯ О РАБОТЕ И ДОХОДЕ
        // state.typeOfEmployment = data.data.typeOfEmployment
        // state.workSalary = data.data.workSalary
        // state.workINN = data.data.workINN
        // state.workFullName = data.data.workFullName
        // state.workType = data.data.workType
        // state.workScope = data.data.workScope
        // state.workName = data.data.workName
        // state.workPhone = transformPhoneToFrontFromBackend(data.data.workPhone)
        // state.workNumberOfEmployees = data.data.workNumberOfEmployees
        // state.workPeriod = data.data.workPeriod
        // state.workPosition = data.data.workPosition
        // // АДРЕС МЕСТОНАХОЖДЕНИЯ РАБОТОДАТЕЛЯ
        // if (data.data.workAddress !== null) {
        //   state.workAddress.postalCode = data.data.workAddress.postalCode
        //   state.workAddress.region = data.data.workAddress.region
        //   state.workAddress.city = data.data.workAddress.city
        //   state.workAddress.settlement = data.data.workAddress.settlement
        //   state.workAddress.street = data.data.workAddress.street
        //   state.workAddress.doNotHaveStreet = data.data.workAddress.doNotHaveStreet
        //   state.workAddress.house = data.data.workAddress.house
        //   state.workAddress.geoLat = data.data.workAddress.geoLat
        //   state.workAddress.geoLon = data.data.workAddress.geoLon
        //   state.workAddress.housing = data.data.workAddress.housing
        //   state.workAddress.building = data.data.workAddress.building
        //   state.workAddress.flat = data.data.workAddress.flat
        // }
        // // АДРЕС FIAS ID МЕСТОНАХОЖДЕНИЯ РАБОТОДАТЕЛЯ
        // if (data.data.workAddressFiases !== null) {
        //   state.workAddressFiases.area_fias_id = data.data.workAddressFiases.area_fias_id
        //   state.workAddressFiases.city_fias_id = data.data.workAddressFiases.city_fias_id
        //   state.workAddressFiases.house_fias_id = data.data.workAddressFiases.house_fias_id
        //   state.workAddressFiases.region_fias_id = data.data.workAddressFiases.region_fias_id
        //   state.workAddressFiases.settlement_fias_id = data.data.workAddressFiases.settlement_fias_id === '0' ? null : data.data.workAddressFiases.settlement_fias_id
        //   state.workAddressFiases.street_fias_id = data.data.workAddressFiases.street_fias_id
        //   state.workAddressFiases.value = data.data.workAddressFiases.value
        // }
        // // ПУБЛИЧНОСТЬ
        // // Публичное должносное лицо
        // state.publicity.officialState = data.data.publicity.officialState
        // state.publicity.officialOwnerIsMe = data.data.publicity.officialOwnerIsMe
        // state.publicity.officialName = data.data.publicity.officialName
        // // Публичное должностное лицо международной организации
        // state.publicity.internationalOrganizationState = data.data.publicity.internationalOrganizationState
        // state.publicity.internationalOrganizationOwnerIsMe = data.data.publicity.internationalOrganizationOwnerIsMe
        // state.publicity.internationalOrganizationName = data.data.publicity.internationalOrganizationName
        // // Публичное должностное лицо российской организации
        // state.publicity.officialRussiaState = data.data.publicity.officialRussiaState
        // state.publicity.officialRussiaOwnerIsMe = data.data.publicity.officialRussiaOwnerIsMe
        // state.publicity.officialRussiaName = data.data.publicity.officialRussiaName
        // // Выгодоприобретатель
        // state.publicity.benefitsOfAnotherPerson = data.data.publicity.benefitsOfAnotherPerson
        // // БЕНЕФИЦИАРНЫЙ ВЛАДЕЦ
        // state.beneficial.state = data.data.beneficial.state
        // // В случае если пользователь указал другого БВ
        // state.beneficial.lastName = data.data.beneficial.lastName
        // state.beneficial.firstName = data.data.beneficial.firstName
        // state.beneficial.middleName = data.data.beneficial.middleName
        // state.beneficial.passport = transformPassportToFrontFromBackend(data.data.beneficial.passport)
        // state.beneficial.passportDivisionCode = transformCodeOfPassportToFrontFromBackend(data.data.beneficial.passportDivisionCode)
        // state.beneficial.passportDateOfIssue = data.data.beneficial.passportDateOfIssue
        // return Promise.resolve()
      })
  },



  UPDATE_USER_DATA: async (state) => {
    // let user
    // if (fields) {
    //   user = {}
    //   fields.forEach((field) => {
    //     console.log(get(state, field))
    //     set(user, field, get(state.state, field))
    //   })
    // } else {
    //   user = state.state
    // }
    // if (fields.includes('mobilePhone')) {
    //   user.mobilePhone = postPhoneToBackendAndTransform(user.mobilePhone)
    // }
    // if (fields.includes('passport')) {
    //   user.passport = postPassportToBackendAndTransform(user.passport)
    // }
    // if (fields.includes('passportDivisionCode')) {
    //   user.passportDivisionCode = postCodeOfPassportToBackendAndTransform(user.passportDivisionCode)
    // }
    // if (fields.includes('additionalPhone')) {
    //   user.additionalPhone = postPhoneToBackendAndTransform(user.additionalPhone)
    // }
    // if (fields.includes('workPhone')) {
    //   user.workPhone = postPhoneToBackendAndTransform(user.workPhone)
    // }
    let user = state.state;
    user = {
      ...user,
      mobilePhone: postPhoneToBackendAndTransform(state.state.mobilePhone),
      passport: postPassportToBackendAndTransform(state.state.passport),
      passportDivisionCode: postCodeOfPassportToBackendAndTransform(state.state.passportDivisionCode),
      snilsOrInn: user.snilsOrInn,
      additionalPhone: postPhoneToBackendAndTransform(state.state.additionalPhone),
      beneficial: {
        state: state.state.beneficial.state,
        lastName: state.state.beneficial.lastName,
        firstName: state.state.beneficial.firstName,
        middleName: state.state.beneficial.middleName,
        passport: postPassportToBackendAndTransform(state.state.beneficial.passport),
        passportDivisionCode: postCodeOfPassportToBackendAndTransform(state.state.beneficial.passportDivisionCode),
        passportDateOfIssue: state.state.beneficial.passportDateOfIssue
      },
      workPhone: postPhoneToBackendAndTransform(state.state.workPhone)
    };
    delete user.workINN;
    state.state.buttonSaveProfile = true
    state.state.buttonActionLoaderClassProfile = true
    return api.user.edit(user)
      .then(() => {
        // state.commit('CALL_SUCCESS_WINDOW', 'Анкетные данные успешно изменены!')
        state.commit('CALL_WARNING_WINDOW')
        state.state.buttonSaveProfile = false
        state.state.buttonActionLoaderClassProfile = false
        return Promise.resolve()
      })
      .catch(error => {
        state.state.buttonSaveProfile = false
        state.state.buttonActionLoaderClassProfile = false
        return Promise.reject(error.response.data)
      })
  },
  async getValidateDataOfUserInProfile ({state}) {
    await api.user.validate()
      .then(({data}) => {
        state.blankFields = data.data
      })
  }
}

// Трансформирует данные для отправки на бэкенд

const postPhoneToBackendAndTransform = (phone) => phone ? String(phone).match(/\d/g).join('') : null
const postPassportToBackendAndTransform = (passport) => passport ? String(passport).split(' ').join('') : null
const postCodeOfPassportToBackendAndTransform = (code) => code ? String(code).split('-').join('') : null
// const postSnilsToBackendAndTransform = (snils) => snils ? String(snils).match(/\d/g).join('') : null

// Трансформирует параметры с бэкенда во фронт в привычном виде со всеми масками

const transformPhoneToFrontFromBackend = (phone) => phone ? phone.toString().replace(/(\d{0})(\d{1})(\d{3})(\d{3})/, '$1+$2($3)$4-') : null // телефон с маской +7(ХХХ)ХХХ-ХХХХ
const transformPassportToFrontFromBackend = (passport) => passport ? passport.toString().replace(/(\d{4})/, '$1 ') : null // маска для паспорта ХХХХ ХХХХХХ
const transformCodeOfPassportToFrontFromBackend = (code) => code ? code.replace(/(\d{3})/, '$1-') : null // маска для кода подразделения ХХХ-ХХХ
// const transformSnilsToFrontFromBackend = (snils) => snils ? snils.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3 ') : null // маска для снилса ХХХ-ХХХ-ХХХ ХХ

// ЭКСПОРТИРОВАНИЕ ДАННЫХ В ГЛОБАЛЬНЫЙ STATE

export default {
  state,
  getters,
  mutations,
  actions
}
