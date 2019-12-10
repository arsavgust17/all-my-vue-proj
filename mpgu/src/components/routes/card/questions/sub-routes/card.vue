<template lang="pug">
main
    MainPart(:field-groups="fieldGroups")
    SidePart(v-if="participants || materialsGroups" :participants="participants" :materials-groups="materialsGroups" :question-history="questionHistory")

</template>

<script>
import MainPart from '@/components/ui/questions/card/main-part.vue';
import SidePart from '@/components/ui/questions/card/side-part.vue';

export default {
    name: 'main-card',
    components: { SidePart, MainPart },
    props: {
        question: {
            type: Object,
        },
    },
    computed: {
        participants() {
            return this.question.participants;
        },
        materialsGroups() {
            return this.question.materialsGroups;
        },
        questionHistory() {
            return this.question.questionHistory;
        },
        fieldGroups() {
            return this.$utils.get(this.question, 'fieldsGroups', [])
                .map(group => {
                    const clearedGroup = { title: group.title, fields: [] };
                    if (group.id)
                        clearedGroup.id = group.id;

                    (group.fields || []).forEach(field => {
                        const clearedField = { title: field.title, values: [] };

                        (field.values || []).forEach(value => {
                            if (value.type === 'html' && !value.data.html)
                                return;
                            if (value.type === 'href' && (!value.data || !value.data.name))
                                return;

                            clearedField.values.push(value);
                        });

                        if (clearedField.values.length)
                            clearedGroup.fields.push(clearedField);
                    });

                    return clearedGroup;
                })
                .filter(clearedGroup => clearedGroup.fields.length);
        },
    },
};
</script>

<style scoped lang="stylus">
.loader
    height 500px

main
    display flex
</style>
