<template lang="pug">
footer
    .footer-wrapper
        .mark © Департамент градостроительной политики города Москвы
        .what-the-portal-is-this Информационно-аналитическая система управления градостроительной деятельностью
    .links
        a(href="/tabInfo.action?app=EXTSEARCH&tab=CARD$MAP_SITE") Карта сайта
</template>

<script>
export default {
    name: 'main-footer',
};
</script>


<style lang="stylus" scoped>
footer
    height 160px
    margin 40px 60px 0
    font-size 12px
    color #868990
    line-height 20px
    position relative

    .footer-wrapper
        border-top 1px solid #e6e6e6

        .mark
            margin 30px 0

        .what-the-portal-is-this
            width 220px
            text-align left

    .links
        position absolute
        right 0
        font-size 14px
        top 30px

        & > a
            color #85888f
            text-decoration: none

@media print
    footer
        display none
</style>
