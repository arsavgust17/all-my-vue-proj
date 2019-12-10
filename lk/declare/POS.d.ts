interface iPOS {
    schedule: [iPosSchedule],
    loans: [],
    operations: [iPosOperation],
    rejections: [iPosRejection],
    transactions: [iPosTransaction],
    partners: [iPosPartnerShop],
    limit: number,
    geo: {
        type: string,
        fias_id: string,
        location: {
            lat: number,
            loan: number,
        }
    }
}

interface iPosPartnerShopMerchant {
    category: string,
    description: string | null,
    id: number,
    installment: string,
    logo: string | null,
    name: string,
    publication: string,
    website: string | null
}


interface iPosPartnerShop {
    id: string,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    metro_stations: [string],
    merchant: iPosPartnerShopMerchant
}

interface iPosSale {
    amount: number,
    id: number,
    loan_body: number,
    paid_amount: 0,
    penalties: number,
    percents: number,
    saleAmount: number,
    shop: iPosPartnerShop,
    selected: boolean,
}

interface iPosSchedule {
    amount: number,
    date: string,
    sales: [iPosSale],
    //оплачен ли. вычисляемое свойство.
    isPaid: boolean,
    //просрочен ли. вычисляемое свойство.
    isOverdue: boolean,
}


interface iPosProduct {
    name: string,
    price: number,
    refund: null
}

interface iPosOperation {
    isOperation: true,
    isRejection: false,
    isTransaction: false,

    cashier_id: number,
    contract_number: string,
    date: string,
    earlyRepayment: number,
    last_payment_date: string,
    loanId: number,
    nearest_payment_amount: number,
    nearest_payment_date: string,
    ownFounds: 0,
    penalties: number,
    percents: number,
    period: number,
    products: [iPosProduct],
    shop: iPosPartnerShop,
    shop_id: number,
    status: string,
    sum: number,
    webbankirFounds: number,

}
interface iPosRejection {
    isRejection: true,
    isOperation: false,
    isTransaction: false,

    amount: number,
    date: string,
    goods: [iPosProduct],
    id: number,
    shop: iPosPartnerShop,
    status: string,
}

interface iPosTransaction {
    isTransaction: true,
    isRejection: false,
    isOperation: false,

    credit_id: number,
    sum: number,
    sum_id: number,
    system: string,
    transaction_date: string,
    transaction_id: string,
}

declare module "vue/types/vue" {
    interface Store {
        dispatch(type: 'POS_CHECK_USER'): Promise<boolean>;
        dispatch(type: 'POS_GET_SCHEDULE'): Promise<[iPosSchedule]>;
        dispatch(type: 'POS_GET_OPERATIONS'): Promise<[iPosOperation]>;
        dispatch(type: 'POS_GET_REJECTIONS'): Promise<[iPosRejection]>;
        dispatch(type: 'POS_GET_TRANSACTIONS'): Promise<[iPosTransaction]>;
        dispatch(type: 'POS_RECOUNT_DEBT'): Promise<number>;
        dispatch(type: 'POS_GET_OPERATION_DOCUMENT', payload: number): Promise<void>;
        dispatch(type: 'POS_GET_OPERATION_DOCUMENT_PAYED', payload: number): Promise<void>;

        commit(type: 'POS_SET_LIMIT', payload: number): void;
        commit(type: 'POS_SET_SCHEDULE', payload: [iPosSchedule]): void;
        commit(type: 'POS_SET_REJECTIONS', payload: [iPosRejection]): void;
        commit(type: 'POS_SET_OPERATIONS', payload: [iPosOperation]): void;
        commit(type: 'POS_SET_TRANSACTION', payload: [iPosTransaction]): void;

        getters: {
            $POS: iPOS
        }
    }
}


export {
    iPosSchedule
}
