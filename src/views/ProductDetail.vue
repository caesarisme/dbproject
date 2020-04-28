<template>
  <div>
    <Loader v-if="loading" />

    <div v-else>
      <nav>
        <div class="nav-wrapper">
          <div class="col s12" style="padding: 0 40px">
            <router-link to="/" class="breadcrumb">Products</router-link>
            <a href="#" class="breadcrumb">{{ product.category }}</a>
            <a href="#" class="breadcrumb">{{ product.title }}</a>
          </div>
        </div>
      </nav>

      <h4>{{ product.title }}</h4>

      <div class="row">
        <div class="col s6">
          <img class="responsive-img" :src="product.image">
        </div>
        <div class="col s6">
          <div class="section">
            <h5>Description:</h5>
            <p>{{ product.description }}</p>
            <div class="chip">
              {{ product.brand }}
            </div>
          </div>

          <div class="divider"></div>

          <div class="section row">
            <div class="left">
              <button @click="() => amount += (amount !== 1 ? -1 : 0)" :disabled="amount == 1"
                class="btn-floating waves-effect red white-text"><i class="material-icons">remove</i></button>
            </div>
            <div class="col s2">
              <input type="number" v-model="amount">
            </div>
            <div class="left">
              <button @click="() => amount += (amount <= product.amount ? +1 : 0)" :disabled="amount == product.amount"
                class="btn-floating waves-effect red white-text"><i class="material-icons">add</i></button>
            </div>

            <div class="right">
              <button @click="addToCartHandler" class="btn waves-effect red white-text">Add to cart</button>
            </div>
          </div>

          <div class="section">
            <h4>{{ product.price*amount }} ₸</h4>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductDetail',

  data: () => ({
    product: {},
    amount: 1,
    loading: true
  }),

  computed: {
    ...mapGetters(['cart'])
  },

  methods: {
    ...mapActions(['fetchProduct', 'addToCart']),
    addToCartHandler() {
      this.addToCart({
        product: this.product,
        count: this.amount
      })
      M.toast({html: 'Item added to cart!'})
    }
  },

  async mounted() {
    this.product = await this.fetchProduct(this.$route.params.id)
    this.loading = false
  },

}
</script>
