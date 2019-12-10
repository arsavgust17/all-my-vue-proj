import {ACCOUNTS, PAY, PDL, AUTH, CONFIG, USER, POS_ARRAY, LOAN_SET_PROLONGATION, LOAN_SET_CALC, LOAN_SET_HISTORY, PAYMENT, INSTALLMENT_POS} from "./store";
import {VueConstructor} from "vue/types/vue";
import {iAdditionalService} from "./AdditionalServices";

interface getters {
    /**
     * При переходе с другой странице, мы можем вызвать любой метод в компоненте MyLoan/ActiveLoan
     * В основном это нужно для иницилизации оплаты (PersonalStakeBlock) и кнопки снизу (Оплатить займ)
     */
    ActiveLoanAction: string,
    $pay: PAY,
    $auth: AUTH,
    $config: CONFIG,
    /**
     * Данные о пользователе
     */
    $user: USER,
    /**
     * Данные о займе ПДЛ
     */
    $pdl: PDL,
    /**
     * Данные о займах ПОС
     */
    $pos: POS_ARRAY,
    /**
     * Данные о доп.услугах
     */
    $posServices: PDL,
    /**
     * Данные о калькуляции нового займа
     */
    $calculate: LOAN_SET_CALC,
    /**
     * Данные об истории займов
     */
    $history: LOAN_SET_HISTORY,
    /**
     * Информация для пролонгации
     */
    $prolongation: LOAN_SET_PROLONGATION,
    /**
     * Обработка платежей
     * @deprecated
     */
    $payment: PAYMENT,
    /**
     * платежнные акканты
     */
    $accounts: ACCOUNTS,
    $installment: INSTALLMENT_POS,
    $graphicInstallment: [{
        amount: number,
        mouths: number,
        date: string
    }],
    $loanType: 1 | 8,
    getDisplayWarningBlock: boolean,
    ADDITIONAL_SERVICES_GET_LIST: [iAdditionalService]
    /**
     * показ правого информационного блока
     */
}

declare module 'vue/types/vue' {
    interface Store {
        getters: getters
    }

    interface VueConstructor {
        $pay: PAY,
        $auth: AUTH
    }
}
