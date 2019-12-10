import {PAYMENT_TYPE} from "./payment";
import {LOAN_SET_PROLONGATION} from './prolongation';

interface PAY {
    paymentInprocess: boolean,
    /**
     * Показывать форму оплаты?
     */
    showPaymentForm: boolean,
    /**
     * Высота формы оплаты
     */
    showPaymentFormHeight: number,
    /**
     * Инициилизирована ли оплата
     */
    process: boolean,
    /**
     * аггрекатор для оплаты
     */
    aggregator: string,
    /**
     * Шаг платежа по 3ds
     * 1 - иницилизации
     * 2 - платеж прошел
     * 3 - платеж отменен
     * 4 - ошибка платежа
     */
    tdsStep: number,

    /**
     * Динамические статусы платежей. Т.к пересчет платежа происходит не сразу,
     * нам иногда требуется сркывать некоторые блоки от клиентов, если он выполнил действие.
     */
    status: {
        /**
         * Статус оплаты рассрочки (если требуется оплата).
         * После оплаты необходимо поставить 'payed'
         */
        installment: '' | 'payed'
    },
    /**
     * Если заплатить несколько раз, то мы создаем несколько листенеров на евент Message
     * Чтобы это исключить, меняем данные, что мы уже прослушиваем данное событие.
     */
    paymentEventInit: boolean,

    /**
     * Какие именно платежы выбраны, если они выбираются чек-боксами.
     * По ним формируется запрос, с которым передается дата для платежа
     */
    paymentData: {
        dop: boolean,
        pos: boolean,
        pdl: boolean
    },
    /**
     * Приходит с бэка первоначальная сортировка платежей.
     */
    paymentOrder: Object,
    /**
     * Сумма платежа
     */
    paymentAmount: number,
    /**
     * Тип платежа для внутренней логики.
     */
    paymentType: PAYMENT_TYPE,
    paymentValues: {
        type?: number,
        ids?: [number],
    },
    paymentAdditinalServices: [{
        id: number,
        name: string
    }],
    /**
     * Баланс бонусных рублей
     */
    bonusBalance: number,
    /**
     * Выбранная сумма для оплаты
     */
    bonusPaySum: 0,
}
interface USER {
    /**
     * Хеш нового пользователя. Присваивается один раз на странице регистрации.
     * Нужен для отслеживания шагов регистрации.
     */
    hash: string,
    /**
     * Используется для автологина по ссылке партнеров.
     */
    autologin: boolean,
    /**
     * ИД пользователя
     */
    id: number,
    /**
     * Шаг регистрации
     */
    regStep: number,
    /**
     * Последняя попытка регистрации. Время в юникс-тайм.
     */
    lastLoginTimeOnTheRegistrationPage: number,
    /**
     * Есть доступ к финальной части регистрации?
     * Это значит, что вся анкета заполнена и провалидирована
     * на бэке.
     */
    final: boolean,
    /**
     * Установлен или нет у пользователь контрольный вопрос/ответ
     */
    qa: boolean,

