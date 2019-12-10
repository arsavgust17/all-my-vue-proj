<template lang="pug">
    .column-content(:class="column.classNames" v-html="data[column.property]")
</template>

<script>
    export default {
        name: 'table-html-cell',
        props: {
            data: {
                type: Object,
                required: true,
            },
            column: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style scoped lang="stylus">
    .column-content
        flex-shrink 0
        padding-right 10px
        box-sizing border-box
        word-break break-word
        white-space  pre-wrap
        .as-rest-of-space
            flex-shrink 1
        &>>>.in-column-link
            color var(--portal-button-blue)
            text-decoration none
            transition color 0.05s
            &:hover
                color var(--on-link-hover-color)
</style>
