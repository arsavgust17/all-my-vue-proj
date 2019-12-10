<template lang="pug">
Loader(v-if="loadingState.loading" :is-failed="loadingState.error")
main(v-else)
    .decisions-wrapper(v-if="decision")
        .title Приняты решения
        .decisions {{ decision }}
    .main-titles
        .title Поручение:
        .title Ход исполнения:
    .history-wrapper
        .history
            .history-item(v-for="task in tasks", :key="task.id")
                .order
                    .order-header
                        .order-link
                            a(:href="`/ugd/vue/card/GZK/order/${task.id}`")
                                span(v-if="task.itemNumber") {{ task.itemNumber }}.
                                    =(" ")
                                | {{ task.title }}
                        .task-date.deadline-date(v-if="task.deadlineDate || task.deadlineAfter")
                            .to(:class="executeDeadlineColor(task)", v-if="task.deadlineDate") {{ task.deadlineDate }}
                            .to(v-else) через {{ task.deadlineAfter }} дней после поручения
                                =(" ")
                                SmartLink(:to="`/ugd/vue/card/GZK/order/${task.deadlineReferenceTaskId}`" :is-inner="false")
                                    span(v-if="task.deadlineReferenceTaskItemNumber") {{ task.deadlineReferenceTaskItemNumber }}.
                                        =(" ")
                                    | {{task.deadlineReferenceTaskName }}
                        .status(:style="{ backgroundColor: task.statusColor, }") {{ task.statusName }}
                    .order-body {{ task.text }}
                    .order-participants
                        .order-participant(v-for="(participant, index) in task.participants" :key="index")
                            .avatar(v-if="participant.fotoId")
                            .avatar.no-photo(v-else) {{ (participant.lastName || '')[0] }}{{ (participant.firstName || '')[0] }}
                            .participant-data
                                .participants-fio {{ participant.lastName }} {{ participant.firstName }} {{ participant.middleName }}
                                .participants-role {{ participant.role }}
                .execution
                    .execution-block(v-for="report in task.reports", :key="report.id")
                        .part
                            .part-title
                                .title Отчёт
                                .date-label(v-if="report.createDate") {{ report.createDate }}
                            .part-executor(v-if="report.executor")
                                .executor-fio {{ report.executor.lastName }} {{ report.executor.firstName }} {{ report.executor.middleName }}
                                .executor-position(v-if="report.executor.position") {{ report.executor.position }}
                            .part-body {{ report.text }}
                            .part-files
                                .part-file(v-for="file in report.files", :key="file.id")
                                    .file-icon
                                        img(:src="`${$router.options.base}/file-icon-as-OTHER.png`")
                                    .file-link
                                        FileLink(:id="file.id") {{ file.name }}
                        .part(v-if="report.resolution")
                            .part-title
                                .title Резолюция
                                .date-label(v-if="report.resolutionDate") {{ report.resolutionDate }}
                            .part-executor
                                .executor-fio {{ report.receiving.lastName }} {{ report.receiving.firstName }} {{ report.receiving.middleName }}
                                .executor-position(v-if="report.receiving.position") {{ report.receiving.position }}
                            .part-body {{ report.resolution }}
</template>

<script>
import FileLink from '@/components/ui/core/links/file-link.vue';
import SmartLink from '@/components/ui/core/links/smart-link.vue';
import Loader from '@/components/ui/core/loader.vue';
import { loadingStateMixinGenerator } from '@/mixins/common/loadingStateMixinGenerator';

export default {
    name: 'process',
    components: { Loader, SmartLink, FileLink },
    mixins: [loadingStateMixinGenerator()],
    props: {
        order: {
            type: Object,
        },
    },
    data: () => ({
        decision: '',
        tasks: [],
        cardTypes: {
            question: {
                cardId: 'CARD$QUESTION$PROCESS$XML',
                xmlPath: 'ROOT.TASKS.ROW_SET.ROW',
                fieldsToArrays: ['TASKS', 'REPORTS', 'PARTICIPANTS'],
                getDataFromXml(_this, xml) {
                    if (xml.decision) _this.decision = xml.decision;

                    _this.tasks = _this.$utils.get(xml, 'wrapper.tasks', []);
                },
            },
            order: {
                cardId: 'CARD$FUNCTIONAL_TASKS$PROGRESS_EXECUTION_XML',
                xmlPath: 'ROOT.FT_PROGRESS_EXECUTION.XMLDOC.TASKS',
                fieldsToArrays: ['REPORTS'],
                getDataFromXml(_this, xml) {
                    _this.tasks = _this.$utils.clone([xml]);
                },
            },
        },
    }),
    methods: {
        executeDeadlineColor(task) {
            const [day, month, year] = task.deadlineDate.split('.');

            if (!(task.statusNick === 'TASK_READY')) {
                if (new Date(year, month - 1, day) < new Date()) {
                    return 'overdue';
                }

                return 'not-overdue';
            }

            return '';
        },
    },
    mounted() {
        const cardType = this.cardTypes[this.$route.meta.type];

        this.loadingState.loading = true;

        this.$xmlApi
            .get(cardType.cardId, {
                params: { documentId: this.$route.params.id },
            })
            .then(({ XML }) => {
                const xml = this.$xml.castFieldsToCamelCase(
                    this.$xml.castSomeFieldsToArrays(
                        this.$utils.get(XML, cardType.xmlPath, []),
                        cardType.fieldsToArrays,
                    ),
                );

                cardType.getDataFromXml(this, xml);

                this.tasks.forEach(task => {
                    task.participants = task.participants.filter(participant => participant);
                });

                this.loadingState.loading = false;
            });
    },
};
</script>

