import { DatePicker, HyperSelect } from '@/services/common/showcases/filters/index';

export default {
    namespaced: true,
    state: {
        title: 'Все вопросы РГ ГД',
        viewId: 'CARD$GZK$QUESTIONS$XML',
        xmlTag: 'QUESTIONS',
        enabledBigSearch: true,
        actions: [
            {
                title: 'Создать новый вопрос',
                type: 'openForm',
                link: '/ugd/getCardHtml.action?cardId=FORM$GZK$QUESTION',
            },
        ],
        filters: [
            DatePicker({ title: 'Дата рассмотрения' }),
            HyperSelect({
                title: 'Округ',
                query: 'NSI_OMKTE',
                nick: 'NSI_OMKTE_OKRUG_ID',
            }),
        ],
        tableColumns: [
            {
                title: 'Заседание',
                property: 'MEETING_NUMBER',
                classNames: ['as-10-percent'],
            },
            {
                title: 'Адрес',
                property: 'ADDRESS',
                classNames: ['as-15-percent'],
            },
            {
                title: 'Предмет рассмотрения',
                property: 'QUESTION_SUBJECT',
                classNames: ['as-20-percent'],
            },
            {
                title: 'Инвестор',
                property: 'ORGANIZATIONS',
                classNames: ['as-15-percent'],
            },
            {
                title: 'Решение',
                property: 'DECISION',
                classNames: ['as-rest-of-space'],
            },
            {
                title: 'Поручения',
                property: 'EXEC_HISTORY',
                classNames: ['as-10-percent'],
            },
        ],
        paginator: {
            declinations: ['вопрос', 'вопроса', 'вопросов'],
        },
    },
};
