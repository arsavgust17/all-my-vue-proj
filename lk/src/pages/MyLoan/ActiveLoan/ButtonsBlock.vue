<template>
    <div style="height:96px;">
        <div class="row button-block-mobile" v-if="$pdl.status >=6" :class="{fixed: fixed}">
            <div class="flex-row flex-inline justify-content" :class="$interface.viewport === 'mobile' ? '' : ''">
                <!-- показываем Кнопку список заявлений -->
                <span  v-if="$pdl.status === 6" class="link blue" @click="$modal.show('statements-list', {creditId: $pdl.id})"></span>
                <span v-else></span>

                <div v-if="!$pdl.isAmnesty" style="display: flex;justify-content: space-between;" :class="{'mobile-buttons': $interface.isMobile}">
                    <button
                        class="button blue"
                        v-if="$pdl.canBePayed"
                        @click="ActiveLoan.payPDL"
                        name="active-loan-pay-1"
                        data-active-loan-pay-1-button
                    >
                       Оплатить
                    </button>

                    <!-- Активная кнопка пролонгации -->
                    <button
                        v-if="displayProlongationBlock"
                        @click="prolongationHandler"
                        class="button red"
                        :class="{button_loading: $interface.buttonLoading,  icon: true}"
                        :title="notSignedProlongation"
                        name="active-loan-prolong-1"
                        data-active-loan-prolong-1-button
                    >
                        Продлить
                        <SVGIcon xlink="next-arrow-20" fill="#ffffff"></SVGIcon>
                    </button>


                    <!-- Если нам доступна рассрочка, то показываем кнопку -->
                    <button
                        v-if="$pdl.supplementary.installment"
                        class="button red"
                        @click="installmentButton"
                        name="active-loan-installment-1"
                        data-active-loan-installment-1-button
                    >
                        Рассрочка
                    </button>
                </div>

            </div>
        </div>
        <transition name="fade">
            <div v-if="displayProlongationStatusBlock" ref="prolongationStatusBlock" class="buttons-block">

                <div v-if="$prolongation.state === 5" class="message message-info">
                    <div class="message-close" @click="displayProlongationStatusBlock = false;">
                        <SVGIcon xlink="close-45" :fill="$theme.colors.blue" viewBox="0 0 45 45"></SVGIcon>
                    </div>
                    <div class="message-text">
                        На данный момент для Вас пролонгация недоступна. Вы сможете оформить продление займа с <strong>{{prolongationDate}}</strong>.
                    </div>
                </div>

                <div v-if="[3,4].includes($prolongation.state) && !$pdl['3od']" class="message message-warn">

                    <div class="message-icon" v-if="$interface.isMobile === false">
                        <SVGIcon xlink="warning-icon" viewBox="0 0 30 30" :fill="$theme.colors.yellow"></SVGIcon>
                    </div>

                    <div class="message-text">
                        Создание нового договора о продлении займа недоступно.
                        <template v-if="$prolongation.state === 4">
                            Вы сможете оформить продление займа с
                            <strong>{{$prolongation.timeOutEnd}}</strong>
                        </template>
                    </div>

                    <div class="message-close" @click="displayProlongationStatusBlock = false">
                        <SVGIcon xlink="close-45" :fill="$theme.colors.yellow" viewBox="0 0 45 45"></SVGIcon>
                    </div>


                </div>

                <div v-if="$pdl['3od']" class="message message-warn">

                    <div class="message-icon" v-if="$interface.isMobile === false">
                        <SVGIcon xlink="warning-icon" viewBox="0 0 30 30" :fill="$theme.colors.yellow"></SVGIcon>
                    </div>

                    <div class="message-text">
                        Во исполнение требований ЦБ РФ пролонгация Вам недоступна.
                    </div>

                    <div class="message-close" @click="displayProlongationStatusBlock = false">
                        <SVGIcon xlink="close-45" :fill="$theme.colors.yellow" viewBox="0 0 45 45"></SVGIcon>
                    </div>


                </div>

            </div>
        </transition>
    </div>
</template>

