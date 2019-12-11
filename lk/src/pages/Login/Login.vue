<template>
    <div class="login-page" v-if="!$auth.isAuth">
        <form @submit.prevent="doLogin">
            <div class="container" style="min-height: 100vh">
                <div class="margin-top-50"></div>
                <div class="content-block">
                    <div class="white-block">
                        <div class="padding">
                            <h3>Авторизация</h3>
                        </div>
                        <hr/>
                        <div class="padding">
                            <ui-alert type="warning" v-if="$route.query.notVerified">
                                <div slot="ui-alert-title">
                                    <b>Ваша учетная запись Госуслуг не подтверждена.</b><br>
                                    Для входа в Личный Кабинет воспользуйтесь формой авторизации ниже.
                                </div>
                            </ui-alert>
                            <div class="row">
                                <div class="columns six">
                                    <label for="login">Мобильный телефон, логин или почта</label>
                                    <input
                                            @blur="check" @focus="check"
                                            v-model="user.login"
                                            type="text"
                                            name="Логин"
                                            id="login"
                                            v-validate="'required'"
                                            :class="getValidateClass('login')"
                                            class="login__user"
                                    />
                                    <p v-show="!loginValidated" class="red">Мобильный телефон должен начинаться с 7 или
                                        8</p>
                                    <validate-message
                                            v-show="vErrors.has('Логин')"
                                    >{{ vErrors.first('Логин') }}
                                    </validate-message>
                                </div>
                                <div class="columns six">
                                    <label for="password">Пароль</label>
                                    <div class="icon-in-password">
                                        <div class="show-password" :class="{'hide-password': !eye}"
                                             @click="eye = !eye"></div>
                                    </div>
                                    <input
                                            @blur="check"
                                            @focus="check"
                                            v-model="user.password"
                                            :type="eye ? 'password' : 'text'"
                                            name="Пароль"
                                            id="password"
                                            v-validate="'required'"
                                            :class="['hide-native-icon', 'login__pass']"
                                    />
                                    <validate-message
                                            v-show="vErrors.has('Пароль')"
                                    >{{ vErrors.first('Пароль') }}
                                    </validate-message>
                                </div>
                            </div>
                            <div class="row adaptive-center">
                                <div class="columns six forgot-password">
                                    <span>
                                        Забыли логин или пароль?<a href="#" @click.prevent="$modal.show('restore-password')">Восстановить</a>
                                    </span>
                                </div>
                                <div class="columns six checkbox">
                                    <input
                                        v-model="clearSession"
                                        type="checkbox"
                                        id="not-home-pc"
                                        name="not-home-pc"
                                        data-not-home-pc-checkbox
                                    />
                                    <label for="not-home-pc"><span></span>Чужой компьютер</label>
                                </div>
                            </div>
                            <!--<vuex-error-block :errors-fields="['mainErrorBlock']"></vuex-error-block>-->

                        </div>
                    </div>
                    <div class="auth-variants-set">

                        <div class="auth-variants-set-cell">
                            <button
                                :class="['auth-variants-set-cell__element', 'sign-in-button', 'red', 'button', {'disable-test': test}]"
                                :disabled="!user.login || !user.password"
                                name="login-enter-1"
                                data-login-enter-1-button
                            >
                                Войти
                            </button>
                            <router-link data-authWithGos-link class="auth-variants-set-cell__element gos-login  gos-row" to="/">
                                <svg class="gosuslugi-icon" viewBox="0 0 32 32">
                                    <use xlink:href="#gosuslugi-icon"/>
                                </svg>
                                <span @click.stop="authWithGos">Войти при помощи Госуслуг</span>
                            </router-link>
                        </div>

                        <router-link data-registration-link tag="button" :to="{name: 'registration'}" class="white to-registration-button">
                            Впервые на Webbankir? <span>Получить деньги</span></router-link>

                    </div>
                </div>

            </div>
        </form>
        <restore-password></restore-password>
    </div>
    <div v-else style="height: 100vh;">
    </div>
</template>

