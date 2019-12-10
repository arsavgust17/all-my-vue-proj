<template lang="pug">
.categorize-group(:class="{'expanded': isExpanded}" ref="categorizeGroup")
    .group-title(@click="onGroupTitleClick" :style="titleStyles")
        .expander
            i.fas.fa-chevron-right
        .title {{title}}
        .count(v-if="itemsCount" :style="countStyles") {{itemsCount}}

    .group-content
        categorize-group(
        v-if="!isEndpoint"
        v-for="group in groups"
        :key="id + '$' +group.ID"
        :title="group.TITLE"
        :id="id + '$' +group.ID"
        :items-count="+group.AMOUNT"
        :groups="toPrettyGroups(group)"
        :level="level + 1"
        :color="group.COLOR"
        :filters="filters"
        )

        ShowcaseTable(
        v-if="isEndpoint"
        :body="table.items"
        :columns="table.columns"
        :search-filter="filters.find(filter => filter.type === 'SearchField')"
        :isLoading="isLoading"
        )

        Paginator(
        v-if="isEndpoint && table.items.length"
        :declinations="showcaseConfig.innerTable.paginator.declinations"
        :items-count="itemsCount"
        :items-per-page="paginator.itemsPerPage"
        :current-page="paginator.currentPage"
        @paginator-change="paginatorChange"
        )
</template>

<script>
import ShowcaseTable from '@/components/ui/showcases/table.vue';
import Paginator from '@/components/ui/showcases/paginator.vue';

export default {
    name: 'categorize-group',
    components: {
        ShowcaseTable,
        Paginator,
    },
    inject: ['getMainHeaderHeight'],
    props: {
        title: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        itemsCount: {
            type: Number,
        },
        groups: {
            type: Array,
            required: true,
        },
        level: {
            type: Number,
            default: 0,
        },
        filters: {
            type: Array,
            default: () => ([]),
        },
        color: {
            type: String,
            default: () => '#000000',
        },
    },
    data: () => ({
        titleStyles: {
            'padding-left': 0,
        },
        countStyles: {
            color: '#000000',
        },
        isExpanded: false,
        isLoading: false,
        table: {
            items: [],
            columns: [],
        },
        paginator: {
            itemsCount: 0,
            itemsPerPage: 20,
            currentPage: 1,
        },
        fetching: new AbortController(),
    }),
    computed: {
        currentModuleName() {
            return this.$route.params.id;
        },

        showcaseConfig() {
            return this.currentWorkGroup.showcases[this.currentModuleName];
        },

        isEndpoint() {
            return !(this.groups && this.groups.length);
        },
    },
    methods: {
        paginatorChange({ currentPage, itemsPerPage }) {
            const noPageCache = true;

            if (currentPage) {
                this.paginator.currentPage = currentPage;
            }

            if (itemsPerPage) {
                this.paginator.itemsPerPage = itemsPerPage;
            }
console.log(this.$refs.categorizeGroup.offsetTop, this.getMainHeaderHeight());
            window.scrollTo(0, this.$refs.categorizeGroup.offsetTop - this.getMainHeaderHeight());

            this.loadData(noPageCache);
        },

        loadData(pageCache) {
            this.isLoading = true;

            const filters = this.filters.reduce(
                (accumulator, filter) =>
                    ({ ...accumulator, ...filter.toQueryObject() }), {},
            );

            this.$xmlApi.get(this.showcaseConfig.innerTable.viewId, {
                signal: this.fetching.signal,
                pageCache,
                params: {
                    ID: this.id,
                    COUNT: this.paginator.itemsPerPage,
                    OFFSET: this.paginator.itemsPerPage * (this.paginator.currentPage - 1),
                    ...filters,
                },
            })
                .then(({ XML }) => {
                    if (XML.ROOT[this.showcaseConfig.innerTable.xmlTag]) {
                        const items = XML.ROOT[this.showcaseConfig.innerTable.xmlTag].ROW_SET.ROW;

                        this.table.items = this.$xml.asArray(items);
                    }
                    this.isLoading = false;
                }, console.warn)
                .catch(error => {
                    console.warn(error);
                    this.isLoading = false;
                });
        },
        onGroupTitleClick() {
            this.isExpanded = !this.isExpanded;
            if (this.isEndpoint) {
                if (this.isExpanded)
                    this.loadData(true);
                else {
                    this.fetching.abort();
                    this.fetching = new AbortController();
                }
            }
        },
        toPrettyGroups(group) {
            if (!group.SUB_GROUPS || !group.SUB_GROUPS.SUB_GROUP)
                return [];

            if (!Array.isArray(group.SUB_GROUPS.SUB_GROUP))
                return [group.SUB_GROUPS.SUB_GROUP];

            return group.SUB_GROUPS.SUB_GROUP;
        },
    },
    created() {
        if (this.isEndpoint)
            this.table.columns = this.showcaseConfig.innerTable.tableColumns;

        this.titleStyles['padding-left'] = `${this.level * 20}px`;
        this.countStyles.color = this.color;
    },
};
</script>

<style scoped lang="stylus">
.categorize-group
    box-sizing border-box
    &.expanded
        & > .group-title
            & > .expander
                transform rotate(90deg)
                color var(--portal-elements-blue)
            & > .title
                color var(--portal-elements-blue)
        & > .group-content
            display block

.group-title
    height 36px
    display flex
    align-items center
    font-weight 600
    cursor pointer
    background-color white
    transition background-color 0.2s
    &:hover
        background-color #fafbfc

.expander
    display flex
    align-items center
    justify-content center
    margin-left 10px
    height 16px
    width 16px
    color #7d8fa5
    transition 0.2s
    font-size 11px

.title
    font-size 13px
    margin-left 10px

.count
    background-color var(--portal-elements-blue)
    display flex
    justify-content center
    align-items center
    height 18px
    padding 0 8px
    border-radius 40px
    color white
    font-size 11px
    margin-left 10px

.group-content
    display none

.group-content >>> .categorize-group > .group-title > .count
    background-color transparent
    color black
    font-size 13px

.group-content >>> .showcase-body > .table-header
    top initial
    border-left none
    border-right none
    border-radius 0

.group-content >>> .paginator
    background-color #fafbfc
    margin 3px 0 6px

</style>