    /**
     * Информация о промо
     */
    promo: {
        /**
         * Валиден ли промо код
         */
        check: boolean,
        /**
         * Процент по промо коду
         */
        percent: number,
        /**
         * Промо код
         */
        code: string,
        /**
         * Кол-во оставшихся попыток загрузки промо-кода
         */
        count: number,
    },
    promo_points: number,
    /**
     * Кол-во отправленных смс при регистрации.
     */
    smsSend: {
        // на телефон
        phone: number,
        // всего
        total: number,
        // дата последней отправки в формате Unix
        lastSendDateMs: number,
    },
    smsCode: number,
    userInicial: string,
    blankFields: Array<string>,
    login: string,
    blocked: boolean,
    deleted: null | Date,
    firstName: string,
    lastName: string,
    middleName: string,
    fraudster: boolean,
    bDay: string,
    bPlace: string,
    gender: string,
    mobilePhone: string,
    email: string,
    emailConfirmed: number,
    percent: number,
    passport: number,
    passportDivisionCode: string,
    passportDateOfIssue: string,
    passportIssuedBy: string,
    additionalPhone: string,
    additionalPhoneOwner: string,
    snilsOrInn: number,
    maritalStatus: string,
    educationType: number,
    sourceOfInformation: number,
    numberOfChildren: number,
    hasPreviousConviction: number,
    address: ADDRESS
    addressFiases: null | ADDRESS_FIAS
    /**
     * Сведения о доходе и рабочем месте
     * 1 - наемный сотрудник
     * 2 - ИП
     * 3 - Учредитель/участник ООО
     * 4 - Пенсионер
     * 5 - студент
     * 6 - безработный
     * 7 - работаю на себя
     * 8 - военнослужащий
     */
    typeOfEmployment: number,
    workSalary: number,
    workINN: string,
    workType: string,
    workScope: string,
    workName: string,
    workPhone: string,
    workNumberOfEmployees: string,
    workPeriod: string,
    workPosition: string,
    workAddress: null | ADDRESS,
    workAddressFiases: null | ADDRESS_FIAS,
    subscriptionOnGroupInSocialNetwork: boolean,
    socialNetworks: {
      networks: {
        fb: boolean,
        ig: boolean,
        od: boolean,
        vk: boolean
      }
    },
    publicity: {
        officialState: string,
        officialOwnerIsMe: string,
        officialName: string,
        internationalOrganizationState: string,
        internationalOrganizationOwnerIsMe: string,
        internationalOrganizationName: string,
        officialRussiaState: string,
        officialRussiaOwnerIsMe: string,
        officialRussiaName: string,
        benefitsOfAnotherPerson: string,
    },
    beneficial: {
        state: boolean,
        lastName: string,
        firstName: string,
        middleName: string,
        passport: string,
        passportDivisionCode: string,
        passportDateOfIssue: string,
    },

    validate: {
        step1: {
            firstLastMiddleName: boolean,
            contactMobilePhone: boolean,
            contactEmail: boolean,
        },
        step2: {
            birthDate: boolean,
            passportInformation: boolean,
            registrationAddress: boolean,
        },
        step3: {
            additionPhone: boolean,
            workInformation: boolean,
            additionalInfo: boolean,
            publicInformation: boolean,
            beneficialInformation: boolean,
        },
        other: {
            employer: boolean,
            workAddress: boolean,
            businessman: boolean,
            founderFullName: boolean
        },
    }
}

interface ADDITIONAL_FIELDS {
    code: string,
    /**
     * action: 'pay' - переводим на оплату и подставляем сумму долга
     * action: 'payProlongation' - переводим сразу на оплату пролонгации (ранее должна быть подписана)
     **/
    action: string
}

interface AUTH {
    isAuth: boolean,
    token: string,
    tokenExpired: string,
    additionalFields: ADDITIONAL_FIELDS | null
}
interface ADDRESS {
    postalCode: number,
    region: string,
    city: string,
    settlement: string,
    street: string,
    doNotHaveStreet: boolean,
    house: string,
    geoLon: number,
    geoLat: number,
    housing: string,
    building: string | number,
    flat: number,
}
interface ADDRESS_FIAS {
    area_fias_id: string,
    city_fias_id: string,
    house_fias_id: string,
    region_fias_id: string,
    settlement_fias_id: string,
    street_fias_id: string,
    value: string,
}
interface PAYMENT {
    paymentInProccess: boolean,
    /**
     * Общая сумма необходимого платежа
     */
    totalDebt: number,
    /**
     * Показывать ифрейм или нет
     */
    iframe: boolean,
    /**
     * Процесс оплаты запущен или нет
     */
    process: boolean,
    /**
     * Тип платежа - или источник платежа.
     * 1 - оплата из ЛК
     * 2 - оплата без авторизации
     * Используется только тип 1
     */
    type: number,
    /**
     * Список ID выбранных услуг при оплате.
     */
    additionalServices: Array<number>,
}
interface GRAPH  {
    /**
     * max sum
     */
    sum: number,
    /**
     * cost of service
     */
    cost: number,
}

/**
 * Допник по финансовой защите
 */
