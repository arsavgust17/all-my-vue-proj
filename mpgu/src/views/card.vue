<template lang="pug">
#card
    MainHeader(ref="mainHeader")
    main
        router-view
    MainFooter
</template>

<script>
import MainHeader from '@/components/ui/core/main-header.vue';
import MainFooter from '@/components/ui/core/main-footer.vue';

import { SET_CURRENT_USER_DATA } from '@/store/mutation-types';
import { CURRENT_USER_INFO } from '@/services/global/$xmlApi/consts';

export default {
    name: 'card-view',
    components: {
        MainHeader,
        MainFooter,
    },
    provide() {
        return {
            getMainHeaderHeight: this.getMainHeaderHeight,
        };
    },
    created() {
        this.$xmlApi.get(CURRENT_USER_INFO)
            .then(({ XML }) => {
                if (XML.ROOT.CURRENT_USER_INFO)
                    this.$store.commit(SET_CURRENT_USER_DATA, this.$xml.castFieldsToCamelCase(XML.ROOT.CURRENT_USER_INFO.ROW_SET.ROW));
            }, () => {
                this.$store.commit(SET_CURRENT_USER_DATA, {
                    login: 'guest',
                    fio: 'Гость',
                });
            });
    },
    methods: {
        getMainHeaderHeight() {
            return this.$refs.mainHeader.$el.offsetHeight;
        },
    },
};
</script>

<style lang="stylus" scoped></style>
