<template>
    <div :class="$interface.menu.open && $interface.isMobile ? 'fixed' : ''" :style="style" id="app" ref="root">
        <div v-if="isProd" style="position: fixed;top:0;left:0;width:100%;text-align: center;color:#fff;background: red;z-index:1;padding:10px;">
            Внимание! Используется боевое API!
        </div>
        <SVGSprite/>

        <wb-header></wb-header>
        <div class="main-container">
            <div class="main-container__wrapper">
                <Side v-if="$store.getters.getMenuState.open || !$interface.isMobile"/>
                <notifications></notifications>
                <transition :duration="300" name="fade">
                    <router-view class="width-fixes" v-if="loaded">
                    </router-view>
                    <div v-else></div>
                </transition>

            </div>
        </div>
        <wb-footer></wb-footer>
        <modals-container></modals-container>

        <!--<error-overlay v-if="hasErrors500" :errors="$store.getters.getErrors"></error-overlay>-->
        <transition name="fade">
            <div class="loader" v-cloak v-show="ajaxLoader"></div>
        </transition>
        <CashbackAgreement v-if="$cashback === 1 && $auth.isAuth"/>

        <loader @hided="AJAX_LOADING(false)"
                @showed="AJAX_LOADING(true)"
                ref="loader"
                style="z-index: 501"
                v-bind="{
                      name: 'rootFixed',
                      isShow: $interface.ajaxLoading,
                      isFixed: true,
                      waitingTitle: '',
                      caption: '',
                  }"
        />
        <noscript><img data-yandex-img alt="" src="https://mc.yandex.ru/watch/17582872?ut=noindex"
                       style="position:absolute; left:-9999px;"/></noscript>

    </div>
</template>

