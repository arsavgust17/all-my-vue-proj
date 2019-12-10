<template lang="pug">
    #file-mini-block
        FileLink(:id="id") {{ name }}
        .uploaded-by {{ uploadedBy }}
</template>

<script>
    import FileLink from '@/components/ui/core/links/file-link.vue';

    export default {
        name: 'file-mini-block',
        components: { FileLink },
        props: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            uploadedBy: {
                type: String,
                default: '',
            },
        },
    };
</script>

<style scoped lang="stylus">
    .uploaded-by
        color var(--portal-grey)
        font-size 10px
</style>