<script>
    import SVGIcon from '@/components/SVGIcon/index';

    export default {
        name: 'ButtonsBlock',
        inject: ['ActiveLoan'],
		components: {
			SVGIcon,

		},
        props: {
            fixed: {
                required: false,
                default: false,
            }
        },
        data() {
            return {
                eventProlongation: 'prolongation',
                notSignedProlongation: '',
                needRepay: false,
                showInstallment: true,
                displayProlongationStatusBlock: false,
            }
        },

        computed: {
            displayProlongationBlock () {
                const whiteKeys = ['prolongation', 'loanNewDateEnd', 'finProtection'];
                return Object.keys(this.$pdl.supplementary || {}).every((key) => {
                    return whiteKeys.includes(key) || !this.$pdl.supplementary[key];
                }) || this.$pdl.supplementary?.finProtection?.status === 'active';
            },
            prolongationState () {
                if (this.$pdl.supplementary.prolongation && [1,2].includes(this.$pdl.supplementary.prolongation.status)) {
                    return this.$pdl.supplementary.prolongation.status;
                } else {
                    return this.$prolongation.state;
                }
            },
            prolongationDate() {
                if (this.$prolongation.timeOutEnd) {
                    const [d, m, y] = this.$prolongation.timeOutEnd.split(' ')[0].split('.');
                    return this.$dayjs(new Date(y, m-1, d, 0, 0, 0, 0)).format('DD.MM.YYYY')
                } else {
                    const [d, m, y] = this.$pdl.dateFrom.split(' ')[0].split('.');
                    return this.$dayjs(new Date(y, m-1, d)).format('DD.MM.YYYY')
                }

            },
            loadData() {
                switch (this.prolongationState) {
                    case 0:
                        // this.showButton = false
                        break
                    case 1:
                        this.notSignedProlongation = 'Для продления займа необходимо подписать дополнительное соглашение '
                        break
                    case 2:
                        // this.showButton = false
                        this.eventProlongation = 'repay'
                        this.needRepay = true
                        break
                    default:
                        this.notSignedProlongation = ''
                        this.eventProlongation = 'prolongation'
                        // this.showButton = this.loan.canBeProlonged && this.loan.supplementary.installment === null
                        break
                }
            }
        },
        methods: {
            prolongationHandler () {
                switch(this.prolongationState) {
                    case 0:
                        this.$router.push({
                            name: 'PDLProlongation'
                        });
                    case 1:
                        this.$modal.show('sign-prolongation-modal');
                        break;
                    case 2:
                        this.ActiveLoan.payProlongationDeposit();
                        break;
                    default:
                        if(!this.$interface.isMobile) {
                            this.displayProlongationStatusBlock = true;
                        } else {
                            let message;
                            switch(this.$prolongation.state) {
                                case 5:
                                    message = `На данный момент для Вас пролонгация недоступна. Вы сможете оформить продление займа с <strong>${this.prolongationDate}</strong>.`
                                    this.$toastr.warning(message, 'Пролонгация недоступна');
                                    break;
                                case 3:
                                case 4:
                                    message = 'Создание нового договора о продлении займа недоступно.';
                                    if(this.$prolongation.state === 4) {
                                        message += `Вы сможете оформить продление займа с <strong>${this.$prolongation.timeOutEnd}</strong>`;
                                    }
                                    this.$toastr.warning(message, 'Пролонгация недоступна');
                                    break;
                                default:
                                    this.$toastr.warning('Во исполнение требований ЦБ РФ пролонгация Вам недоступна.', 'Пролонгация не доступна');
                                    break;
                            }
                        }
                        return;
                }
            },

            installmentButton() {
                switch (this.$pdl.supplementary.installment.status) {
                    case 1:
                        this.ActiveLoan.signInstallment();
                        break;
                    case 2:
                        this.ActiveLoan.payInstallmentDeposit();
                        break;
                    default:
                        this.ActiveLoan.openInstallment();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./../../../../static/css/utilits/main";

    .fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background:#fff;
        z-index: 1;
        box-shadow: 0 1px 1px 3px rgba(#b7c6d0, 0.15);
        transform: translate(0, 0);
        .mobile-buttons {
            align-items: center;
            padding: 10px 20px;
            & .button {
                margin-bottom: 0;
            }
        }

    }

    .button-no-bottom-margin {
        height: 80px;
        & button {
            margin-bottom: 0 !important;
        }
    }

    .flex-inline {
        @include size(100%);
        @include flex(inline-flex, row, nowrap);

        &.justify-content {
            justify-content: space-between;
        }
    }

    .checkbox label {
        padding-left: 0;
    }

    button.link {
        line-height: normal !important;
    }

    .button {
        margin: 0 30px 45px 0;

        &:only-child {
            margin: 0 0 45px;
        }

        &:last-child {
            margin: 0 0 45px;
        }
    }

    span.link {
        text-decoration: none;
        white-space: nowrap;
        float: right;
        line-height: 50px;
        margin-bottom: 40px !important;

        &:hover {
            text-decoration: underline;
        }
    }

    .warning-block.timer {
        background: #ffffff url(/lk/static/img/content/warning-timer.png) no-repeat 10px 50%;
        border-color: #ffd012;
        padding: 30px 30px 30px 60px !important;
    }

    @media all and (max-width: 1100px) {
        span.link {
            display: none !important;
        }
        .button-block-mobile {
          text-align: right !important;
        }
        .buttons-block {
            text-align: right;
        }
        .flex-row {
          display: block;
        }

        .mobile-buttons {
            & > button {
                width: calc(50% - 10px);
            }
        }
    }

    @media #{$mobile} {
        .buttons-block {
            text-align: center;
            @include flex(flex);
            justify-content: space-between;
        }

        .button-block-mobile {
            text-align: right !important;
        }
        .button {
            /*&.red {*/
            /*margin: 0;*/
            /*}*/

            &.blue {
                margin-right: 0;
            }
        }
    }
</style>
