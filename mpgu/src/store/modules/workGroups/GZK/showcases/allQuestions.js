import {
    Checkbox,
    CheckboxGroup,
    DatePicker,
    HyperSelect,
} from '@/services/common/showcases/filters/index';

export default {
    namespaced: true,
    state: {
        title: 'Поиск по всем вопросам РГ ГД и ГЗК',
        viewId: 'CARD$GZK$ALL_QUESTIONS$XML',
        xmlTag: 'ALL_QUESTIONS',
        disabledExpander: true,
        enabledBigSearch: true,
        actions: [
            {
                title: 'Создать новый вопрос',
                type: 'openForm',
                link: '/ugd/getCardHtml.action?cardId=FORM$GZK$QUESTION',
            },
        ],
        filters: [
            DatePicker({ title: 'Дата рассмотрения вопроса на РГ ГД' }),
            CheckboxGroup({
                title: 'Рассмотрение вопроса на',
                query: 'MEETINGS_TYPES',
                default: [
                    Checkbox({
                        text: 'ГЗК',
                        query: 'GZK',
                    }),
                    Checkbox({
                        text: 'РГ ГД',
                        query: 'RGGD',
                    }),
                ],
            }),
            HyperSelect({
                title: 'Округ',
                nick: 'NSI_OMKTE_OKRUG_ID',
                query: 'NSI_OMKTE',
            }),
            HyperSelect({
                title: 'Докладчик',
                nick: 'GZK_EMPLOYEES',
                query: 'INVEST',
            }),
            HyperSelect({
                title: 'Категория вопроса',
                nick: 'GZK_QUESTION_CATEGORIES',
                query: 'QUESTION_CATEGORY',
            }),
            Checkbox({
                text: 'Только рассмотренные вопросы',
                query: 'ONLY_EXAMINATED',
            }),
        ],
        tableColumns: [
            {
                title: 'Заседание',
                property: 'MEETING_NUMBER',
                classNames: ['as-15-percent'],
            },
            {
                title: 'Рассмотрение вопроса (решение)',
                property: 'ADDRESS',
                classNames: ['as-rest-of-space'],
            },
            {
                title: 'Исполнение решения',
                property: 'EXEC_HISTORY',
                classNames: ['as-15-percent'],
            },
        ],
        paginator: {
            declinations: ['вопрос', 'вопроса', 'вопросов'],
        },
    },
};
