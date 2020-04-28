import axios from 'axios'

export default {
  state: {
    products: []
  },
  getters: {
    allProducts: s => s.products
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload.products
    }
  },
  actions: {
    async fetchProducts({commit}) {
      const products = (await axios.get('https://apex.oracle.com/pls/apex/caesarisme/shop/products/')).data.items
      commit('setProducts', { products })
    },

    async fetchProduct({}, productId) {
      const product = (await axios.get(`https://apex.oracle.com/pls/apex/caesarisme/shop/products/${productId}`)).data
      return product
    }
  }
}
