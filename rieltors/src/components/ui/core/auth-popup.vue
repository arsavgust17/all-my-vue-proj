<template lang="pug">
.auth-popup
    .popup-content(v-click-outside="closePopup")
        .close-button(@click="closePopup")
            i.el-icon-close
        .title
            span.bold Log in
            =(" ")
            | to Scan Properties with your phone number!
        ElInput.input.first(placeholder="enter phone number" v-model="phoneNumber")
        .checkbox
            ElCheckbox(v-model="isTermsAccepted") I have read and accept the terms of use
        ElInput.input(placeholder="enter SMS code" v-model="smsCode")
        .dummy-block
        .button-access
            span Send SMS
</template>

<script>
export default {
    name: 'auth-popup',
    data() {
        return {
            phoneNumber: '',
            smsCode: '',
            isTermsAccepted: false,
            isLoading: false,
        };
    },
    methods: {
        logIn() {
            this.isLoading = true;
            this.$store.dispatch('authRequest', {
                number: this.phoneNumber,
                code: this.smsCode,
            })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push('/');
                });
        },
        closePopup() {
            this.$store.commit('closePopup');
        },
    },
}
</script>

<style lang="stylus" scoped>
.auth-popup
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0, 0, 0, 0.5)
    z-index 1000
    display flex
    align-items center
    justify-content center

.popup-content
    background #fff
    position relative
    width 500px
    height 360px
    border-radius 3px
    display flex
    flex-direction column
    align-items center

.dummy-block
    flex-grow 1

.button-access
    width 100%
    height 60px
    background var(--portal-green)
    display flex
    justify-content center
    align-items center
    font-size 14px
    font-weight 900
    color #fff
    cursor pointer

.title
    text-align center
    font-weight normal
    font-size 24px
    margin-top 64px
    width 433px

.input
    width 80%
    height 40px
    margin-bottom 15px

.first
    margin-top 30px

.close-button
    cursor pointer
    position absolute
    top 0
    right 5px
    font-size 36px
    height 36px

.bold
    font-weight bold
</style>
