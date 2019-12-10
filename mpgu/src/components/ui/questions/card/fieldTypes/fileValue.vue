<template lang="pug">
    div
        FileLink(:id="data.id" :is-inner="false") {{ data.name }}
        span.file-size {{ data.size }}
</template>

<script>
    import FileLink from '@/components/ui/core/links/file-link.vue';

    export default {
        name: 'fileValue',
        components: { FileLink },
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style scoped lang="stylus">
    span.file-size
        color #ccc
        font-size 14px
        margin-left 5px
        &::after
            content ')'
            margin-left 1px
            font-size calc(100% + 1px)
        &::before
            content '('
            margin-right 1px
            font-size calc(100% + 1px)

</style>
