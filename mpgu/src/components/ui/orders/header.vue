<template lang="pug">
.order-header-component
    .order-status(v-if="order.statusColor && order.statusName" :style="{ backgroundColor: order.statusColor }") {{order.statusName}}
    .type(v-if="order.type === 'CONF_GZK'") Рабочая группа ГЗК по вопросам градостроительной деятельности
    .title-wrapper
        .order-title {{ order.num }} {{ order.name }}
        .question-link(v-if="question")
            SmartLink(:to='question.smartLink') {{ question.title }}

    .question-info(v-if="question.questionSubject || questionAddressAndCadastres || questionInvestors.length")
        .subject(v-if="question.questionSubject")
            i.fas.fa-file.icon
            div {{ question.questionSubject }}

        .address(v-if="questionAddressAndCadastres")
            i.fas.fa-map-marker-alt.icon
            div {{ questionAddressAndCadastres }}

        .place(v-if="questionInvestors.length")
            i.fas.fa-briefcase.icon
            .investors(v-for="investor in questionInvestors") {{ investor }}

    Tabs(v-if='tabs' :tabs='preparedTabs')
    .actions(v-if='actions.length')
        .actions-button
            i.fas.fa-cog
        ActionsPopupList(:actions='actions' from-where='bottom')
</template>

<script>
import ActionsPopupList from '@/components/ui/controls/actions-popup-list.vue';
import Tabs from '@/components/ui/core/tabs.vue';
import SmartLink from '@/components/ui/core/links/smart-link.vue';

export default {
    name: 'order-header',
    components: { SmartLink, Tabs, ActionsPopupList },
    props: {
        order: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        tabs: [
            {
                name: 'order-card',
                title: 'Поручение',
            },
            {
                name: 'order-process',
                title: 'Ход исполнения',
            },
        ],
    }),
    computed: {
        actions() {
            try {
                return this.order.actions.topButton || [];
            } catch (e) {
                return [];
            }
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
        question() {
            const question = this.$utils.get(this.order, 'questions.questionInfo', [])[0];

            return {
                ...question,
                title: this.makeQuestionTitle(question),
                smartLink: this.makeQuestionSmartLink(question),
            };
        },
        questionAddressAndCadastres() {
            const { question } = this;
            const { questionAddress } = question;
            const result = [];

            const cadastres = this.$utils.get(question, 'cadastrs.cadNum', [])
                .map(cadastre => `кад.№ ${cadastre}`);

            if (questionAddress) result.push(questionAddress);

            return result.concat(cadastres).join(' ');
        },
        questionInvestors() {
            return this.$utils.get(this.question, 'investors.invName', []);
        },
    },
    methods: {
        makeQuestionTitle(question) {
            const titleArray = [];

            if (question.confName) titleArray.push(question.confName);
            if (question.confDate) titleArray.push(`от ${question.confDate}`);
            if (question.confNumber) titleArray.push(`№${question.confNumber}`);
            if (question.questionNum) titleArray.push(`п.${question.questionNum}`);

            return titleArray.join(' ');
        },
        makeQuestionSmartLink(question) {
            return {
                name: 'question-card',
                params: {
                    id: question.questionId,
                },
            };
        },
    },
};
</script>

<style scoped lang="stylus">
.order-header-component
    padding 20px 20px 0
    background-color #F2F6FA
    border-bottom 1px solid #ccc
    position relative

.title-wrapper
    display flex
    margin-bottom 15px

.order-status
    position absolute
    top 10px
    right 10px
    color white
    font-size 13px
    padding 5px 10px
    cursor default
    border-radius 3px

.order-title
    font-size 22px
    color black

.type
    font-size 13px
    margin-bottom 10px
    color var(--portal-grey)

.address
.subject
    margin-bottom 15px

.address
.subject
.place
    display flex
    align-items center
    font-size 15px

.investors
    margin-right 7px

.question-link
    font-size 22px
    margin-left 5px

.actions
    position absolute
    right 30px
    top 50px

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

.question-info
    .icon
        width 12px
        font-size 13px
        color var(--portal-grey)
        margin-right 10px
</style>
