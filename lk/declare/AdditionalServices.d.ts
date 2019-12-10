/**
 * Значения интерфейса iAdditionalService.price_graph
 */
interface iAdditionalServicePriceGraph {
    /**
     * Максимальная сумма
     */
    sum: number,
    /**
     * Стоимость (проценты)
     */
    value: number,
    /**
     * Срок займа в днях
     */
    period: number,
}

/**
 * Объект доп.услуги при взятии, оплате займа.
 */
interface iAdditionalService {
    /**
     * Активна услуга или нет
     */
    active: boolean,
    /**
     * Доступность услуги для пользователя
     */
    active_for_user: boolean,
    /**
     * Услуга доступна только при оформлении займа на карту
     */
    credit_cards_only: boolean,
    /**
     * Описание услуги
     */
    description: string,
    /**
     * Название документа, отображается в интерфейсе в подробном описании
     */
    document_title: string,
    /**
     * Ссылка на документ
     */
    document_url: string,
    /**
     * ID услуги, который в случае ее оформления отправляется в iPDL.additional_services[id]
     */
    id: number,
    /**
     * Битовое число, которое говорит на каких страницах предлагать услугу для покупки
     */
    location_int: number,
    /**
     * Срок действия услуги
     */
    period: string | null,
    /**
     * Срок действия услуги для интерфейса (на русском языке, например, 1 месяц)
     */
    period_label: string | null,
    /**
     * Цена услуги. Доступно только при price_graph.type FIXED
     */
    price: number,
    /**
     * Описание для калькуляции стоимости услуги.
     */
    price_graph: {
        /**
         * FIXED - фиксированная стоимость услуги, берется из iAdditionalService.price
         * PERCENT - динамическая стоимость услуги, которая зависит от суммы займа
         * GRAPH - динамическая стоимость услуги, которая зависит от суммы займа и его срока
         *
         * @url https://webbankir.atlassian.net/browse/WB-6392
         */
        type: "FIXED" | "PERCENT" | "GRAPH",
        graph: [iAdditionalServicePriceGraph]

    },
    /**
     * Предварительное значение статуса услуги (заказана или нет)
     */
    state: boolean,
    /**
     * Название услуги
     */
    title: string,


    /**
     * --------------------------------------------------------------
     * Дополнительные свойства для интерфейса.
     * --------------------------------------------------------------
     */

    /**
     * Выбрана услуга или нет. Используется в дальнейшем при оформлении займа.
     */
    selected: boolean,
    /**
     * Открыть/Закрыть подробное описание услуги в интерфейсе ЛК
     */
    expand: boolean,

}


export {iAdditionalService}
