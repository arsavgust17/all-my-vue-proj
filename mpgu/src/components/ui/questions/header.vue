<template lang="pug">
.question-header
    .meeting-type-name(v-if="headerData.meetingTypeName") {{ headerData.meetingTypeName }}
    .title(v-if="headerData.meetingId")
        // <SmartLink
        // :to="{
        // name: 'meeting-questions',
        // params: { id: headerData.meetingId }
        // }"
        // &gt;{{ meetingTitle(headerData.meeting_number, headerData.meetingDate) }}</SmartLink>
        a(:href="`/ugd/tabInfo.action?tab=GZK_MEETINGS&meetingID=${headerData.meetingId}`") {{ meetingTitle }}
        |  пункт {{ headerData.questionNumber }}
    .title(v-else-if="headerData.questionPlanDate")
        span Заседание не назначено
        br
        span Плановая дата рассмотрения: {{ headerData.questionPlanDate }}
    .consideration(v-if="headerData.approvalSubject") {{ headerData.approvalSubject }}
    Tabs(v-if="tabs" :tabs="preparedTabs")
    .actions(v-if="actions.length")
        .actions-button
            i.fas.fa-bars
        ActionsPopupList(:actions="actions" from-where="bottom")
</template>

<script>
    import Tabs from '@/components/ui/core/tabs.vue';
    import ActionsPopupList from '@/components/ui/controls/actions-popup-list.vue';

    export default {
        name: 'question-header',
        components: { ActionsPopupList, Tabs },
        props: {
            headerData: {
                type: Object,
                required: true,
            },
            tabs: {
                type: Array,
                default: () => ([]),
            },
            actions: {
                type: Array,
                default: () => ([]),
            },
        },
        computed: {
            preparedTabs() {
                return this.tabs.map(tab => ({
                    ...tab,
                    to: {
                        name: tab.name,
                        params: { id: this.$route.params.id },
                    },
                }));
            },

            meetingTitle() {
                const result = ['Заседание'];
                const { meetingNumber, meetingDate } = this.headerData;

                if (meetingNumber)
                    result.push(`№ ${meetingNumber}`);

                if (meetingDate)
                    result.push(`от ${meetingDate}`);

                return result.join(' ');
            },
        },
    };
</script>

<style lang="stylus" scoped>
.question-header
    padding 20px 20px 0
    background-color #F2F6FA
    border-bottom 1px solid #ccc
    position relative

.meeting-type-name
    font-size 16px
    color var(--portal-grey)
    margin-bottom 15px

.title
    font-size 22px
    a
        text-decoration none
        transition 0.2s
        color var(--portal-linkblue)
        &:hover
            color var(--portal-link-hover)

.consideration
    font-size 22px
    max-width 90%

.actions
    position absolute
    right 30px
    top calc(50% - 15px)

.actions-button
    height 30px
    width 30px
    text-align center
    cursor pointer
    & > i
        font-size 28px
        color #4f5559
        transition 0.2s
        &:hover
            color #81878b


</style>
