<template>
  <div>
    <h4>Your cart:</h4>

    <table class="highlight centered">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Image</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

        <tr
          v-for="(item, idx) in cart"
          :key="item.product.id"
        >
          <td>{{ idx+1 }}</td>
          <td>{{ item.product.title }}</td>
          <td><img :src="item.product.image" alt="" width="100px"></td>
          <td><input v-model="item.count" type="number" style="width: 50px">шт</td>
          <td>{{ item.product.price * item.count }} ₸</td>
          <td>
            <button 
              @click="() => removeFromCart(item)"
              class="btn-floating red white-text valign-wrapper"
            ><span style="font-size: 25px; line-height: 35px">&times;</span></button>
            </td>
        </tr>

        <tr>
          <td>
            <div class="input-field inline">
              <input v-model="discount" id="discount" type="text">
              <label for="discount">Discount</label>
            </div>
            <button @click="applyDiscount" style="margin-left: 40px" class="btn red">Apply</button>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>Total:</td>
          <td>{{ totalPrice }} ₸</td>
        </tr>

      </tbody>
    </table>

    <h4>Checkout information:</h4>

    <Loader v-if="loading" />

    <h4 v-else-if="thanks">Thank you!</h4>

    <form v-else @submit.prevent="submitHandler" class="row">
      <div class="input-field col s6">
        <input v-model="userFullName" id="name" type="text">
        <label for="name">Full name</label>
      </div>
      <div class="input-field col s6">
        <input v-model="userPhone" id="phone" type="text">
        <label for="phone">Phone</label>
      </div>
      <div class="input-field col s6">
        <select id="country" v-model="selectedCountryId" @change="countryChange($event)" ref="countrySelect">
          <option value="" disabled selected>Choose your country</option>
          <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.title }}</option>
        </select>
        <label for="country">Country</label>
      </div>
      <div class="input-field col s6">
        <select id="city" v-model="selectedCityId" ref="citySelect">
          <option value="" disabled selected>Choose your city</option>
          <option v-for="city in countryCities" :key="city.id" :value="city.id">{{ city.title }}</option>
        </select>
        <label for="city">City</label>
      </div>
      <div class="input-field col s12"> <!-- Country -->
        <input v-model="userAddress" id="address" type="text">
        <label for="address">Address</label>
      </div>

      <button type="submit" class="btn red">Proceed checkout</button>
    </form>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Checkout',

  data: () => ({
    userFullName: '',
    userPhone: '',
    userAddress: '',
    loading: true,
    thanks: false,

    countrySelector: null,
    citySelector: null,
    selectedCountryId: null,
    selectedCityId: null,
    discount: '',
    discountPercent: 0
  }),

  computed: {
    ...mapGetters(['cart', 'countries', 'cities', 'discounts']),
    countryCities() {
      return this.cities.filter(c => c.country_id === `${this.selectedCountryId}`)
    },
    totalPrice() {
      const total = this.cart.reduce((acc, item) => (acc + (+item.count || 0) * item.product.price), 0) || 0
      return total - total * this.discountPercent / 100
    }
  },

  methods: {
    ...mapActions(['removeFromCart', 'fetchCountries', 'fetchCities', 'fetchDiscounts', 'postCheckout']),
    countryChange(e) {
      setTimeout(() => {
        this.citySelector.destroy()
        this.citySelector = M.FormSelect.init(this.$refs.citySelect, {})
      }, 0)
    },

    applyDiscount() {
      const discount = this.discounts.find(d => d.code === this.discount)
      if (discount) {
        this.discountPercent = discount.amount || 0
        return
      }
      this.discountPercent = 0
      this.discount = ''
    },

    async submitHandler() {
      this.loading = true
      const formData = {
        name: this.userFullName,
        phone: this.userPhone,
        country_id: this.selectedCountryId,
        city_id: this.selectedCityId,
        total: this.totalPrice,
        address: this.userAddress,
        items: this.cart.map(item => ({ product_id: item.product.id, amount: item.count }))
      }

      await this.postCheckout(formData)

      this.loading = false
      this.thanks = true

      M.toast({html: 'Thank you for your purchase!'})
    }
  },

  async mounted () {
    await this.fetchCountries()
    await this.fetchCities()
    await this.fetchDiscounts()
    this.loading = false

    setTimeout(() => {
      this.countrySelector = M.FormSelect.init(this.$refs.countrySelect, {})
      this.citySelector = M.FormSelect.init(this.$refs.citySelect, {})
    }, 0)
  },

  beforeDestroy () {
    this.countrySelector.destroy()
    this.citySelector.destroy()
  }
}
</script>

