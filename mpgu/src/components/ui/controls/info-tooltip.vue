<template lang="pug">
    .icon
        i.far.fa-question-circle
        .dropdown {{ message }}
</template>

<script>
    export default {
        name: 'info-tooltip',
        props: {
            message: {
                type: String,
                default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, mollitia?',
            },
        },
    };
</script>

<style lang="stylus" scoped>
.icon
    position relative
    display flex
    justify-content center
    align-items center

    i
        color var(--portal-linkblue)

    &:hover
        .dropdown
            display block

.dropdown
    z-index 100
    display none
    background #fff
    border-radius 3px
    border 1px solid rgb(231, 232, 236)
    width 200px
    padding 10px
    position absolute
    top 20px

    &::before
        content ''
        position absolute
        left calc(50% - 10px/2)
        top -6.5px
        transform rotate(45deg)
        border-left 1px solid rgb(231, 232, 236)
        border-top 1px solid rgb(231, 232, 236)
        background #fff
        width 10px
        height 10px
        z-index 100
</style>
