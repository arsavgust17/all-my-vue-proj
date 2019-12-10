const toShowcase = id => `/card/GZK/showcase/${id}`;

export default {
    menu: [
        {
            title: 'Заседания',
            selfLink: toShowcase('meetings'),
            nested: [],
        },
        {
            title: 'Вопросы',
            nested: [
                {
                    title: 'Плановые вопросы',
                    link: toShowcase('plannedQuestions'),
                },
                {
                    title: 'Поиск по всем вопросам РГ ГД и ГЗК',
                    link: toShowcase('allQuestions'),
                },
                // {
                //     title: 'Все вопросы РГ и ГЗК',
                //     link: '/card/GZK/showcase/questions',
                // },
            ],
        },
        {
            title: 'Контроль',
            nested: [
                {
                    title: 'Все поручения',
                    link: toShowcase('orders'),
                },
                {
                    title: 'Поручения по исполнителям',
                    link: toShowcase('ordersByExecutors'),
                },
                {
                    title: 'Новые отчёты',
                    link: toShowcase('newReports'),
                },
            ],
        },
        // {
        //     title: 'Объекты',
        //     selfLink: '/card/GZK/showcase/meetings',
        //     nested: [],
        // },
        // {
        //     title: 'Заявки',
        //     selfLink: '/card/GZK/showcase/meetings',
        //     nested: [],
        // },
    ],
};
