<template>
  <div class="home-page">
    <HomeBanner />

    <main class="site-main">
      <div class="container py-4">
        <PopularHotel />
        <TopRatedHotel />
        <PopularDestination />
      </div>
    </main>
  </div>
</template>

<script>
import HomeBanner from '../Home/Banner.vue'
import PopularHotel from '../Home/PopularHotel.vue'
import TopRatedHotel from '../Home/TopRatedHotel.vue'
import PopularDestination from '../Home/PopularDestination.vue'

export default {
  name: 'Home',
  components: { HomeBanner, PopularHotel, TopRatedHotel, PopularDestination }
}
</script>

<style scoped>
/* Home Page Background */
.home-page {
  position: relative;
  min-height: 100vh;
  background: transparent;
  transition: background-color 0.3s ease;
}

/* Make main content area transparent to show background */
.site-main {
  background: transparent !important;
}

.site-main .container {
  background: transparent !important;
}
</style>
