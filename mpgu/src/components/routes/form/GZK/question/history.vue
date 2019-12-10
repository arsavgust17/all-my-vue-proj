<template lang="pug">
.wrapper
    .form
        .title-row
            .title Редактирование цепочки рассмотрения
            Tooltip(placement="bottom" theme="light" max-width="200" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque iusto, laboriosam nulla odit porro repellendus.")
                i.far.fa-question-circle
        .parent-question
            Select(label-in-value)
                Option(v-for="option in options" :key="options.value" :value="option" :label="option") {{ option }}
            .text-area.border Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt distinctio, fuga iusto maxime minima nisi odit porro quae reprehenderit saepe?
        .current-question
            a(href="#") Lorem ipsum dolor sit amet.
            .text Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt distinctio, fuga iusto maxime minima nisi odit porro quae reprehenderit saepe?
        .child-question
            Select(label-in-value)
                Option(v-for="option in options" :key="options.value" :value="option" :label="option") {{ option }}
            .text-area Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque iusto, laboriosam nulla odit porro repellendus.
        .error-description
            .error-title Описание ошибки
            Input(type="textarea" :autosize="{minRows: 3}")
        .button
            Button(@click="submitHistory" size="large" type="primary" style="margin-top: 10px") Сохранить
</template>

<script>
import InfoTooltip from '@/components/ui/controls/info-tooltip.vue';
import axios from 'axios';

export default {
    name: 'history',
    components: {
        InfoTooltip,
    },
    data() {
        return {
            options: [
                1,
                2,
                3,
            ],
        };
    },
    mounted() {
        axios
            .post(`/ugd/submit/simpleSubmit.action?action=get_conf_question_history_form&documentId=${this.getDocumentId}`, {
                action: 'get_conf_question_history_form',
                documentId: this.getDocumentId,
            })
            .then(({ data }) => {
                console.log(data);
            });
    },
    computed: {
        getDocumentId() {
            return this.$route.params.id;
        },
    },
    methods: {
        submitHistory() {
            console.log('Yey!');
        },
    },
};
</script>

<style lang="stylus" scoped>
.wrapper
    display flex
    justify-content center

.form
    box-sizing border-box
    margin 20px
    padding 20px 30px
    background #fff
    border-radius 5px
    width 900px
    border 1px solid rgb(231, 232, 236)

.title-row
    display flex
    justify-content center
    align-items baseline
    margin 10px 0 20px 0

    i
        color var(--portal-linkblue)
        font-size 15px

.title
    font-size 22px
    font-weight 700
    font-style normal
    margin-right 10px

.parent-question
    padding 20px
    position relative
    border-left 1px solid rgb(211, 217, 222)

    &::before
        content ''
        position absolute
        width 5px
        background #fff
        height 30px
        top 0
        left -3px

    &::after
        content ''
        position absolute
        box-sizing border-box
        left -6.5px
        top 30px
        width 11px
        height 11px
        z-index 10
        border-radius 50%
        background #fff
        border 2px solid #1890FF

.current-question
    padding 20px
    position relative
    border-left 1px solid rgb(211, 217, 222)

    &::after
        content ''
        position absolute
        box-sizing border-box
        left -6.5px
        top 26px
        width 11px
        height 11px
        z-index 10
        border-radius 50%
        background #fff
        border 2px solid rgb(211, 217, 222)

    a
        font-size 18px
        margin-bottom 5px
        color var(--portal-linkblue)
        transition color 0.2s ease

        &:hover
            color var(--portal-link-hover)

.child-question
    padding 20px
    position relative

    &::before
        content ''
        position absolute
        height 30px
        border-left 1px solid rgb(211, 217, 222)
        top 0
        left 0

    &::after
        content ''
        position absolute
        box-sizing border-box
        left -5px
        top 30px
        width 11px
        height 11px
        z-index 10
        border-radius 50%
        background #fff
        border 2px solid #1890FF

.error-title
    margin 20px 0 10px 0
    font-size 20px

.text-area
    margin-top 10px
    border-radius 3px
    border 1px solid rgb(211, 217, 222)
    background rgb(250, 251, 253)
    padding 10px 5px

.error-description
    margin 0 20px

    textarea
        width 100%
        height 70px

.button
    display flex
    justify-content center
</style>
