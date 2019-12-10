<template id="hyper-select" lang="pug">
.hyper-select(:class="classNames")
    Select(multiple v-model="data.selected" placement="bottom-end")
        Option(v-for="result in results" :key="result.objectId" :value="result.objectId" :myAttr="result") {{ result.dropString }}
</template>

<script>
export default {
    name: 'hyper-select',
    model: {
        prop: 'data',
        event: 'change',
    },
    props: {
        identifier: {
            type: String,
            required: true,
        },
        maxLength: {
            type: Number,
            default: 100,
        },
        data: {
            type: Object,
            required: true,
        },
        params: {
            type: Object,
            default: () => ({}),
        },
        nonExpandable: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
        },
        classNames: {
            type: Array,
        },
    },
    data: () => ({
        isLoading: false,
        requestData: { url: '/components/multiselect.action' },
        isFocused: false,
        cachedResults: {},
        results: [],
    }),
    mounted() {
        this.makeRequest('');
    },
    methods: {
        createParams: object =>
            Object.entries(object)
                .map(entry => entry.join('='))
                .join('&'),

        isAlreadySelected(result) {
            return this.data.selected.includes(result);
        },

        onResultClick($event, result) {
            if (this.data.selected.length < this.maxLength && !this.data.selected.find(item => item.objectId === result.objectId))
                this.data.selected.push(result);

            if (this.data.selected.length === this.maxLength)
                this.data.input = '';

            this.$emit('tag-selected', this.cachedResults);
        },

        onSelectedResultClick($event, result) {
            this.data.selected.splice(this.data.selected.findIndex(item => item === result), 1);

            this.$emit('tag-removed');
        },

        onInput() {
            if (Object.keys(this.cachedResults).includes(this.data.input))
                this.results = this.$utils.clone(this.cachedResults[this.data.input]);
            else
                this.makeRequest(this.data.input);
        },

        onBlur() {
            this.isFocused = false;
        },

        onFocus() {
            this.isFocused = true;
        },

        onTagRemove(tagIndex) {
            this.$emit('tag-removed');

            this.data.selected.splice(tagIndex, 1);
        },

        getHyperselectParameters() {
            return {
                paramnames: Object.keys(this.params).join('__'),
                parameters: Object.values(this.params).join('__'),
            };
        },

        makeRequest(searchString) {
            const params = this.createParams({
                identifier: this.identifier,
                term: searchString,
                ...this.getHyperselectParameters(),
            });
            const requestUrl = `${this.requestData.url}?${params}`;

            this.isLoading = true;

            fetch(requestUrl)
                .then(response => response.json())
                .then(array => {
                    this.isLoading = false;
                    this.cachedResults[searchString] = array;
                    console.log(array);
                    this.results = this.$utils.clone(this.cachedResults[searchString]);
                });
        },
    },
};
</script>

<style lang="stylus">
.hyper-select
    font-family 'PTSans', sans-serif
    position relative
    min-height 28px
    font-size 13px

    &.non-expandable
        & > .input-line
            padding-right 100px
            overflow hidden
            height 28px

        .tag
            height calc(100% - 6px)

    input
        outline none
        flex-grow 1
        border-radius 3px
        box-sizing border-box
        height 26px
        padding-left 5px
        border none transparent
        background-color transparent

.input-line
    box-sizing border-box
    position relative
    display flex
    align-items center
    border-radius 3px
    border 1px solid #d3d9de
    flex-wrap wrap
    background-color white
    transition 0.2s
    min-height 28px

    &:hover
        border-color var(--portal-elements-blue)

        .select-drop-hint
            color var(--portal-elements-blue)

    &.focused
        border-color #0087be
        box-shadow 0 0 0 2px #79dcfb

    &:not(.focused)
        & > input
            cursor pointer
            position absolute
            width 100%
            height 100%

.select-drop-hint
    position absolute
    right 10px
    z-index 0
    cursor pointer
    user-select none
    color #898989
    transition 0.2s
    font-size 12px

.results
    display none
    border 1px solid #c5d0db
    max-height 168px
    box-shadow 0 10px 15px rgba(0, 51, 102, 0.2)
    overflow-y auto
    position absolute
    width 100%
    z-index 6

    &.focused
        display block

    & > div
        min-height 28px
        background-color white
        cursor pointer

        &:hover
            background-color #f2f6fa
            cursor pointer

    & > .result
        padding-left 15px
        display flex
        justify-content space-between
        align-items center
        transition 0.2s

        &:hover
            background-color #e6f7ff

        &.selected
            background-color #fafafa

            & > .result-title
                color rgba(0, 0, 0, 0.65)

            & > .result-selection-indicator
                opacity 1

    .result-selection-indicator
        width 12px
        opacity 0
        transition 0.1s
        color var(--portal-elements-blue)
        font-size 11px
        flex 0 0 12px
        margin 0 7px 0 3px

.tag
    height 20px
    background-color #eef2f5
    border-radius 5px
    display flex
    justify-content center
    align-items center
    padding 0 8px
    cursor pointer
    margin 3px
    z-index 1
    font-size 11px

.tag-title
    white-space nowrap
    max-width 646px
    overflow hidden
    text-overflow ellipsis

.tag-remove
    margin-left 4px
    cursor pointer
    transition .2s
    user-select none
    position relative
    color #777

    &:hover
        color #de0000


</style>
