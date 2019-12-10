<template lang="pug">
.list
  UsersListBlock(
  v-for="doc in docs"
  :key="doc.id"
  :user="doc"
  :number="doc.order"
  @click="window.href = '/rating'"
  )
</template>

<script>
import UsersListBlock from '@/components/rating/users-list-block.vue';

export default {
  name: 'users-list',
  components: {
    UsersListBlock,
  },
    props: {},
    computed: {
        docs() {
          return this.$utils.clone(this.$store.getters['Rating/getDocs']);
        },
    },
    methods: {
      goToLInk() {
          window.location = '/docs-list';
      }
    },
};
</script>

<style lang="stylus" scoped>
.list
  padding 25px

>>>.user.third
  padding-bottom 25px
</style>
