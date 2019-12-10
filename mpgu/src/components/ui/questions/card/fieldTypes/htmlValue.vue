<template lang="pug">
.value(v-html="data.html")
</template>

<script>
export default {
    name: 'htmlValue',
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped lang="stylus">
.value
    white-space pre-wrap
</style>
