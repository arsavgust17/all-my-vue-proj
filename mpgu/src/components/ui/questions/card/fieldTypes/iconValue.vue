<template lang="pug">
    div
        i.fas(:class="data.iconClasses")
</template>

<script>
    export default {
        name: 'iconValue',
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style scoped lang="stylus">
    .fa-check
        color #8fb400
        font-size 12px
</style>
