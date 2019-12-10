<template lang="pug">
.showcase-filters(:class="{ collapsed: isHide }")
    .filters-expander(@click="isHide = !isHide")
        i.fas.fa-angle-left
    .block-wrapper
        .filters-collapser(@click="isHide = !isHide")
            .collapser-button Скрыть фильтры
            i.fas.fa-angle-right
        .filters
            .filter(v-for="filter in filters")
                .filter-title(v-if="filter.title") {{ filter.title }}
                .filter-content
                    HyperSelect(v-if="filter.type === 'hyperSelect'" :key="filter.id" v-model="filter.data" :identifier="filter.nick")
                    DatePicker(v-if="filter.type === 'datePicker'" :key="filter.id" v-model="filter.data.values" type="daterange" :options="datePickerOptions" placement="bottom-end" format="dd.MM.yyyy" :clearable="false" :split-panels="true")
                    Checkbox(v-if="filter.type === 'checkbox'" :key="filter.id" v-model="filter.data.value") {{ filter.text }}
                    Checkbox(v-if="filter.type === 'checkboxGroup'" v-for="checkbox in filter.checkboxes" :key="checkbox.id" v-model="checkbox.data.value") {{ checkbox.text }}
        .filters-actions
            Button(type="primary" :loading="isLoading" @click="apply") Применить
            Button(:loading="isLoading" @click="reset") Сбросить
</template>

<script>
import HyperSelect from '@/components/ui/controls/hyper-select.vue';

export default {
    name: 'showcase-filters',
    props: {
        filters: {
            type: Array,
            required: true,
        },
        isLoading: {
            type: Boolean,
        },
    },
    components: {
        HyperSelect,
    },
    data() {
        return {
            isHide: false,
            minDate: new Date(2010, 0, 1),
            datePickerOptions: {
                disabledDate: date => date < this.minDate,
            },
        };
    },
    methods: {
        apply() {
            this.$emit('apply-filters');
        },
        reset() {
            this.$emit('reset-filters');
        },
    },
};
</script>

<style lang="stylus">
.mx-input-icon.mx-clear-icon::before
    margin-top -4px

</style>

<style lang="stylus" scoped>
.showcase-filters
    flex-shrink 0
    margin-left 5px
    border 1px solid #e7e8ec
    border-radius 4px
    background-color white
    box-sizing border-box
    width 300px
    position sticky
    z-index 4
    top 124px

    &.collapsed
        width 30px
        background-color transparent
        border-color transparent
        overflow hidden

        & > .block-wrapper
            opacity 0
            width 0

        & > .filters-expander
            opacity 1
            transform translateX(0)

.block-wrapper
    box-sizing border-box
    width 270px
    margin 20px 15px 25px 15px
    display flex
    flex-direction column

.filters-collapser
    color var(--portal-grey)
    margin-bottom 10px
    align-self flex-end
    margin-right 30px
    display flex
    align-items center
    cursor pointer

    &:hover
        opacity 0.8

.collapser-button
    font-size 13px
    margin-right 10px
    white-space nowrap

.filters-expander
    color var(--portal-grey)
    display flex
    align-items center
    justify-content center
    cursor pointer
    height 30px
    width 30px
    background-color #e7ebef
    border-radius 50%
    opacity 0
    transform translateX(-30px)
    position absolute

    & > i
        display flex
        align-items center
        justify-content center

@media print
    .showcase-filters
        display none

.filter
    margin-bottom 15px

.filter-title
    font-size 12px
    font-weight 600
    margin-bottom 5px

.filters-actions
    display flex
    margin-top 30px
    justify-content center

    button:first-child
        margin-right 16px

.ivu-date-picker
    width 100%

.ivu-checkbox-wrapper
    display block
    margin-bottom 5px
</style>