interface FIN_PROTECTION {
    activated: boolean,
    /***
     * Дата покупки
     */
    date_start: string,
    /**
     * Дата окончания
     */
    date_end: string,
    /**
     * Количество дней, сколько еще будет действовать услуга
     */
    dayPassed: number,
    /**
     * Количество всех дней, сколько действует допник
     */
    duration: number,
    status: string
}
interface PROLONGATION_INTERFACE  {
    /**
     * id допольнительного договора
     */
    id: number,
    /**
     * сумма платежа для активации
     */
    depositAmount: number,
    /**
     * дата окончания займа
     */
    loanDateEnd: Date | null,
    /**
     * процент по займу
     */
    loanPercent: number,
    /**
     * оплатить до этой даты (указывается, если пролонгация подписана)
     */
    payDateEnd: Date | null,
    /**
     * подписать до указанной даты (указывается, если сформировано доп.соглашение)
     */
    signDateEnd: Date | null,
    /**
     * 1 - пролонгация требует подписания
     * 2 - пролонгация требует оплаты
     * 3 - пролонгация не требует действий, но дата начала пролонгации еще не доступна
     * 4 - пролонгация активна
     * 5 - пролонгация завершена
     */
    status: number
}
interface INSTALLMENT_PAYMENT_PLANS {
    payDateEnd: string,
    payed: boolean,
    sumLeftToPayPerMonth: number,
    totalSumLeftToPay: number,
    totalSumToPayPerMonth: number,

}
interface INSTALLMENT_INTERFACE  {
    /**
     * installment id
     */
    id: number,
    depositAmount: number,
    signDateEnd: string,
    payDateEnd: string,
    paymentsPlan: [INSTALLMENT_PAYMENT_PLANS],
    /**
     * Список возможных состояний рассрочки:

     1 Рассрочка требует подписания
     2 Рассрочка требует внесения первичной оплаты
     3 Все ок, никаких действий не требуется
     4 Рассрочка требует внесения оплаты в соответствии с графиком платежей (статус возвращается за 3 дня до наступления следующей платежной даты)
     5 Просрочена оплата с воответсвии с графиком платежей
     */
    status: number
}
interface CONFIG {
    /**
     * Включены или выключены юр.услуги на фронте. Это дополнительная проверка.
     */
    legalEnabled: boolean,
    /**
     * Показывать или нет модальное окно с рекламой доп.услуг, если какая-то из них не выбрана
     */
    serviceModalEnabled: boolean,
    /**
     * Стейт по-умолчанию для страховки
     * Если null, то берется статус из калькулятора (status - 1, 0 (включен/выключен))
     */
    defaultInsureState: boolean | null,
    /**
     * Стейт по-умолчанию для юр.услуг
     * Если null, то берется статус из калькулятора (status - 1, 0 (включен/выключен))
     */
    defaultLegalState: boolean | null,
    /**
     * Включить/выключить поле для ввода промо-кода на странице регистарции и ЛК
     */
    promoCodeEnabled: boolean,
    /**
     * AB Test
     */
    ab: {
        /** Insure WB-4491 **/
        insure: boolean,
        legal: boolean,

        /**
         * Выключает блок доп.услуг, если тест включен.
         * Последняя цифра ид, для которых выключается блок находится в свойстве ids
         */
        serviceBlock: {
            enable: boolean,
            ids: [number]
        },
    },
    /**
     * Промо акция на дастер 22.11.2018
     */
    promoDusterEnable: boolean,
    /**
     * Использовать модальное окно для 3ds - true
     * Использовать фрейм для 3ds - false
     */
    tdsUseModal: boolean,

    posEnabled: boolean,
    creditRatingEnable: boolean,

    smsInfo: {
        prechecked: boolean,
        enabled: boolean,
    },
    /**
     * Включение токенизации карты
     * 0 - отключена везде
     * 1 - включена на регистрации (для истолментов, если typeLoan === 8)
     * 2 - на регистрации и везде
     * 3 - во всем ЛК
     * **/
    newCard: number

}

interface iPDLAdditionalService {
    guid: string,
    price: number,
    title: string,
}

/**
 * Loan structure
 */
