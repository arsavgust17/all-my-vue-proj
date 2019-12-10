<template lang="pug">
    .data-block(:id="id")
        .block-title {{ title }}
        .block-fields
            Field(v-for="(field, index) in fields" :key="index" :title="field.title" :values="field.values")
</template>


<script>
    import Field from '@/components/ui/questions/card/field.vue';

    export default {
        name: 'fields-block',
        components: { Field },
        props: {
            title: {
                type: String,
                default: '',
            },
            id: {
                type: String,
                default: '',
            },
            fields: {
                type: Array,
                default: () => ({}),
            },
        },
    };
</script>

<style scoped lang="stylus">
    .data-block:not(:first-child)
        margin-top 35px
    .block-title
        font-size 19px
        font-weight 600
        margin-bottom 20px
</style>
