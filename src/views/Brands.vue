<template>
  <div>

    <h4>Brands:</h4>

    <Loader v-if="loading" />

    <div v-if="!loading" class="row">
      <div class="col s12">
        <div 
          v-for="brand in brands"
          :key="brand.id"
          class="chip"
          @click="() => selectedBrandId = brand.id"
          :class="{ 'red white-text': selectedBrandId === brand.id }"
        >
          {{ brand.title }}
        </div>
      </div>
    </div>

    <div v-if="!loading" class="row">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

import ProductCard from '@/components/ProductCard'

export default {
  name: 'Brands',

  components: {
    ProductCard
  },

  data: () => ({
    selectedBrandId: null,
    loading: true
  }),

  computed: {
    ...mapGetters(['brands', 'allProducts']),
    products() {
      return this.selectedBrandId
        ? this.allProducts.filter(p => p.brand_id === this.selectedBrandId)
        : this.allProducts
    }
  },

  methods: {
    ...mapActions(['fetchBrands', 'fetchProducts'])
  },

  async mounted() {
    await this.fetchProducts()
    await this.fetchBrands()
    this.loading = false
  }
}
</script>
