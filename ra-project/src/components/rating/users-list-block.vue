<template lang="pug">
.user
  .number {{ number }}
  .img
    .border(v-if="getBorder" :class="getBorder")
    img(v-if="userImg" :src="userImg")
    .picture(v-else) {{ userInitials }}
  .user-info
    .fio {{ userName }}
    .position.small-text {{ position }}
  .points
    .value {{ rating }}
    .title.small-text {{ rightDeclination(declinations, rating) }}
</template>

<script>
export default {
  name: 'users-list-block',
  props: {
    user: {
      type: Object,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      declinations: ['балл', 'балла', 'баллов'],
    };
  },
  computed: {
    id() {
      return this.user.id;
    },
    userName() {

      return `${this.user.name} ${this.user.secondName}`;
    },
    userInitials() {
      return `${this.user.name[0]}${this.user.secondName[0]}`;
    },
    userImg() {
      return this.user.img || '';
    },
    position() {
      return this.user.position;
    },
    age() {
      return this.user.age;
    },
    rating() {
      return this.user.rating;
    },
    pointsTitle() {
      return 'баллов';
    },
    getBorder() {
      switch (this.number) {
        case 1:
          return 'first';
        case 2:
          return 'second';
        case 3:
          return 'third';
        default:
          return '';
      }
    },
  },
  methods: {
    rightDeclination(declinations, count) {
      return declinations[(count % 100 > 4 && count % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][Math.min(count % 10, 5)]];
    },
  },
};
</script>

<style lang="stylus" scoped>
.border
  position absolute
  z-index 10
  width 90px
  height 80px

.img
  width 90px
  height 60px
  justify-content center
  display flex

.first
  background-image url('/laurel_gold.svg')

.second
  background-image url('/laurel_silver.svg')

.third
  background-image url('/laurel_bronze.svg')

.picture
  border-radius 50%
  width 60px
  height 60px
  display flex
  justify-content center
  align-items center
  font-size 2em
  color #FFF
  background-color #638ED0

.user
  display flex
  justify-content space-between
  align-items center
  padding-bottom 20px

.user-info
  width 60%
  display flex
  flex-direction column
  justify-content flex-start
  align-items flex-start
  align-self center

.position
  display flex
  flex-direction column

.points
  justify-content center
  display flex
  flex-direction column
  hegight 100%

.points .value, .points .title
  display flex
  justify-content flex-end
  font-weight bold

.fio
  display flex
  flex-direction column
  color var(--portal-black)
  font-weight bold
  font-size 1.3em

.small-text
  color #A2A2A2
  font-weight normal !important

.number
  align-self center


</style>
