<template>
    <div>
        <modal name="new-card"
               class="arcticmodal-container full-viewport"
               width="500"
               height="auto"
               adaptive
               @before-open="beforeOpen"
               @before-close="beforeClose"
               :click-to-close="false"
        >
            <div class="container m-header" v-show="is_load">
                <div @click="close()" class="box-modal_close arcticmodal-close"></div>
                <div class="row">
                    <div class="column">
                        <h3>Привязать новую карту</h3>
                    </div>
                </div>
            </div>
            <div class="container feedback-block" v-show="is_load">
                <ui-loader v-if="loading" element>Добавляем карту</ui-loader>
                <ui-alert class="mb-2" type="warning" v-if="displayTryLimitMessage">
                    <div slot="ui-alert-title">Не удалось добавить карту</div>
                    <div slot="ui-alert-body">
                        Не удалось добавить карту, т.к вы превысили кол-чо попыток ввода проверочной суммы.
                    </div>
                </ui-alert>
                <card-building v-if="displayCardForm"
                               :type="loanType"
                               ref="card"
                               @resultSuccess="resultSuccess"
                               @resultTDS="resultTDS"
                               @resultError="is_load = true"
                               @validate="isValidCardData = $event"
                               @loading="loading = $event"
                               @enter="$refs.card.getAnswer(Number(consent))"
                >
                    <div slot="footer">
                        <ui-button
                            :id="'new-card-bind-card-1'"
                            @click="addCard"
                            class="mb-2"
                            block center
                            :disabled="!isValidCardData || !consent"
                            color="red"
                        >
                            Привязать карту
                        </ui-button>

                        <Checkbox id="checkbox-sample" v-model="consent" v-if="loanType === 1">
                            <div slot="label-slot">
                                Привязать карту и сделать ее основной.
                            </div>
                        </Checkbox>
                        <Checkbox id="checkbox-token-card" v-model="consent" v-if="loanType === 8">
                            <div slot="label-slot">
                                Согласен с привязкой карты <a class="link" target="_blank"
                                                              href="https://static.webbankir.com/public/docs/regulations.pdf?_ga=2.181938727.1026974616.1550061337-200762529.1535630714">и
                                условиями списания</a>.
                            </div>
                        </Checkbox>
                    </div>
                </card-building>

                <Without3DS v-if="displayControlSumForm"
                            @cancel_building="form_card = true"
                            class="new-building-card-form"
                            :id="id"
                            :numberCard="numberCard"
                            @resultSuccess="resultSuccess"
                            @resultError="resultError"
                />

            </div>
            <error-block :errors="errorsForErrorBlock" @clear="errorsForErrorBlock = []"></error-block>
        </modal>

        <modal name="tds-frame-modal"
               class="arcticmodal-container full-viewport"
               width="600"
               height="auto"
               :show="true"
               :adaptive=true
               :clickToClose="false"
               @before-open="$helpers.noscroll(true)"
               @before-close="$helpers.noscroll(false)"
        >
            <div class="popup">
                <div class="popup__wrapper">
                    <div class="popup__header popup__header-with-back">
                        <div class="popup__back" @click="clearFormData">
                            <SVGIcon xlink="next-arrow-20" viewBox="0 0 20 20" :rotate="180"/>
                        </div>
                        <h3 class="popup__header-title">Подтверждение привязки карты</h3>
                    </div>
                    <div class="popup__content my-accounts-modal1">
                        <div class="row" style="position: relative">
                            <Form3DS v-if="Object.keys(formData).length"
                                     :formData="formData"
                                     @clearFormData="clearFormData"
                                     @resultSuccess="resultSuccess"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </modal>

    </div>
