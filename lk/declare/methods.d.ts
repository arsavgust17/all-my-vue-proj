import Vue from 'vue'

declare module 'vue/types/vue' {
    interface VueConstructor {
        AJAX_LOADING(state: boolean): void,

        /**
         * Получить код первой ошибки из респонса апи.
         * @param {Object} response
         * @returns {string | false}
         */
        $getErrorCode(response: Object): string | false,

        /**
         * Вывести ошибку по ответу апи согласной карте.
         * @param {Object} response
         * @param {Object} errorMap
         * @param {string} default_text
         */
        $error(response: Object, errorMap: Object, default_text = 'Произошла ошибка')
    }
}
