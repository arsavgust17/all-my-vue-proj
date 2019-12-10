<template lang="pug">
header.header
    .content
        router-link(class="logo" tag="img" to="/" :src="`${$router.options.base}header-logo.svg`")
        nav.tabs
            router-link(class="tab" tag="div" to="/") Scan
            router-link(class="tab" tag="div" to="/") Buy
            router-link(class="tab" tag="div" to="/") Documentation
        .profile
            .login(@click.stop="openPopup")
                img(:src="`${$router.options.base}log-in.svg`")
                .tab Log In
</template>

<script>
export default {
    name: 'main-header',
    data() {
        return {};
    },
    methods: {
        openPopup() {
            this.$store.commit('showPopup');
        },
    },
    mounted() {
    },
}
</script>

<style lang="stylus" scoped>
.header
    display flex
    align-items center
    width 100%
    height 100px
    background var(--portal-white)
    border-bottom 1px solid var(--border-grey)

.content
    margin 0 auto
    width 960px
    display flex
    align-items center
    justify-content space-between

.logo
    cursor pointer
    margin-left 30px

.tabs
    display flex
    justify-content space-evenly
    align-items center
    width 418px

.tab
    cursor pointer
    color var(--portal-text-black)
    font-size 18px
    font-weight 500

.login
    display flex
    align-items center
    margin-right 30px

    img
        cursor pointer
        margin-right 5px
</style>
