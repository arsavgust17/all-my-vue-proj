import {iAdditionalService} from './AdditionalServices'
type PAYMENT_TYPES =
    'POS' |
    'POS_REPAY' |
    'PDL' |
    'PDL_SUPPLEMENTARY';


declare module 'vue/types/vue' {
    interface Store {
        commit(type: 'USER_SET_BLANK_FIELDS', payload: Array<string>): void;
        commit(type: 'PAYMENT_TOKEN_TIMEOUT', payload: number): void;
        //change payment type and sum
        commit(type: 'SET_PAYMENT', payload: { type: PAYMENT_TYPES, amount: number }): void;
        //pos payment
        commit(type: 'SET_PAYMENT', payload: { type: PAYMENT_TYPES, amount: number, data: {
                type: 6,
                ids: [number]
            },
            additioanlServices:Array<{
                    name: string,
                    price: number
            }>
        }): void;
        //interface: button loading
        commit(type: 'BUTTON_LOADING', payload: boolean): void;
        //user location
        commit(type: 'SET_USER_LOCATION', payload: Coordinates): void;
        // восстановление по номеру телефона
        commit(type: 'REINSTATEMENT_BY_PHONE', {
          status: {
            type: boolean
          },
          phone: {
            type: string
          }
        }): void;

        /**
         * Смена выбранных услуг при оплат
         *
         * @param {"LOAN_SET_ADDITIONAL_SERVICES"} type
         * @param {Array[number]} payload
         */
        commit(type: 'PAYMENT_SET_ADDITIONAL_SERVICES', payload: [number]): void;

        /**
         * Вызывается после оплаты, чтобы очистить список выбранных услуг
         *
         * @param {"PAYMENT_TRUNCATE_ADDITIONAL_SERVICES"} type
         * @param {void} payload
         */
        commit(type: 'PAYMENT_TRUNCATE_ADDITIONAL_SERVICES'): void;
        commit(type: 'PAYMENT_ADD_BONUS_SUM', payload: number): void;
        commit(type: 'PAYMENT_CLEAR_BONUS_SUM'): void;
        commit(type: 'ADDITIONAL_SERVICES_SET_LIST', [iAdditionalService]): void;
        commit(type: 'ADDITIONAL_SERVICE_TOGGLE_EXPAND', id: number): void;
        commit(type: 'ADDITIONAL_SERVICE_TOGGLE', id: number): void;
        commit(type: 'ADDITIONAL_SERVICE_FALSE', id: number): void;
        commit(type: 'ADDITIONAL_SERVICE_SET_STATE', {
            selected: boolean,
            id: number,
        }): void;

    }
}

