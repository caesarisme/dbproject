<template>
  <footer class="page-footer grey darken-4">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Shanyrak Tech Market</h5>
          <p class="grey-text text-lighten-4">The best online tech shop</p>
        </div>
        <div class="col l4 offset-l2 s12">
          <h5 class="white-text">Site map:</h5>
          <ul>
            <li><router-link class="grey-text text-lighten-3" to="/">Products</router-link></li>
            <li><router-link class="grey-text text-lighten-3" to="#">Categories</router-link></li>
            <li><router-link class="grey-text text-lighten-3" to="#">Brands</router-link></li>
            <li><router-link class="grey-text text-lighten-3" to="#">Admin panel</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright grey darken-3">
      <div class="container red-text">
        © 2020 Powered by Yeldar &amp; Kaisar Kuanyshevs
      </div>
    </div>
  </footer>
</template>


<script>
export default {
  name: 'Footer'
}
</script>
