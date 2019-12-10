<template lang="pug">
.participant(:class="type")
    .inner-block
        .avatar
        .name {{participant.fio}}
        .title {{title}}
        .actions
            .call.action(v-if="participant.phone")
                .column
                    .title Позвонить
                .column
                    .value {{participant.phone}}
            .email.action(v-if="participant.email")
                .column
                    .title Написать
                .column
                    a.value(:href="`mailto:${participant.email}`") {{participant.email}}
</template>

<script>
export default {
    name: 'participant',
    props: {
        type: {
            type: String,
            required: true,
        },
        participant: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        titles: {
            author: 'Автор поручения',
            executor: 'Исполнитель',
            accomplice: 'Соисполнитель',
            coexecutor: 'Соисполнитель',
            watcher: 'Наблюдатель',
        },
    }),
    computed: {
        title() {
            return this.titles[this.type];
        },
    },
};
</script>

<style scoped lang="stylus">
.participant
    position relative
    height 46px
    cursor default
    font-size 14px
    .actions
        display none
        padding 20px 0
        .call .value
            font-weight bold
        .action
            display flex
            justify-content space-between
            & + .action
                margin-top 10px
            .column
                overflow hidden
                &:first-child
                    flex-grow 1
                .title
                    display inline
                    position relative
                    &::after
                        content '.........................................................................................'
                        display inline
                        white-space nowrap
                        position absolute
                        color black
                        opacity .2
                        bottom 0
                        z-index -1

    .avatar
        position absolute
        width 30px
        height 30px
        left 23px
        top 4px
        background-image url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAh1BMVEUAAADY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+WKk5iPmJ2NlpvU2+Grs7nDy9G+xsuttrugqa7N1Nqyur+VnqOSm6DW3eOjrLGcpaqXoKXJ0de6wseosLadpqvP192aoqh4jQezAAAAFXRSTlMA+uy0s6BgIhbyy35aPcxZ83w+ejxHN123AAABYklEQVQ4y42U2XLCMAxFnZUQdlpvsbMCAUL///vaNLIsmtLpfZPnjCVdyWZEWZrkYRCEeZJm7Ddt4oCjgngzAxYR/6Fo8Uzslnym5ZoSKw4yg7gYhFaeeIMjfRajztoxB8wCB6dKTKpOjtlBpa4OK5ws1jPVjL0UiBS+r5F4x1AiIjlq9CfGqEek90jMWOY97RBpic8ZS32kEFHcK2WJDypEPgiSsNwHN0QaguQs9AFad9EECVlAohqQKycKKKKv92lGV00Rn6huWlUXUsl7LdumJomgXF2q79mYxnAztl24m7bQtB6mFLwRJZ/SDcAkYF0Js9GmNRpcLk5gXRbQCd6sullnsZkGAGNEWwtRXFxQwhjZhiJfgN+ayi0Di+iqdLbFpRlviXAxH7as+k4qJaRQSnZ9VdqHX0y25i+FT+nwiliRp/YnAbn2c2C//v+zRx1jujrxcQbAF7Qdv6Dt8xf0CQt3TYPhEUP4AAAAAElFTkSuQmCC')
        background-size cover
        border 2px solid white
        border-radius 50%
    &:hover
        .inner-block
            z-index 1
            width 280px
            padding-right 65px
            background-color white
            box-shadow: var(--classic-shadow)
        .actions
            display block
        .avatar
            border-color #bccad3
    .inner-block
        position absolute
        top 0
        left 0
        padding 7px 0 7px 65px
        .name
            font-size 14px
        & > .title
            color #7d8fa4
            font-size 11px
            font-weight bold
    &.author
        .inner-block
            border-left 3px solid #7166ba
    &.executor
        .inner-block
            border-left 3px solid #24b7e5
    &.accomplice, &.coexecutor, &.watcher
        .inner-block
            border-left 3px solid #fad734
    .avatar
        position absolute
        width 30px
        height 30px
        left 23px
        top 4px
        background-image url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAh1BMVEUAAADY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+XY3+WKk5iPmJ2NlpvU2+Grs7nDy9G+xsuttrugqa7N1Nqyur+VnqOSm6DW3eOjrLGcpaqXoKXJ0de6wseosLadpqvP192aoqh4jQezAAAAFXRSTlMA+uy0s6BgIhbyy35aPcxZ83w+ejxHN123AAABYklEQVQ4y42U2XLCMAxFnZUQdlpvsbMCAUL///vaNLIsmtLpfZPnjCVdyWZEWZrkYRCEeZJm7Ddt4oCjgngzAxYR/6Fo8Uzslnym5ZoSKw4yg7gYhFaeeIMjfRajztoxB8wCB6dKTKpOjtlBpa4OK5ws1jPVjL0UiBS+r5F4x1AiIjlq9CfGqEek90jMWOY97RBpic8ZS32kEFHcK2WJDypEPgiSsNwHN0QaguQs9AFad9EECVlAohqQKycKKKKv92lGV00Rn6huWlUXUsl7LdumJomgXF2q79mYxnAztl24m7bQtB6mFLwRJZ/SDcAkYF0Js9GmNRpcLk5gXRbQCd6sullnsZkGAGNEWwtRXFxQwhjZhiJfgN+ayi0Di+iqdLbFpRlviXAxH7as+k4qJaRQSnZ9VdqHX0y25i+FT+nwiliRp/YnAbn2c2C//v+zRx1jujrxcQbAF7Qdv6Dt8xf0CQt3TYPhEUP4AAAAAElFTkSuQmCC')
        background-size cover
        border 2px solid white
        border-radius 50%
</style>
