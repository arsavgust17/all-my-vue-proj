<template lang="pug">
#object-header
    .card-type
        img(:src="`${$router.options.base}objects/card-type-icon.png`")
        | Объект строительства
    .objects-title
        | пос. Рязановское, д. Алхимово кад.№ 77:20:0020441:1264 кад.№ 77:20:0020441:1265 кад.№ 77:20:0020441:1266 кад.№ 77:20:0020441:1267 кад.№ 77:20:0000000:232 (НАО)
    .object-type Жилая застройка
        Tabs(:tabs="tabs")
</template>

<script>
    import Tabs from '@/components/ui/core/tabs.vue';

    export default {
        name: 'object-header',
        components: { Tabs },
        computed: {
            tabs() {
                return [
                    {
                        title: 'Объект',
                        to: {
                            name: 'object-card',
                            params: { id: this.$route.params.id },
                        },
                    },
                    {
                        title: 'ТЭП',
                        to: {
                            name: 'object-indicators',
                            params: { id: this.$route.params.id },
                        },
                    },
                    {
                        title: 'История рассмотрения',
                        to: {
                            name: 'object-history',
                            params: { id: this.$route.params.id },
                        },
                    },
                ];
            },
        },
    };
</script>

<style scoped lang="stylus">
    #object-header
        background-color #f2f6fa
        border-bottom 1px solid #e7e8ec
        padding 10px 30px 0
        .card-type
            font-size 16px
            color #7D8FA4
            display flex
            align-items center
            margin-left -5px
            margin-bottom 20px
            &>img
                display block
                margin-right 10px
        .objects-title
            font-size 18px
            margin-bottom 5px
        .object-type
            font-size 16px
            color #006699
            margin-bottom 10px
</style>
