<template lang="pug">
.main-data
    FieldsBlock(v-for="block in fieldGroups" :key="block.title" :title="block.title" :id="block.id" :fields="block.fields")
</template>

<script>
    import FieldsBlock from '@/components/ui/core/fields-block.vue';

    export default {
        name: 'main-part',
        components: { FieldsBlock },
        props: {
            fieldGroups: {
                type: Array,
                required: true,
            },
        },
    };
</script>

<style scoped lang="stylus">
.main-data
    padding 30px
    box-sizing border-box
    flex-grow 1
</style>
