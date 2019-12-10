<template lang="pug">
.background-wrapper
    .wrapper(v-click-outside="closePopup")
        .title Доступ к скачиванию материалов
        .text {{ infoMessage }}

        Button(@click="getCode" :disabled="isGetCodeButtonDisabled" type="primary") Получить код

        .get-code-again
            .get-code-text(v-if="codeTimer && codeSent") Отправить код повторно через {{ codeTimer }} сек.
            .get-code-text(v-else-if="codeSent") Вы можете отправить код повторно

        .submit-code-area

            Input(
            placeholder="Введите полученный код"
            @keyup.enter="checkCode"
            v-model="code"
            :class="{ 'ivu-form-item-error': codeErrorMessage }"
            style="margin-right: 10px"
            )

            Button(@click="checkCode" type="primary") Проверить код

        .code-error-area(v-if="codeErrorMessage") {{ codeErrorMessage }}

        .close-popup-button(@click="closePopup")
            i.fas.fa-times
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            code: '',
            codeSent: false,
            codeTimer: 0,
            infoMessage: 'Для скачивания материалов необходимо запросить код и ввести его в поле ввода',
            codeErrorMessage: '',
            isGetCodeButtonDisabled: false,

            codeErrorMessages: {
                INVALID_CODE: 'Код неверный. Проверьте прописные буквы или раскладку клавиатуры',
                NOT_FOUND: 'Не найден активный запрос на авторизацию. Запросите код повторно',
                EXCEEDED_CODE: 'Превышено количество попыток ввода кода',
            },

            checkCodeStatuses: {
                INVALID_CODE: this.checkCodeErrorHandler,
                NOT_FOUND: this.checkCodeErrorHandler,
                EXCEEDED_CODE: this.checkCodeErrorHandler,
                SUCCESS: () => {
                    this.downloadFile();
                    this.closePopup();
                },
            },
        };
    },
    computed: {
        fileId() {
            return this.$store.getters.getTwoFaFileId;
        },
    },
    methods: {
        checkCodeErrorHandler(data) {
            this.codeErrorMessage = this.codeErrorMessages[data.status];
        },
        closePopup() {
            this.$store.commit('setTwoFaFileId', '');
        },
        disableGetCodeButton(seconds) {
            this.isGetCodeButtonDisabled = true;
            this.codeTimer = seconds;

            const int = setInterval(() => {
                --this.codeTimer;

                if (this.codeTimer === 0) {
                    clearInterval(int);
                    this.isGetCodeButtonDisabled = false;
                }
            }, 1000);
        },
        checkCode() {
            axios(`/elib/2faProxy.action?action=ACCEPT&entityType=file&entityId=${this.fileId}&code=${this.code}`)
                .then(({ data }) => (this.checkCodeStatuses[data.status] || this.downloadFile)(data));
        },
        getHiddenEmail() {
            const { email } = this.$store.state.userData;
            const hiddenEmailArray = [email[0], '***', email.match(/.@.*/)[0]];

            return hiddenEmailArray.join('');
        },
        getCode() {
            this.disableGetCodeButton(30);

            axios(`/elib/2faProxy.action?action=REQUEST&entityType=file&entityId=${this.fileId}&notifyType=email`)
                .then(({ data }) => {
                    if (data.status !== 'READY') {
                        console.error(data);

                        return this.closePopup();
                    }

                    this.codeSent = true;
                    this.infoMessage = `На вашу электронную почту ${this.getHiddenEmail()} отправлен код безопасности. Для доступа к данным введите полученный код. Материалы для скачивания будут доступны в течение 15 мин`;
                });
        },
        downloadFile() {
            window.open(`/elib/getFile.action?contentType=application/octet-stream&cardId=${this.fileId}`);
        },
    },
};
</script>

<style lang="stylus" scoped>
.background-wrapper
    top 0
    bottom 0
    right 0
    left 0
    position fixed
    background rgba(0, 0, 0, 0.2)
    z-index 2001
    display flex
    align-items center
    justify-content center

.wrapper
    border 1px solid #cdd6df
    border-radius 3px
    box-shadow var(--classic-shadow)
    width 600px
    height 355px
    display flex
    flex-direction column
    align-items center
    background #fff
    position relative
    padding 15px

.title
    font-weight bold
    font-size 28px
    margin 0.83em 0

.text
    margin 1em 0
    font-size 16px
    height 60px
    text-align center

.submit-code-area
    display flex
    justify-content center

    input
        margin-right 15px
        width 205px
        heigth 30px
        border 1px solid rgba(211, 217, 222, 1)
        border-radius 2px
        font-size 15px
        outline none
        padding-left 15px

        &::placeholder
            color var(--portal-grey)

.close-popup-button
    position absolute
    font-size 25px
    top 8px
    right 17px
    cursor pointer

.code-error-area
    color #d94f4f
    margin-top 5px
    font-size 12px

.get-code-again
    height 50px
    margin-top 10px
    margin-bottom 20px
    display flex
    align-items center
    flex-direction column
    justify-content flex-start

.get-code-text
    font-size 12px
    text-align center
    color var(--portal-grey)

input.failed
    border-color #d94f4f
    color #d94f4f

    &::placeholder
        color #d94f4f
</style>
