import axios from 'axios'

export default {
  state: {
    categories: {}
  },
  getters: {
    categories: s => s.categories,
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload.categories
    }
  },
  actions: {
    async fetchCategories({commit}) {
      const categories = (await axios.get('https://apex.oracle.com/pls/apex/caesarisme/shop/categories/')).data.items
      commit('setCategories', { categories })
    }
  }
}
