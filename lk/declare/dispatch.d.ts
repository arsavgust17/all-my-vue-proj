import {LoanObject} from "./LoanObject";

declare module 'vue/types/vue' {
    interface Store {
        dispatch(type: 'LOAN_GET_CALC'): Promise<any>;
        dispatch(type: 'LOAN_CREATE', data: LoanObject): Promise;
        dispatch(type: 'GET_GRAPHIC_INSTALLMENT', data: [number, number, string]): Promise;
        dispatch(type: 'GET_LOAN_PDL'): Promise;
        dispatch(type: 'GET_LOAN_POS'): Promise;
        dispatch(type: 'LOAN_GET_ACCOUNTS'): Promise;
        dispatch(type: 'GET_PROLONGATION_DATA'): Promise;
        dispatch(type: 'GET_ALL_LOANS'): Promise;

        dispatch(type: 'GET_INSTALLMENT_DOC', id: Number): Promise;
        dispatch(type: 'PAYMENT_GET_BONUS_BALANCE'): Promise;
        dispatch(type: 'ADDITIONAL_SERVICES_LOAD_LIST'): Promise;
    }
}
