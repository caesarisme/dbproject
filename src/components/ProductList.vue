<template>
  <div class="row home--tabs">
    <div class="col s12">
      <ul ref="tabs" class="tabs">
        <li class="tab col" :class="`s${12 - categories.length*2}`" @click.prevent="() => currentCategoryId = null"><a
            class="active" href="#">All</a></li>

        <li v-for="category in categories" :key="category.id" @click.prevent="() => currentCategoryId = category.id"
          class="tab col s2"><a href="#">{{ category.title }}</a></li>
      </ul>

      <Loader v-if="loading" />

      <div v-else class="row">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ProductCard from '@/components/ProductCard'

export default {
  name: 'Products',

  components: {
    ProductCard
  },

  data: () => ({
    tabs: null,
    currentCategoryId: null,
    loading: true,
  }),

  computed: {
    ...mapGetters(['categories', 'allProducts']),
    products() {
      return this.currentCategoryId
        ? this.allProducts.filter(p => p.category_id === this.currentCategoryId)
        : this.allProducts
    }
  },

  methods: {
    ...mapActions(['fetchCategories', 'fetchProducts']),
  },

  async mounted() {
    await this.fetchProducts()
    await this.fetchCategories()
    this.tabs = M.Tabs.init(this.$refs.tabs, {})
    this.loading = false
  }
}
</script>
