<template lang="pug">
.order-side-part-component(v-if="order")
    .order-info
        .deadline(v-if="order.executeDeadline")
            .title Срок исполнения:
            .body(:class="executeDeadlineColor") {{order.executeDeadlineStr}}
    .participants
        .participants-block(v-if="author")
            Participant(type="author" :participant="author")
        .participants-block(v-if="executor")
            Participant(type="executor" :participant="executor")
        .participants-block(v-if="accomplices.length || coexecutors.length || watchers.length")
            Participant(v-for="accomplice in accomplices" type="accomplice" :participant="accomplice")
            Participant(v-for="coexecutor in coexecutors" type="coexecutor" :participant="coexecutor")
            Participant(v-for="watcher in watchers" type="watcher" :participant="watcher")
</template>

<script>
import Participant from '@/components/ui/orders/card/side-part/participant.vue';

export default {
    name: 'side-part',
    components: { Participant },
    props: {
        order: {
            type: Object,
            required: true,
        },
    },
    computed: {
        author() {
            return this.$utils.get(this.order, 'employees.author');
        },
        executor() {
            return this.$utils.get(this.order, 'employees.executor');
        },
        accomplices() {
            return this.$utils.get(this.order, 'employees.accomplices.accomplice', []);
        },
        coexecutors() {
            return this.$utils.get(this.order, 'employees.coexecutors.coexecutor', []);
        },
        watchers() {
            return this.$utils.get(this.order, 'employees.watchers.watcher', []);
        },
        executeDeadlineColor() {
            const [day, month, year] = this.order.executeDeadlineStr.split('.');

            if (!(this.order.status === 'TASK_READY')) {
                if (new Date(year, month - 1, day) < new Date()) {
                    return 'overdue';
                }

                return 'not-overdue';
            }

            return '';
        },
    },
};
</script>

<style scoped lang="stylus">
.order-side-part-component
    width 326px
    flex-shrink 0
    background-color #f2f6fa
    padding 25px 0

    .order-info
        .order-title
            font-size 19px
            margin-left 17px
            margin-bottom 30px
            padding-right 10px

        .deadline
            margin-bottom 40px
            margin-left 17px

            .title
                font-size 14px
                font-weight bold

            .body
                font-size 19px
                font-weight bold

    .participants
        .participants-block
            margin-bottom 30px

            .participant + .participant
                margin-top 6px

    .overdue
        color red

    .not-overdue
        color green
</style>
