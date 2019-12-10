<template lang="pug">
#question.container
    QuestionHeader(:header-data="header" :tabs="tabs" :actions="actions")
    router-view(:key="$route.fullPath" :question="question")
</template>

<script>
import QuestionHeader from '@/components/ui/questions/header.vue';
import { loadingStateMixinGenerator } from '@/mixins/common/loadingStateMixinGenerator';
import { QUESTION_HEADER, QUESTION_CARD } from '@/services/global/$xmlApi/consts';

export default {
    name: 'question',
    components: { QuestionHeader },
    mixins: [loadingStateMixinGenerator()],
    data: () => ({
        header: {},
        tabs: [
            {
                name: 'question-card',
                title: 'Карточка',
            },
            {
                name: 'question-process',
                title: 'Ход исполнения',
            },
        ],
        question: {},
        actions: [],
    }),
    mounted() {
        this.$xmlApi.get(QUESTION_CARD, {
            params: { documentId: this.$route.params.id },
        }).then(({ XML }) => {
            this.question = this.$xml.castFieldsToCamelCase(
                this.$xml.castSomeFieldsToArrays(
                    XML.ROOT.QUESTION.QUESTION,
                    ['FIELDS_GROUPS', 'FIELDS', 'VALUES', 'REPORTERS', 'MATERIALS_GROUPS', 'FILES', 'QUESTION_HISTORY'],
                ),
            );
        });
        // Грёбаный ад
        this.$xmlApi.get(QUESTION_HEADER, {
            params: { documentId: this.$route.params.id },
        }).then(({ XML }) => {
            if (!XML.ROOT.HEADER) {
                return;
            }

            const header = this.$xml.castFieldsToCamelCase(XML.ROOT.HEADER.QUESTION_HEADER);

            if (header.systemInfo.isHistoryExist === 'true')
                this.tabs.push({
                    name: 'question-history',
                    title: 'История рассмотрений',
                });

            this.header = header.headerData;
            if (header.actions)
                this.actions = this.$xml.asArray(header.actions);
        });
    },
};
</script>

<style lang="stylus">
#card
    background-color #f7f7f7
</style>

<style scoped lang="stylus">
.container
    max-width 1200px
    border 1px solid #ccc
    box-sizing border-box
    display flex
    flex-direction column
    flex-grow 1
    border-radius 3px
    background-color white
    margin 20px auto

    & > .headerLoader
        height 161px
        background-color #F2F6FA
        display flex
        align-items center
        justify-content center
</style>
