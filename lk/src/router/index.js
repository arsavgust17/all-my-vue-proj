import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
/*PAGES*/
import MyLoan from '@/pages/MyLoan'
import CreditRating from '@/pages/CreditRating'
import Autologin from '@/pages/Autologin'
import AdminLogin from '@/pages/Adminlogin'
import Testing from '@/pages/Testing'
import Login from '@/pages/Login'
import RegistrationIndex from '@/pages/Registration'
import Acceptance from '@/pages/Acceptance'
import AllCards from '@/pages/AllCards'
import NoticeOfDebt from '@/pages/NoticeOfDebt'
import NoticeSoft from '@/pages/NoticeSoft'
import PdlProlongation from '@/pages/MyLoan/Prolongation/PdlProlongation.vue';
import PaymentForm from '@/components/PayForm/index';
/*COMPONENTS*/
import EmailConfirm from '@/components/User/ContactInformation/EmailConfirm'
import EmailSpam from '@/components/User/ContactInformation/EmailSpam'
import CashbackAgreement from '@/components/CashbackAgreement'
/*LAZY PAGES*/
// const Services = () => import(/* webpackChunkName: "Services" */ '@/pages/Services');
const MyAccounts = () => import(/* webpackChunkName: "MyAccounts" */ '@/pages/MyAccounts');
// const Profile = () => import(/* webpackChunkName: "Profile" */ '@/pages/Profile');
const LoanHistory = () => import(/* webpackChunkName: "LoanHistory" */ '@/pages/LoanHistory');
// const Feedback = () => import(/* webpackChunkName: "Feedback" */ '@/pages/Feedback');
import PasswordRecovery from '@/pages/PasswordRecovery';
import GosAuth from '@/pages/GosAuth';

import Services from '@/pages/Services';
// import MyAccounts from '@/pages/MyAccounts';
import Profile from '@/pages/Profile';
// import LoanHistory from '@/pages/LoanHistory';
import Feedback from '@/pages/Feedback';
import ChangePassword from '@/pages/ChangePassword';
import POS from '@/pages/POS';
import SocialNetwork from '@/pages/SocialNetwork';
import PayResult from '@/pages/MyLoan/AnswerPayment/PayResult';
import SberbankCheckSent from "../components/PayForm/components/SberbankCheckSent";
// import InstallmentSchedule from '@/pages/Installment/Schedule';
// import InstallmentPartners from '@/pages/Installment/Partners';


// const ChangePassword = () => import(/* webpackChunkName: "ChangePassword" */ '@/pages/ChangePassword');
// const POS = () => import(/* webpackChunkName: "POS" */ '@/pages/POS');
// const Installment = () => import(/* webpackChunkName: "Installment" */ '@/pages/Installment');
const InstallmentSchedule = () => import(/* webpackChunkName: "Schedule" */ '@/pages/Installment/Schedule');
const InstallmentPartners = () => import(/* webpackChunkName: "Partners" */ '@/pages/Installment/Partners');
// const SocialNetwork = () => import(/* webpackChunkName: "SocialNetwork" */ '@/pages/SocialNetwork');
// const PayResult = () => import(/* webpackChunkName: "SocialNetwork" */ '@/pages/MyLoan/AnswerPayment/PayResult');

Vue.use(Router);

const redirectUnauthUserToLogin = (to, from, next) => {
    if (store.getters.$auth.isAuth) {
        next()
    } else {
        next('/login')
    }
}

const redirectAuthorizedUserToMyLoan = (to, from, next) => {
    console.log('auth', store.getters.$auth.isAuth, 'to', to, 'from', from);

    if (store.getters.$auth.isAuth) {
        next({name: 'my-loan'})
    } else {
        console.trace();
        next();
    }
}

