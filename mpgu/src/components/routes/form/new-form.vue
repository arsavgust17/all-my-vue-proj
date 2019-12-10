<template lang="pug">
.wrapper
    .form
        .block
            h1 Заседание
            .form-line
                .form-element
                    .element-label.required.type Вид заседания
                    .element-input
                        input.type-input(type="text")
                .form-element
                    .element-label.required.date от
                    .element-input
                        DatePicker(
                        v-model="dataInput"
                        lang="ru"
                        placeholder="__.__.____"
                        format="DD.MM.YYYY"
                        width="115"
                        )
                .form-element
                    .element-label.time Время
                    .element-input
                        DatePicker(
                        lang="ru"
                        v-model="timeInput"
                        type="time"
                        placeholder="__:__"
                        format="hh:mm"
                        width="90"
                        :time-picker-options="{start: '00:10', step:'00:10' , end: '23:50'}"
                        )
                .form-element
                    .element-label.number.required Номер заседания
                    .element-input
                        input.number-input(type="number" min="1" v-model="stateNumber")
                .form-element
                    .element-label.state Статус
                    .element-input
                        <!--CommonSelect(:options="options")-->
        .block.white-block
            h1 Повестка
            textarea(placeholder="Примечание")
</template>
s
<script>
import DatePicker from 'vue2-datepicker';
import CommonSelect from '@/components/ui/controls/common-select.vue';

export default {
    name: 'new-form',
    components: {
        DatePicker,
        CommonSelect,
    },
    data() {
        return {
            dataInput: '',
            timeInput: '',
            stateNumber: '',
        };
    },
};
</script>

<style lang="stylus" scoped>
.wrapper
    margin 0
    padding 10px
    display flex
    flex-direction column
    align-items center

.form
    width 880px

.block
    margin-bototm 10px
    padding-bottom 10px

    h1
        font-size 22px
        text-align center

    .form-line
        display flex

        flex-wrap wrap

        &:not(:last-child)
            margin-bottom 10px


.form-element
    display flex

    .element-label
        text-align right
        padding 0 10px
        line-height 32px
        vertical-align middle

    .element-input

        input
            line-height 30px
            height 32px
            padding 0 10px
            outline none
            font-size 14px

.type
    width 154px

.type-input
    width 100px

.date
    width 40px

.time
    width 77px

.number
    width 152px

.number-input
    width 120px

.state
    width 92px

.white-block
    padding 24px
    border 1px solid #e7e8ec
    border-radus 5px
    background #fff

    h1
        font-size 22px
        text-align left
        margin 0
        margin-bottom 10px

    textarea
        width 100%
        min-height 40px

.required
    &::after
        content '*'
        color red
</style>
