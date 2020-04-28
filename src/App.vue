<template>
  <div id="app">

    <Navbar />

    <main class="container">

      <router-view />

    </main>

    <Footer />

  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar';
import Footer from '@/components/app/Footer';

export default {
  name: 'App',

  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
@import '~materialize-css/dist/css/materialize.min.css';
@import './assets/index.css';
</style>
