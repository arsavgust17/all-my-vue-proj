<template lang="pug">
.object-history
    ShowcaseTable(:columns="table.columns" :is-loading="table.isLoading" :body="table.items")

</template>

<script>
import ShowcaseTable from '@/components/ui/showcases/table.vue';

export default {
    name: 'object-history',
    components: { ShowcaseTable },
    data: () => ({
        table: {
            columns: [
                {
                    title: 'Заседание',
                    property: '',
                    classNames: ['as-20-percent'],
                },
                {
                    title: 'Решение',
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
