<template lang="pug">
#app(@click.ctrl.meta.shift.alt="changeDomain")
    MainHeader
    main.router-view
        .wrapper
            router-view
    MainFooter
    AuthPopup(v-if="popupVisible")
</template>

<script>
import MainHeader from "./components/ui/main-header.vue";
import MainFooter from "./components/ui/main-footer.vue";
import AuthPopup from "./components/ui/core/auth-popup.vue";

export default {
    components: {
        MainFooter,
        MainHeader,
        AuthPopup
    },
    computed: {
        popupVisible() {
            return this.$store.getters.getPopupVisibility;
        },
    },
    methods: {
        changeDomain() {
            const {
                hostname,
                pathname,
                search,
                hash,
            } = window.location;

            const origin = hostname === 'localhost' ? 'https://ugd-tech.mos.ru' : 'http://localhost';

            window.open(origin + pathname + search + hash);
        },
    },

};
</script>

<style lang="stylus">
@import './assets/global-styles.styl'
@import url('https://fonts.googleapis.com/css?family=Montserrat');

*
    margin 0
    padding 0
    box-sizing border-box

body
    font-family 'Montserrat', sans-serif

.router-view
    background-image url('/main-background.svg')
    min-height calc(100vh - 300px)
    padding 25px 0
    display flex
    flex-direction column
    align-items center

.wrapper
    flex-grow 0
    width 960px
    background var(--portal-white)
    border 1px solid var(--border-grey)
    border-radius 2px
</style>
