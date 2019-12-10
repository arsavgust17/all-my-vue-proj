<template lang="pug">
.side-data
    // Разнести на компоненты
    .participants(v-if="participants.length")
        .participant.collapsed(v-for="(participant, index) in participants" :key="index" @click="onParticipantClick($event)")
            .header
                .avatar
                    div {{participant.lastName[0]}}{{participant.firstName[0]}}
                .participant-data
                    .participants-fio {{participant.lastName}} {{participant.firstName}} {{participant.middleName}}
                    .participants-position {{participant.role}}
                i.collapser.fas.fa-angle-left(v-if="participant.organization || participant.position")
            .info
                .info-block(v-if="participant.organization")
                    .block-title Организация
                    .block-detail {{participant.organization}}
                .info-block(v-if="participant.position")
                    .block-title Должность
                    .block-detail {{participant.position}}

    .files-groups(v-if="materialsGroups.length")
        .files-group.collapsed(v-for="group in materialsGroups" :key="group.title")
            .header(@click="onMaterialClick($event)")
                .title {{group.title}}
                i.collapser.fas.fa-angle-left
            .files
                FileMiniBlock(v-for="file in group.files" :key="file.id" :id="file.id" :name="file.name" :uploaded-by="file.uploadedBy")
    .question-history.collapsed(v-if="questionHistory.length")
        .header(@click="onHistoryClick($event)")
            .title История рассмотрения
            i.collapser.fas.fa-angle-left
        .history
            .block(v-for="block in questionHistory" :class="{\
            current: $route.params.id === block.id\
            }" :key="block.id")
                SmartLink(:to="{\
                name: 'question-card',\
                params: { id: block.id },\
                }")
                    b {{ block.shortName }}
                    |  от {{ block.meetingDate }} № {{ block.meetingNumber }} пункт {{ block.itemNumber }}
                .address {{ block.address }}
                .content {{ block.decision }}
                .status {{ block.status }}

</template>

<script>
    import FileMiniBlock from '@/components/ui/core/file-mini-block.vue';
    import SmartLink from '@/components/ui/core/links/smart-link.vue';

    export default {
        name: 'side-part',
        components: { SmartLink, FileMiniBlock },
        props: {
            participants: {
                type: Array,
                default: () => ([]),
            },
            materialsGroups: {
                type: Array,
                default: () => ([]),
            },
            questionHistory: {
                type: Array,
                default: () => ([]),
            },
        },
        methods: {
            // Да это жёстко
            onParticipantClick($event) {
                $event.target.closest('.participant').classList.toggle('collapsed');
            },
            // Да это жёстко
            onMaterialClick($event) {
                $event.target.closest('.files-group').classList.toggle('collapsed');
            },
            // Да это жёстко
            onHistoryClick($event) {
                $event.target.closest('.question-history').classList.toggle('collapsed');
            },
        },
    };
</script>

<style lang="stylus" scoped>
.side-data
    flex-shrink 0
    width 300px
    background-color #fafbfc

.participants
    border-bottom 1px solid #e7e8ec
    box-sizing border-box

.participant
    transition 0.1s
    box-sizing border-box
    padding 15px
    &:hover
        background-color #f8f8f8
    &:not(:first-child)
        border-top 1px solid #e7e8ec
    & > .header
        display flex
        align-items center
        cursor pointer
        position relative
        user-select none
    & > .info
        box-sizing border-box
        height 100%
        overflow hidden
    &.collapsed
        & > .info
            height 0

.participant > .header > .collapser,
.question-history > .header > .collapser,
.files-group > .header > .collapser
    transition 0.2s
    flex-shrink 0
    margin-left auto
    transform rotate(-90deg)

.question-history.collapsed > .header > .collapser,
.participant.collapsed > .header > .collapser,
.files-group.collapsed > .header > .collapser
    transform rotate(-90deg) rotateY(180deg)

.avatar
    height 36px
    width 36px
    flex-shrink 0
    display flex
    align-items center
    justify-content center
    border-radius 50%
    background-color white
    & + .participant-data
        margin-left 10px

.participant-data
    display flex
    flex-direction column

.participants-position
    color var(--portal-grey)
    font-size 12px

.info
    & > .info-block
        &:first-child
            margin-top 20px
        &:not(:first-child)
            margin-top 20px

.info-block
    & > .block-title
        color var(--portal-grey)
        font-size 11px
        margin-bottom 5px
    & > .block-detail
        font-size 13px

.files-group
    padding 0 15px
    &:not(:first-child)
        border-top 1px solid #e7e8ec
    &:hover
        background-color #f8f8f8
    &:not(.collapsed)
        & > .files
            padding-bottom 15px
    &.collapsed
        & > .files
            height 0

.question-history > .header,
.files-group > .header
    display flex
    cursor pointer
    align-items center
    user-select none

.question-history > .header > .title,
.files-group > .header > .title
    margin 15px 0
    font-size 18px
    font-weight 600

.question-history > .files,
.files-group > .files
    box-sizing border-box
    height 100%
    overflow hidden

.files
    & > *:not(:first-child)
        margin-top 10px

.question-history
    & > .header
        padding 0 15px
    &.collapsed
        & > .history
            height 0
            overflow hidden

.history
    & > .block
        padding 10px 15px
        font-size 14px
        &.current
            background #f6f7fb
        &:not(:first-child)
            margin-top 20px
        & > .address
            margin-bottom 10px
        & > .status
            font-size 11px
            color #7C8FA4


</style>
