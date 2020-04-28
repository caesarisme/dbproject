<template>
  <div ref="carousel" class="carousel carousel-slider">
    <div 
      v-for="(carouselItem, idx) in carouselItems"
      :key="idx"
      class="carousel-item" 
    >
      <img :src="carouselItem">
    </div>
  </div>
</template>


<script>
export default {
  name: 'Navbar',

  data: () => ({
    carousel: null,
    interval: null,
    carouselItems: [
      'https://i.dailymail.co.uk/i/pix/2015/08/13/09/2B533BC100000578-0-image-a-14_1439454001420.jpg',
      'https://www.formula1.com/content/dam/fom-website/manual/Misc/HollywoodFanFestival/020_19_F1FF_LA_Festival_KV_V1_Banner_1920x1080_111019.jpg',
      'https://proactions.ru/media/actions/2019/06/23/gorilla-energy.jpg.500x300_q95.jpg',
      'https://s3.burn.com/mec-burn/media/uploads_image/2018/06/14/1600/800/b654e5ca4b304980f8c6efbc57159ff8.jpg?mod=1528994725',
    ]
  }),

  mounted() {
    this.carousel = M.Carousel.init(this.$refs.carousel, {})
    this.interval = setInterval(() => {
      this.carousel.next()
    }, 5000)
  },

  beforeDestroy() {
    this.carousel.destroy()
    clearInterval(this.interval)
  }
}
</script>
