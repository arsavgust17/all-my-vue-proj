<template>
    <div class="row" v-if="ready">
        <div class="content">
            <h3 class="main-header">
                Оформление займа
                <div class="autologin__hello" v-if="$user.autologin">
                    {{time}}, <b>{{$user.userInicial}}.</b>
                </div>
            </h3>
            <div class="white-block">
                <div class="padding">
                    <h3>Подать заявку на займ</h3>
                </div>
                <hr>
                <transition name="fade">
                    <calculator v-model="loan" :service-price="additionalServicesPrice" v-if="ready" ref="calc"></calculator>
                </transition>
            </div>
            <div class="white-block" ref="account">
                <div class="padding">
                    <h3>Выберите способ получения денег</h3>
                </div>
                <hr/>
                <div class="padding">
                    <div class="row">
                        <div class="columns four">
                            <div>
                                <label>Способ получения</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="columns six">
                            <withdraw-select
                                :name="'withdrawtype'"
                                @select="handleSelect"
                                :selected-item="selectedItem"
                                :refreshing="refreshing"
                            >
                            </withdraw-select>
                        </div>
                        <div class="columns six">
                            <p>{{ dynamicHint }}</p>
                        </div>
                    </div>
                    <!-- динам. компонент, показывает визард выбора / добавления карты или кошелька -->
                    <component
                        :is="dynamicComponent"
                        @input="accountDataChanged"
                        :sum="loan.sum"
                        ref="wallet"
                        @resultSuccess="updateNewCard"
                        @enter="typeBuildingCard"
                    >
                    </component>
                </div>
            </div>
        </div>
        <div class="center" :class="[loan.sum > 20000 ? 'display-none' : '']">
            <button
                v-show="showContinueBtn"
                name="registrationFourthStepWithdrawWizardButton"
                @click="typeBuildingCard"
                :disabled="dynamicComponent === 'new-account-card' ? $interface.buttonLoading : disableContinueButton"
            >
                {{btnText}}
            </button>
        </div>
        <div v-if="showFinal">

            <div class="white-block" ref="additional" v-if="hasAdditionalService && services.length">
                <div class="padding">
                    <h3>Дополнительные услуги</h3>
                </div>
                <hr>
                <div class="services">
                    <div class="service" v-for="(/**iAdditionalService**/service) in services" :key="service.id">
                        <div class="service-header">
                            <div class="checkbox">
                                <ui-checkbox
                                    id="registrationFourthStepWithdrawWizard"
                                    v-model="service.selected"
                                >
                                </ui-checkbox>
                            </div>
                            <div class="title" @click="setServiceSelected(service.id, service.selected)">
                                {{service.title}}
                            </div>
                            <div class="label-block">
                                <div class="price arrow">{{calculateServicePrice(service)|currency}} ₽</div>
                                <div class="price" v-if="service.period_label">{{service.period_label}}</div>
                            </div>
                            <div class="details" :class="{expand: service.selected}"
                                 @click="setServiceExpand(service.id)">
                                Условия предоставления услуги
                                <SVGIcon xlink="collapse-20" fill="#4d92e3" viewBox="0 0 24 24"
                                         :rotate="service.expand ? 180 : 0"/>
                            </div>
                        </div>
                        <div class="body" v-show="service.expand">
                            {{blockDescription(service)}}

                            <div v-if="service.document_url" class="docs" @click="openDocument(service.document_url);">
                                <div class="link">{{service.document_title}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="white-block" ref="identify">
                <div class="padding">
                    <h3>Идентификация</h3>
                </div>
                <hr>
                <snils ref="snils" :block="false" :auto="autoINN"/>
                <control-question ref="controlQuestion"/>
            </div>
            <contact-give-money></contact-give-money>

        </div>
        <div v-if="showFinal" class="center">
            <!--<div class="center">-->
            <button
                :disalbed="$interface.buttonLoading"
                @click="checkForInsurance"
                name="registrationFourthStepWithdrawWizardButton2"
                :class="{button_loading: $interface.buttonLoading}">Подать заявку на займ
            </button>
        </div>
        <!--<modal-insurance ref="ModalInsurance" />-->
        <modal-additional-services
                :insured="isInsured"
                :legal="isLegal"
                ref="modalAdditionalServices"/>
    </div>
    <ajax-loader v-else></ajax-loader>
</template>

<script>
  import RangeSlider from '@/components/RangeSlider'
  import Multiselect from '@/UI/Multiselect'
  import {getDateAfterDays, num2words} from '@/utils/helpers'
  import ErrorHandleMixin from '@/mixins/ErrorHandleMixin'
  import WithdrawSelect from './WithdrawSelect'
  import NewAccountCard from '@/components/AccountsAdd/NewAccountCard'
  import NewAccountContact from '@/components/AccountsAdd/NewAccountContact'
  import NewAccountYandex from '@/components/AccountsAdd/NewAccountYandex'
  import Identification from '@/components/TypeGetMoney/Identification'
  import ContactGiveMoney from '@/components/TypeGetMoney/ContactGiveMoney'
  import ModalInsurance from '@/components/Modals/ModalInsurance'
  import InsuranceCheckbox from '@/components/Modals/InsuranceCheckbox'
  import CheckForInsurance from '@/mixins/Loans/CheckForInsurance'
  import {mapGetters} from 'vuex'
  import legal from '@/components/Chunks/Legal.vue'
  import modalAdditionalServices  from '@/components/Modals/AdditinalServices.vue'
  import Snils from '@/components/User/SNILS'
  import ControlQuestion from '@/components/User/ControlQuestion'
  import Inn from '@/mixins/Inn.js';
  import ErrorLog from '@/mixins/ErrorLog.js';
  import pdl from '@/mixins/pdl';
  import AdditionalServices from '@/mixins/Loans/AdditionalServices';
  import AdditionalServiceChunk from '@/components/Chunks/AdditionalServiceChunk.vue';
  import ServicesMixin from '@/mixins/Loans/Services.js';
  import SVGIcon from '@/components/SVGIcon';
  import Calculator from '@/components/Calculator';
  import ErrorBuildingCardMap from '@/utils/error_mapper/building-card';


  export default {
    name: 'WithdrawWizard',
    components: {
      legal,
      modalAdditionalServices,
      InsuranceCheckbox,
      ModalInsurance,
      RangeSlider,
      Multiselect,
      WithdrawSelect,
      NewAccountCard,
      NewAccountContact,
      NewAccountYandex,
      Identification,
      ContactGiveMoney,
      Snils,
      ControlQuestion,
        AdditionalServiceChunk,
        SVGIcon,
        Calculator
    },
    mixins: [
      ErrorHandleMixin,
      CheckForInsurance,
      Inn,
      ErrorLog,
      pdl,
        AdditionalServices,
        ServicesMixin
    ],
    data () {
      return {
          loan: {
              sum: 15000,
              days: 30,
          },
        autoINN: false,
        creating: false,
        ready: false,
        location: this.$store.getters.getUserLocation,
        accountCreated: false,
        isInsuredInternal: null,
        isLegalInternal: null,
        accountId: '',
        isRulesAgreed: true,
        oldPercent: 0,
        dynamicComponent: null,
        dynamicHint: '',
        amount: '',
          overDay: '',
          selectedItem: '',
        isErr: false,
        codesToComponents: {
          'card': 'new-account-card',
          'contact': 'new-account-contact',
          'yandex': 'new-account-yandex'
        },
        withdrawHints: {
          'card': 'У вас есть банковская карта: вы можете получить займ прямо на нее в течение 10 минут. Это самый быстрый и безопасный способ!',
          'contact': 'Займ можно будет получить в любом удобном вам Пункте Обслуживания CONTACT!',
          'yandex': 'Все паспортные данные владельца кошелька Яндекс.Деньги должны полностью совпадать с данными, которые вы указали на первом шаге оформления займа.'
        },
        btnTexts: {
          'card': 'Привязать карту',
          'yandex': 'Привязать кошелек'
        },
        accountData: null,
        displayAdditionalService: false,
        smsInfo: true,
        refreshing: false,
        selectedPayMethod: null,

      }
    },
    computed: {
      typeBuildingCard () { // привязывает или карту или другой источник для получения денег
        return this.dynamicComponent === 'new-account-card' ? this.cardBuild : this.submit
      },
      time () {
        const h = new Date().getHours();

        if (h < 10) {
          return 'Доброе утро'
        } else if (h < 18) {
          return 'Добрый день'
        } else if (h < 23) {
          return 'Добрый вечер';
        } else {
          return 'Доброй ночи';
        }
      },
      insuranceIsAllowed () {
        return this.$calculate.insurance.status;
      },
      legal () {
        return this.$calculate.legal.status;
      },
      isInsured: {
        get () {
          return this.isInsuredInternal !== null ? this.isInsuredInternal : this.$calculate.insurance.status
        },
        set (newVal) {
          this.isInsuredInternal = newVal
        }
      },
      isLegal: {
        get () {
          if (!this.getConfig.legalEnabled) {
            return false
          }
          return this.isLegalInternal !== null ? this.isLegalInternal : this.$calculate.legal.status
        },
        set (newVal) {
          this.isLegalInternal = newVal
        }
      },

      showContinueBtn () {
        // показывать ли кнопку "Продолжить"?
        // если в мультиселекте выбрана опция, и это это не Контакт (а карта или кошелек), и не ранее созданные аккаунты (!this.selectedItem.activated), то да
        return this.selectedItem && !(this.selectedItem.activated ||
          this.selectedItem.id === 'contact' ||
          this.selectedItem === '' || this.$config.newCard === 3 || ([1,2].includes(this.$config.newCard) &&
				this.$loanType === 1)) || this.selectedItem.id === 'yandex'
      },
      showFinal () {
        // показывать ли кнопку "Получить займ"?
        // если сразу выбран "Контакт" или есть добавленный аккаунт И пройдена "КИ", то да
        return this.selectedItem && (this.selectedItem.id === 'contact' || this.selectedItem.activated)
        // (this.$store.state.user.user.creditHistory.historyIsFull &&
        //   this.selectedItem.activated)
      },
      disableContinueButton () {
        if (this.selectedItem && this.selectedItem.id === 'contact') {
          return false
        } else {
          return this.accountData === null
        }
      },
      shouldReturnDate () {
        return getDateAfterDays(this.days)
      },
      accounts () {
        // возвращает аккаунты из стора, "Контакт" (id = 0) с бэка исключен из списка
        return this.$accounts.filter(item => item.id !== 0)
      },
      btnText () {
        if (this.selectedItem && !this.accountCreated) {
          return this.btnTexts[this.selectedItem.id]
        } else {
          return 'Продолжить'
        }
      },
      ...mapGetters(['getButtonLoading', 'getCalculation', 'getConfig'])
    },

    created () {
      this.smsInfo = this.$config.smsInfo.prechecked;
      this.getUserLocation();
      this.sendInnCheck();
      if (this.$cookie.get('loanPrice')) {
        this.loan.sum = parseInt(this.$cookie.get('loanPrice'))
      } else {
        this.loan.sum = this.$calculate.sum_default_website;
      }

      if (this.$cookie.get('loanDays')) {
        this.loan.days = parseInt(this.$cookie.get('loanDays'))
      } else {
        this.loan.days = this.$calculate.period_default_website;
      }

      document.location.hash = 'step4';

    },
    mounted () {
      this.AJAX_LOADING(true);
      const promises = [];
      promises.push(this.$store.dispatch('LOAN_GET_ACCOUNTS'));
      promises.push(this.$store.dispatch('LOAN_GET_CALC'));

      Promise.all(promises).then(() => {
        this.ready = true;
      }).catch((e) => {
        console.log('При оформление займа ошибка', e)
        this.$toastr.warning('Ошибка загрузки данных для оформления займа. Подождите несколько секунд для перезагрузки', 'Ошибка')
      }).finally(() => {
        this.AJAX_LOADING(false);
        this.$helpers.scroll(this.$root.$el);
      })


      gtag('event', 'Оформление займа', {
        event_category: 'PDL',
        event_label: 'PDL Новый :: Шаг 4 :: Способ получения денег'
      });

    },
    methods: {
        async updateNewCard() {
            this.AJAX_LOADING(true);
            await this.$backend.api.accounts.get()
                .then(({ data }) => {
                    this.handleSelect(data.data.find((key) => key.main === 1));
                    this.$store.commit('LOAN_SET_ACCOUNTS', data.data);
                    this.refreshing = true;
                })
                .finally(() => {
                    this.AJAX_LOADING(false);
                      this.$nextTick(() => {
                        this.$helpers.scroll(this.$refs.account);
                      })

                });

        },
      cardBuild () {
        this.$refs.wallet.$refs.card.getAnswer()
      },
      setMainAccount(accountData) {
        // проверяем на ид - если есть, значит карта уже добавлена. иначе сделаем главной позже.
        if (accountData && accountData.id) {
          this.$store.commit('ACCOUNTS_SET_PRIMARY', accountData.id)
          accountData.main = 1
          this.$backend.api.accounts.update(accountData).then((response) => {
            console.info('SET MAIN ACCOUNT', response)
          })
        }
      },
      accountDataChanged (data) {
        // this.selectedPayMethod = this.$accounts.find((account) => account.main === 1);
        // записывает данные из инпутов динамического компонента (номер карты/день/месяц, номера кошельков)
        this.accountData = data
        this.setMainAccount(data)
      },
		handleSelect(selectedItem) {
			console.log('selectedItem', selectedItem);
			if (selectedItem?.id) {
				this.selectedPayMethod = selectedItem;
				this.$store.commit('ACCOUNTS_SET_PRIMARY', selectedItem.id);
				const accountData = this.$accounts.find(item => item.id === selectedItem.id);
				this.setMainAccount(accountData);
			}
			// обрабатывает эмит из парента, на основе чего определяет динамический компонент и текст для него
			this.dynamicComponent = this.codesToComponents[selectedItem.id];
			this.selectedItem = selectedItem;
			if (([2, 3].includes(this.$config.newCard)) && (this.selectedItem.id === 'card')) {
				this.dynamicHint = '';
			} else if ((this.$config.newCard === 1) && (parseFloat(this.loan.sum) > 20000) &&
				(this.selectedItem.id === 'card')) {
				this.dynamicHint = '';
			}
			// this.dynamicHint = (selectedItem.id === 'card') ? '' : this.withdrawHints[selectedItem.id];
			// this.dynamicHint = (selectedItem.id === 'card' && parseFloat(this.sum) > 20000) ? '' : this.withdrawHints[selectedItem.id] //@todo  вернуть если нужно будет для привязки обычных

			else if (this.selectedItem.id === 'contact') {
				// для опции "Контакт" по-умолчанию accountId = 0
				this.accountId = 0;
			} else {
				this.dynamicHint = this.withdrawHints[this.selectedItem.id];
			}
      },
      submit () {

        // отправка данных о новом аккаунте
        let payload = {
          type: this.selectedItem.type,
          main: 1,
          ...this.accountData
        }
        let result = this.$store.dispatch('createAccount', payload)
        result.then((response) => {
          // по id только что добавленного аккаунта вычисляет аккаунт из массива в сторе
          let newCardId = response.id
          this.accountId = response.id
          let account = this.accounts.filter(item => item.id === newCardId)[0]
          //* подставляет этот аккаунт активной опцией в мультиселект
          this.selectedItem = account
          // обновляем выбранный способ получения денег
          console.log('new accounts', this.$accounts);
          this.selectedPayMethod = this.$accounts.find((account) => account.main === 1);
          console.log('new selected pay method', this.selectedPayMethod);
          // обнуляет динамический компонент и текст, чтобы ничего не показывать
          this.dynamicComponent = null
          this.dynamicHint = null
          // запись о том, что только что создали аккаунт (используется для кнопки "Продолжить")
          this.accountCreated = true
        }).catch((err) => {

          this.$error(err, ErrorBuildingCardMap, 'Произошла ошибка при привязке кошелька.')

          //   console.warn('add card error', err);
          // if(err?.errors[0]?.code === 'description-add-validation-error') {
          //   this.$toastr.error('Карта с указанным номером уже привязана', 'Ошибка')
          // } else {
          //   this.$toastr.error('Произошла ошибки при привязке карты', 'Ошибка')
          // }
          // console.log(err.errors)
          // console.log(err, 'err result')
          // // при ошибке валидации в мультиселекте останется выбранная опция
        })
      },
      async createLoan () {
        if (this.creating) {
          return false; //WB-4284
        }


        this.creating = true;

        const state = await Promise.all([
          this.$refs.snils.$validator.validateAll(),
          this.$refs.controlQuestion.$validator.validateAll()
        ])
        if (!this.$helpers.every(state)) {
          this.$toastr.error('Не заполнены обязательные поля', 'Ошибка')
          this.$helpers.focus()
          return
        }
        this.BUTTON_LOADING(true);
        let error = false
        await this.$backend.api.user.additional.fill( {
          snilsOrInn: this.$user.snilsOrInn.replace(/[^\d]/g, ''),
          controlQuestion: this.$user.controlQuestion,
          controlQuestionType: this.$user.controlQuestionType,
          controlAnswer: this.$user.controlAnswer
        }).catch((e) => {
          let errors = []
          e.errors.forEach((error) => {
            switch (error.code) {
              case 'controlAnswerTooLong': errors.push('Контрольный ответ слишком длинный'); break
              case 'controlAnswerTooShort': errors.push('Контрольный ответ слишком короткий'); break
              case 'controlQuestionTooShort': errors.push('Контрольный вопрос слишком короткий'); break
              case 'controlQuestionTooLong': errors.push('Контрольный вопрос слишком длинный'); break
              case 'snilsInvalidFormat': errors.push('Некорректный СНИЛС'); break
              case 'snilsCodeIncorrect': errors.push('Некорректный СНИЛС'); break
              case 'snilsOrInnCodeIncorrect': errors.push('Неверно введен СНИЛС или ИНН'); break
              case 'alreadyHaveControlQuestion': errors.push('Вы уже зарегистрированны. Перейдите в личный кабинет.');break;
            }
          })
          error = true
          this.$toastr.error('При регистрации произошли ошибки: <br> - ' + errors.join('-<br>'), 'Ошибка')
        }).finally(() => {
          this.$store.commit('BUTTON_LOADING', false)
          this.creating = false;
        })
        if (error) {
          return false
        }
        // console.log('this.selectedPayMethod', this.selectedPayMethod)
        document.location.hash = 'sucсess';
          this.AJAX_LOADING(true);
          const additionalServices = await this.getSelectedAdditionalServices();
          console.log('additionalServices', additionalServices);
        const gtagPrice = this.$refs.calc.returnAmount;

        const loanObj = {
          sum: this.loan.sum,
          days: this.loan.days,
          services: {
            insurance: 0,
            legal: 0
          },
          'promoCode': this.$user.promo.code, /* промокод взять из стора */
          'paySystem': this.selectedItem.type,
          'accountId': this.selectedPayMethod.id, // this.accountId,
          'screenX': window.screen.width,
          'screenY': window.screen.height,
          'browserInfo': navigator.userAgent,
          'deviceInfo': '',
          'latitude': this.$store.getters.getUserLocation.latitude || null,
          'longitude': this.$store.getters.getUserLocation.longitude || null,
          'platform': 1,
            additionalServices
        }
        this.$user.smsSend.phone = 0;
        this.$user.smsSend.total = 0;
        this.$store.commit('BUTTON_LOADING', true)
        this.$store.commit('AJAX_LOADING', true)
        this.$store.dispatch('LOAN_CREATE', loanObj)
          .then(() => {
            if (window.yaCounter17582872) window.yaCounter17582872.reachGoal('FIR_LOAN');

          gtag('event', 'Оформление займа', {
            event_category: 'PDL',
            event_label: 'PDL Новый :: Заявка оформлена',
            value: loanObj.sum,
            'user_metric1': this.$user.numberOfChildren,
            'user_metric2': this.$user.workSalary,
            'user_metric3': loanObj.sum,
            'user_metric4': loanObj.days,
            'user_metric5': this.loan.percent,
            'user_metric6': loanObj.sumPercent,
          });

          gtag('event', 'purchase', {
            id: 'WB005',
            name: `PDL A${loanObj.sum} D${loanObj.days} C${this.$calculate.percent}`,
            brand: 'Webbankir',
            category: 'PDL',
            price: gtagPrice
          })

            const promises = [];
            promises.push(this.$methods.user.getUserData());
            promises.push(this.$methods.loan.getLoans());

            return Promise.all(promises).then(() => {
              this.$router.push({name: 'my-loan'});
              try {
                this.$backend.log({
                  loan: {...loanObj},
                  newuser: true,
                  reg_step: 4,
                  user_hash: this.$user.hash,
                  user_id: this.$user.id,
                  user_login: this.$user.login,
                  user_phone: this.$user.mobilePhone.replace(/[^\d]/g, ''),
                  user_name: `${this.$user.lastName} ${this.$user.firstName} ${this.$user.middleName}`
                });
              } catch (e) {}
              this.$user.regStep = 1;
              return Promise.resolve()
            }).finally(() => {
              this.AJAX_LOADING(false);
            })
          })
          .finally(() => {
            this.$store.commit('BUTTON_LOADING', false)
          })
      }
    },
    updated () {
      // this.dynamicHint = (this.selectedItem.id === 'card') ? '' : this.withdrawHints[this.selectedItem.id]
      if (([2, 3].includes(this.$config.newCard)) && (this.selectedItem.id === 'card')) {
        this.dynamicHint = '';
      } else if ((this.$config.newCard === 1) && (parseFloat(this.loan.sum) > 20000) && (this.selectedItem.id === 'card')) {
        this.dynamicHint = '';
      } else {
        this.dynamicHint = this.withdrawHints[this.selectedItem.id]
      }
    }
  }
</script>

<style scoped lang="scss">
  .autologin__hello {
    font-size:14px;
    margin-top:15px;
  }
  .display-none {
    display: none;
  }
</style>
