<template lang="pug">
#object-indicators
    ShowcaseTable(:columns="table.columns" :is-loading="table.isLoading" :body="table.items")
</template>

<script>
import ShowcaseTable from '@/components/ui/showcases/table.vue';

export default {
    name: 'indicators',
    components: { ShowcaseTable },
    data: () => ({
        table: {
            columns: [
                {
                    title: 'Наименование',
                    property: '',
                    classNames: ['as-20-percent'],
                },
                {
                    title: 'До рассмотрения',
                    property: '',
                    classNames: ['as-10-percent'],
                },
                {
                    title: 'По результатам рассмотрения',
                    property: '',
                    classNames: ['as-rest-of-space'],
                },
            ],
            items: [],
            isLoading: false,
        },
    }),
};
</script>

<style scoped lang="stylus">
.showcase-body >>> .table-header
    top 69px
    height 34px
    min-height initial
    border-top none
    border-left none
    border-right none
    border-radius 0
</style>
