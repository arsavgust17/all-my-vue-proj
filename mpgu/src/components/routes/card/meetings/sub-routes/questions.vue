<template lang="pug">
#meeting-items
    .filters-by-status(v-if="!loadingState.loading")
        .overall
            | Всего {{ paginator.itemsCount }} {{ rightDeclination(paginator.declinations, paginator.itemsCount) }}:
        .statuses
            .status(:class="{\
      selected: status.selected,\
      }" v-for="status in filteredStatuses" :key="status.statusId" @click="onStatusClick(status)")
                | {{ status.itemsCount }} {{ status.name }}
    Loader.list-loader(v-if="loadingState.loading" :is-failed="loadingState.error")
    .when-no-results(v-else-if="!loadingState.loading && !loadingState.error && !questions.length")
        b В повестке заседания пока нет вопросов
        img(:src="`${$router.options.base}meetings/when-no-results.png`")
        p Они появятся позднее

    .items-list(v-else)
        QuestionItem(
        v-for="question in questions"
        :key="question.id"
        :question-id="question.id"
        :edit-button-link="question.editButtonLink"
        :title="question.title || ''"
        :consideration="question.consideration"
        :interested-orgs="question.interestedOrgs"
        :counters="question.counters"
        :files="question.files"
        :participants="question.participants"
        )

    Paginator(
    :items-count="paginator.itemsCount"
    :items-per-page="paginator.itemsPerPage"
    :current-page="paginator.currentPage"
    @paginator-change="paginatorChange"
    )

</template>

<script>
import QuestionItem from '@/components/ui/meetings/question-item.vue';
import Paginator from '@/components/ui/showcases/paginator.vue';
import { HrefAction } from '@/services/global/$actions';
import Loader from '@/components/ui/core/loader.vue';
import { MEETING_QUESTIONS_LIST } from '@/services/global/$xmlApi/consts';
import { loadingStateMixinGenerator } from '@/mixins/common/loadingStateMixinGenerator';

