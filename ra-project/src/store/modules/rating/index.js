export default {
  namespaced: true,
  strict: true,
  devtools: true,
  state: {
    users: [],
    docs: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setDocs(state, docs) {
      state.docs = docs;
    },
  },
  actions: {},
  getters: {
    getUsers: state => state.users,
    getDocs: state => state.docs,
  },
};
