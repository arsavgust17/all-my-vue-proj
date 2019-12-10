<template lang="pug">
.actions-list-wrapper(:class="`from-${fromWhere}`")
    .actions-list(ref="list")
        .action(v-for="action in actions" :key="action.id" @click="$actions.executeAction(action, $route.params)")
            i.fas(v-if="haveIcons" :class="action.iconClass")
            | {{action.title}}
    .tag(ref="tag")
</template>

<script>
export default {
    name: 'actions-popup-list',
    props: {
        actions: {
            type: Array,
            default: () => [],
        },
        haveIcons: {
            type: Boolean,
            default: false,
        },
        fromWhere: {
            type: String,
            default: 'top',
        },
    },
    methods: {
        recalculateOffset() {
            // TODO: никогда не костылил и вот опять
            const { clientWidth } = document.documentElement;
            this.$el.style.display = 'block';
            const listRect = this.$el.getBoundingClientRect();
            this.$el.style.display = '';
            const parentRect = this.$el.parentNode.getBoundingClientRect();

            let listCenterOffset = (parentRect.width - listRect.width) / 2;
            let additionalOffset = 0;
            let side;

            if (listRect.left > clientWidth / 2)
                side = 'right';
            else
                side = 'left';

            if (listRect.right + listCenterOffset + 10 > clientWidth)
                additionalOffset = listRect[side] + listCenterOffset - clientWidth + 30;

            if (listRect.left + listCenterOffset - 10 < 0) {
                additionalOffset = -listCenterOffset;
            }

            listCenterOffset += additionalOffset;

            this.$el.style[side] = `${listCenterOffset}px`;

            const tagOffset = -listCenterOffset + parentRect.width / 2 - 8;
            if (tagOffset > 2)
                this.$refs.tag.style[side] = `${-listCenterOffset + parentRect.width / 2 - 8}px`;
            else
                this.$refs.tag.style[side] = '2px';
        },
    },
    mounted() {
        this.recalculateOffset();
        console.log(this.actions);
    },
};
</script>

<style scoped lang="stylus">
*:hover
    & > .actions-list-wrapper
        display block

.actions-list-wrapper
    position absolute
    background white
    box-shadow 0 2px 10px 0 #999
    border 1px solid #BFBFBF
    z-index 50
    display none
    &.from-top
        bottom calc(100% + 7px)
        .tag
            bottom -7px
    &.from-bottom
        top calc(100% + 7px)
        .tag
            transform rotate(45deg)
            top -7px
    &::after
        content ''
        left -10px
        right -10px
        position absolute
        top -10px
        bottom -10px
        z-index 4

.actions-list
    max-height 200px
    overflow-y auto
    overflow-x hidden
    position relative
    z-index 10

.action
    padding 7px 15px 7px 15px
    font-size 13px
    transition 0.2s
    position relative
    cursor pointer
    z-index 5
    white-space nowrap
    text-align left
    min-height 17px
    display flex
    align-items center
    &:hover
        background-color #F2F2F2
    & > i
        width 12px
        margin-right 10px
        font-size 12px

.tag
    height 12px
    width 12px
    position absolute
    border 1px solid #BFBFBF
    transform rotate(225deg)
    background-color #fff
    border-bottom none
    border-right none
    box-sizing border-box
    cursor pointer
</style>