<script>
    import ErrorHandleMixin from '@/mixins/ErrorHandleMixin'
    import RestorePassword from './RestorePassword/index'
    import ValidateMessage from '@/components/Validators/ValidateMessage'
    import GetValidateClass from '@/mixins/Validation/GetValidateClassMixin'
    import VuexErrorBlock from '@/components/Validators/VuexErrorBlock'

    export default {
        mixins: [
            ErrorHandleMixin,
            GetValidateClass
        ],
        components: {
            VuexErrorBlock,
            RestorePassword,
            ValidateMessage
        },
        data() {
            return {
                test: null,
                user: {
                    login: '',
                    password: '',
                },
                errorText: {
                    authError: ''
                },
                eye: true,
                loginValidated: true
            }
        },
        computed: {
          clearSession: {
            get () {
              return this.$store.getters.$alien
            },
            set (status) {
              this.$store.commit('TOGGLE_ALIEN', status)
            }
          }
        },
        watch: {
            'user.login': {
                handler: function (login) {
                    this.loginValidated = (!(login.startsWith('9') && login.length === 10));
                },
                immediate: true
            },
            'user.password': {
                handler (password) {

                },
                immediate: true
            },
            clearSession (status) {
                if (status) {
                  window.localStorage.setItem('secure_login', 'secure_login');
                } else {
                  window.localStorage.removeItem('secure_login');
                }
            }
        },
        created () {
            if(this.$auth.isAuth) {
                this.$router.push({name: 'my-loan'});
            }
        },
        mounted() {
            this.clearSession
                ? window.localStorage.setItem('secure_login', 'secure_login')
                : window.localStorage.removeItem('secure_login')
            let getUrlSearchElement = window.location.search
            if (getUrlSearchElement !== '') {
                let needElement = getUrlSearchElement.split('=')
                if (needElement[0] === '?token') {
                    const expired = needElement[2]
                    needElement = needElement[1].split('&exp')
                    const token = needElement[0]
                    this.$store.dispatch('loginAsUser', [token, expired])
                }
            }
            if (this.$store.getters.getReinstatement.status) {
                this.show()
            }

            if (!window.sessionStorage.getItem('gtag_auth_event')) {
                /*gtag('event', 'Авторизация', {
                    event_category: 'Вовлеченность',
                    event_label: 'Авторизация'
                });*/

                window.sessionStorage.setItem('gtag_auth_event', "sent");
            }



        },
        methods: {
            check (e) {
                if (!this.user?.email || !this.user?.password) {
                    const event = new Event('click');
                    document.querySelector('body').dispatchEvent(event);
                }
            },
            authWithGos(e) {
                e.preventDefault();
                document.location.href = this.$backend.api.user.esia.authUrl;
            },
            doLogin: async function () {
                this.AJAX_LOADING({
                    caption: 'Авторизация',
                    waitingTitle: 'Загрузка профиля',
                    isShow: true,
                    name: 'rootFixed'
                });

                this.$methods.user.login(this.user).then(async (status) => {
                	console.log('%cSuccess auth', 'color: green');
                	console.log('User', this.$user);
                	return status;
                }).then((status) => {
                	console.log('%cGet loans data', 'color: gray');
					return new Promise((resolve, reject) => {
						this.$methods.loan.getLoans().then(() => {
							console.log('%cLoans data loaded', 'color: green');
							this.$methods.user.redirect();
							return resolve();
						}).catch((code) => {
							console.error('%cLoans data load fail, code: ', code);

							return reject(code);
						})
                    })
                }).catch((code) => {
                	console.error('Auth error, code: ', code);
                	this.$error({errors: [{code}]}, {
						loginOrPasswordMismatching: 'Неверно введен логин или пароль'
                    }, 'Ошибка загрузки данных');
                }).finally(() => {
                    if (this.$store.getters.getUserDataIsSuccess) {
                        this.$toastr.error('Вы сможете войти через 5 минут.', 'Авторизация недоступна');
                        this.$store.commit('AUTH_SUCCESS', {
                            data: {},
                            authState: ''
                        });
                    }
                	console.log('%cAll done', 'color: green;font-weight: bold');
                	this.AJAX_LOADING(false);
                })

                // this.$store.dispatch('AUTH_REQUEST', this.user).then(async (response) => {
                //     // при успешной авторизации запрашиваем все данные
                //     const promises = [];
                //     promises.push(this.$store.dispatch('GET_USER_DATA'));
                //     promises.push(this.$store.dispatch('GET_ALL_LOANS'));
                //
                //     Promise.all(promises).then(() => {
                //         this.AJAX_LOADING(false);
                //         // this.$store.commit(SET_STATUS, 'ok')
                //         this.$nextTick(() => {
                //             // если у клиента нет займов, то мы его отправляем на страницу регистарции
                //             // с предзаполненными данными
                //             if (this.$history.length === 0 && this.$installment.limit === 0) {
                //                 this.$auth.token = '';
                //                 this.$auth.tokenExpired = '';
                //                 this.$auth.authState = '';
                //                 this.$store.commit('USER_RESET')
                //                 this.$router.push({name: 'registration'});
                //             } else {
                //                 // нам нужно перейти на предыдущую страницу после логина.
                //                 this.$router.push({name: 'my-loan'});
                //             }
                //         })
                //         if (this.$interface.showInstallment) {
                //             this.$store.dispatch('GET_INSTALLMENT_DATA') // ручка запрос на POS, если он доступен для клиента
                //         }
                //     }).catch((e) => {
                //         console.warn('Auth error:', e);
                //         this.$toastr.error('Ошибка авторизации: невозможно загрузить данные.', 'Ошибка');
                //         this.AJAX_LOADING(false);
                //     })
                // }).catch((e) => {
                //     console.warn(e);
                //     this.$toastr.error('Неправильный логин или пароль', 'Ошибка');
                //     this.AJAX_LOADING(false);
                // })
            },
            show() {
                this.$modal.show('restore-password')
            },
            hide() {
                this.$modal.hide('restore-password')
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./../../../static/css/utilits/main";
    @media (max-width: 1100px) {
        .adaptive-center {
            text-align: center;
        }
    }

    p.red {
        color: red;
        margin-top: -10px;
    }

    button.red {
        width: 200px;
       @media #{$mobile} {
           width: 100%;
       }
        &:disabled {
            box-shadow: none;
        }
    }

    .gos-login {
        display: inline-flex;
        align-items: center;
        min-height: 33px;
        text-decoration: none;
        box-sizing: border-box;
        padding: 5px 0 10px 0px;
        line-height: 130%;
        font-weight: 500;
        text-align: left;
    }

    .disable-test {
        background-color: white;
        color: #d1d1d0;
        position: relative;
        &:after {
            position: absolute;
            content: '';
            background-position: 50% 80%;
            left: 0px;
            width: 100%;
            height: 100%;
            background-image: url(/lk/static/img/preloader.gif);
            background-size: 50px;
            background-repeat: no-repeat;
            text-align: left;
            background-position-y: 50%;
            background-position-x: 50%;
        }
    }

    h1 {
        text-align: left;
    }

    .wrapper-20 {
        background-color: #f7f6f6;
        height: 20px;
    }

    .auth-variants-set {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-variants-set-cell {
        display: inline-flex;
        align-items: end;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0 0 40px;
        @media #{$mobile} {
            margin: 0 0 20px;
        }
    }

    .sign-in-button {
        margin: 0 20px 0 0;
        @media #{$mobile} {
            margin: 0 0 20px;
        }
    }

    .auth-variants-set-cell-2 {

    }

    .to-registration-button {

    }

    .gosuslugi-icon {
        width: 38px;
        height: 38px;
        margin-right: 5px;
    }

    .first-on-wb-wrapper {
        width: 100%;
    }

    .show-password {
        background-image: url(/lk/static/img/login/show-grey.png);
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .hide-password {
        background-image: url(/lk/static/img/login/hide-blue.png);
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .icon-in-password {
        position: absolute;
        right: 46px;
        padding-top: 9px;
    }

    .hide-native-icon::-ms-reveal,
    .hide-native-icon::-ms-clear {
        display: none;
    }

    @media (max-width: 499px) {
        .icon-in-password {
            right: 38px;
        }
        .auth-variants-set-cell__element {
            margin: 0px;
        }
    }
</style>
