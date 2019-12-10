<template lang="pug">
.common-select(:class="{'selected': isSelected}" v-click-outside="hideDroplist")
    .selected-option(@click="onSelectedOptionClick")
        .option.selected {{optionPrefix}}{{currentOption.title || currentOption}}
        i.fas.fa-angle-down.hint
    .droplist(v-if="isDroplistVisible")
        .option(
            v-for="(option, index) in options"
            :key="option.value"
            @click="onSelect(index)"
            :class="{'selected': index === currentOptionIndex}"
        ) {{option.title || option}}
</template>

<script>
export default {
    name: 'common-select',
    props: {
        options: {
            type: Array,
            required: true,
        },
        optionPrefix: {
            type: String,
            default: '',
        },
        initialIndex: {
            type: Number,
            default: 0,
        },
    },
    data: () => ({
        currentOptionIndex: 0,
        isSelected: false,
        isDroplistVisible: false,
    }),
    methods: {
        onSelect(index) {
            if (this.currentOptionIndex === index) return;

            this.currentOptionIndex = index;

            this.$emit('input', this.options[index], index);
            this.hideDroplist();
        },
        onSelectedOptionClick() {
            this.isDroplistVisible = !this.isDroplistVisible;
        },
        hideDroplist() {
            this.isDroplistVisible = false;
        },
    },
    computed: {
        currentOption() {
            return this.options[this.currentOptionIndex];
        },
    },
    mounted() {
        this.onSelect(this.initialIndex);
    },
};
</script>

<style scoped lang="stylus">
.common-select
    box-sizing border-box
    position relative
    transition .2s
    min-width 160px
    cursor pointer
    user-select none

    &.selected
        & > .selected-option
            border-bottom-left-radius 0
            border-bottom-right-radius 0

.selected-option
    height 100%
    border 1px solid #c4c4c4
    border-radius 4px
    display flex
    align-items center
    transition 0.2s

    &:hover
        border-color #0075be

        & > .hint
            color #0075be

    & > .option
        height 100%
        justify-content flex-start

.hint
    margin-right 10px
    transition .2s
    margin-left auto

.droplist
    left 0
    right 0
    background-color white
    position absolute
    top calc(100% + 2px)
    border-bottom-left-radius 4px
    border-bottom-right-radius 4px
    border 1px solid #c4c4c4
    border-top 0
    z-index 5

.option
    display flex
    align-items center
    padding 5px 10px
    transition .2s
    min-height 18px

.droplist > .option:hover,
.droplist > .option.selected
    background-color #e6f7ff
</style>
