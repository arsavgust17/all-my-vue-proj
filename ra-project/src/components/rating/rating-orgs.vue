<template lang='pug'>
Loader(v-if='isLoadingData')
.content(v-else)
  .header
    h1.title Рейтинг поликлиник
    Search(@input="searchEnter")
  UsersList

</template>

<script>
import UsersList from '@/components/rating/orgs-list.vue';
import Search from '@/components/rating/search-component.vue';
import Loader from '@/components/rating/loader.vue';

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
      docs: {
          "docs": [
              {
                  "id": 1,
                  "name": "ГБОУ Номер 1",
                  "markone": 2,
                  "marktwo": 4,
                  "markthree": 1
              },
              {
                  "id": 2,
                  "name": "ГБОУ Номер 2",
                  "markone": 5,
                  "marktwo": 3,
                  "markthree": 2
              },
              {
                  "id": 3,
                  "name": "ГБОУ Номер 3",
                  "markone": 4,
                  "marktwo": 4,
                  "markthree": 4
              },
              {
                  "id": 4,
                  "name": "ГБОУ Номер 4",
                  "markone": 5,
                  "marktwo": 4,
                  "markthree": 5
              },
              {
                  "id": 5,
                  "name": "ГБОУ Номер 1",
                  "markone": 3,
                  "marktwo": 1,
                  "markthree": 4
              }
          ]
      },
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
        this.setUsers(searchData.docs);
      } else {
        this.setUsers(this.docs);
      }
    },
    setUsers(docs) {
      this.$store.commit('Rating/setDocs', docs);
    },
  },
  mounted() {
    // иммитация задержки обращения к серверу
    setTimeout(() => {
      this.isLoading = false;
      this.docs.docs.sort((a, b) => b.rating - a.rating);
      this.setUsers(this.docs.docs.map((doc, index) => {
        doc.order = index + 1;
        return doc;
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
