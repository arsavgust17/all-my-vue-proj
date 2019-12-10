<template lang="pug">
    .field
        .field-title {{ title }}
        .field-values
            component.value(v-for="(value, index) in values" :key="index" :is="componentsMap[value.type]" :data="value.data")
</template>

<script>
    import IconValue from '@/components/ui/questions/card/fieldTypes/iconValue.vue';
    import FileValue from '@/components/ui/questions/card/fieldTypes/fileValue.vue';
    import HtmlValue from '@/components/ui/questions/card/fieldTypes/htmlValue.vue';
    import HrefValue from '@/components/ui/questions/card/fieldTypes/hrefValue.vue';

    export default {
        name: 'field',
        data: () => ({
            componentsMap: {
                icon: IconValue,
                html: HtmlValue,
                file: FileValue,
                href: HrefValue,
            },
        }),
        props: {
            title: {
                type: String,
                required: true,
            },
            values: {
                type: Array,
                required: true,
            },
        },
    };
</script>

<style lang="stylus" scoped>
    .block-fields>.field
        display flex
        margin-bottom 15px
    .field-title
        position relative
        display flex
        white-space nowrap
        width 230px
        heigth 100%
        flex-shrink 0
        align-self flex-start
        &::after
            content ''
            border-bottom 1px dotted #DADADA
            width 100%
            margin-bottom 4px
            margin-left 10px
            margin-rigth 5px
</style>