<script>
    // import SVGSprite from './../src/components/SVGSprite'
    const SVGSprite = () =>  import('@/components/SVGSprite');
    import Header from '@/base/Header'
    import Footer from '@/base/Footer'
    import ErrorOverlay from '@/components/Validators/ErrorOverlay'
    import {CLOSE_NOTIFICATIONS} from '@/store/mutation-types'

    import CashbackAgreement from '@/components/CashbackAgreement'
    import Loader from '@/components/Loader'
    import {mapGetters} from 'vuex';
    import Notifications from '@/components/Notifications';
    import Side from "@/components/Side/index";
    import env from '@/utils/methods/env';

    export default {
        name: 'app',
        beforeRouteUpdate(to, from, next) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            next()
        },
        computed: {
            style() {
                // кнопка "получить деньги" на мобильных телефона (брекпоинт xs) должна быть видна всегда
                // на роуте my-loan
                if (this.$route.name === 'my-loan' && this.$interface.viewport === 'mobile' && !this.$pdl.id) {
                    return {
                        'margin-bottom': '70px'
                    }
                } else if (!['mobile', 'tablet', 'laptop'].includes(this.$interface.viewport) || ['gosauth', 'services', 'my-loan', 'login', 'registration', 'credit-rating', 'pos'].includes(this.$route.name) || this.$user.blocked) {
                    return false;
                }

                return {
                    'margin-bottom': '70px'
                }
            },
            ajaxLoader() {
                return this.$store.getters.getStatus !== 'ok' || this.loaded === false || this.$interface.ajaxLoading;
            },
            isProd () {
                return localStorage.getItem('useProdApi')
            },
            ...mapGetters(['$cashback', '$POS'])
        },
        data() {
            return {
                loaded: false,
                transitionName: 'slide-left',
            }
        },
        components: {
            Side,
            SVGSprite,
            ErrorOverlay,
            wbHeader: Header,
            wbFooter: Footer,
            CashbackAgreement,
            Loader,
            Notifications
        },
        watch: {
            /**
             * У нас включен автоапдейд профиля, если займ выдан и емэйл не подвержден.
             * Убираем носколл тут, а не в EmailConfirmationRequired
             * @param val
             */
            '$user.emailConfirmed'(val) {
                if (val) {
                    this.$helpers.noscroll(false);
                }
            },

            '$user.id' () {
                if(!window.sessionStorage.getItem('gtag_dimensions')) {
                    window.sessionStorage.setItem('gtag_dimensions', 'sent');
                    /* this.$backend.api.user.getLastAuth(this.$user.id).then(({ data }) => {
                        console.log('datas: ', data); */
                    ScarabQueue.push(['setCustomerId', this.$user.id]);
                    ScarabQueue.push(['go']);
                    gtag('event', 'Авторизация', {
                        event_category: 'Вовлеченность',
                        event_label: 'auth',
                        'user1': this.$user.id,
                        'user2': this.$user.bDay,
                        'user3': this.$user.bPlace,
                        'user4': this.$user.gender,
                        'user5': this.$user.typeOfEmployment,
                        'user6': this.$user.educationType,
                        'user7': this.$user.maritalStatus,
                        'user8': this.$user.numberOfChildren,
                        'user9': this.$user.hasPreviousConviction,
                        'user10': this.$user.publicity,
                        'user11': this.$user.sourceOfInformation,
                        'metric1': 1,
                        'metric2': 2,
                        'metric3': 3,
                        'metric4': 4,
                        'metric5': 5,
                        'metric6': 6,
                        'metric7': 7,
                    });
                    // });
                }
            },

            '$route'() {
                this.$helpers.noscroll(false);
                // проверка на использование installment
                if ((this.$route.name === 'installment') && (!this.$interface.showInstallment)) {
                    this.$router.push({name: 'my-loan'})
                }

            }
        },

        async created() {
            if (!this.$user.lastLoginTimeOnTheRegistrationPage) {
                this.$user.lastLoginTimeOnTheRegistrationPage = Date.now();
            }

            window.addEventListener('resize', this.handleResize, true);
            this.handleResize();

            if (this.$route.name === 'autologin') {
                this.loaded = true;
                this.AJAX_LOADING(false);
                return;
            }

            if (this.$route.name === 'adminlogin') {
                this.loaded = true;
                return;
            }


            try {
                if (this.$route.query.key) {
                    const gos = await this.gosAuth().then(() => {
                        console.log('then');
                        this.AJAX_LOADING(false);
                        this.loaded = true;
                    });
                } else {
                    throw new Error('no gos auth');
                }
            } catch (e) {
                if (this.$methods.user.tokenExists()) {
                    console.log('%cAuth by token', 'color: lightblue');
                    this.AJAX_LOADING({
                        caption: 'Авторизация',
                        waitingTitle: 'Загрузка профиля',
                        isShow: true,
                        name: 'rootFixed'
                    });
                    this.$methods.user.getUserData().then(async () => {
                        console.log('%cSuccess auth', 'color: green');
                        console.log('User', this.$user);
                    }).then(() => {
                        console.log('%cGet loans data', 'color: gray');
                        return new Promise((resolve, reject) => {
                            this.$methods.loan.getLoans().then(() => {
                                console.log('%cLoans data loaded', 'color: green');
                                this.$methods.user.redirect(this.$route.name, this.$route.query);
                                return resolve();
                            }).catch((code) => {
                                console.error('%cLoans data load fail, code: ', code);

                                return reject(code);
                            })
                        })
                    }).catch(() => {
                        this.$methods.user.logout();
                    }).finally(() => {
                        console.log('%cAll done', 'color: green;font-weight: bold');
                        this.AJAX_LOADING(false);
                        this.loaded = true;

                    })
                } else {
                    console.log('%cToken not found or expired', 'color: red');
                    if (this.$route.name !== 'registration') {
                        this.$methods.user.logout();
                    }
                    this.loaded = true;

                }
            }

        },

        mounted() {

            if(window.aData.startLoading) {
                window.aData.appDisplayAfter = window.performance.now() - window.aData.startLoading;
            }
            gtag('event', 'Время загрузки', {
                event_category: 'UX',
                event_label: 'Время загрузки',
                value: window.aData.appDisplayAfter
            });

            document.querySelector('body').addEventListener('click', (e) => {
                // скрываем нотификации
                if (e.target.closest('.notification-block') === null && e.target.classList.contains('message-bell') === false) {
                    this.$store.commit(CLOSE_NOTIFICATIONS)
                }
                // скрываем меню
                if (e.target.closest('.side') === null && e.target.classList.contains('hamburger') === false) {
                    this.$store.commit('CLOSE_MENU');
                    this.$helpers.noscroll(false);
                } else if (e.target.closest('.side__menu-item')) {
                    this.$store.commit('CLOSE_MENU');
                    this.$helpers.noscroll(false);
                }
            });
            this.handleResize();

            /*если находимся не на локальном хосте - запустить загрузчики сторонних библиотек*/
            // if(document.location.hostname !== 'localhost') {
            this.runThirdPartyLibraries();
            // }
        },

        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },

        methods: {
            checkToken() {
                return this.$auth.token && (this.$auth.tokenExpired > new Date().getTime() / 1000);
            },
            gosAuth() {
                console.log('gos auth: 1');
                return new Promise((resolve, reject) => {
                    if (this.$route.query.key) {
                        this.AJAX_LOADING(true);
                        this.$backend.api.user.esia.get(this.$route.query.key).then(async ({data}) => {
                            if (typeof data === "object") {
                                if (data.data && data.data.token) { // если есть токен, значит пользователь уже есть в базе, поэтому мы его авторизируем.
                                    this.$router.push({name: 'gosauth'});// скрываем форму авторизации, и показываем "авторизация..."

                                    // если с гос.услуг нам пришел логин, пробуем загрузить данные пользователя.
                                    // если какая-то ошибка, то кидаем на авторизацию.
                                    this.$methods.user.setToken(data.data);

                                    this.$methods.user.getUserData().then(async () => {
                                        console.log('%cSuccess auth', 'color: green');
                                        console.log('User', this.$user);
                                    }).then(() => {
                                        console.log('%cGet loans data', 'color: gray');
                                        return new Promise((resolve, reject) => {
                                            this.$methods.loan.getLoans().then(() => {
                                                console.log('%cLoans data loaded', 'color: green');
                                                this.$methods.user.redirect(this.$route.name);
                                                return resolve();
                                            }).catch((code) => {
                                                console.error('%cLoans data load fail, code: ', code);
                                                return reject(code);
                                            })
                                        })
                                    }).catch(() => {
                                        this.$methods.user.logout();
                                    }).finally(() => {
                                        console.log('%cAll done', 'color: green;font-weight: bold');
                                        this.AJAX_LOADING(false);
                                        this.loaded = true;

                                    })
                                } else { // иначе мы кидаем его на страницу регистрации
                                    window.localStorage.setItem('esia', data.storageKey)

                                    const u = {}
                                    for (const key in data) {
                                        if (data[key]) {
                                            u[key] = data[key]
                                        }
                                    }
                                    u.lastLoginTimeOnTheRegistrationPage = new Date().getTime();
                                    this.$store.commit('SET_USER_DATA', u)
                                    this.$router.push('/registration');
                                    this.AJAX_LOADING(false);
                                    console.log('Start registration');
                                    resolve();
                                }
                            } else {
                                reject(new Error("can't find user by key"));
                            }
                        }).catch((e) => {

                            reject()
                        })
                    } else {
                        reject();
                    }
                })
            },
            handleResize() {
                this.$store.commit('SET_BODY_WIDTH', window.innerWidth);
                this.$store.commit('SET_BODY_HEIGHT', window.innerHeight);

                if ((this.$store.getters.getWidth > 1) && (this.$store.getters.getWidth < 499)) {
                    this.$store.commit('SET_VIEWPORT', 'mobile');
                } else if ((this.$store.getters.getWidth >= 500) && (this.$store.getters.getWidth < 1099)) {
                    this.$store.commit('SET_VIEWPORT', 'tablet');
                } else if ((this.$store.getters.getWidth >= 1100) && (this.$store.getters.getWidth < 1299)) {
                    this.$store.commit('SET_VIEWPORT', 'laptop');
                } else if (this.$store.getters.getWidth >= 1300) {
                    this.$store.commit('SET_VIEWPORT', 'desktop');
                }
            },

            runThirdPartyLibraries() {
                if(['dev', 'test'].includes(env().env)) {
                    return false;
                }
                /*Yandex.Metrika counter*/
                (function (d, w, c) {
                    (w[c] = w[c] || []).push(function () {
                        try {
                            w.yaCounter17582872 = new Ya.Metrika({
                                id: 17582872,
                                clickmap: true,
                                trackLinks: true,
                                accurateTrackBounce: true,
                                webvisor: true,
                                trackHash: true,
                                ut: 'noindex',
                                ecommerce: 'dataLayer'
                            });
                        } catch (e) {
                        }
                    });

                    var n = d.getElementsByTagName('script')[0],
                        s = d.createElement('script'),
                        f = function () {
                            n.parentNode.insertBefore(s, n);
                        };
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://mc.yandex.ru/metrika/watch.js';

                    if (w.opera == '[object Opera]') {
                        d.addEventListener('DOMContentLoaded', f, false);
                    } else {
                        f();
                    }
                })(document, window, 'yandex_metrika_callbacks');
                /*/Yandex.Metrika counter/*/


                /*VK openapi*/
                const el = document.createElement("script");
                el.type = "text/javascript";
                el.src = "https://vk.com/js/api/openapi.js?159";
                el.async = true;
                this.$refs.root.appendChild(el);
                /*/VK openapi/*/



                /*slider widget chat*/
                require('./utils/slidermobiwidget');
                /*/slider widget chat/*/
            },
        },
    }
