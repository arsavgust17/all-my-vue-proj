<template lang="pug">
.order-card-component
    MainPart(:order="order" :order-process="orderProcess")
    SidePart(:order="order")

</template>

<script>
    import MainPart from '@/components/ui/orders/card/main-part.vue';
    import SidePart from '@/components/ui/orders/card/side-part.vue';

    export default {
        name: 'card',
        props: {
            order: {
                type: Object,
                required: true,
            },
            orderProcess: {
                type: Object,
                required: true,
            },
        },
        components: { SidePart, MainPart },
    };
</script>

<style scoped lang="stylus">
    .order-card-component
        display flex
</style>
