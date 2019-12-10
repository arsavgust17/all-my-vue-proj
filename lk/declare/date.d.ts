import Vue from 'vue'

declare module 'vue/types/vue' {
    interface VueConstructor {
        /**
         * Функции для работы с датами.
         * Формат входных данных исключительно DD.MM.YYYY и Date
         * Если произошла ошибка, то будет возвращен undefined и вывыедено предупреждение в консоли
         */
        $date: {
            /**
             * Сравнение date на то, что она раньше dateBefore
             * @example APP.$date.before('11.12.2010', '11.11.2011') => true
             * @example APP.$date.before('11.12.2010', '11.11.2009') => false
             * @example APP.$date.before('11.12.2010', new Date()) => true
             * @example APP.$date.before(new Date(), 'invalid.format') => undefined
             * @param date {string}
             * @param dateBefore {string}
             * @returns {boolean | undefined}
             */
            before(date:string|Date, dateBefore:string|Date): boolean|undefined
        }
    }
}