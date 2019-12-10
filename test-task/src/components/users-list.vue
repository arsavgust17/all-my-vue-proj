<template lang="pug">
.list
  UsersListBlock(
  v-for="user in users"
  :key="user.id"
  :user="user"
  :number="user.order"
  )
</template>

<script>
import UsersListBlock from '@/components/users-list-block.vue';

export default {
  name: 'users-list',
  components: {
    UsersListBlock,
  },
  // я бы прокидывал массив пользователей через props,
  // но т.к. по заданию необходимо использовать Vuex,
  // то буду класть эти данные во Vuex
  props: {},
  computed: {
    users() {
      return this.$utils.clone(this.$store.getters['Rating/getUsers']);
    },
  },
};
</script>

<style lang="stylus" scoped>
.list
  padding 25px

>>>.user.third
  padding-bottom 25px
</style>