</template>
<script>
    import {ACCOUNTS_ADD_ACCOUNT} from '@/store/mutation-types';
    import CardBuilding from '@/components/CardBuilding';
    import Checkbox from '@/components/Checkbox';
    import Form3DS from '@/components/CardBuilding/TDS/Form3DS';
    import Without3DS from '@/components/CardBuilding/TDS/Without3DS';
    import ErrorHandleMixin from '@/mixins/ErrorHandleMixin';
    import SVGIcon from '@/components/SVGIcon';

    export default {
        name: 'new-card',
        data() {
            return {
                errorsForErrorBlock: [],
                form_card: true,
                consent: false,
                id: '',
                numberCard: '',
                formData: {},
                tokenCard: true,
                is_load: true,
                displayCardForm: true,
                displayControlSumForm: false,
                displayTryLimitMessage: false,
                isValidCardData: false,
                loading: false,
            };
        },
        mixins: [
            ErrorHandleMixin,
        ],
        components: {
            CardBuilding,
            Form3DS,
            Without3DS,
            Checkbox,
            SVGIcon,
        },
        computed: {
            loanType() {
                return this.$config.newCard === 3 ? 8 : 1; // условие для привязки и обычных карт и токенизированных
                // return this.$pdl?.type || this.$loanType; // @todo условие для привязки и обычных карт и токенизированных
            },
        },
        watch: {
            'formData'(data) {
                console.log('Object.keys(data).length', Object.keys(data).length);
                if (Object.keys(data).length) {
                    this.$modal.hide('new-card');
                    this.$modal.show('tds-frame-modal');
                } else {
                    this.$modal.hide('tds-frame-modal');
                    this.$modal.show('new-card');
                }
            },
        },
        methods: {
            addCard() {
                this.$refs.card.getAnswer(Number(this.consent));
                this.displayTryLimitMessage = false;
            },
            async resultSuccess({data}) {
                /** обновляем список всех аккаунтов **/
                this.$store.commit(ACCOUNTS_ADD_ACCOUNT, data);
                await this.$store.dispatch('LOAN_GET_ACCOUNTS');
                this.$emit('add-card', data);
                this.$modal.hide('new-card');
                this.$modal.hide('tds-frame-modal');
                this.form_card = true;
                this.is_load = true;
                this.$nextTick(() => this.$helpers.scroll(this.$root.$el));
            },
            resultError(e) {
                const errorCode = this.$getErrorCode(e);
                if (errorCode !== 'SumNotMatch') {
                    console.log(
                        'Ошибка на проверке контрольной сумме. Это не является ошибкой того, что контрольная сумма не верна.',
                        e);
                    this.displayCardForm = true;
                    this.displayControlSumForm = false;
                }
                if (errorCode === 'exceedCountAttempt') {
                    this.displayTryLimitMessage = true;
                }

            },
            resultTDS(tds) {
                console.log('what get?', tds);
                if (tds?.data) { // если карта имеет TDS
                    this.formData = tds.data;
                } else if (tds?.id) { // в случае, если у карты нету TDS
                    this.id = tds.id;
                    this.is_load = true;
                    this.numberCard = tds.numberCard;
                    this.form_card = false;

                    this.displayControlSumForm = true;
                    this.displayCardForm = false;
                } else { // в случае, если что то пошло не так или что то не пришло, обнуляем до исходного состояния
                    this.form_card = true;
                }
                // После того как проверили все условия, v-show у элементов обнуляем (указываем true)
                this.is_load = true;
                this.loading = false;
            },
            beforeOpen() {
                this.$helpers.noscroll(true);
            },
            beforeClose() {
                this.$helpers.noscroll(false);
            },
            close() {
                this.$modal.hide('new-card');
            },
            clearFormData() {
                this.formData = {};
                setTimeout(() => this.AJAX_LOADING(false), 1000);
            },
        },
    };
</script>
<style scoped>
    .invalid-card {
        background-color: #fff0ed;
    }

    .card-period {
        display: block;
        margin-bottom: 20px;
        color: #898989;
        font-size: 15px;
        font-weight: 400;
    }

    h3 {
        margin-bottom: 0px !important;
    }

    .buttons {
        text-align: center
    }

    @media (max-width: 499px) {
        .new-building-card-form {
            margin: 100px 0 -30px;
        }
    }
</style>
