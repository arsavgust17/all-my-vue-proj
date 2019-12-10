<template lang="pug">
.showcase-body
    .table-header(v-if="columns.length && !isLoading")
        BigSearch.search(v-if="enabledBigSearch" :key="$route.fullPath" :search-filter="searchFilter.data" @keyup.enter="onBigSearchEnterPress")
        .column-titles
            .column-title-container.as-non-selectable(v-for="column in columns" :key="column.title" :class="column.classNames")
                .column-title(:class="{'as-pointer': column.isSortable}")
                    | {{column.title}}
                .sorting-arrows.as-pointer(v-show="column.isSortable")
                    .arrow.asc.enabled
                        svg(viewBox="0 0 512 512")
                            path(d="M413.1 327.3l-1.8-2.1-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6-7.7 0-14.6 3.4-19.2 8.6L101 324.9l-2.3 2.6C97 330 96 333 96 336.2c0 8.7 7.4 15.8 16.6 15.8h286.8c9.2 0 16.6-7.1 16.6-15.8 0-3.3-1.1-6.4-2.9-8.9z")
                    .arrow.desc
                        svg(viewBox="0 0 512 512")
                            path(d="M98.9 184.7l1.8 2.1 136 156.5c4.6 5.3 11.5 8.6 19.2 8.6 7.7 0 14.6-3.4 19.2-8.6L411 187.1l2.3-2.6c1.7-2.5 2.7-5.5 2.7-8.7 0-8.7-7.4-15.8-16.6-15.8H112.6c-9.2 0-16.6 7.1-16.6 15.8 0 3.3 1.1 6.4 2.9 8.9z")
    .table-container
        Loader.row.as-centered-content.when-data-loading(v-if="isLoading")
        .row.as-centered-content.when-no-data(v-else-if="!isLoading && !body.length") Данные не найдены
        Row(v-else v-for="row in body" :key="row.DOC_KEY || Math.random()" :data="row" :columns="columns" :can-be-with-expander="!disabledExpander")
</template>

<script>
import Row from '@/components/ui/showcases/table-row.vue';
import BigSearch from '@/components/ui/controls/big-search.vue';
import Loader from '@/components/ui/core/loader.vue';

export default {
    name: 'showcaseTable',
    components: {
        Loader,
        BigSearch,
        Row,
    },
    props: {
        columns: {
            type: Array,
            required: true,
        },
        body: {
            type: Array,
            required: true,
        },
        searchFilter: {
            type: Object,
        },
        isLoading: {
            type: Boolean,
            required: true,
        },
        disabledExpander: {
            type: Boolean,
            default: false,
        },
        enabledBigSearch: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onBigSearchEnterPress() {
            this.$emit('reload-data');
        },
    },
};
</script>

<style lang="stylus">
.as-5-percent
    width 5%

.as-10-percent
    width 10%

.as-15-percent
    width 15%

.as-20-percent
    width 20%

.as-25-percent
    width 25%

.as-30-percent
    width 30%

.as-35-percent
    width 35%

.as-40-percent
    width 40%

.as-45-percent
    width 45%

.as-50-percent
    width 50%

.as-55-percent
    width 55%

.as-60-percent
    width 60%

.as-65-percent
    width 65%

.as-70-percent
    width 70%

.as-75-percent
    width 75%

.as-80-percent
    width 80%

.as-85-percent
    width 85%

.as-90-percent
    width 90%

.as-95-percent
    width 95%

.as-100-percent
    width 100%

.as-rest-of-space
    flex-grow 1
    flex-shrink 1

.as-no-wrap
    white-space nowrap !important


</style>

<style lang="stylus" scoped>
.showcase-body
    position relative

.table-header
    border-top-left-radius 4px
    border-top-right-radius 4px
    background-color #fafbfc
    box-sizing border-box
    border 1px solid #e7e8ec
    position sticky
    z-index 4
    top 124px
    padding 10px 40px
    font-weight 600
    font-size 11px
    justify-content center
    display flex
    flex-direction column

@media print
    .table-header
        position initial
        padding 10px
        min-height initial

.search
    margin-bottom 10px

.column-titles
    display flex
    box-sizing border-box
    width 100%

.sorting-arrows
    flex-direction column
    width min-content
    margin-left 5px
    display flex
    cursor pointer

.arrow
    width 10px
    height 10px
    display flex

    & > svg
        fill #bbbcbd

    &.desc
        margin-top -4px

.table-container
    flex-direction column
    font-size 12px
    display flex

.when-no-data,
.when-data-loading
    height 500px
    align-items center
    justify-content center
    display flex
    background-color white
    border-radius 4px
    border 1px solid var(--light-border-color)
    margin-top 1px

.when-no-data
    font-size 20px !important


</style>
