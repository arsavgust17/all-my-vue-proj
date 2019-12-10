<template lang="pug">
#showcase-setup.showcase-setup
    .showcase-title.as-non-selectable {{title}}
    .info-container.as-non-selectable(v-if="!isLoading")
        div найдено:
        .items-count {{itemsCount}}
    .showcase-type-actions-button(v-if="actions.length")
        .showcase-type-actions
            .showcase-type-action(v-for="action in actions" :key="action.title" @click="$actions.executeAction(action)")
                i.fas.fa-pencil-alt
                | {{ action.title }}
</template>

<script>
export default {
    name: 'showcase-setup',
    props: {
        title: {
            type: String,
            default: '',
            required: true,
        },
        actions: {
            type: Array,
            default: () => ([]),
        },
        itemsCount: {
            type: Number,
            default: 0,
        },
        isLoading: {
            type: Boolean,
        },
    },
};
</script>

<style scoped lang="stylus">
.showcase-setup
    height 30px
    align-items center
    padding 0 30px
    font-size 14px
    display flex
    margin-bottom 5px
    border-radius 4px

.showcase-title
    font-size 19px
    font-weight 600

.info-container
    margin-left 20px
    font-size 13px
    margin-bottom -4px
    display flex
    user-select none

.items-count
    margin 0 5px
    font-weight 600

.showcase-type-actions-button
    margin-left auto
    width 26px
    height 26px
    background-color #e7ebef
    border-radius 40px
    cursor pointer
    position relative
    box-sizing border-box

    &::before
        content '•••'
        color #7d8fa5
        height 100%
        width 100%
        margin-top 3px
        display block
        text-align center

    &:hover
        & > .showcase-type-actions
            display block

@media print
    .showcase-type-actions-button
        display none

.showcase-type-actions
    border 1px solid #c5d0db
    top calc(100% + 5px)
    display none
    position absolute
    right 0
    background-color white
    box-shadow 0 5px 25px #cad3dc
    padding 3px 0
    z-index 50

    &::before
        content ''
        height 8px
        width 8px
        position absolute
        border 1px solid #c5d0db
        -webkit-transform rotate(45deg)
        transform rotate(45deg)
        top -5px
        right 6px
        background-color white
        border-bottom none
        border-right none
        cursor pointer

    &::after
        content ''
        display block
        position absolute
        right 0
        top -30px
        left 0
        height 30px

.showcase-type-action
    height 36px
    font-size 13px
    color #2A5885
    display flex
    transition 0.3s
    align-items center
    white-space nowrap
    padding-right 35px
    position relative

    & > i
        margin 0 10px

    &:hover
        background-color #f7f8fa

</style>
