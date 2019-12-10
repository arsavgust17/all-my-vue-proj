import {VueConstructor} from "vue/types/vue";

interface INTERFACE {
    /**
     * Стейт кнопки действия
     */
    buttonLoading: boolean,
    menu: {
        open: boolean
    },
    list: Array,
    headerClass: string,
    ajaxLoading: boolean,
    lastLoan: {
        status: number | null,
        overdue: boolean | null,
        number: number | null
    },
    news: boolean,
    messageSuccessWindow: {
        messageSuccess: string,
        cross: boolean,
        text: string
    },
    messageWarningWindow: {
        messageWarning: boolean,
        text: string
    },
  viewport: 'mobile' | 'tablet' | 'laptop' | 'desktop',
    isMobile: boolean,
    width: number,
    height: number,
    showInstallment: boolean,
    /**
     * 0 - выключено
     * 1 - ?
     * 2 - ?
     */
    cashback: number,
    displayConfirmEmailWindow: boolean,
    hiddenMenuItems: [string],
}

declare module 'vue/types/vue' {
    interface VueConstructor {
        $store: {
            getters: {
                $interface: INTERFACE
            },
        },

        AJAX_LOADING(state: boolean | {
            waitingTitle: string,
            caption: string,
            name: 'rootFixed' | string,
            isShow: boolean
        }): void,
        BUTTON_LOADING(state: boolean): void,

    }
}
