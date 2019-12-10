<template lang="pug">
    .row(ref="row" @click="(canBeWithExpander && isExpanderRequired) ? expanded = !expanded : false" :style="rowStyles" :class="rowClasses")
        .expander(v-if="isExpanderRequired")
            i.fas.fa-chevron-right
        component(v-for="column in columns" :is="column.cellComponent || defaultCellComponent" :key="column.property" :data="data" :column="column")
        .blurer(v-if="canBeWithExpander && isExpanderRequired && !expanded")
</template>

<script>
    import TableHtmlCell from '@/components/ui/showcases/cells/table-html-cell.vue';

    export default {
        name: 'Row',
        data: () => ({
            expanded: false,
            isExpanderRequired: false,
            innerRowMinHeight: 36,
            innerRowMaxHeight: 140,
            defaultCellComponent: TableHtmlCell,
        }),
        props: {
            data: {
                type: Object,
                required: true,
            },
            columns: {
                type: Array,
                required: true,
            },
            canBeWithExpander: {
                type: Boolean,
                default: true,
            },
            rowMinHeight: {
                type: Number,
                default: 140,
            },
            rowMaxHeight: {
                type: Number,
                default: 140,
            },
        },
        computed: {
            rowStyles() {
                if (!this.isExpanderRequired)
                    return {};

                const resultStyles = {};

                resultStyles['max-height'] = `${this.innerRowMaxHeight}px`;
                resultStyles.height = this.expanded
                    ? `${this.innerRowMaxHeight}px`
                    : `${this.innerRowMinHeight}px`;

                resultStyles.cursor = this.isExpanderRequired ? 'pointer' : 'default';

                return resultStyles;
            },
            rowClasses() {
                return { expanded: this.expanded };
            },
        },
        created() {
            this.innerRowMinHeight = this.rowMinHeight;
            this.innerRowMaxHeight = this.rowMaxHeight;
        },
        mounted() {
            if (this.canBeWithExpander && this.$refs.row.scrollHeight > this.rowMinHeight) {
                this.isExpanderRequired = true;
                this.innerRowMaxHeight = this.$refs.row.scrollHeight;
            }
        },
    };
</script>

<style scoped lang="stylus">
.row
    border-left 1px solid var(--light-border-color)
    border-right 1px solid var(--light-border-color)
    background-color white
    box-sizing border-box
    padding 10px 40px
    transition background-color .1s, height .1s, box-shadow .2s
    overflow hidden
    position relative
    margin-top 2px
    border-radius 3px
    display flex
    &:last-child
        margin-bottom 2px
    & > .blurer
        position absolute
        left 0
        bottom 0
        right 0
        opacity 0
        height 32px
        transition opacity .3s
        background-image linear-gradient(transparent, white)
    &:not(.expanded)
        & > .blurer
            opacity 1
    &.expanded
        & > .expander
            transform rotate(90deg)
    &:not(.when-data-loading):not(.when-no-data):hover
        box-shadow 0 10px 15px rgba(0, 51, 102, 0.247058823529412)
        z-index 1
    &:not(:last-child)
        border-bottom 1px solid var(--light-border-color)

@media print
    .row
        padding 10px
    .expander
        display none

.expander
    width 20px
    height 20px
    position absolute
    top 7px
    left 7px
    transition transform 0.1s
    cursor pointer
    user-select none
    display flex
    align-items center
    justify-content center
    color #8193a8

.column-content
    flex-shrink 0
    padding-right 10px
    box-sizing border-box
    word-break break-word
    white-space pre-wrap
    &.as-rest-of-space
        flex-shrink 1
    & >>> .in-column-link
        color var(--portal-button-blue)
        text-decoration none
        transition color 0.05s
        &:hover
            color var(--on-link-hover-color)


</style>
