import {iAdditionalService} from "./AdditionalServices";

interface iPaymentMethods {
    type: string,
    terminal?: string,
    pay_online?: string,
}

interface iPaymentOrder {

}

interface iPaymentData {
    amount: number,
    type: PAYMENT_TYPE,
    order?: iPaymentOrder,
}

interface iPayment {
    lastSuccessPayment: {
        amount: number,
        type: string,
        date: Date
    }
}

type PAYMENT_TYPE = 'PDL' | 'PDL_SUPPLEMENTARY' | 'POS' | 'POS_REPAY' | 'PDL_INSTALLMENT';

declare module "vue/types/vue" {

    interface Store {
        commit(type: 'PAYMENT_SET_METHODS', payload: [iPaymentMethods]): void;
        commit(type: 'PAYMENT_SET_AMOUNT', payload: number): void;
        commit(type: 'PAYMENT_SET_TYPE', payload: PAYMENT_TYPE): void;
        commit(type: 'PAYMENT_SET_ORDER', payload: iPaymentOrder): void;
        commit(type: 'PAYMENT_SET', payload: iPaymentData): void;
        commit(type: 'PAYMENT_SET_ADDITIONAL_SERVICES', payload: iAdditionalService): void;
        //смена стейта (выбран/не выбран)
        commit(type: 'PAYMENT_SELECT_SERVICE', payload: boolean): void;
        commit(type: 'PAYMENT_IN_PROCESS', payload: boolean): void;
        commit(type: 'PAYMENT_SET_LAST_SUCCESS_PAYMENT', payload: {
            amount: number,
            type: string
        }): void;

        dispatch(type: 'PAYMENT_GET_METHODS'): Promise<any>
        dispatch(type: 'PAYMENT_GET_ADDITIONAL_SERVICES'): Promise<any>

        getters: {
            $pay: iPayment
        }
    }
}

export {
    PAYMENT_TYPE
}
