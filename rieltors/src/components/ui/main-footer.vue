<template lang="pug">
footer.footer
    .content
        .logo
            router-link(tag="img" to="/" :src="`${$router.options.base}footer-logo.svg`")
            .build-by Build by Scan Properties Team.
                br
                | Copyright ©2019
        nav.tabs
            router-link(class="tab" to="/terms-of-use" tag="div") terms of use
            router-link(class="tab" to="/license" tag="div") licence agreement
            router-link(class="tab" to="/" tag="div") privacy policy
            router-link(class="tab" to="/" tag="div") contact us

</template>

<script>
export default {
    name: 'main-footer',
}
</script>

<style lang="stylus" scoped>
.footer
    width 100%
    height 200px
    background var(--gradient-green)
    display flex
    align-items center

.content
    margin 0 auto
    width 960px
    display flex
    align-items center
    justify-content flex-start

.logo
    margin-left 30px
    display flex
    flex-direction column
    align-items flex-start
    font-size 10px
    color #fff

.tabs
    width 490px
    margin-left 100px
    color #fff
    font-size 15px
    display flex
    justify-content space-between
    align-items center

.tab
    cursor pointer
</style>
