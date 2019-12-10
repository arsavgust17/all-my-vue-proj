<template lang="pug">
#meeting
    .header-background
    main
        Loader.header-loader(v-if="loadingState.loading" :is-failed="loadingState.error")
        MeetingHeader(v-else :meeting-type-name="header.meetingTypeName" :meeting-number="String(header.meetingNumber || '')" :status="header.status" :date="header.date" :info-blocks="header.infoBlocks" :actions="header.actions")
        Loader.meeting-data-loader(v-if="loadingState.loading" :is-failed="loadingState.error")
        MeetingInfo(v-else :persons-groups="meetingInfo.personsGroups" :files-groups="meetingInfo.filesGroups" :counters="meetingInfo.counters")
        Tabs(v-if="tabs" :class="tabs" :tabs="preparedTabs")
        .filters(v-if="!loadingState.loading")
            component(v-for="(item, index) in filters.items" :key="index" :is="item.component" v-bind="item.props")
        router-view(:filters="calculatedFilters")
</template>

<script>
    import Loader from '@/components/ui/core/loader.vue';
    import MeetingHeader from '@/components/ui/meetings/header.vue';
    import MeetingInfo from '@/components/ui/meetings/meeting-info.vue';
    import Tabs from '@/components/ui/core/tabs.vue';

    import { HrefAction } from '@/services/global/$actions';
    import { MEETING_HEADER } from '@/services/global/$xmlApi/consts';
    import { loadingStateMixinGenerator } from '@/mixins/common/loadingStateMixinGenerator';

    export default {
        name: 'meeting',
        mixins: [loadingStateMixinGenerator()],
        components: {
            Tabs,
            MeetingInfo,
            Loader,
            MeetingHeader,
        },
        data: () => ({
            order: {},
            meetingInfo: {
                participants: [],
                agendas: [],
                protocols: [],
                counters: [],
            },
            tabs: [
                {
                    name: 'meeting-questions',
                    title: 'Вопросы',
                },
                // {
                //     name: 'meeting-orders',
                //     title: 'Поручения',
                // },
            ],
        }),
        computed: {
            sumOfCounters() {
                return this.meetingInfo.counters.reduce((acc, counter) => (acc + counter.itemsCount), 0);
            },
            preparedTabs() {
                return this.tabs.map(tab => ({
                    ...tab,
                    to: {
                        name: tab.name,
                        params: { id: this.$route.params.id },
                    },
                }));
            },
            filters() {
                return this.currentWorkGroup.meetings.filters;
            },
            calculatedFilters() {
                return this.filters.calculateFunction(this.filters.items);
            },
        },
        methods: {
            filterTasksByStatus(tasks, status) {
                if (!tasks)
                    return [];

                return this.$xml.asArray(tasks)
                    .filter(task => task.status === status)
                    .map(task => HrefAction(
                        task.num
                            ? `${task.num} ${task.fio}`
                            : task.fio,
                        `/ugd/vue/card/GZK/order/${task.id}`,
                        task,
                    ));
            },
        },
        mounted() {
            this.$xmlApi.get(MEETING_HEADER, {
                params: { documentId: this.$route.params.id },
            }).then(({ XML }) => {
                this.loadingState.loading = false;

                const meeting = this.$xml.castFieldsToCamelCase(
                    this.$xml.castSomeFieldsToArrays(
                        XML.ROOT.CONF_MEETING_CARD.MEETING.MEETING,
                        ['PARTICIPANT', 'SUBJECT', 'PROTOCOL'],
                    ),
                );

                this.header = {
                    meetingTypeName: meeting.meetingTypeName,
                    meetingNumber: meeting.meetingNumber,
                    status: {
                        id: meeting.statusNick,
                        name: meeting.statusName,
                    },
                    date: meeting.meetingDate,
                    infoBlocks: [
                        {
                            icon: 'fa-clock',
                            title: 'Начало заседания',
                            value: meeting.meetingTime,
                        },
                        {
                            icon: 'fa-map-marker-alt',
                            title: 'Место проведения',
                            value: meeting.placeOfMeeting,
                        },
                    ],
                    actions: [
                        {
                            title: 'Редактировать',
                            type: 'openForm',
                            link: `/ugd/getCardHtml.action?cardId=FORM$GZK$MEETING&documentId=${this.$route.params.id}`,
                            iconClass: 'fa-pencil-alt',
                        },
                        {
                            title: 'Добавить вопрос в заседание',
                            type: 'openForm',
                            link: `/ugd/getCardHtml.action?cardId=FORM$GZK$MEETING&PARENT_ID=${this.$route.params.id}`,
                            iconClass: 'fa-plus',
                        },
                        {
                            title: 'Загрузить материалы',
                            type: 'openForm',
                            link: `/ugd/getCardHtml.action?cardId=FORM$GZK$UPLOADER&documentId=${this.$route.params.id}`,
                            iconClass: 'fa-upload',
                        },
                        // TODO: simpleSubmit implementation
                        // {
                        //     title: 'Повестка ГЗК',
                        //     type: 'simpleSubmit',
                        //     link: `/ugd/getCardHtml.action?cardId=FORM$GZK$MEETING&documentId=${this.$route.params.id}`
                        // },
                        // {
                        //     title: 'Повестка РГ ГД',
                        //     type: 'simpleSubmit',
                        //     link: `/ugd/getCardHtml.action?cardId=FORM$GZK$MEETING&documentId=${this.$route.params.id}`
                        // },
                    ],
                };

                this.meetingInfo.personsGroups = [
                    {
                        title: 'Участники',
                        items: meeting.participants.participant,
                    },
                ];

                this.meetingInfo.filesGroups = [
                    {
                        title: 'Повестка',
                        items: meeting.subjects.subject,
                    },
                    {
                        title: 'Протокол',
                        items: meeting.attachments.protocols.protocol,
                    },
                ];

                this.meetingInfo.counters = [
                    {
                        name: 'В работе',
                        actions: this.filterTasksByStatus(meeting.tasks.list.task, 'INPROGRESS'),
                    },
                    {
                        name: 'Не выполнено',
                        actions: this.filterTasksByStatus(meeting.tasks.list.task, 'OVERDUE')
                            .map(action => ({
                                ...action,
                                title: `${action.title} - срок ${action.executeDeadline}`,
                            })),
                        className: 'counter--overdue',
                    },
                    {
                        name: 'Текущий контроль',
                        actions: this.filterTasksByStatus(meeting.tasks.list.task, 'CURRENTCONTROL'),
                    },
                    {
                        name: 'Снято с контроля',
                        actions: this.filterTasksByStatus(meeting.tasks.list.task, 'REMOVE_CONTROL'),
                        className: 'counter--out-of-control',
                    },
                ];
            }, () => {
                this.loadingState.error = true;
            });
        },
    };
</script>

<style lang="stylus">
    body
        background-color var(--portal-alt-bg)
</style>

<style scoped lang="stylus">
#meeting
    position relative

.header-background
    height 240px
    background-color #4A5666
    position absolute
    left 0
    right 0

main
    max-width 1500px
    position relative
    margin 0 auto
    padding-top 30px

.header-loader
    height 170px
    & >>> svg
        stroke white

.meeting-data-loader
    display flex
    padding 25px 45px
    background white
    border 1px solid #e7e8ec
    box-sizing border-box
    height 225px

.tabs
    margin 0 20px

.filters
    border-bottom 1px solid #e7e8ec
    height 70px
    display flex
    padding 0 15px
    align-items center
    margin-right 20%
    & > *
        margin 0 15px


</style>
