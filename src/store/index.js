import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import categories from './categories'
import products from './products'
import brands from './brands'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    countries: [],
    cities: [],
    discounts: []
  },
  getters:{
    cart: s => s.cart,
    countries: s => s.countries,
    cities: s => s.cities,
    discounts: s => s.discounts
  },
  mutations: {
    addToCart(state, payload) {
      const candidateItem = state.cart.find(i => i.product.id === payload.product.id)

      if (candidateItem) { // true
        candidateItem.count += payload.count
      } else {
        state.cart.push(payload)
      }
    },

    removeFromCart(state, payload) {
      state.cart = state.cart.filter(item => item.product.id !== payload.product.id)
    },

    setCountries(state, payload) {
      state.countries = payload.countries
    },

    setCities(state, payload) {
      state.cities = payload.cities
    },

    setDiscounts(state, payload) {
      state.discounts = payload.discounts
    }
  },
  actions: {
    addToCart({commit}, item) {
      commit('addToCart', { 
        product: {
          id: item.product.id,
          title: item.product.title,
          image: item.product.image,
          price: item.product.price,
        },
        count: +item.count
      })
    },

    removeFromCart({commit}, item) {
      commit('removeFromCart', item)
    },

    async fetchCountries({commit}) {
      const countries = (await axios.get('https://apex.oracle.com/pls/apex/caesarisme/shop/countries/')).data.items
      commit('setCountries', { countries })
    },

    async fetchCities({commit}) {
      const cities = (await axios.get('https://apex.oracle.com/pls/apex/caesarisme/shop/cities/')).data.items
      commit('setCities', { cities })
    },

    async fetchDiscounts({commit}) {
      const discounts = (await axios.get('https://apex.oracle.com/pls/apex/caesarisme/shop/discount/')).data.items
      commit('setDiscounts', { discounts })
    },

    async postCheckout({}, checkoutData) {
      const checkoutId = Date.now().toString()
      await axios.post('https://apex.oracle.com/pls/apex/caesarisme/shop/checkout/', {
        id: checkoutId,
        user_full_name: checkoutData.name,
        phone: checkoutData.phone,
        shipping_country_id: checkoutData.country_id,
        shipping_city_id: checkoutData.city_id,
        address: checkoutData.address,
        total: checkoutData.total
      })

      const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

      await asyncForEach(checkoutData.items,async (item) => {
        await axios.post('https://apex.oracle.com/pls/apex/caesarisme/shop/checkouts/item/', {
          product_id: item.product_id,
          checkout_id: checkoutId,
          amount: item.amount
        })
      })
    },
  },
  modules: {
    categories,
    products,
    brands
  }
})
