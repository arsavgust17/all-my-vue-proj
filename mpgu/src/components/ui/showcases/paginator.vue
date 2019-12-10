<template lang="pug">
.paginator
    .info-container(v-if="declinations.length")
        div Всего
        .items-count {{itemsCount}}
        div {{declinations | rightDeclination(itemsCount)}}

    .pages(v-if="itemsCount > itemsPerPage")
        .page.arrow(v-if="currentPage !== 1" @click="setCurrentPage(currentPage - 1)")
            i.fa.fa-chevron-left

        .page(
        v-for="page in pages"
        :class="{ ellipsis: page === '•••', selected: page === +currentPage }"
        @click="setCurrentPage(page)"
        ) {{page}}

        .page.arrow(v-if="currentPage !== overallPages" @click="setCurrentPage(currentPage + 1)")
            i.fa.fa-chevron-right

    .goto-page(v-if="overallPages > 1")

        .goto-page-title Перейти на
        input.goto-page-input(
        type="number"
        min="1"
        :max="overallPages"
        @keyup.enter="setCurrentPage(+$event.target.value)"
        v-model="gotoPageValue"
        )

    common-select.items-on-page-select(
    :options="itemsPerPageOptions"
    :initial-index="currentOptionIndex"
    option-prefix="Показывать по "
    @input="setItemsPerPage"
    )
</template>

<script>
import CommonSelect from '@/components/ui/controls/common-select.vue';

export default {
    name: 'paginator',
    components: { CommonSelect },
    props: {
        declinations: {
            type: Array,
            default: () => [],
        },
        itemsCount: {
            type: Number,
            required: true,
        },
        itemsPerPage: {
            type: Number,
            required: true,
        },
        itemsPerPageOptions: {
            type: Array,
            default: () => [20, 50, 100],
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            gotoPageValue: '',
        };
    },
    filters: {
        rightDeclination: (declinations, itemsCount) => declinations[(itemsCount % 100 > 4 && itemsCount % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][Math.min(itemsCount % 10, 5)]],
    },
    methods: {
        setCurrentPage(pageNumber) {
            const { overallPages } = this;
            let currentPage = pageNumber;

            if (currentPage < 1) currentPage = 1;
            else if (currentPage > overallPages) currentPage = overallPages;

            this.gotoPageValue = '';

            this.$emit('paginator-change', { currentPage });
        },
        setItemsPerPage(itemsPerPage) {
            this.$emit('paginator-change', { currentPage: 1, itemsPerPage });
        },
    },
    computed: {
        pages() { // надо бы отрефакторить
            const { currentPage, overallPages } = this;

            let result = [1];
            const shift = 2;

            for (let i = currentPage - shift; i < currentPage; i++)
                result.push(i);

            result.push(currentPage);

            for (let i = currentPage + 1; i <= currentPage + shift; i++) result.push(i);

            result.push(overallPages);

            result = [...new Set(result)].filter(item => item >= 1 && item <= overallPages);

            if (result[result.length - 1] - result[result.length - 2] > 1)
                result.splice(result.length - 1, 0, '•••');

            if (result[1] - result[0] > 1)
                result.splice(1, 0, '•••');

            return result;
        },

        overallPages() {
            return Math.ceil(this.itemsCount / this.itemsPerPage);
        },

        currentOptionIndex() {
            return this.itemsPerPageOptions.findIndex(option => option.value === this.itemsPerPage || option === this.itemsPerPage);
        },
    },
};
</script>

<style lang="stylus" scoped>
.paginator
    height 60px
    box-sizing border-box
    border 1px solid #e7e8ec
    align-items center
    font-size 13px
    background-color white
    border-bottom-left-radius 4px
    border-bottom-right-radius 4px
    display flex
    padding 0 30px

@media print
    .paginator
        display none

.info-container
    display flex

.items-count
    margin 0 5px
    font-weight 600

.pages
    margin-left 20px
    justify-content center
    align-items center
    display flex

    & > div
        &:not(:first-child)
            margin-left 10px

.page
    min-width 28px
    height 28px
    box-sizing border-box
    border 1px solid #c4c4c4
    border-radius 4px
    transition color 0.2s, border-color 0.2s
    padding 1px 4px 0
    justify-content center
    align-items center
    cursor pointer
    display flex
    user-select none

    &.arrow
        color #8193a8

    &:hover
        color var(--portal-button-blue)
        border-color #0075be

    &.selected
        font-weight 600
        color var(--portal-button-blue)
        border-color #0075be
        pointer-events none

    &.ellipsis
        color #8c8c8c
        border 1px solid transparent
        pointer-events none

.goto-page
    align-items center
    white-space nowrap
    margin-left 20px
    display flex

.goto-page-title
    margin-right 10px
    user-select none

.goto-page-input
    width 50px
    padding 0
    text-align center
    height 28px
    background-color white
    box-sizing border-box
    border-radius 4px
    border 1px solid #D3D9DE
    color var(--portal-grey)
    outline none
    transition border-color 0.2s

.items-on-page-select
    margin-left auto

</style>
