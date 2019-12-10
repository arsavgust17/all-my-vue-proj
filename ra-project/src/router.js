import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import(/* webpackChunkName: "qr" */ "@/components/scanQR.vue"),
    },
    {
      path: "/quiz",
      component: () =>
          import(/* webpackChunkName: "quiz" */ "@/components/quiz/quiz.vue")
    },
    {
      path: "/statistics",
      component: () =>
          import(/* webpackChunkName: "statistic" */ "@/components/statistics.vue")
    },
    {
      path: "/rate-docs",
      name: "rating",
      component: () => import(/* webpackChunkName: "rating" */ '@/components/rating/rating.vue'),
    },
    {
      path: "/rate-orgs",
      name: "rating",
      component: () => import(/* webpackChunkName: "rating" */ '@/components/rating/rating-orgs.vue'),
    },
  ]
});
