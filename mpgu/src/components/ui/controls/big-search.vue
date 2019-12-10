<template lang="pug">
    .fulltext-search.fas
        input(:placeholder="placeholder" v-model="searchFilter.value" v-on="listeners")
</template>

<script>
    export default {
        name: 'big-search',
        props: {
            searchFilter: {
                type: Object,
                required: true,
            },
            placeholder: {
                type: String,
                default: 'Поиск',
            },
        },
        computed: {
            listeners() {
                return { ...this.$listeners };
            },
        },
    };
</script>

<style scoped lang="stylus">
.fulltext-search
    box-sizing border-box
    position relative
    width 100%
    &::before
        position absolute
        right 10px
        line-height 26px
        font-size 13px
        content '\F002'
        color #abb1ba
        font-family "Font Awesome 5 Free", sans-serif
    & > input
        box-sizing border-box
        border 1px solid #d3d9de
        border-radius 4px
        width 100%
        height 28px
        background-color white
        color black
        padding-left 11px
        padding-right 25px
        outline none
        transition border-color 0.2s

.fulltext-search > input:focus,
.fulltext-search > input:hover
    border-color #0087be
    color black

</style>
