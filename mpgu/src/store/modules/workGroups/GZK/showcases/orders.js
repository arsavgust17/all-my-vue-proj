import {
    Checkbox,
    CheckboxGroup,
    DatePicker,
    HyperSelect,
} from '@/services/common/showcases/filters/index';

export default {
    namespaced: true,
    state: {
        title: 'Все поручения',
        viewId: 'CARD$GZK$ORDERS$XML',
        xmlTag: 'ORDERS',
        enabledBigSearch: true,
        filters: [
            DatePicker({ title: 'Срок исполнения' }),
            CheckboxGroup({
                title: 'Вид заседания',
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
                title: 'Категория вопроса',
                nick: 'GZK_QUESTION_CATEGORIES',
                query: 'QUESTION_CATEGORY',
            }),
            HyperSelect({
                nick: 'GZK_ORDERS_STATUS',
                query: 'TASK_STATUS',
                title: 'Статус',
            }),
            HyperSelect({
                title: 'Округ',
                nick: 'NSI_OMKTE_OKRUG_ID',
                query: 'NSI_OMKTE',
            }),
            HyperSelect({
                title: 'Исполнитель',
                nick: 'GZK_EMPLOYEES',
                query: 'TASK_EXECUTOR',
            }),
        ],
        tableColumns: [
            {
                title: 'Номер и дата заседания',
                property: 'MEETING_NUMBER',
                classNames: ['as-15-percent'],
            },
            {
                title: 'Адрес',
                property: 'ADDRESS',
                classNames: ['as-15-percent'],
            },
            {
                title: 'Срок исполнения',
                property: 'TASK_DEADLINE',
                classNames: ['as-rest-of-space', 'as-no-wrap'],
            },
            {
                title: 'Поручение',
                property: 'TASK_TEXT',
                classNames: ['as-30-percent'],
            },
            {
                title: 'Ход исполнения',
                property: 'TASK_EXEC',
                classNames: ['as-30-percent'],
            },
        ],
        paginator: {
            declinations: ['поручение', 'поручения', 'поручений'],
        },
    },
};
