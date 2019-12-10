export default {
  namespaced: true,
  strict: true,
  devtools: true,
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {},
  getters: {
    getUsers: state => state.users,
  },
};