</script>

<style lang="scss">
	@import "./../static/css/utilits/main";

	.main-container {
		min-height: 100vh;

		&__wrapper {
			@include position(relative);
			display: flex;
		}
	}


	.expand_block {
		background: url(/lk/static/img/pos/menu-button.png) no-repeat 100% 115% #ffffff;

		&.expanded_block {
			background-position: 100% -15%;
		}
	}

	.mobile-table, .full-table {
		display: none;
	}

	@media all and (max-width: 1100px) {
		.mobile-table {
			display: block;
		}
		.full-table {
			display: none;
		}
	}

	@media all and (min-width: 1100px) {
		.full-table {
			display: block;
		}
		.mobile-table {
			display: none;
		}
		a.tooltip-close {
			display: none !important;
		}
	}

	#app {
		position: relative;
	}

	.edit-block-overlay {
		@include size(100%, 100%);
		@include position(absolute);
		z-index: 2;
		opacity: 0
	}

	/*<!--.loader {-->*/
	/*<!--display: flex;-->*/
	/*<!--align-items: center;-->*/
	/*<!--justify-content: center;-->*/
	/*<!--color: white;-->*/
	/*<!--@include font(36px, 800);-->*/
	/*<!--text-align: center;-->*/
	/*<!--@include position(fixed, $c: (top: 0, left: 0));-->*/
	/*<!--opacity: 0.7;-->*/
	/*<!--background: #0c0c0c;-->*/
	/*<!--@include size(100%, 100%);-->*/
	/*<!--z-index: 5000;-->*/
	/*<!--}-->*/

	.fade-leave-active {
		animation: fade .5s reverse;
	}

	.fade-enter-active {
		animation: fade .5s;
	}

	@keyframes fade {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.7;
		}
	}

	.drop-down-enter-active {
		animation: drop-down .2s;
	}

	.drop-down-leave-active {
		animation: drop-down .2s reverse;
	}

	@keyframes drop-down {
		0% {
			transform: translateY(-500px);

		}
		100% {
			transform: translateY(0px);
			z-index: 10;
		}
	}

	.appear-enter-active {
		animation: appear .2s;

	}

	.appear-leave-active {
		animation: appear .2s reverse;
	}

	@keyframes appear {
		0% {
			transform: translateY(-100px) translateX(350px) rotate3d(0, 1, 0, 90deg);
		}
		100% {
			transform: translateY(0) rotate3d(0, 0, 0, 90deg);
		}
	}

	.options-list {
		/*display: flex;*/
		/*flex-direction: column;*/
		@include position(absolute);
		margin-top: -40px;
		border: 1px solid #dbdbdb;
		border-radius: 0 0 3px 3px;
		/*position: relative;*/
		@include size(100%);
		overflow: hidden;
		z-index: 6;
		list-style: none;

		li {
			@include size(100%);
			/*flex-wrap: wrap;*/
			background: white;
			margin: 0;
			border-bottom: 1px solid #eeeeee;
			color: #363636;
			padding: 7px;
			cursor: pointer;

			&.highlighted {
				background: #f8f8f8;
				font-weight: 500;
			}

			del {
				display: none !important;
			}

			ins {
				color: #333333 !important;
			}
		}
	}

	.without-marker li {
		border-bottom: none;
		background: none;
	}

	.messages {
		z-index: 1;
		left: 0;
		top: 0;
	}

	.width-fixes {
		min-height: auto;
		@media #{$desktop} {
			width: calc(100% - 300px);
			margin: 0 auto !important;
		}
		@media #{$laptop} {
			width: calc(100% - 300px);
			margin: 0 auto !important;
		}
		@media #{$tablet} {
			width: 100%;
			margin: 0 auto !important;
		}
		@media #{$mobile} {
			width: 100%;
			margin: 0 auto !important;
		}
	}
</style>
