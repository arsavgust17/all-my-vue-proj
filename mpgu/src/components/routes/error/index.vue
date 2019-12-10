<template lang="pug">
.error
    .status {{status}}
    .message {{preparedMessage}}
</template>

<script>
    export default {
        name: 'error',
        props: {
            status: {
                type: Number,
                default: 404,
            },
            message: {
                type: String,
            },
        },
        data: () => ({
            messagesByStatus: {
                404: 'Запрашиваемая страница или файл не найдены',
            },
        }),
        computed: {
            preparedMessage() {
                return this.message || this.messagesByStatus[this.status];
            },
        },
    };
</script>

<style lang="stylus" scoped>
.error
    display flex
    flex-direction column
    align-items center
    padding 150px 0

    .status
        font-size 100px

    .message
        font-size 20px

</style>
