<template lang="pug">
#object
    .page-navigation Объекты ГЗК / Карточка объекта
    .card
        ObjectHeader
        router-view

</template>

<script>
    import ObjectHeader from '@/components/ui/objects/header.vue';

    export default {
        name: 'object-card',
        components: { ObjectHeader },
    };
</script>

<style lang="stylus">
    body
        background-color: var(--portal-alt-bg)
</style>

<style scoped lang="stylus">
#object
    max-width 1200px
    border-radius 3px
    margin auto

.page-navigation
    font-size 11px
    color #8f949a
    margin-left 30px
    height 40px
    display flex
    align-items center

.card
    border 1px solid #e7e8ec
    background-color white


</style>