export default {
    name: 'meeting-items',
    mixins: [loadingStateMixinGenerator()],
    components: {
        Loader,
        Paginator,
        QuestionItem,
    },
    props: {
        filters: {
            type: Object,
            default: () => ({}),
        },
    },
    data: () => ({
        paginator: {
            declinations: ['вопрос', 'вопроса', 'вопросов'],
            itemsCount: 0,
            itemsPerPage: 20,
            currentPage: 1,
        },
        question: [],
        statuses: [],
    }),
    computed: {
        filteredStatuses() {
            return this.statuses.filter(status => status.itemsCount);
        },
    },
    watch: {
        filters: {
            deep: true,
            handler() {
                this.searchQuestions();
            },
        },
    },
    methods: {
        rightDeclination: (declinations, count) => declinations[(count % 100 > 4 && count % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][Math.min(count % 10, 5)]],

        paginatorChange({ currentPage, itemsPerPage }) {
            if (currentPage) {
                this.paginator.currentPage = currentPage;
            }

            if (itemsPerPage) {
                this.paginator.itemsPerPage = itemsPerPage;
            }

            this.searchQuestions();
        },

        onStatusClick(status) {
            if (!status.selected)
                this.statuses.forEach(status_ => status_.selected = false);

            status.selected = !status.selected;

            this.searchQuestions();
        },

        getRequestParams() {
            const result = {
                lowerBound: (this.paginator.currentPage - 1) * this.paginator.itemsPerPage,
                upperBound: this.paginator.currentPage * this.paginator.itemsPerPage,
                ...this.filters,
            };

            const selectedStatus = this.statuses.find(status => status.selected);

            if (selectedStatus)
                result.STATUS = selectedStatus.statusId;

            return result;
        },

        filterTasksByStatus(tasks, status) {
            return this.$xml.asArray(tasks)
                .filter(task => task.status === status)
                .map(task => HrefAction(
                    task.fio,
                    `/ugd/vue/card/GZK/order/${task.id}`,
                    task,
                ));
        },
        searchQuestions() {
            this.loadingState.loading = true;

            this.$xmlApi.get(MEETING_QUESTIONS_LIST, {
                params: {
                    MEETING_ID: this.$route.params.id,
                    ...this.getRequestParams(),
                },
            })
                .then(({ XML }) => {
                    const castedXml = this.$xml.castFieldsToCamelCase(
                        this.$xml.castSomeFieldsToArrays(XML,
                            ['QUESTION', 'TASK', 'PARTICIPANT', 'INTERESTED_ORG', 'FILE']),
                    );

                    const questions = this.$utils.get(castedXml, 'root.confMeetingQuestions.meetingQuestions.questions.question', []);

                    this.questions = questions.map(question => ({
                        id: question.id,
                        title: question.itemNumber
                            ? `${question.itemNumber}. ${question.addr || ''}`
                            : question.addr,
                        counters: [
                            {
                                name: 'В работе',
                                actions: this.filterTasksByStatus((question.tasks.list || { task: [] }).task, 'CURRENTCONTROL'),
                            },
                            {
                                name: 'Не выполнено',
                                actions: this.filterTasksByStatus((question.tasks.list || { task: [] }).task, 'OVERDUE')
                                    .map(action => ({
                                        ...action,
                                        title: `${action.title} - срок ${action.executeDeadline}`,
                                    })),
                                className: 'counter--overdue',
                            },
                            {
                                name: 'Текущий контроль',
                                actions: this.filterTasksByStatus((question.tasks.list || { task: [] }).task, 'CURRENTCONTROL'),
                            },
                            {
                                name: 'Снято с контроля',
                                actions: this.filterTasksByStatus((question.tasks.list || { task: [] }).task, 'REMOVE_CONTROL'),
                                className: 'counter--out-of-control',
                            },
                        ],
                        consideration: question.approvalSubject,
                        interestedOrgs: ((question.interestedOrgs || {}).interestedOrg || [])
                            .map(org => org.name),
                        files: (question.files || { file: [] }).file
                            .map(file => ({
                                id: file.fileId,
                                title: file.fileName,
                                size: file.fileSize,
                                type: file.fileType,
                            })),
                        participants: (question.participants || { participant: [] }).participant,
                    }));

                    this.paginator.itemsCount = Number(castedXml.root.confMeetingQuestionsCnts.rowSet.row.cntAll);
                    if (!this.statuses.length)
                        this.statuses = [
                            {
                                name: 'на основании',
                                itemsCount: Number(castedXml.root.confMeetingQuestionsCnts.rowSet.row.cntByAppeal),
                                statusId: 'BY_APPEAL',
                                selected: false,
                            },
                            {
                                name: 'внепланово',
                                itemsCount: Number(castedXml.root.confMeetingQuestionsCnts.rowSet.row.cntUnplanned),
                                statusId: 'UNPLANNED',
                                selected: false,
                            },
                            {
                                name: 'повторно',
                                itemsCount: Number(castedXml.root.confMeetingQuestionsCnts.rowSet.row.cntRepeated),
                                statusId: 'REPEATED',
                                selected: false,
                            },
                        ];

                    this.loadingState.loading = false;
                }, () => {
                    this.loadingState.error = true;
                });
        },
    },
    mounted() {
        this.searchQuestions();
    },
};
</script>

<style scoped lang="stylus">
#meeting-items
    margin 0 20px

.filters-by-status
    height 50px
    display flex
    padding 0 15px
    align-items center
    font-size 13px

.statuses
    display flex
    align-items center
    margin-left 15px

.status
    display flex
    align-items center
    border-radius 10px
    border 1px solid #e2e2e2
    padding 2px 10px
    cursor pointer
    user-select none
    transition 0.2s

    &:not(:first-child)
        margin-left 10px

.status.selected,
.status:hover
    border-color var(--portal-button-blue)
    background-color white

.list-loader
    height 500px

.when-no-results
    display flex
    align-items center
    flex-direction column
    font-size 18px
    user-select none

    & > b
        color var(--portal-linkblue)
        margin-bottom 30px

    & > img
        display block

    & > p
        display block

.paginator
    background-color initial
    border initial


</style>
