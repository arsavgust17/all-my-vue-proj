<template lang="pug">
.main-container

    ShowcaseSetup(
    :title="showcaseConfig.title"
    :is-loading="loadingState.loading"
    :items-count="paginator.itemsCount"
    :actions="showcaseConfig.actions"
    )

    FiltersLabels(:filters="showcaseConfig.filters")
    .showcase-container
        .useless-wrapper
            .search-wrapper(v-if="showcaseConfig.isCategorize && showcaseConfig.enabledBigSearch")

                BigSearch(
                :key="$route.fullPath"
                :search-filter="searchFieldFilter.data"
                :placeholder="showcaseConfig.bigSearchPlaceholder"
                @keyup.enter="onBigSearchEnterPress"
                )

            Categorize(
            v-if="showcaseConfig.isCategorize"
            :key="$route.fullPath"
            :groups="items"
            :is-loading="loadingState.loading"
            :filters="filtersWithSearchField"
            )

            ShowcaseTable(
            v-else
            :key="$route.fullPath"
            :body="items"
            :columns="showcaseConfig.tableColumns"
            :search-filter="searchFieldFilter"
            :is-loading="loadingState.loading"
            :disabled-expander="showcaseConfig.disabledExpander"
            :enabled-big-search="showcaseConfig.enabledBigSearch"
            @reload-data="onBigSearchEnterPress"
            )

            Paginator(
            v-if="!showcaseConfig.disabledPaginator"
            v-show="!loadingState.loading && items"
            :declinations="showcaseConfig.paginator.declinations"
            :items-count="paginator.itemsCount"
            :items-per-page="paginator.itemsPerPage"
            :items-per-page-options="showcaseConfig.paginator.itemsPerPageOptions"
            :current-page="paginator.currentPage"
            @paginator-change="paginatorChange"
            )

        .filters-wrapper(v-if="showcaseConfig.filters && showcaseConfig.filters.length")
            ShowcaseFilters(
            :filters="showcaseConfig.filters"
            :is-loading="loadingState.loading"
            @apply-filters="applyFilters"
            @reset-filters="resetFilters"
            )
</template>

<script>

import ShowcaseSetup from '@/components/ui/showcases/showcase-setup.vue';
import FiltersLabels from '@/components/ui/showcases/filters-labels.vue';
import ShowcaseTable from '@/components/ui/showcases/table.vue';
import Paginator from '@/components/ui/showcases/paginator.vue';
import Categorize from '@/components/ui/showcases/categorize.vue';
import BigSearch from '@/components/ui/controls/big-search.vue';
import ShowcaseFilters from '@/components/ui/showcases/showcase-filters.vue';
import { loadingStateMixinGenerator } from '@/mixins/common/loadingStateMixinGenerator';
import { SearchField } from '@/services/common/showcases/filters';


