import Vue, { VNode, VNodeDirective } from 'vue'

/** ElementUI component common definition */
export declare class UIComponent extends Vue {
    /** Install component into Vue */
    static install (vue: typeof Vue): void
}


export declare class UiCard extends UIComponent {
    /** Height of the footer */
    title: string

    $slots: {
        default: VNode[],
    }
}
