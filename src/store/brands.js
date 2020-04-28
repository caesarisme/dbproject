import axios from 'axios'

export default {
  state: {
    brands: []
  },
  getters: {
    brands: s => s.brands,
  },
  mutations: {
    setBrands(state, payload) {
      state.brands = payload.brands
    }
  },
  actions: {
    async fetchBrands({commit}) {
      const brands = (await axios.get('https://apex.oracle.com/pls/apex/caesarisme/shop/brands/')).data.items
      commit('setBrands', { brands })
    }
  }
}
