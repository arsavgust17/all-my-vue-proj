import Vue from 'vue'

declare module 'vue/types/vue' {
    interface VueConstructor {
        /**
         * Вывод сообщений
         */
        $toastr: {
            success(message: string, title?: string): void
            error(message: string, title?: string): void
            warning(message: string, title?: string): void
            info(message: string, title?: string): void
            clear():void
        }
    }
}