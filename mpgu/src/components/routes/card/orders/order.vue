<template lang="pug">
.order-component.container
    Loader(v-if="loadingState.loading" class="headerLoader" :is-failed="loadingState.error")
    OrderHeader(v-else-if="order" :order="order")
    router-view(v-if="order" :key="$route.fullPath" :order="order" :order-process="orderProcess")
</template>

<script>
import Loader from '@/components/ui/core/loader.vue';
import OrderHeader from '@/components/ui/orders/header.vue';
import { loadingStateMixinGenerator } from '@/mixins/common/loadingStateMixinGenerator';

export default {
    name: 'order',
    mixins: [loadingStateMixinGenerator()],
    components: {
        OrderHeader,
        Loader,
    },
    data: () => ({
        order: null,
        orderProcess: {},
    }),
    mounted() {
        this.$xmlApi
            .get('CARD$FUNCTIONAL_TASKS$TASKS_XML', {
                params: { documentId: this.$route.params.id },
            })
            .then(({ XML }) => {
                this.loadingState.loading = false;

                const orderData = this.$xml.castFieldsToCamelCase(
                    this.$xml.castSomeFieldsToArrays(
                        XML.ROOT.FT_CARD_TASKS.XMLDOC.TASK,
                        ['ACCOMPLICE', 'COEXECUTOR', 'WATCHER', 'DOCUMENT', 'FILE', 'QUESTION_INFO', 'BUTTON',
                            'POSITION', 'INV_NAME', 'CAD_NUM', 'ORDER_NUM'],
                    ),
                );

                console.log(orderData.ORDER_NUM);

                this.order = this.$utils.clone(orderData);
            });

        this.$xmlApi
            .get('CARD$FUNCTIONAL_TASKS$PROGRESS_EXECUTION_XML', {
                params: { documentId: this.$route.params.id },
            })
            .then(({ XML }) => {
                const xml = this.$xml
                    .castFieldsToCamelCase(
                        this.$xml.castSomeFieldsToArrays(
                            this.$utils.get(XML, 'ROOT.FT_PROGRESS_EXECUTION.XMLDOC.TASKS', []),
                            ['REPORTS'],
                        ),
                    );

                console.log(xml);

                this.orderProcess = this.$utils.clone(xml);
            });
    },
};
</script>

<style scoped lang="stylus">
.order-component
    max-width 1200px
    border 1px solid #ccc
    box-sizing border-box
    display flex
    flex-direction column
    flex-grow: 1
    border-radius 3px
    background-color white
    margin 20px auto

    & > .headerLoader
        height 161px
        background-color #F2F6FA
        display flex
        align-items center
        justify-content center

</style>
