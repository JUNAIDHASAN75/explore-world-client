<template>
  <div class="hotel-card card h-100">
    <router-link :to="detailsLink" class="card-img-top img-link">
      <img :src="image" class="card-img-top" :alt="name" loading="lazy" />
    </router-link>
    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div class="rating">
          <span class="badge bg-success">{{ ratingDisplay }}</span>
        </div>
      </div>

      <router-link :to="detailsLink" class="stretched-link text-decoration-none text-dark">
        <h5 class="card-title mb-1">{{ name }}</h5>
      </router-link>

      <p class="card-text text-muted small mb-3">{{ address }}</p>

      <div class="mt-auto d-flex justify-content-between align-items-center">
        <div class="price">
          <div class="text-muted small">From</div>
          <div class="fw-semibold fs-5">{{ currency }}{{ price }}</div>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" @click.prevent="onBookNow">Book Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: { type: [String, Number], required: true },
  image: { type: String, default: '/src/assets/vue.svg' },
  rating: { type: [Number, String], default: 4.5 },
  name: { type: String, default: 'Hotel Name' },
  address: { type: String, default: 'Hotel address' },
  price: { type: [Number, String], default: '99' },
  currency: { type: String, default: '$' },
})

const emits = defineEmits(['book'])

const router = useRouter()

const detailsLink = computed(() => ({ name: 'hotel-details', params: { id: props.id } }))

const ratingDisplay = computed(() => String(props.rating))

function onBookNow() {
  // emit event for parent to handle booking
  emits('book', { id: props.id })
  // default navigation to booking page
  router.push({ name: 'hotel-book', params: { id: props.id } }).catch(() => {})
}
</script>

<style scoped>
.hotel-card {
  border-radius: 16px;
  overflow: hidden;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: var(--bg-card);
  transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  contain: content;
  transform: translate3d(0, 0, 0);
}

.hotel-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 122, 0, 0.03), rgba(15, 142, 210, 0.03));
  opacity: 0;
  transition: opacity 0.32s ease;
  pointer-events: none;
  z-index: 0;
}

.hotel-card:hover::before {
  opacity: 1;
}

.hotel-card:hover {
  transform: translate3d(0, -8px, 0);
  box-shadow: 0 12px 32px rgba(255, 122, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Night mode card styles */
[data-theme="night"] .hotel-card {
  background: rgba(13, 25, 49, 0.95) !important;
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

[data-theme="night"] .hotel-card:hover {
  box-shadow: 0 12px 32px rgba(96, 165, 250, 0.2), 0 8px 16px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .hotel-card .card-title {
  color: #e2e8f0 !important;
}

[data-theme="night"] .hotel-card .card-text {
  color: #94a3b8 !important;
}

[data-theme="night"] .hotel-card .text-muted {
  color: #64748b !important;
}

[data-theme="night"] .hotel-card .price .fw-semibold {
  color: #60a5fa !important;
}

/* Image container with gradient overlay */
.img-link {
  display: block;
  overflow: hidden;
  position: relative;
  border-radius: 16px 16px 0 0;
}

.img-link::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
  opacity: 0;
  transition: opacity 0.32s ease;
}

.hotel-card:hover .img-link::after {
  opacity: 1;
}

.hotel-card img.card-img-top {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.32s ease;
  border-radius: 16px 16px 0 0;
}

.hotel-card:hover img.card-img-top {
  transform: scale(1.08) translate3d(0, 0, 0);
}

/* Card body styling */
.hotel-card .card-body {
  padding: 1.25rem;
  position: relative;
  z-index: 1;
}

/* Rating badge with orange gradient */
.hotel-card .rating .badge {
  font-size: 0.85rem;
  font-weight: 600;
  background: linear-gradient(135deg, #ff7a00 0%, #ff6600 100%);
  color: #fff;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(255, 122, 0, 0.25);
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.hotel-card .rating .badge::before {
  content: '⭐';
  font-size: 0.75rem;
}

/* Title styling */
.hotel-card .card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  transition: color 0.2s ease;
}

.hotel-card:hover .card-title {
  color: #ff7a00;
}

[data-theme="night"] .hotel-card:hover .card-title {
  color: #60a5fa;
}

/* Address text */
.hotel-card .card-text {
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.hotel-card .card-text::before {
  content: '📍';
  font-size: 0.85rem;
}

/* Price styling */
.hotel-card .price .text-muted {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.hotel-card .price .fs-5 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff7a00;
  line-height: 1;
}

/* Book Now button with attractive orange gradient */
.hotel-card .btn-primary {
  background: linear-gradient(135deg, #ff7a00 0%, #ff6600 100%);
  border: none;
  border-radius: 10px;
  color: #fff;
  padding: 0.6rem 1.25rem;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 4px 12px rgba(255, 122, 0, 0.25);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.hotel-card .btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.hotel-card .btn-primary:hover::before {
  left: 100%;
}

.hotel-card .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 122, 0, 0.4);
  background: linear-gradient(135deg, #ff8c1a 0%, #ff7700 100%);
}

.hotel-card .btn-primary:active {
  transform: translateY(0);
}

/* Performance optimization */
.hotel-card {
  will-change: transform, box-shadow;
  content-visibility: auto;
}
</style>
