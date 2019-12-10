<template lang="pug">
  #app
    main.router-view
      .wrapper
        router-view
</template>

<style lang="stylus">
@import './assets/global-styles.styl'

*
  margin 0
  padding 0
  box-sizing border-box

html,
body
  height 100%
  min-height 100%

html body
  font-family 'PTSans', sans-serif
  font-size 14px
  line-height 1.3
  color: var(--portal-text-black)
  background-color var(--portal-background)

#app
  height 100%

input
  border-radius 3px
  border 1px solid var(--border-gray)

.router-view
  padding 2% 0
  display flex
  flex-direction column
  align-items center

.wrapper
  padding 2% 5%
  flex-grow 0
  width 70%
  background var(--portal-white)
  border 1px solid var(--border-grey)
  border-radius 2px

</style>
