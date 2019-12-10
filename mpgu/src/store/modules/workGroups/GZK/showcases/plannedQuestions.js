import {
    // Checkbox,
    // CheckboxGroup,
    DatePicker,
    HyperSelect,
} from '@/services/common/showcases/filters/index';

export default {
    namespaced: true,
    state: {
        title: 'Плановые вопросы',
        viewId: 'CARD$GZK$PLANNED_QUESTIONS$CATEGORIZE$XML',
        xmlTag: 'GROUPS',
        isCategorize: true,
        disabledPaginator: true,
        bigSearchPlaceholder: 'Поиск по адресу, кадастровому номеру или предмету рассмотрения',
        enabledBigSearch: true,
        filters: [
            DatePicker({ title: 'Дата заседания' }),
            // CheckboxGroup({
            //     title: 'Вид заседания',
            //     query: 'MEETINGS_TYPES',
            //     default: [
            //         Checkbox({
            //             text: 'ГЗК',
            //             query: 'GZK',
            //         }),
            //         Checkbox({
            //             text: 'РГ ГД',
            //             query: 'RGGD',
            //         }),
            //     ],
            // }),
            HyperSelect({
                title: 'Округ',
                query: 'DISTRICT',
                nick: 'NSI_OMKTE_OKRUG_ID',
            }),
        ],
        actions: [
            {
                title: 'Создать новый вопрос',
                type: 'openForm',
                link: '/ugd/getCardHtml.action?cardId=FORM$GZK$QUESTION',
            },
        ],
        innerTable: {
            title: 'Поручения',
            viewId: 'CARD$GZK$PLANNED_QUESTIONS$XML',
            xmlTag: 'QUESTIONS',
            tableColumns: [
                {
                    title: 'Дата',
                    property: 'DATE',
                    classNames: ['as-15-percent', 'as-no-wrap'],
                },
                {
                    title: 'Адрес и предмет рассмотрения',
                    property: 'ADDRESS_AND_SUBJECT',
                    classNames: ['as-30-percent'],
                },
                {
                    title: 'Поручения',
                    property: 'ORDERS',
                    classNames: ['as-rest-of-space'],
                },
                {
                    title: 'Докладчики',
                    property: 'SPEAKERS',
                    classNames: ['as-20-percent'],
                },
            ],
            paginator: {
                declinations: ['вопрос', 'вопроса', 'вопросов'],
            },
        },
        paginator: {
            declinations: ['дата', 'даты', 'дат'],
        },
    },
};
