<template lang="pug">
Input(search placeholder="Введите Имя / Фамилию" v-model="searchString")
</template>

<script>
export default {
  name: 'search-component',
  model: {
    prop: 'searchData',
    event: 'input',
  },
  // я бы добавил в props внешний ремоут метод делающий запрос на сервер,
  // но т.к. серверная часть отсутствует буду брать тестовые данные из Vuex
  data() {
    return {
      searchString: '',
      searchData: {},
    };
  },
  watch: {
    searchString(newVal) {
      this.$emit('input', {
        users: this.$store.getters['Rating/getUsers'].filter(user => user.name.indexOf(newVal) >= 0 || user.secondName.indexOf(newVal) >= 0),
        searchString: newVal,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
