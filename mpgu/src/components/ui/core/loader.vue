<template lang="pug">
    .loader(:class="{failed: isFailed}")
        svg(viewBox="0 0 100 100")
            circle(cx="50" cy="50" fill="none" stroke-width="10" r="35" stroke-dasharray="165 55")
</template>

<script>
    export default {
        name: 'loader',
        props: {
            isFailed: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>

<style lang="stylus" scoped>
    .loader
        display flex
        align-items center
        justify-content center
        height 500px
        &>svg
            height 60px
            width 60px
            animation-duration 1s
            animation-iteration-count infinite
            animation-name infinite-rotating
            animation-timing-function linear
            stroke #0051a2
            transition stroke 1s
            &.failed>svg
                stroke red
</style>
