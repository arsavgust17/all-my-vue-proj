export default {
    computed: {
        currentWorkGroup() {
            return this.$store.state.workGroups[this.$route.params.workGroup];
        },
    },
};
