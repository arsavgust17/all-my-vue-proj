import {
    Checkbox,
    CheckboxGroup,
    DatePicker,
} from '@/services/common/showcases/filters/index';

export default {
    namespaced: true,
    state: {
        title: 'Заседания',
        viewId: 'CARD$GZK$MEETINGS$XML',
        xmlTag: 'MEETINGS',
        actions: [
            {
                title: 'Создать новое заседание',
                type: 'openForm',
                link: '/ugd/getCardHtml.action?cardId=FORM$GZK$MEETING',
            },
        ],
        filters: [
            DatePicker({ title: 'Дата рассмотрения' }),
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
        ],
        tableColumns: [
            {
                title: 'Вид и номер',
                property: 'MEETING_NUMBER',
                classNames: ['as-10-percent'],
            },
            {
                title: 'Дата',
                property: 'MEETING_DATE',
                classNames: ['as-10-percent', 'as-no-wrap'],
            },
            {
                title: 'Статус',
                property: 'MEETING_STATUS',
                classNames: ['as-10-percent'],
            },
            // {
            //     title: 'Место проведения',
            //     property: 'MEETING_PLACE',
            //     classNames: ['as-rest-of-space'],
            // },
            {
                title: 'Комментарий',
                property: 'AGENDA_COMMENT',
                classNames: ['as-rest-of-space'],
            },
            {
                title: 'Время проведения',
                property: 'MEETING_TIME',
                classNames: ['as-10-percent'],
            },
            {
                title: 'Кол-во вопросов в повестке',
                property: 'QUESTIONS_COUNT',
                classNames: ['as-10-percent'],
            },
        ],
        paginator: {
            declinations: ['заседание', 'заседания', 'заседаний'],
        },
    },
};
