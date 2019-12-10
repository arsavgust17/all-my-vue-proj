import Vue from 'vue';
import {iPosSchedule} from "../../POS";

interface iScheduleMixin {
    readonly haveOverdue: boolean;
    readonly currentPay: iPosSchedule;
    readonly overdueAmount: number,
    readonly nextPaymentDate: Date;
    readonly nextPaymentSum: number;
    readonly debtSum: {
        readonly percent: number,
        readonly penalties: number,
        readonly  body: number,
    }
}
