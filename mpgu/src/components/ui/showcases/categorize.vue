<template lang="pug">
    .categorize
        categorize-group(
            v-if="!isLoading"
            v-for="group in groups"
            :key="group.ID"
            :title="group.TITLE"
            :id="group.ID"
            :items-count="+group.AMOUNT"
            :groups="toPrettyGroups(group)"
            :filters="filters"
            color="#FFFFFF"
        )

        .when-data-loading(v-if="isLoading")
            Loader.when-data-loading

        .when-data-loading(v-else-if="!isLoading && !groups.length")
            .when-no-data Данные не найдены
</template>

<script>
    import CategorizeGroup from '@/components/ui/showcases/categorize-group.vue';
    import Loader from '@/components/ui/core/loader.vue';

    export default {
        name: 'categorize',
        components: {
            Loader,
            CategorizeGroup,
        },
        props: {
            groups: {
                type: Array,
            },
            isLoading: {
                type: Boolean,
            },
            filters: {
                type: Array,
                default: () => ([]),
            },
        },
        methods: {
            toPrettyGroups(group) {
                if (!group.SUB_GROUPS || !group.SUB_GROUPS.SUB_GROUP)
                    return [];

                return this.$xml.asArray(group.SUB_GROUPS.SUB_GROUP);
            },
        },
    };
</script>

<style scoped lang="stylus">
.categorize
    display flex
    flex-direction column
    & > .categorize-group
        &:not(:first-child)
            border-top 1px solid #e7e8ec
        & > .group-title
            border-left 1px solid #e7e8ec
            border-right 1px solid #e7e8ec

.when-data-loading
    background white
    height 500px
    display flex
    align-items center
    justify-content center

.when-no-data
    font-size 20px !important


</style>
