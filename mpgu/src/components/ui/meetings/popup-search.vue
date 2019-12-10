<template lang="pug">
.wrapper(v-click-outside="onOutsideClick")
    .input-wrapper.dummy
        i.fas.fa-search
        input(type="text" :placeholder="placeholder" @focus="onDummyInputFocus" ref="dummyInput")
    .popup(ref="popup" :class="{ visible: isPopupVisible }")
        .input-wrapper
            i.fas.fa-search

            input(type="text"
            v-model="searchString.value"
            ref="input" :placeholder="placeholder"
            @keyup.enter="onEnterPress"
            )

            .clear-input-button(v-if="searchString.value.length" @click="onClearButtonClick") Очистить
        .filters
        .results(v-if="isBlankResults")
        Loader.loader(v-else-if="loadingState.loading" :is-failed="loadingState.error")
        .results(v-else-if="!loadingState.loading && results.length")
        .results.no-results(v-else)
            | По запросу
            b {{ searchString.value }}
            |  ничего не найдено.
            br
            | Возможно, что в запросе одно или несколько слов написаны неправильно.
            |  Попробуйте найти по номеру или дате заседания.
</template>

<script>
import { loadingStateMixinGenerator } from '@/mixins/common/loadingStateMixinGenerator';
import Loader from '@/components/ui/core/loader.vue';
import { MEETING_SEARCH } from '@/services/global/$xmlApi/consts';

export default {
    name: 'popup-search',
    components: { Loader },
    mixins: [loadingStateMixinGenerator()],
    props: {
        searchString: {
            type: Object,
        },
        placeholder: {
            type: String,
            default: 'Поиск по адресу, порядковому и кадастровому номерам',
        },
    },
    data: () => ({
        isPopupVisible: false,
        results: [],
        isBlankResults: true,
    }),
    watch: {
        searchString: {
            deep: true,
            handler() {
                this.isBlankResults = true;
            },
        },
    },
    methods: {
        onDummyInputFocus() {
            this.isPopupVisible = true;

            setTimeout(() => {
                this.$refs.input.focus();
            }, 600);
        },
        onOutsideClick() {
            this.isPopupVisible = false;
        },
        onClearButtonClick() {
            this.searchString.value = '';
            this.isBlankResults = true;
        },

        getRequestParams() {
            return {
                MEETING_TYPE: this.currentWorkGroup.meetings.workGroupIdForSearch,
                SEARCH_TEXT: this.searchString.value,

                // Эта параша и на старом портале не работала
                // LOWERBOUND: 1,
                // UPPERBOUND: 10,
            };
        },

        loadData() {
            this.$xmlApi.get(MEETING_SEARCH, {
                params: this.getRequestParams(),
                noPageCache: true,
            }).then(({ XML }) => {
                const results = this.$xml.castFieldsToCamelCase(
                    this.$xml.castSomeFieldsToArrays(
                        XML.ROOT.CONF_QUESTIONS_SEARCH.MEETINGS,
                        ['MEETINGS'],
                    ),
                );

                console.log(results);
            }, () => {
                this.loadingState.error = true;
            }).then(() => {
                this.loadingState.loading = false;
            });
        },

        onEnterPress() {
            this.isBlankResults = false;

            this.loadData();
        },
    },
};
</script>


<style lang="stylus" scoped>
.wrapper
    flex-grow 1
    position relative

.input-wrapper
    position relative
    display flex
    align-items center

    & > i
        position absolute
        left 10px
        font-size 14px
        color #90a4ae

    & > input
        height 34px
        border 1px solid #d9dbdd
        padding-left 35px
        padding-right 70px
        outline none
        width 100%
        background-color transparent
        transition 0.2s
        font-size 13px

    &.dummy
        & > input
            font-size 13px

.input-wrapper > input:focus,
.input-wrapper > input:hover
    background-color white
    border-color var(--portal-linkblue)

.popup
    background-color white
    padding 12px
    position absolute
    z-index 10
    width 100%
    top -12px
    left -12px
    box-shadow 0 5px 20px 0 #ccc
    font-size 13px
    min-height 150px
    max-height 350px
    opacity 0
    visibility hidden
    transition opacity .2s

    &.visible
        visibility visible
        opacity 1

.loader
    height 200px

.clear-input-button
    color var(--portal-linkblue)
    position absolute
    right 10px
    cursor pointer
    transition 0.2s

    &:hover
        color var(--portal-button-blue)

.results
    &.no-results
        margin 20px 0

</style>
