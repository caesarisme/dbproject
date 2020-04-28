<template>
  <div>

    <HomeCarousel />

    <ProductList />
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import HomeCarousel from '@/components/HomeCarousel'
import ProductList from '@/components/ProductList'

export default {
  name: 'Home',

  components: {
    HomeCarousel,
    ProductList,
  }
}
</script>
