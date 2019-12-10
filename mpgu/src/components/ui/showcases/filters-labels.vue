<template lang="pug">
.filters-wrappper
    .filters
        .filter(v-for="label in filtersLabels" :key="label.target.id" :title="label.info")
            .title {{label.title}}
            .reset-button(@click="label.target(label)")
                i.fas.fa-times
</template>

<script>
export default {
    name: 'filters-labels',
    props: {
        filters: {
            type: Array,
            required: true,
        },
    },
    computed: {
        filtersLabels() {
            return this.filters.reduce((accumulator, filter) => [...accumulator, ...filter.labels], []);
        },
    },
};
</script>

<style lang="stylus" scoped>
.filters
    display flex
    flex-wrap wrap
    min-height 36px

.filter
    box-sizing border-box
    background-color rgba(250, 251, 252, 1)
    border 1px solid #e7e8ec
    border-radius 5px
    font-size 11px
    transition 0.2s
    padding 3px 6px
    height 26px
    color #5C5D5E
    cursor pointer
    font-weight 600
    display flex
    align-items center
    margin 5px
    &:hover
        border-color var(--portal-elements-blue)
        color var(--portal-text-black)

.reset-button
    position relative
    margin-left 5px
    padding 2px
    display flex
    align-items center
    justify-content center
    & > i
        height 9px
        width 9px
        transition 0.1s
    &:hover
        & > i
            color #ff253a

@media print
    .reset-button
        display none

</style>
