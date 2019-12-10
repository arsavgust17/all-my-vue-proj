<template lang="pug">
.column-content(:class="column.classNames")
    .subject(v-if="preparedData.subject") {{ preparedData.subject }}
    b(v-if="preparedData.decision") Решили:
    .decision(v-if="preparedData.decision") {{ preparedData.decision }}
</template>

<script>
    export default {
        name: 'history-decision',
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
        computed: {
            preparedData() {
                const { data } = this;
                const result = this.$utils.clone(data);

                if (result.decision) result.decision = result.decision.replace('Приняты решения:\n', '');

                return result;
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

        & .as-rest-of-space
            flex-shrink 1

        & >>> .in-column-link
            color var(--portal-button-blue)
            text-decoration none
            transition color 0.05s

        & >>> .in-column-link:hover
            color var(--on-link-hover-color)
</style>
