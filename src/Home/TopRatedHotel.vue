<template>
  <section class="popular-hotels py-4 mt-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Top Rated Hotels</h3>
        <div class="d-flex align-items-center gap-3">
          <!-- Placeholder link for See All; can be changed to a real route later -->
          <router-link to="#" class="see-all-link">See All <i class="bi bi-chevron-right"></i></router-link>
        </div>
      </div>

      <div class="popular-swiper-wrapper position-relative">
        <button class="top-rated-prev custom-swiper-btn" aria-label="Previous"><i class="bi bi-chevron-left"></i></button>
        <button class="top-rated-next custom-swiper-btn" aria-label="Next"><i class="bi bi-chevron-right"></i></button>

        <swiper
          :modules="[Autoplay, Navigation, Pagination]"
          :slides-per-view="5"
          :space-between="20"
          :loop="true"
          :autoplay="{ delay: 2500, disableOnInteraction: false }"
          :breakpoints="breakpoints"
          :navigation="{ nextEl: '.top-rated-next', prevEl: '.top-rated-prev' }"
        >
          <swiper-slide v-for="hotel in hotels" :key="hotel.id">
            <HotelCard v-bind="hotel" @book="handleBook" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import HotelCard from '../components/cards/HotelCard.vue'

const hotels = ref([
  { id: 1, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', rating: 4.5, name: 'Seaside Inn', address: '123 Ocean Ave', price: 120, currency: '$' },
  { id: 2, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', rating: 4.7, name: 'Mountain Lodge', address: '222 Hill Rd', price: 150, currency: '$' },
  { id: 3, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80', rating: 4.2, name: 'City Center Hotel', address: '5 Main St', price: 95, currency: '$' },
  { id: 4, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', rating: 4.9, name: 'Riverside Suites', address: '10 River Ln', price: 200, currency: '$' },
  { id: 5, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80', rating: 4.4, name: 'Airport Hotel', address: '88 Terminal Dr', price: 110, currency: '$' },
  { id: 6, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', rating: 4.1, name: 'Budget Inn', address: '50 Budget St', price: 60, currency: '$' },
])

const breakpoints = {
  // Mobile and small devices: show 1 card for better readability
  320: { slidesPerView: 1 },
  576: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  992: { slidesPerView: 3 },
  1200: { slidesPerView: 4 }
}

function handleBook(payload) {
  console.log('Book requested', payload)
}
</script>

<style scoped>
.popular-hotels {
  background: transparent !important;
}

.popular-hotels .container { max-width: 1200px; }
.swiper-slide { display: flex; }
.swiper-slide .hotel-card { width: 100%; }

/* Hide pagination bullets */
.swiper-pagination { display: none !important; }

/* Style navigation buttons: small white rounded with orange arrow */
.swiper-button-next, .swiper-button-prev {
  background: #fff !important;
  width: 34px !important;
  height: 34px !important;
  border-radius: 50% !important;
  color: #ff6600 !important; /* arrow color */
  top: 45% !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}

.swiper-button-next::after, .swiper-button-prev::after {
  font-size: 16px !important;
  color: #ff6600 !important;
}

/* Custom buttons */
.custom-swiper-btn {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  border: none;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
}
.top-rated-prev { left: -15px; }
.top-rated-next { right: -15px; }

/* Arrow icon inside button */
.custom-swiper-btn .bi {
  color: #ff6600;
  font-size: 18px;
}

/* See All link */
.see-all-link {
  color: #0f8ed2;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}
.see-all-link .bi {
  margin-left: 6px;
  font-size: 14px;
}

/* Hide default buttons if rendered */
.swiper-button-next, .swiper-button-prev { display: none !important; }

</style>

<style scoped>
@media (max-width: 576px) {
  .popular-hotels h3 {
    font-size: 1rem !important;
    font-weight: 700 !important;
  }
  .popular-hotels .see-all-link {
    font-size: 0.85rem !important;
  }
  .custom-swiper-btn { display: none !important; }
  .swiper-slide .hotel-card { padding-bottom: 8px !important; }
}
</style>
