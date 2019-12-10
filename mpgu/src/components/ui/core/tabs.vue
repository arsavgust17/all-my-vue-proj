<template lang="pug">
    nav(:class="tabsClassNames")
        router-link(v-for="tab in tabs" :key="tab.name" :class="tabClassNames" :to="tab.to") {{ tab.title }}
</template>


<script>
    export default {
        name: 'tabs',
        props: {
            tabs: {
                type: Array,
                default: () => [],
            },
            tabsClassNames: {
                type: Array,
                default: () => (['tabs']),
            },
            tabClassNames: {
                type: Array,
                default: () => (['tab']),
            },
        },
    };
</script>


<style lang="stylus" scoped>
    .tabs
        display flex
    .consideration+.tabs
        margin-top 20px
    .tab
        padding 0 8px
        height 50px
        display flex
        align-items center
        font-size 13px
        color #235dc1
        cursor pointer
        user-select none
        transition 0.2s
        box-sizing border-box
        border-bottom 2px solid transparent
        text-decoration none
        &:hover
            color var(--portal-grey)
            border-color #cad3dc
    .tab.router-link-exact-active
        border-color #4365c9
        color black
        pointer-events none
</style>
