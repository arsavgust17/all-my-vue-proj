<template lang="pug">
    #form-view
        router-view
</template>

<script>
    export default { name: 'form-view' };
</script>

<style lang="stylus" scoped>
#form-view
    background var(--form-bg-grey)
    min-height 100vh
</style>
