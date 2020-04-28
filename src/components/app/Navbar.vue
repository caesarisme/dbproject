<template>
  <nav class="grey darken-4">
    <div class="nav-wrapper">
      <div class="container">
        <a href="#!" class="brand-logo center">SHANYRAK</a>

        <ul class="left">
          <router-link to="/" exact tag="li" active-class="red darken-4" class="waves-effect waves-red"><a href="#">Products</a></router-link>
          <router-link to="/brands" tag="li" active-class="red darken-4" class="waves-effect waves-red"><a href="#">Brands</a></router-link>
        </ul>

        <ul class="right">
          <li class="waves-effect waves-red">
            <router-link to="/checkout" class="valign-wrapper">
              <i class="material-icons">shopping_cart</i> Cart <span class="badge red white-text">{{ cart.reduce((a, b) => ( a + (+b.count || 0) ), 0) }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',

  computed: {
    ...mapGetters(['cart'])
  }
}
</script>
