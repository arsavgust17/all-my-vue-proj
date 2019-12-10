<template lang="pug">
#app(@click.ctrl.meta.shift.alt="changeDomain")
    router-view
    TwoFaPopup(v-if="isTwoFaPopupVisible")
</template>

<script>
import TwoFaPopup from '@/components/ui/core/two-fa-popup.vue';

export default {
    components: {
        TwoFaPopup,
    },
    computed: {
        isTwoFaPopupVisible() {
            return this.$store.getters.getTwoFaFileId;
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
@import './assets/font-awesome/css/all.min.css'

@font-face
    font-family 'PTSans'
    src url('assets/fonts/PTSansRegular.woff') format("woff")
    font-style normal
    font-weight normal

@keyframes infinite-rotating
    0%
        transform rotate(0deg)

    100%
        transform rotate(360deg)

:root
    --portal-grey #7d8fa4
    --disabled-grey #b5bec5
    --disabled-light-grey #d1d8de
    --portal-linkblue #0144DD
    --portal-link-hover #E74C3C
    --portal-button-blue #2174ba
    --portal-button-hover-blue #2f91fb
    --portal-elements-blue #07c
    --portal-text-black #333
    --portal-alt-bg #f2f6fa
    --form-bg-grey #eef2f4

    --classic-shadow 0 10px 15px rgba(0, 51, 102, 0.247058823529412)

html body
    font-family 'PTSans', sans-serif
    margin 0
    color var(--portal-text-black)
    font-size 14px
    line-height 1.3

.hidden-data
    display none

input, textarea
    border-radius 3px
    border 1px solid #d3d9de

input[type='number']
    -moz-appearance textfield

input[type='number']::-webkit-outer-spin-button
input[type='number']::-webkit-inner-spin-button
    -webkit-appearance none
    margin 0
</style>
