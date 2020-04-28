<template>
  <div class="col s3">
    <div class="card sticky-action">

      <router-link :to="`/product/${product.id}`" tag="div" class="card-image waves-effect waves-block waves-light">
        <img :src="product.image">
      </router-link>

      <div class="card-content">
        <span class="card-title activator">{{ product.title }} <i class="material-icons right">more_vert</i></span>
        <h5 class="red-text">{{ product.price }} ₸</h5>
      </div>

      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">{{ product.title }}<i
            class="material-icons right">close</i></span>
        <p>{{ product.description }}</p>
      </div>

      <div class="card-action">
        <a href="#" @click.prevent="addToCartHandler" class="red-text">Add to cart</a>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductCard',

  props: ['product'],

  methods: {
    ...mapActions(['addToCart']),
    addToCartHandler() {
      this.addToCart({
        product: this.product,
        count: 1
      })
      M.toast({html: 'Item added to cart!'})
    }
  }
}
</script>