<style scoped lang="stylus">
main
    max-width 1200px
    background-color white
    padding 20px
    font-family 'PTSans', sans-serif

.container
    a
        color #0144DD
        text-decoration none
        transition color 0.2s

        &:hover
            color #d04001

.decisions-wrapper
    box-sizing border-box
    border 1px solid #e7e8ec
    border-radius 5px
    font-size 13px
    padding 20px

    & > .title
        font-weight 600

        &::after
            content ':'

    & > .decisions
        white-space pre-wrap

        ol
            padding 0
            margin-left 15px
            counter-reset list

        & > ol
            margin 0

            li
                list-style-type none

                &::before
                    counter-increment list
                    content counters(list, ".") ". "
                    color #DA4835
                    font-weight 600

    & + .main-titles .title
        padding 30px 3px 12px 12px;

.decision-number
    display inline-block
    color #DA4835
    font-weight 600

.main-titles
    font-weight 600
    font-size 18px
    display flex

    .title
        width 400px
        padding 15px 3px 12px 12px;

.history-item
    box-sizing border-box
    border 1px solid #e7e8ec
    border-radius 5px
    display flex
    font-size 13px
    overflow hidden
    transition box-shadow 0.2s

    &:not(:first-child)
        margin-top 7px

    &:hover
        box-shadow 0 10px 15px #003366 3 f

.order
    background-color white
    padding 10px
    width 400px
    flex-shrink 0
    box-sizing border-box
    position relative

.order-header
    margin-bottom 25px

.order-link
    font-size 14px

.task-date
    display flex
    font-size 12px

    &::before
        color var(--portal-grey)
        margin-right 5px

    &.deadline-date
        margin-top 7px

        &::before
            content 'Срок исполнения:'

    & > .after-link
        margin-left 3px

    & > .to
        &.overdue
            color red

        &.not-overdue
            color green

.status
    position absolute
    top 10px
    right 10px
    font-size 10px
    padding 1px 5px
    border-radius 3px
    color white

.order-body
    margin-bottom 25px
    word-break break-word

.order-participant
    display flex

    &:not(:first-child)
        margin-top 10px

.avatar
    height 36px
    width 36px
    display none

    &.no-photo
        display flex
        color white
        font-size 20px
        background-color #175fc6
        border-radius 50%
        align-items center
        justify-content center
        user-select none

    & + .participant-data
        margin-left 10px

.participant-data
    display flex
    flex-direction column

.participants-role
    color var(--portal-grey)
    font-size 11px
    margin-top auto

    &.made-changes
        &::after
            content '(внёс изменения)'
            margin-left 3px

.execution
    background-color #f2f6fa
    padding 15px
    flex-grow 1

.execution-block
    border 1px solid #e7e8ec
    border-radius 5px
    background-color white

    &:not(:first-child)
        margin-top 3px

.part
    box-sizing border-box
    padding 10px

.part-title
    display flex
    margin-bottom 5px

    & > .title
        font-weight 600

    & > .date-label
        background-color #edf1f7
        padding 1px 3px
        margin-left 7px
        color #4D6083
        font-size 11px

.part-executor
    display flex

.executor-fio
    margin-bottom 5px

.executor-position
    color var(--portal-grey)
    margin-left 5px

    &::before
        content '('

    &::after
        content ')'

.part-body
    margin-bottom 5px
    white-space pre-wrap

.part-files
.part-file
    display flex
    align-items center
    margin-right 10px

.file-icon
    margin-right 0px

    & > img
        display block

.file-link
    font-size 12px

    & > a
        position relative
        overflow hidden
        text-overflow ellipsis
        max-width 400px
        display block
</style>
