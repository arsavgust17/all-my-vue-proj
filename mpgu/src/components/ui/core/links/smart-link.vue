<template lang="pug">
    a(v-if="!isInner" :href="to")
        slot
    router-link(v-else :to="to" :key="$route.fullPath" exact-active-class="current")
        slot
</template>

<script>
    export default {
        name: 'smart-link',
        props: {
            to: {
                required: true,
            },
            isInner: {
                type: Boolean,
                default: true,
            },
        },
    };
</script>


<style scoped lang="stylus">
    a
        text-decoration none
        transition 0.2s
        color: var(--portal-linkblue)
        &:hover
            color var(--portal-link-hover)
</style>
