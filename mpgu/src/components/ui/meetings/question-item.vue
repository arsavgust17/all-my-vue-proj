<template lang="pug">
#question-item
    .header
        .edit-button(@click="onEditQuestionClick")
            i.fas.fa-pencil-alt
        .question-title
            SmartLink(:to="{\
                    name: 'question-card',\
                    params: { id: questionId }\
                    }" :is-inner="true") {{ title }}
        .orders-counters
            .counter(v-for="counter in counters" :key="counter.title")
                .count(:class="counter.className") {{ counter.actions.length }}
                .title {{ counter.name }}
                ActionsPopupList(v-if="counter.actions && counter.actions.length" :actions="counter.actions")
    .content
        .consideration {{ consideration }}
        .interested-orgs
            div(v-for="org in interestedOrgs" :key="org") {{ org }}
    .footer
        .icons-by-types
            div(v-if="files.filter(file => file.type === 'DESCRIPTION').length")
                img(:src="`${$router.options.base}file-icon-as-WORD.png`")
            div(v-if="files.filter(file => file.type === 'PRESENTATION').length")
                img(:src="`${$router.options.base}file-icon-as-POWERPOINT.png`")
            div(v-if="files.filter(file => file.type === 'OTHER_MATERIAL').length")
                img(:src="`${$router.options.base}file-icon-as-OTHER.png`")
        .download-files(v-if="files.length")
            .files
                .title Скачать файлы
                ActionsPopupList(:actions="filesAsActions")
            .archive
                .title(@click="onDownloadArchiveClick") Скачать все файлы
        .participants
            .participant(v-for="participant in participants" :key="participant.firstName + participant.lastName")
                .title {{ (participant.lastName|| '')[0] }}{{ (participant.firstName || '')[0] }}
                .info-popup
                    .role {{ participant.personRole }}
                    .fio
                        | {{ participant.lastName }} {{ participant.firstName }} {{ participant.middleName }}
</template>

<script>
    import SmartLink from '@/components/ui/core/links/smart-link.vue';
    import ActionsPopupList from '@/components/ui/controls/actions-popup-list.vue';

    export default {
        name: 'question-item',
        components: { ActionsPopupList, SmartLink },
        props: {
            questionId: {
                type: String,
                required: true,
            },
            editButtonLink: {
                type: String,
                default: () => '',
            },
            title: {
                type: String,
                required: true,
            },
            counters: {
                type: Array,
                default: () => ([
                    {
                        name: 'В работе',
                        actions: [],
                    },
                    {
                        name: 'Не выполнено',
                        actions: [],
                        className: 'counter--overdue',
                    },
                    {
                        name: 'Текущий контроль',
                        actions: [],
                    },
                    {
                        name: 'Снято с контроля',
                        actions: [],
                        className: 'counter--out-of-control',
                    },
                ]),
            },
            consideration: {
                type: String,
                default: () => '',
            },
            interestedOrgs: {
                type: Array,
                default: () => ([]),
            },
            files: {
                type: Array,
                default: () => ([]),
            },
            participants: {
                type: Array,
                default: () => ([]),
            },
        },
        computed: {
            filesAsActions() {
                return this.files.map(file => ({
                    ...file,
                    type: 'file',
                }));
            },
        },
        methods: {
            onDownloadArchiveClick() {
                this.$actions.executeAction({
                    type: 'href',
                    link: `/elib/getFileOrArchive.action?sqlNick=GZK_QUESTION_FILES&archive=true&archiveName=QUESTION_FILES&with_ecp=0&document_id=${this.questionId}`,
                });
            },
            onEditQuestionClick() {
                this.$actions.executeAction({
                    type: 'openForm',
                    link: `/ugd/getCardHtml.action?cardId=FORM$GZK$QUESTION&documentId=${this.questionId}`,
                });
            },
        },
    };
</script>

<style lang="stylus" scoped>
#question-item
    min-height 140px
    background-color white
    border 1px solid #e7e8ec
    border-radius 5px
    box-sizing border-box
    padding 15px 20px 20px
    transition all .3s
    position relative
    &:not(:first-child)
        margin-top 5px
    &:hover
        box-shadow 0 10px 15px #0033663d

.header
    display flex
    margin-bottom 10px

.edit-button
    color #90a4ae
    height 35px
    width 35px
    background-color var(--portal-alt-bg)
    border-radius 50%
    align-items center
    justify-content center
    display flex
    cursor pointer
    transition 0.2s
    flex-shrink 0
    &:hover
        background-color #2074ba
        color white

.question-title
    font-size 16px
    flex-grow 1
    align-items center
    display flex
    word-break break-all
    margin-left 10px

.orders-counters
    display flex
    align-items flex-start
    flex-shrink 0
    .counter
        box-sizing border-box
        text-align center
        position relative
        user-select none
        cursor pointer
        padding 0 10px
        &:not(:first-child)
            border-left 1px solid #e7e8ec
    .count
        font-size 16px
    .title
        color var(--portal-grey)
        font-size 11px

.counter
    & > .counter--out-of-control
        color #8fb400
    & > .counter--overdue
        color #d2008d

.consideration
    font-size 14px
    margin-bottom 5px
    word-break break-all
.participants
    display flex
    justify-content flex-end
    flex-grow 1
    flex-wrap wrap

.interested-orgs
    color var(--portal-grey)
    font-size 12px

.footer
    margin-top 10px
    display flex
    align-items flex-start

.icons-by-types
    display flex
    flex-shrink 0
    margin-right 10px
    user-select none
    & > div
        width 25px
        height 25px
        display flex
        align-items center
        justify-content center

.download-files
    font-size 11px
    display flex
    user-select none
    cursor pointer
    flex-shrink 0
    min-height 25px
    align-items center

.files
    position relative
    margin-right 10px

.participant
    border-radius 50%
    color white
    font-size 20px
    background-color #175fc6
    height 36px
    width 36px
    display flex
    align-items center
    justify-content center
    user-select none
    position relative
    cursor help
    margin 2.5px
    &:hover
        & > .info-popup
            display block

.info-popup
    position absolute
    width 200px
    padding 10px 20px
    z-index 10
    bottom calc(100% + 10px)
    right 0
    background-color white
    box-shadow 0 0 15px rgba(0, 0, 0, .2)
    box-sizing border-box
    display none
    & > .role
        color var(--portal-grey)
        font-size 10px
        margin-bottom 10px
    & > .fio
        font-size 16px
        color black
</style>
