<template lang="pug">
    .order-process-card
        .report(v-if="report.text")
            .title Отчет
                span(v-if="report.createDate")  от {{ report.createDate }}
            .text {{ report.text }}
            .files
                .file(v-for="file in report.files" :key="file.link")
                    .file-icon
                        img(:src='`${$router.options.base}/file-icon-as-OTHER.png`')
                    .file-link
                        FileLink(:id="file.id" :name="file.name" download) {{ file.name }}
        .resolution(v-if="report.resolution")
            .title Резолюция
                span(v-if="report.resolutionDate")  от {{ report.resolutionDate }}
            .text {{ report.resolution }}

</template>

<script>
import FileLink from '@/components/ui/core/links/file-link.vue';

export default {
    name: 'order-process-item',
    components: {
        FileLink,
    },
    props: {
        report: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="stylus" scoped>
.order-process-card
    padding 15px 0
    font-size 13px
    border-bottom 1px solid #ddd

    .resolution
        margin-top 15px

.title
    font-weight bold

    &::after
        content ':'

.files
    display flex
    margin-top 5px

.file
    display flex
    align-items center
    margin-right 10px

.file-icon
    margin-right 0

    & > img
        display block

.file-link
    font-size 12px
</style>
