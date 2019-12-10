<template lang="pug">
.column-content(:class="column.classNames")
    SmartLink(:to="{\
            name: 'question-card',\
            params: {\
            id: data.docKey,\
            }\
            }")
        | {{ data.groupName }} от {{ data.meetingDate }}
        | №{{ data.meetingNumber }} п. {{ data.questionNumber }}
</template>

<script>
    import SmartLink from '@/components/ui/core/links/smart-link.vue';

    export default {
        name: 'history-meeting',
        components: { SmartLink },
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
    white-space pre-wrap
    &.as-rest-of-space
        flex-shrink 1
    & >>> .in-column-link
        color var(--portal-button-blue)
        text-decoration none
        transition color 0.05s
        &:hover
            color var(--on-link-hover-color)
</style>
