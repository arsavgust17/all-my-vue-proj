import {
    Checkbox,
    CheckboxGroup,
    DatePicker,
    HyperSelect,
} from '@/services/common/showcases/filters/index';

export default {
    namespaced: true,
    state: {
        title: 'Поручения по исполнителям',
        viewId: 'CARD$GZK$ORDERS_BY_EXECUTORS$CATEGORIZE$XML',
        xmlTag: 'GROUPS',
        isCategorize: true,
        disabledPaginator: true,
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
                title: 'Округ',
                nick: 'NSI_OMKTE_OKRUG_ID',
                query: 'NSI_OMKTE',
            }),

            HyperSelect({
                title: 'Категория вопроса',
                nick: 'GZK_QUESTION_CATEGORIES',
                query: 'QUESTION_CATEGORY',
            }),
            HyperSelect({
                title: 'Исполнитель',
                nick: 'GZK_EMPLOYEES',
                query: 'TASK_EXECUTOR',
            }),
            HyperSelect({
                nick: 'GZK_ORDERS_STATUS',
                query: 'TASK_STATUS',
                title: 'Состояние исполнения',
            }),
        ],
        innerTable: {
            title: 'Поручения',
            viewId: 'CARD$GZK$ORDERS_BY_EXECUTORS$XML',
            xmlTag: 'ORDERS',
            tableColumns: [
                {
                    title: 'Соисполнитель',
                    property: 'TASK_COEXECUTORS',
                    classNames: ['as-10-percent'],
                },
                {
                    title: 'Срок исполнения',
                    property: 'TASK_DEADLINE',
                    classNames: ['as-10-percent', 'as-no-wrap'],
                },
                {
                    title: 'Вопрос',
                    property: 'MEETING_NUMBER',
                    classNames: ['as-10-percent'],
                },
                {
                    title: '№ по прот.',
                    property: 'TASK_NUM',
                    classNames: ['as-5-percent'],
                },
                {
                    title: 'Поручения',
                    property: 'TASK_TEXT',
                    classNames: ['as-25-percent'],
                },
                {
                    title: 'Ход исполнения',
                    property: 'TASK_EXEC',
                    classNames: ['as-rest-of-space'],
                },
            ],
            paginator: {
                declinations: ['поручение', 'поручения', 'поручений'],
            },
        },
        paginator: {
            declinations: ['сотрудник', 'сотрудника', 'сотрудников'],
        },
    },
};