interface PDL {
    additional_services: Array<iPDLAdditionalService> | null,
    bankAccount: string,
    dateFrom: string,
    dateTo: string,
    days: number,
    daysDelay: number,
    daysLeft: number,
    id: number,
    num: number,
    orderNumber: number | null,
    /**
     *  1 - Банковская карта,
     *  3 - Яндекс.Кошелек,
     *  5 - Contact,
     *  6 - Qiwi-кошелек
     */
    paySystem: number,
    /**
     * Процентная ставка займа
     */
    percent: number,
    /**
     * 1 - Ожидает рассмотрения,
     * 2 - Рассматривается (Идёт идентификация),
     * 3 - Займ одобрен,
     * 4 - Договор подписан,
     * 5 - В очереди на оплату (Займ переведён в пункт выдачи),
     * 6 - Займ выдан,
     * 7 - Займ погашен,
     * 100 - Отказано,
     * 101 - Клиент отказался,
     * 102 - Истек срок подписания,
     * 200 - Ручная проверка
     */
    status: number,
    statusText: string,
    sum: number,
    sumLeft: number,
    sumPenalty: number,
    sumPercent: number,
    sumTotal: number,
    supplementary: {
        finProtection: FIN_PROTECTION | null,
        prolongation: PROLONGATION_INTERFACE | null,
        installment: INSTALLMENT_INTERFACE | null,
        loanNewDateEnd: string | null,
        /**
         * Амнистия (скидка на погашение)
         */
        amnesty: AMNESTY | null
    },
    isAmnesty: null | AMNESTY_INTERFACE,
    isAmnesty2019: null | AMNESTY_INTERFACE,
    type: number,
    /**
     * Дата последнего обновления 1с
     */
    webserviceLastUpdate: string,
    /**
     * Был ли пересчет сегодня. Если false, то нужно выводить уведомление и делать запрос на перерасчет.
     */
    needRecount: boolean,

    /**
     * Доступно только в случае, если клиент берет installment-loan
     */
    isProlongation: null | IS_PROLONGATION,
    /**
     * Займ просрочен
     */
    overdue: boolean,
};
/**
 * Set POS
 */
interface LOAN_SET_POS {
   [index: number]: PDL
}
/**
 * Юр.услуги
 */
interface INTERFACE_LEGAL {
    /**
     * percent per day
     */
    percent: number,
    /**
     * in months
     */
    period: number,
    /**
     * enabled or disabled
     */
    status: boolean,
    /**
     * cost of service
     */
    sum: number,
    /**
     * Предустановлена ли галочка выбора по-умолчанию
     */
    is_checked: boolean
}
/**
 * Страховка
 */
interface INTERFACE_INSURANCE {
    /**
     * enabled or disabled
     */
    status: boolean,
    /**
     * percent per day
     */
    percent: number,
    graph: [GRAPH],
    /**
     * Предустановлена ли галочка выбора по-умолчанию
     */
    is_checked: boolean,
}
/**
 * Данные калькуляции о новом займе
 */
interface LOAN_SET_CALC {
    /**
     * Информация о возможности взятия займа.
     */
    status: {
        /**
         * Доступно взятие займа или нет
         */
        available: boolean,
        /**
         * Дата с которой будет доступно взятие займа, если он не доступен
         */
        availableFrom: null | String,
    }
    InsuranceTable: [{
        Max: number,
        Min: number,
        Value: [{
            Max: number,
            Min: number,
            Value: number,
        }],
    }],
    insurance: INTERFACE_INSURANCE,
    legal: INTERFACE_LEGAL,
    pdl_rate_minimal_day: number,
    pdl_rate_minimal_year: number,
    pdl_rate_personal: number,
    pdl_till_minimal: number,
    percent: number,
    percent_max: number,
    percent_min: number,
    period_max: number,
    period_min: number,
    promo_code: string,
    promo_description: string,
    promo_expired: number,
    promo_id: number,
    sum_max: number,
    sum_min: number,
    promo_points: number,
    period_percents: [number],
};
interface LOAN_SET_HISTORY {
    [index: number] : PDL
}

interface ACCOUNT {
    id: number,
    activated: boolean,
    /**
     * 1 - Карта
     * 3 - Яндекс
     * 5 - Контакт
     * 6 - КИВИ
     */
    type: number,
    canBeMain: boolean,
    deletable: boolean,
    editable: boolean,
    img: string,
    main: boolean,
    name: string,
    type_name: string,
    valid_month: number,
    valid_year: number,
    description: string
}
interface ACCOUNTS {
    [index: number]: ACCOUNT
}
interface POS_ARRAY {
    [index: number]: LOAN_SET_POS
}
interface INSTALLMENT_SHOP {
    logo: string,
    name: string,
    description: string,
    website: string,
    installment: string,
    category: string,
}
/**
 * Данные магазина из action'a GET_INSTALLMENT_OPERATION_INFO
 * Приходит из апи: merchant/${merchant_id}/shop/${shop_id}
 */
interface INSTALLMENT_SHOP_INFO {
    address: string,
    latitude: number,
    longitude: number,
    name: string,
    metro_stations: [string],
    id: number,
    merchant: {
        id: number,
        logo: string,
        category: string,
        installment: number,
        name: string,
        website: string,
        description: string,

    }
}
interface INSTALLMENT_GOODS {
    name: string,
    cost: number,
}
/**
 * Список операция для ленты операций
 */
