<template lang="pug">
#meeting-info
    .info-block(v-for='group in personsGroups' v-if='group.items' :key='group.title')
        .title {{ group.title }}
        .participants
            .participant(v-for='item in group.items' :key='item.lastName')
                .fio {{ item.lastName }} {{ item.firstName }} {{ item.middleName }}
                .extra-info {{ item.position }}, {{ item.personRole }}

    .info-block(v-for='filesGroup in filesGroups' v-if='filesGroup.items' :key='filesGroup.title')
        .title {{ filesGroup.title }}
        .files
            FileMiniBlock(v-for='item in filesGroup.items' :key='item.fileId' :id='item.fileId' :name='item.fileName' :uploaded-by='item | uploaderInfo')
    .orders-counter
        .title Всего поручений – {{ sumOfCounters }}
        .counters
            .counter(v-for='counter in counters', :key='counter.title')
                .count(:class='counter.className') {{ counter.actions.length }}
                .title {{ counter.name }}
                ActionsPopupList(v-if='counter.actions && counter.actions.length', :actions='counter.actions')
</template>

<script>
import FileMiniBlock from '@/components/ui/core/file-mini-block.vue';
import ActionsPopupList from '@/components/ui/controls/actions-popup-list.vue';

export default {
    name: 'meeting-info',
    components: { ActionsPopupList, FileMiniBlock },
    props: {
        personsGroups: {
            type: Array,
            default: () => ([]),
        },
        filesGroups: {
            type: Array,
            default: () => ([]),
        },
        counters: {
            type: Array,
            default: () => ([]),
        },
        actions: {
            type: Array,
            default: () => ([]),
        },
    },
    filters: {
        uploaderInfo(object) {
            return [object.uPerson, object.uPersonPosition, object.uDateTime].filter(value => value).join(' ');
        },
    },
    computed: {
        sumOfCounters() {
            return this.counters.reduce((acc, counter) => (acc + counter.actions.length), 0);
        },
    },
};
</script>

<style scoped lang="stylus">
#meeting-info
    display flex
    padding 25px 45px
    background white
    border 1px solid #e7e8ec
    box-sizing border-box

.info-block
    width 245px
    padding-right 45px
    & > .title
        font-size 18px
        margin-bottom 15px
        user-select none

.info-block > .files > *:not(:first-child),
.participant:not(:first-child)
    margin-top 20px

.participants,
.files
    font-size 14px

.participant > .extra-info,
.file > .extra-info
    font-size 11px
    color var(--portal-grey)

.orders-counter
    width 240px
    margin-left auto
    & > .title
        font-size 18px
        text-align center
    & > .counters
        display flex
        flex-wrap wrap

.counters
    & > .counter
        width 50%
        padding 10px 0
        box-sizing border-box
        text-align center
        position relative
        user-select none
        cursor pointer

.counter
    & > .count
        font-size 28px
    & > .counter--out-of-control
        color #8FB400
    & > .counter--overdue
        color #D2008D
    & > .title
        color var(--portal-grey)
        font-size 13px
</style>
