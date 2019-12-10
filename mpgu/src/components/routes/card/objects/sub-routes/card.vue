<template lang="pug">
#card
    .info-block
        .title Общая информация
        .info
            .info-column
                .field
                    .field-icon
                        img(:src="`${$router.options.base}objects/1.png`")
                    .field-values
                        .value пос. Рязановское, д. Алхимово (НАО)
                .field
                    .field-icon
                        img(:src="`${$router.options.base}objects/2.png`")
                    .field-values
                        .value Городской бюджет
                .field
                    .field-icon
                        img(:src="`${$router.options.base}objects/3.png`")
                    .field-values
                        .value Многоквартирные жилые дома
            .info-column
                .field
                    .field-icon
                        img(:src="`${$router.options.base}objects/4.png`")
                    .field-values
                        .value 77:20:0000000:2324
                        .value 77:20:0020441:1267
                        .value 77:20:0020441:1266
                        .value 77:20:0020441:1265
                        .value 77:20:0020441:1264
            .info-column
                .field
                    .field-icon
                        img(:src="`${$router.options.base}objects/5.png`")
                    .field-values
                        .value
                            | Общая площадь:
                            b 365307,00 м²
    .info-block.decision
        .title Решение по объекту
        .info
            Field(v-for="field in fieldData" :title="field.title" :values="field.values")
</template>

<script>
import Field from '@/components/ui/questions/card/field.vue';

export default {
    name: 'card',
    components: { Field },
    data() {
        return {
            fieldData: [
                {
                    title: 'Решение',
                    values: [{
                        type: 'href',
                        data: {
                            name: 'Рассмотрение на ГЗК от 15.11.2018 №27 п.49',
                            href: '',
                        },
                    }],
                },
                {
                    title: 'Решение по объекту',
                    values: [{
                        type: 'html',
                        data: {
                            html: 'ПЗЗ / Публичные слушания',
                        },
                    }],
                },
                {
                    title: 'Решение по протоколу',
                    values: [{
                        type: 'html',
                        data: {
                            html: 'О внесении изменений в правила землепользования и застройки города Москвы в отношении территории по адресу: пос. Рязановское, вблизи д. Алхимово (НАО).',
                        },
                    }],
                },
            ],
        };
    },
};
</script>

<style scoped lang="stylus">
#card
    min-height 500px
    padding 30px 40px

.info-block
    & > .title
        font-size 19px
        margin-bottom 10px

    &:not(:first-child)
        margin-top 30px

    &.decision
        font-size 14px

        & > .info
            display block

.info
    display flex
    justify-content space-between

.info-column
    margin-right 50px

.field
    display flex
    align-items center

    &:not(:first-child)
        margin-top 15px

.field-icon
    margin-right 10px
    width 24px
    display flex
    align-items center
    justify-content center
    height 24px
    align-self flex-start

    & > img
        display block
        max-height 24px
        max-width 24px


</style>
