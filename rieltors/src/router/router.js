import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '../components/pages/main/home.vue'),
        },
        {
            path: '/terms-of-use',
            name: 'terms-of-use',
            component: () => import(/* webpackChunkName: "terms-of-use" */ '../components/pages/main/terms-of-use.vue'),
        },
        {
            path: '/license',
            name: 'license',
            component: () => import(/* webpackChunkName: "license"  */ '../components/pages/main/license.vue'),
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import(/* webpackChunkName: "profile" */ '../components/pages/main/profile.vue'),
        },
    ]
})