const router = new Router({
    mode: 'history',
    base: process.env.ROUTER_BASE,
    routes: [
        {
            path: '/',
            redirect: (from) => {
                if (from.query.key) {
                    return '/gosauth'
                }
                return store.getters.$auth.isAuth ? '/my-loan' : '/login';
            }
        },
        {
            path: '/webbankir',
            beforeEnter() {
                document.location.href = 'https://webbankir.com';
            }
        },
        {
            path: '/autologin/:hash',
            name: 'autologin',
            component: Autologin,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                auth: false,
                title: 'вход в личный кабинет Вэббанкир',
            }
        }, {
            path: '/gosauth',
            name: 'gosauth',
            component: GosAuth,
            meta: {
                auth: false,
            }
        },
        {
            path: '/services/:id?',
            name: 'services',
            component: Services,
            meta: {
                auth: false,
            },
            children: [
                {
                    path: 'pay_online',
                    name: 'pay-online-services',
                    component: Services,
                },
            ],
        },
        {
            path: '/registration',
            name: 'registration',
            component: RegistrationIndex,
            meta: {
                auth: false,
            }
        }, {
            path: '/acceptance',
            name: 'acceptance',
            component: Acceptance,
            meta: {
                auth: false,
            }
        }, {
            path: '/all-cards',
            name: 'AllCards',
            component: AllCards,
            meta: {
                auth: false,
            }
        },
		{
			path: '/notice-of-debt',
			name: 'notice-of-debt',
			component: NoticeOfDebt,
			meta: {
				auth: false,
			}
		},
        {
            path: '/notice-soft',
                name: 'notice-soft',
            component: NoticeSoft,
            meta: {
                auth: false,
            }
        },
        {
            path: '/loan-history',
            name: 'loan-history',
            component: LoanHistory,
            meta: {
                auth: true,
            }
        },
        {
            path: '/pos/:page?',
            name: 'pos',
            component: POS,
            meta: {
                installment: {},
                auth: true,
                section: 'pos',
            }
        },
        {
            path: '/pos/partners/:id?',
            name: 'installment-partners',
            component: InstallmentPartners,
            meta: {
                installment: {
                    partners: true
                },
                auth: true,
                section: 'pos'
            }
        },
        {
            path: '/pos/schedule',
            name: 'installment-schedule',
            component: InstallmentSchedule,
            meta: {
                installment: {
                    schedule: true,
                },
                auth: true,
                section: 'pos',
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                auth: true,
            }
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: Feedback,
            meta: {
                auth: true,
            }
        },
        {
            path: '/my-accounts',
            name: 'my-accounts',
            component: MyAccounts,
            meta: {
                auth: true,
            }
        },
        {
          path: '/page-testing',
          name: 'page-testing',
          component: Testing,
          meta: {
            auth: true,
          }
        },
        {
            path: '/credit-rating/:page?',
            name: 'credit-rating',
            component: CreditRating,
            meta: {
                auth: true,
            }
        },
        {
            path: '/credit-rating/show-existing',
            name: 'show-existing-credit-ratings',
            component: CreditRating,
            meta: {
                auth: true,
            }
        },
        {
            path: '/my-loan',
            name: 'my-loan',
            component: MyLoan,
            meta: {
                auth: true,
            },
        },
        {
            path: '/my-loan/prolongation',
            name: 'PDLProlongation',
            component: PdlProlongation,
            meta: {
                auth: true,
                title: 'Продление займа'
            }
        },
        {
            path: '/my-loan/payment',
            name: 'loan-payment',
            component: PaymentForm,
            meta: {
                auth: true,
                title: 'Оплата'
            }
        },
        {
            path: '/my-loan/sberbank-check',
            name: 'loan-sberbank-check',
            component: SberbankCheckSent,
            meta: {
                auth: true,
                title: 'Счет Сбербанк',
            }
        },
        {
            path: '/targeted-lending',
            name: 'targeted-lending',
            component: POS,
            meta: {
                auth: true,
            }
        },
        {
            path: '/email-confirm',
            name: 'email-confirm',
            component: EmailConfirm,
            // beforeEnter: redirectUnauthUserToLogin здесь не нужна авторизация, иначе будут проблемы, если активировать емэйл с другого браузера или устройства
            meta: {
                auth: false,
            }

        },
        {
            path: '/password-recover',
            name: 'password-recover',
            component: PasswordRecovery,
            query: true,
            meta: {
                auth: false,
            }
        },
        {
            path: '/change-password',
            name: 'change-password',
            component: ChangePassword,
            meta: {
                auth: true,
            }
        },
        {
            path: '/email-spam',
            name: 'email-spam',
            component: EmailSpam,
            // beforeEnter: redirectUnauthUserToLogin здесь не нужна авторизация
            meta: {
                auth: false,
            }
        },
        {
            path: '/pay_result',
            name: 'pay_result',
            component: PayResult,
            meta: {
                auth: true,
            }
        },
        {
            path: '/adminlogin',
            name: 'adminlogin',
            component: AdminLogin,
            meta: {
                auth: false,
            }
        },
        {
            path: '/social-network',
            name: 'social-network',
            component: SocialNetwork,
            meta: {
                auth: true
            }
        }, {
            path: '/cashback-agreement',
            name: 'cashback-agreement',
            component: CashbackAgreement,
            meta: {
                auth: false
            }
        },
        {
            path: '*',
            redirect: () => store.getters.$auth.isAuth ? '/my-loan' : '/'
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
})

router.beforeEach((to, from, next) => {
    const loginRouteParams = {
        name: 'login',
    };
    const mainPage = {
        name: 'my-loan'
    };

    if (to.path === '/') {
        next(store.getters.$auth.isAuth ?
            {
                name: 'my-loan'
            }
            :
            loginRouteParams
        );
        return;
    }

    if (to.meta.auth && !store.getters.$auth.isAuth) {
        next(loginRouteParams);
    // } else if (to.meta.auth && store.getters.$auth.isAuth && !store.getters.$interface.showInstallment) {
    //     next(mainPage)
    } else {
        next();
    }
    const toTitle = to.meta.title;
    /*установка заголовка вкладки, для каждой страницы, в соответствии с мета-данными записанными в роуте + префикс WEBBANKIR*/
    document.title = `WEBBANKIR${toTitle ? ' - ' + toTitle : ''}`;
});

export default router;
