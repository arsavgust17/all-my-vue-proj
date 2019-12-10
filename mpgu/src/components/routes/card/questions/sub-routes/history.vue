<template lang="pug">
main
    ShowcaseTable(:columns="table.columns" :is-loading="loadingState.loading" :body="table.items")

</template>

<script>
import ShowcaseTable from '@/components/ui/showcases/table.vue';
import HistoryDecision from '@/components/ui/showcases/cells/questions/history-decision.vue';
import HistoryMeeting from '@/components/ui/showcases/cells/questions/history-meeting.vue';
import { QUESTION_HISTORY } from '@/services/global/$xmlApi/consts';
import { loadingStateMixinGenerator } from '@/mixins/common/loadingStateMixinGenerator';

export default {
    name: 'history',
    mixins: [loadingStateMixinGenerator()],
    components: { ShowcaseTable },
    data: () => ({
        table: {
            columns: [
                {
                    title: 'Заседание',
                    property: 'MEETING_NUMBER',
                    classNames: ['as-20-percent'],
                    cellComponent: HistoryMeeting,
                },
                {
                    title: 'Решение',
                    property: 'DECISION',
                    classNames: ['as-rest-of-space'],
                    cellComponent: HistoryDecision,
                },
            ],
            items: [],
        },
    }),
    mounted() {
        this.$xmlApi.get(QUESTION_HISTORY, {
            params: { documentId: this.$route.params.id },
        }).then(({ XML }) => {
            if (!XML.ROOT.QUESTIONS) return;

            const rows = this.$xml.castFieldsToCamelCase(
                this.$xml.castSomeFieldsToArrays(
                    XML.ROOT.QUESTIONS.ROW_SET,
                    ['ROW'],
                ),
            );

            this.table.items = rows.row;
        }).then(() => {
            this.loadingState.loading = false;
        });
    },
};
</script>

<style scoped lang="stylus">
main
    padding 20px

.loader
    height 500px

.showcase-body
    & >>> .table-header
        top 70px
        height initial
        min-height initial
        font-size 13px

    & > .table-container
        & > .row
            border 1px solid #e7e8ec
            font-size 13px


</style>