export default {
    name: 'showcase',
    mixins: [loadingStateMixinGenerator()],
    data: () => ({
        fetching: new AbortController(),
        items: [],
        searchFieldFilter: SearchField({
            default: { value: '' },
        }),
        paginator: {
            itemsPerPage: 20,
            itemsCount: 0,
            currentPage: 1,
        },
    }),
    components: {
        BigSearch,
        Categorize,
        ShowcaseSetup,
        FiltersLabels,
        ShowcaseTable,
        ShowcaseFilters,
        Paginator,
    },
    methods: {
        getShowcaseFilters() {
            let rawFilters = {};

            if (!this.showcaseConfig.disabledPaginator) {
                rawFilters.COUNT = this.paginator.itemsPerPage;
                rawFilters.OFFSET = this.paginator.itemsPerPage * (this.paginator.currentPage - 1);
            }

            rawFilters.SEARCH_STRING = this.searchFieldFilter.data.value;

            // Доделать FiltersSet
            rawFilters = this.showcaseConfig.filters.reduce(
                (accumulator, filter) =>
                    ({ ...accumulator, ...filter.toQueryObject() }),
                rawFilters,
            );

            return rawFilters;
        },

        resetFilters() {
            this.searchFieldFilter.data.value = '';

            this.showcaseConfig.filters.forEach(filter => filter.reset());
        },

        applyFilters() {
            this.paginator.currentPage = 1;

            this.loadData();
        },

        setItemsCount(count) {
            this.paginator.itemsCount = +count;
        },

        paginatorChange({ currentPage, itemsPerPage }) {
            let noPageCache = false;

            if (currentPage) {
                this.paginator.currentPage = currentPage;
            }

            if (itemsPerPage) {
                this.paginator.itemsPerPage = itemsPerPage;
                noPageCache = true;
            }

            this.loadData(noPageCache);
        },

        processArriviedData(XML) {
            if (this.showcaseConfig.isCategorize)
                this.processAsCategorize(XML);
            else {
                this.processAsSimpleTable(XML);
            }
        },

        processAsSimpleTable(XML) {
            if (!XML.ROOT[this.showcaseConfig.xmlTag]) {
                this.items = [];
                this.setItemsCount(0);

                throw new Error('No any parsed data :(');
            }

            const showcase = XML.ROOT[this.showcaseConfig.xmlTag].ROW_SET;

            showcase.ROW = this.$xml.asArray(showcase.ROW);

            this.items = showcase.ROW;
            this.setItemsCount(showcase.ROW[0].TOTAL_COUNT);
        },

        processAsCategorize(XML) {
            this.items = (XML.ROOT[this.showcaseConfig.xmlTag].GROUPS.GROUP || []);
            this.setItemsCount((XML.ROOT[this.showcaseConfig.xmlTag].GROUPS.GROUP || []).length);
        },

        loadData(noPageCache) {
            this.loadingState.loading = true;

            this.$xmlApi.get(this.showcaseConfig.viewId, {
                signal: this.fetching.signal,
                noPageCache,
                params: this.getShowcaseFilters(),
            }).then(({ XML }) => {
                this.loadingState.loading = false;

                const castedXml = this.$xml.castSomeFieldsToArrays(
                    XML,
                    ['SUB_GROUP', 'ROW', 'GROUP'],
                );

                return this.processArriviedData(castedXml);
            }).catch(error => {
                console.warn(error);

                this.loadingState.loading = false;
            });
        },

        onBigSearchEnterPress() {
            this.loadData(true);
        },

        onRouteChange() {
            this.searchFieldFilter.data.value = '';

            this.loadData();
        },
    },
    computed: {
        showcaseConfig() {
            return this.currentWorkGroup.showcases[this.$route.params.id];
        },
        filtersWithSearchField() {
            return [
                ...this.showcaseConfig.filters,
                this.searchFieldFilter,
            ];
        },
    },
    beforeRouteUpdate(to, from, next) {
        // Вот тут короч mixin сделаем, тыры пыры
        this.paginator = {
            itemsPerPage: 20,
            itemsCount: 0,
            currentPage: 1,
        };
        this.searchFieldFilter.value = '';
        this.fetching.abort();
        this.fetching = new AbortController();
        next();
    },
    watch: {
        $route: {
            handler: 'onRouteChange',
            immediate: true,
        },
    },
};
</script>

<style lang="stylus">
body
    background-color var(--portal-alt-bg)

:root
    --background-color #eef2f4
    --showcase-header-background-color #fafbfc
    --light-border-color #e7e8ec
    --dark-border-color #d3d9de
    --blue-text-color #0144DD
    --table-header-background-color var(--showcase-header-background-color)
    --on-link-hover-color red
    --button-text-color #235DC1
    --button-on-hover-text-color white
    --button-border-color #0075be
    --button-on-hover-border-color #0075be
    --button-background-color white
    --button-on-hover-background-color #0072ff

.datepicker-input-class
    height 28px !important
</style>

<style lang="stylus">
.main-container
    display flex
    flex-direction column
    margin 20px 50px 0

@media print
    .main-container
        margin 0

.useless-wrapper
    display flex
    flex-direction column
    flex-grow 1

.search-wrapper
    padding 10px 15px
    background-color #FAFBFC
    box-sizing border-box
    border 1px solid #E7E8EC
    border-radius 4px
    display flex
    margin-bottom 3px

.showcase-container
    display flex

.filters-wrapper
    z-index 5
    flex-shrink 0

.as-non-selectable
    user-select none


</style>
