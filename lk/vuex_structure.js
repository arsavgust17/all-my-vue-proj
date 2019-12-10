/**
 Структура vuex.
 **/


const state = {
  user: { // тк все поля при регистрации и лк одинаковые, то там нет смысла держать два стейта, как сейчас. все будет в одном стейте, и авторизованный, и регистрация.

  },
  loans: {
    pdl: {}, // здесь пдл
    pos: [], // посы - в будущем у нас может быть из не один, а много. поэтому для обратно совместимости будем брать пос через геттер
  }
}

Vue.prototype.$user = $store.getters.user // юзеря определяем глобально.
Vue.computed = {
  $user: {
    get () {
      return this.$store.getters.user
    },
    set () {
      this.$store.commit('UPDATE_USER', {...})
    }
  }
}
Vue.prototype.$isAuth = boolean