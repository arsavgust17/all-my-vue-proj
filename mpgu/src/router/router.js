import Vue from 'vue';
import Router from 'vue-router';
import $store from '@/store';

import card from '@/views/card.vue';
import form from '@/views/form.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        {
            path: '/card/vitrina',
            component: () => import(/* webpackChunkName: "vitrina" */ '../components/routes/card/vitrina.vue'),
        },
        {
            path: '/test',
            component: () => import(/* webpackChunkName: "test" */ '../components/routes/test.vue'),
        },
        {
            path: '/form',
            component: form,
            children: [
                {
                    path: 'userManagement',
                    component: () => import(/* webpackChunkName: "userManagement" */ '../components/routes/form/userManagement.vue'),
                },
                {
                    path: 'newForm',
                    component: () => import(/* webpackChunkName: "newForm" */ '../components/routes/form/new-form.vue'),
                },
                {
                    path: ':workGroup/question/:id/history',
                    component: () => import(/* webpackChunkName: "questionForms" */ '../components/routes/form/GZK/question/history.vue'),
                },
            ],
        },
        {
            path: '/card/callCenter',
            component: card,
            children: [
                {
                    path: '',
                    meta: { headerTitle: 'Колл-центр' },
                    component: () => import(/* webpackChunkName: "callCenter" */ '../components/routes/card/callCenter.vue'),
                },
            ],
        },
        {
            path: '/card/:workGroup',
            component: card,
            beforeEnter: (to, from, next) => {
                const toWorkGroup = $store.state.workGroups[to.params.workGroup];

                if (!toWorkGroup) {
                    return next({
                        name: 'errorPage',
                        params: {
                            status: 404,
                            reason: 'Неправильное название группы',
                        },
                    });
                }

                return next();
            },
            children: [
                {
                    path: 'showcase/:id',
                    component: () => import(/* webpackChunkName: "showcase" */ '../components/routes/card/showcase.vue'),
                },
                {
                    path: 'question/:id/',
                    component: () => import(/* webpackChunkName: "questions" */ '../components/routes/card/questions/question.vue'),
                    children: [
                        {
                            path: '/',
                            meta: { disabledNavigation: true },
                            name: 'question-card',
                            component: () => import(/* webpackChunkName: "questions" */ '../components/routes/card/questions/sub-routes/card.vue'),
                        },
                        {
                            path: 'process/',
                            meta: { disabledNavigation: true, type: 'question' },
                            name: 'question-process',
                            component: () => import(/* webpackChunkName: "questions" */ '../components/routes/card/questions/sub-routes/process.vue'),
                        },
                        {
                            path: 'history/',
                            meta: { disabledNavigation: true },
                            name: 'question-history',
                            component: () => import(/* webpackChunkName: "questions" */ '../components/routes/card/questions/sub-routes/history.vue'),
                        },
                    ],
                },
                {
                    path: 'meeting/:id/',
                    component: () => import(/* webpackChunkName: "meeting" */ '../components/routes/card/meetings/meeting.vue'),
                    children: [
                        {
                            path: '/',
                            meta: { disabledNavigation: true },
                            name: 'meeting-questions',
                            component: () => import(/* webpackChunkName: "meeting" */ '../components/routes/card/meetings/sub-routes/questions.vue'),
                        },
                        {
                            path: 'orders/',
                            meta: { disabledNavigation: true },
                            name: 'meeting-orders',
                            component: () => import(/* webpackChunkName: "meeting" */ '../components/routes/card/meetings/sub-routes/orders.vue'),
                        },
                    ],
                },
                {
                    path: 'object/:id/',
                    component: () => import(/* webpackChunkName: "object" */ '../components/routes/card/objects/object.vue'),
                    children: [
                        {
                            path: '/',
                            meta: { disabledNavigation: true },
                            name: 'object-card',
                            component: () => import(/* webpackChunkName: "object" */ '../components/routes/card/objects/sub-routes/card.vue'),
                        },
                        {
                            path: 'process/',
                            meta: { disabledNavigation: true },
                            name: 'object-indicators',
                            component: () => import(/* webpackChunkName: "object" */ '../components/routes/card/objects/sub-routes/indicators.vue'),
                        },
                        {
                            path: 'history/',
                            meta: { disabledNavigation: true },
                            name: 'object-history',
                            component: () => import(/* webpackChunkName: "object" */ '../components/routes/card/objects/sub-routes/history.vue'),
                        },
                    ],
                },
                {
                    path: 'order/:id/',
                    component: () => import(/* webpackChunkName: "order" */ '../components/routes/card/orders/order.vue'),
                    children: [
                        {
                            path: '/',
                            meta: { disabledNavigation: true },
                            name: 'order-card',
                            component: () => import(/* webpackChunkName: "order" */ '../components/routes/card/orders/sub-routes/card.vue'),
                        },
                        {
                            path: 'process/',
                            meta: { disabledNavigation: true, type: 'order' },
                            name: 'order-process',
                            component: () => import(/* webpackChunkName: "order" */ '../components/routes/card/questions/sub-routes/process.vue'),
                        },
                    ],
                },
            ],
        },
        {
            path: '*',
            component: card,
            children: [{
                path: '',
                component: () => import(/* webpackChunkName: "errors" */ '../components/routes/error/index.vue'),
            }],
        },
    ],
});