interface INSTALLMENT_OPERATIONS {
    /**
     * ИД операции
     */
    id: number,
    /**
     * Дата операции
     */
    date: string,
    /**
     * Сумма кредита
     */
    sum: number,
    /**
     * Начисленно (оплачено) процентов
     */
    percents: number,
    /**
     * Начисленно (оплачено) штрафов
     */
    penalties: number,
    /**
     * Не используется на фронте.
     * @deprecated
     */
    ownFunds: number,
    /**
     * Не используется на фронте
     * @deprecated
     */
    webbankirFunds: number,
    /**
     * Список товаров в операции
     */
    goods: [INSTALLMENT_GOODS],
    /**
     * Срок займа в месяцах
     */
    period: number,
    /**
     * ИД мерча
     */
    merchant_id: number,
    /**
     * ИД магазина
     */
    shop_id: number,
    /**
     * Ифнормация о магазине
     */
    shop: INSTALLMENT_SHOP_INFO,
    /**
     * ИД кассира. во фронте не используется.
     */
    cashier_id: number,
    /**
     * Статус операции
     * Список статусов будет позже
     * @TODO сделать список статусов, когда будет готов бэк и документация к статусам
     * @deprecated
     */
    status: number,
}
interface INSTALLMENT_SCHEDULE_SALES {
    /**
     * ИД покупки
     */
    id: number,
    /**
     * Сумма платежа
     */
    amount: number,
    /**
     * Сколько будет оплачено из тела кредита
     */
    loan_body: number,
    /**
     * Начисленные процента для оплаты
     */
    percents: number,
    /**
     * Штрафы
     */
    penalties: number,
    /**
     * Выбрано ли для оплаты
     */
    selected: boolean,
}
interface INSTALLMENT_SCHEDULE {
    /**
     * Дата платежа
     */
    date: string,
    /**
     * Сумма платежа
     */
    amount: number,
    /**
     * Список покупок входящие в платеж
     */
    sales: [INSTALLMENT_SCHEDULE_SALES]
}
interface INSTALLMENT_POS {
    /**
     * Партнерские магазины
     */
    partnerShops: [INSTALLMENT_SHOP],
    /**
     * Список операций
     */
    operations: [INSTALLMENT_OPERATIONS],
    /**
     * Раписание платежей по займам
     */
    schedule: [INSTALLMENT_SCHEDULE],
    /**
     * Данные о кредите
     */
    payment: {
        /**
         * ИД юзера
         */
        id: number,
        /**
         * Доступный кредитный лимит
         */
        current_limit: number,
        /**
         * Текущая задолженность (всего)
         */
        current_arrear: number,
        /**
         * Сумма минимального платежа
         */
        current_minimal_payment: number,
    },

    geo_type: 'region_fias' | 'city_fias' | 'geo',
    geo_fias_id: string,
    location: {
        lat: number,
        lon: number,
    }
}

interface AMNESTY_INTERFACE  {
    action_percent: number,
    amnesty_action_id: number,
    amnesty_sum_left: number,
    // сумма штрафов
    interest_accrued_fines: number,
    amnesty_principal_debt: number,
    amnesty_new_principal_debt: number,
    amnesty_deposit_amount: number,
    amnesty_percent: number,
    amnesty_penalty: number,
    date_final: number,
    /**
     * Общая сумма задолженности
     */
    total_sum: number,
}


interface AMNESTY {
    /**
     * Сумма платежа
     */
    depositAmount: number,
    id: number,
    loadDateEnd: string,
    loanPercent: number,
    payDateEnd: string,
    signDateEnd: string,
    /**
     * Статус амнистии.
     * 1 - ожидает подписания
     * 2 - ожидает оплаты
     * 3 - подписан и оплачен. действий не требуется.
     */
    status: 1 | 2 | 3
}

interface IS_PROLONGATION {
    /**
     * Процентная ставка и максимальное количество дней для пролонгации у installment-loan
     */
    dailyPercent: number,
    maxDays: number
}

export {ACCOUNT, ACCOUNTS, PDL, PAY, AUTH, CONFIG, USER, POS_ARRAY, LOAN_SET_CALC, LOAN_SET_HISTORY, LOAN_SET_PROLONGATION, PAYMENT, INSTALLMENT_POS, AMNESTY}
