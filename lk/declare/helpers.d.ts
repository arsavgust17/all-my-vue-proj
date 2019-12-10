import Vue from 'vue'
import dayjs from 'dayjs'

declare module 'vue/types/vue' {
    interface VueConstructor {
        /**
         * Функции-помощники
         */
        $helpers: {
            /**
             * Проверяет все ключи объекта за данное значение или наличие не ложного значения
             * @param {Object} object
             * @param value
             * @returns {Boolean}
             */
            every(object: Object, value?:any): Boolean;
            /**
             * Множественное в правильном падеже
             * @example plural(1, ['яблоко', 'яблока', 'яблок']) => яблоко
             * @example plural(157, ['яблоко', 'яблока', 'яблок'])
             * @example plural(1, ['*секунду', 'секунды', 'секунд'])
             * @example plural(2, ['секунду', '*секунды', 'секунд'])
             * @example plural(5, ['секунду', '*секунды', '*секунд'])
             * @param {number} number
             * @param {array} cases
             * @returns {String}
             */
            plural(number: number, cases: array): String;
            /**
             * Фокус на элемент
             * @param {HTMLElement} el
             */
            scroll(el: HTMLElement): void,
            /**
             * Форматирование суммы в более читабельный вид.
             * @param {number} sum
             * @param {number} decimals
             * @returns {string}
             */
            formatMoney(sum: number, decimals: number): string,
            /**
             * Блокирует прокрутку окна.
             * @param {boolean} state
             */
            noscroll(state: boolean): void,

            /**
             * Возвращает название месяца по его номеру в родительном падеже
             * @param month
             * @returns {string}
             */
            ruMonthName(month): string,
        },

        $dayjs: dayjs,
    }
}
