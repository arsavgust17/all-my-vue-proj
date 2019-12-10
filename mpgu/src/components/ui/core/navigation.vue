<template lang="pug">
    nav
        .group(v-for="group in menu" :key="group.title")
            .group-title(v-if="!group.selfLink && group.nested.length")
                | {{group.title}}
                i.fas.fa-sort-down(v-if="group.nested.length")
            SmartLink(v-else :to="group.selfLink")
                | {{group.title}}
                i.fas.fa-sort-down(v-if="group.nested.length")
            .group-links(v-if="group.nested.length")
                SmartLink(v-for="nested in group.nested" :key="nested.title" :to="nested.link")
                    | {{nested.title}}
</template>

<script>
    import SmartLink from '@/components/ui/core/links/smart-link.vue';

    export default {
        name: 'navigation',
        components: { SmartLink },
        computed: {
            menu() {
                return this.$utils.get(this.$store.state.workGroups[this.$route.params.workGroup], 'navigation.menu', []);
            },
        },
    };
</script>

<style scoped lang="stylus">
nav
    height 50px
    border-bottom 1px solid #e7e8e9
    background-color white
    padding 0 60px
    display flex
    align-items center
    a
        text-decoration none

@media print
    nav
        visibility hidden

.group
    font-size 13px
    height 100%
    margin-right 25px
    padding 5px
    display flex
    align-items center
    position relative
    cursor pointer
    transition 0.3s
    box-sizing border-box
    border-bottom 2px solid transparent
    & > a
        color black
        line-height 38px
    &:hover
        & > .group-links
            display block
    &.current
        & > .group-title
            font-weight 600

.group:hover,
.group.current
    border-bottom 2px solid #d53b3b
    color black

.group-title
    display flex
    justify-content center
    align-items center
    & > i
        margin-left 5px

.group-links
    position absolute
    top 100%
    display none
    left -10px
    box-shadow 0 3px 5px 0 rgba(0, 0, 0, 0.2)
    border 1px solid #c8c8c8
    background-color white
    padding 5px
    &::before
        content ''
        height 12px
        width 12px
        position absolute
        border 1px solid #c8c8c8
        transform rotate(45deg)
        top -7px
        left 30px
        background-color white
        border-bottom none
        border-right none
        cursor pointer
    & > a
        white-space nowrap
        height 33px
        display flex
        align-items center
        color #60656c
        transition 0.2s
        padding 0 15px
        border-left 4px solid transparent
        z-index 2
        position relative
        &:hover
            color #222326
            background #f2f2f2

.group-links > a.current,
.group-links > a:hover
    border-left 4px solid #d53b3b
</style>
