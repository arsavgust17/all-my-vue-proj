import iTheme from './theme'
declare module 'vue/types/vue' {
    interface Vue {
        /**
         * Переменные темы
         */
        $theme?: iTheme
    }

}
