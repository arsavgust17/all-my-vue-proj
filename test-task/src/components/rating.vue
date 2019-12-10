<template lang='pug'>
Loader(v-if='isLoadingData')
.content(v-else)
  .header
    h1.title Рейтинг участников
    Search(@input="searchEnter")
  UsersList

</template>

<script>
import UsersList from '@/components/users-list.vue';
import Search from '@/components/search-component.vue';
import Loader from '@/components/loader.vue';

export default {
  name: 'rating.vue',
  components: {
    UsersList,
    Search,
    Loader,
  },
  data() {
    return {
      searchData: {},
      users: [
        {
          id: 1,
          name: 'Денис',
          secondName: 'Топорков',
          age: 30,
          rating: 115,
          position: 'Inventore',
        },
        {
          id: 2,
          name: 'Лукьян',
          secondName: 'Рагозин',
          age: 22,
          rating: 22,
          position: 'Служащий',
        },
        {
          id: 3,
          name: 'Ярослав',
          secondName: 'Рыжов',
          age: 45,
          rating: 10,
          position: 'Служащий',
        },
        {
          id: 4,
          name: 'Денис',
          secondName: 'Топорков',
          age: 55,
          rating: 102,
          position: 'Специалист',
        },
        {
          id: 5,
          name: 'Артем',
          secondName: 'Кашников',
          age: 22,
          rating: 97,
          position: 'Boss',
        },
        {
          id: 6,
          name: 'Лада',
          secondName: 'Боярская',
          age: 25,
          rating: 15,
          position: 'Рядовой',
        },
        {
          id: 7,
          name: 'Иосиф',
          secondName: 'Южанин',
          age: 41,
          rating: 1,
          position: '',
        },
        {
          id: 8,
          name: 'Станислав',
          secondName: 'Качаев',
          age: 34,
          rating: 0,
          position: 'Господин Никто',
        },
        {
          id: 9,
          name: 'Эдуард',
          secondName: 'Бузинский',
          age: 32,
          rating: 200,
          position: 'Уволен',
        },
      ],
      isLoading: true,
    };
  },
  computed: {
    isLoadingData() {
      return this.isLoading;
    },
  },
  methods: {
    searchEnter(searchData) {
      if (searchData.searchString) {
        this.setUsers(searchData.users);
      } else {
        this.setUsers(this.users);
      }
    },
    setUsers(users) {
      this.$store.commit('Rating/setUsers', users);
    },
  },
  mounted() {
    // иммитация задержки обращения к серверу
    setTimeout(() => {
      this.isLoading = false;
      this.users.sort((a, b) => b.rating - a.rating);
      this.setUsers(this.users.map((user, index) => {
        user.order = index + 1;
        return user;
      }));
    }, 3000);
  },
};
</script>

<style lang='stylus' scoped>
h1
  font-size 1.7em
.header
  display flex
  justify-content stretch
  padding 0 10px 20px

.title
  width 100%
</style>
