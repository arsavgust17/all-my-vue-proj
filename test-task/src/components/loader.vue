<template lang="pug">
.spin-col
  Spin(fix)
    Icon.spin-icon-load(
    type="ios-loading"
    size=18
    )
    .loading-text {{ loadingTextValue }}
</template>

<script>
export default {
  name: 'loader',
  props: {
    loadingText: {
      default: 'Загрузка...',
    },
  },
  computed: {
    loadingTextValue() {
      return this.loadingText;
    },
  },
};
</script>

<style lang="stylus" scoped>
.spin-icon-load
  animation animation-spin 1s linear infinite

@keyframes animation-spin
  from
    transform rotate(0deg)
  50%
    transform rotate(180deg)
  to
    transform rotate(360deg)

.spin-col
  height 700px
  position relative

</style>
