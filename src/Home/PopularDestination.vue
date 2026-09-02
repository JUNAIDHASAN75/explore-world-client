<template>
  <section class="popular-destinations py-4 mt-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Popular Destinations</h3>
        <div class="d-flex align-items-center gap-3">
          <router-link to="#" class="see-all-link">See All <i class="bi bi-chevron-right"></i></router-link>
        </div>
      </div>

      <div class="popular-swiper-wrapper position-relative">
        <button class="destination-prev custom-swiper-btn" aria-label="Previous"><i class="bi bi-chevron-left"></i></button>
        <button class="destination-next custom-swiper-btn" aria-label="Next"><i class="bi bi-chevron-right"></i></button>

        <swiper
          :modules="[Autoplay, Navigation, Pagination]"
          :slides-per-view="5"
          :space-between="20"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :breakpoints="breakpoints"
          :navigation="{ nextEl: '.destination-next', prevEl: '.destination-prev' }"
        >
          <swiper-slide v-for="dest in destinations" :key="dest.id">
            <DestinationCard v-bind="dest" @select="onSelectDestination" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import DestinationCard from '../components/cards/DestinationCard.vue'

const router = useRouter()

const destinations = ref([
  { id: 'bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', name: 'Bali' },
  { id: 'paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', name: 'Paris' },
  { id: 'tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80', name: 'Tokyo' },
  { id: 'santorini', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80', name: 'Santorini' },
  { id: 'newyork', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80', name: 'New York' },
  { id: 'cancun', image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=800&q=80', name: 'Cancun' },
])

const breakpoints = {
  320: { slidesPerView: 1 },
  576: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  992: { slidesPerView: 3 },
  1200: { slidesPerView: 4 }
}

function onSelectDestination(payload) {
  // navigate to filter page with destination query
  router.push({ name: 'filter', query: { destination: payload.name } })
}
</script>

<style scoped>
.popular-destinations {
  background: transparent !important;
}

.popular-destinations .container { max-width: 1200px; }
.swiper-slide { display: flex; }
.swiper-slide .destination-card { width: 100%; }

/* Reuse nav button styles */
.custom-swiper-btn { position: absolute; top: 45%; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 50%; background: #fff; border: none; box-shadow: 0 2px 6px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 20; }
.destination-prev { left: -15px; }
.destination-next { right: -15px; }
.custom-swiper-btn .bi { color: #ff6600; font-size: 18px; }
.swiper-pagination { display: none !important; }
.see-all-link { color: #0f8ed2; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; }
.see-all-link .bi { margin-left: 6px; font-size: 14px; }
.swiper-button-next, .swiper-button-prev { display: none !important; }

</style>

<style scoped>
@media (max-width: 576px) {
  .popular-destinations h3 {
    font-size: 1rem !important;
    font-weight: 700 !important;
  }
  .popular-destinations .see-all-link {
    font-size: 0.85rem !important;
  }
  .custom-swiper-btn { display: none !important; }
  .swiper-slide .destination-card { padding-bottom: 8px !important; }
}
</style>
