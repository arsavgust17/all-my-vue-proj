<template lang="pug">
#meeting-header
    .meeting-type-name {{ meetingTypeName }}
    .meeting-title
        .title {{ meetingTitle(meetingNumber, date) }}
        .status(v-if="status.id" :style="statusStyles")
            | {{ status.name }}
    .info-blocks
        .info-block(v-for="block in infoBlocks" :key="block.title")
            i.fas(:class="block.icon")
            .title {{ block.title }}
            .value {{ block.value }}
    .actions
        .actions-button
            i.fas.fa-bars
        ActionsPopupList(:actions="actions" from-where="bottom" :have-icons="true")
</template>

<script>
    import ActionsPopupList from '@/components/ui/controls/actions-popup-list.vue';

    export default {
        name: 'meeting-header',
        components: { ActionsPopupList },
        props: {
            meetingTypeName: {
                type: String,
                default: '',
            },
            meetingNumber: {
                type: String,
                default: '',
            },
            date: {
                type: String,
                default: '',
            },
            status: {
                type: Object,
                default: () => ({}),
            },
            infoBlocks: {
                type: Array,
                default: () => ([]),
            },
            actions: {
                type: Array,
                default: () => ([]),
            },
        },
        methods: {
            meetingTitle(number, date) {
                const result = ['Заседание'];

                if (number)
                    result.push(`№ ${number}`);

                if (date)
                    result.push(`от ${date}`);

                return result.join(' ');
            },
        },
        computed: {
            statusStyles() {
                return { 'background-color': '#8fb400' };
            },
        },
    };
</script>

<style lang="stylus" scoped>
#meeting-header
    height 170px
    padding 0 5%
    position relative

.meeting-type-name
    font-size 16px
    color var(--portal-grey)
    margin-bottom 15px

.meeting-title
    color #fff
    display flex
    & > .title
        font-size 22px
    & > .status
        font-size 11px
        padding 0 12px
        border-radius 2px
        margin-left 15px
        height 25px
        display flex
        align-items center

.info-blocks
    margin-top 30px
    & > .info-block
        display flex
        font-size 13px
        align-items center
        &:not(:first-child)
            margin-top 10px
        & > i
            margin-right 10px
            width 15px
            text-align center
        & > .title
            &::after
                content ':'
                margin-right 5px
        & > .value
            color white

.info-blocks > .info-block > i,
.info-blocks > .info-block > .title
    color var(--portal-grey)

.actions
    position absolute
    right 30px
    top 30px
    color #2a5885

.actions-button
    height 30px
    width 30px
    text-align center
    cursor pointer
    & > i
        font-size 28px
        color white
        transition 0.2s
        &:hover
            color #81878b


</style>
