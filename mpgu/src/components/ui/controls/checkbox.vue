<template>
<div class="checkbox-wrapper" :class="{ disabled }">
    <label class="checkbox-label" @click="onClick($event)">
        <div class="checkbox">
            <input class="checkbox-input" type="checkbox" v-model="value.value"/>
            <div class="checkbox-indicator">
                <i class="fa fa-check"></i>
            </div>
            <div class="checkbox-text" v-show="text">{{text}}</div>
        </div>
    </label>
</div>
</template>

<script>
export default {
    name: 'checkbox',
    props: {
        value: {
            type: Object,
        },
        text: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClick(e) {
            if (this.disabled) e.preventDefault();
        },
    },
};
</script>


<style lang="stylus">
.checkbox-wrapper
    --main-color var(--portal-linkblue)
    --checkbox-width 14px
    --checkbox-height 14px
    --checkbox-default-border #b5bdc0
    --checkbox-font-size 13
    --transition-time .2s
    --text-left-margin 10
    --text-right-margin 0

    &.semi-full
        .checkbox-indicator
            border-color var(--main-color)
            background-color var(--main-color)
            box-shadow inset 0 0 0 2px white

            i
                opacity 0

    &.reversed
        .checkbox
            flex-direction row-reverse

.checkbox
    display flex
    font-size calc(var(--checkbox-font-size) * 1px)
    align-items center

.checkbox-label
    cursor pointer
    user-select none
    display flex
    transition color var(--transition-time)
    align-items center

    &:hover
        color var(--portal-elements-blue)

        .checkbox-indicator
            border-color var(--portal-elements-blue)

.checkbox-text
    margin-left calc(var(--text-left-margin) * 1px)
    margin-right calc(var(--text-right-margin) * 1px)

.checkbox-wrapper.disabled,
.checkbox-wrapper.disabled .checkbox-indicator,
.checkbox-wrapper.disabled .checkbox-indicator:hover,
.checkbox-wrapper.disabled .checkbox-label,
.checkbox-wrapper.disabled .checkbox-label:hover
    color #ddd
    border-color #ddd
    cursor default

.checkbox-indicator
    display flex
    justify-content center
    align-items center
    width var(--checkbox-width)
    height var(--checkbox-height)
    border 1px solid var(--checkbox-default-border)

    transition border-color var(--transition-time),
    background-color var(--transition-time),
    box-shadow var(--transition-time)

    border-radius 2px
    background-color white
    box-sizing border-box
    position relative

    i
        transition opacity var(--transition-time)
        color white
        opacity 0
        font-size 10px

.checkbox-input
    position absolute
    margin 0
    display none
    z-index -100

    &:checked
        & ~ .checkbox-indicator
            border-color var(--portal-elements-blue)
            background-color var(--portal-elements-blue)

            i
                opacity 1
</style>
