<template>
  <div class="room-card card mb-3">
    <div class="row g-0 align-items-center">
      <div class="col-4 position-relative">
        <img :src="images[0]" class="img-fluid room-img" :alt="name" />
        <div class="badge-qty">{{ images.length }}/{{ maxImages }}</div>
        <button v-if="showGallery" class="btn btn-sm btn-light gallery-btn" @click="$emit('open-gallery', id)">
          <i class="bi bi-arrow-right-circle"></i>
        </button>
      </div>

      <div class="col-5">
        <div class="card-body py-2">
          <h5 class="card-title mb-1">{{ name }}</h5>
          <p class="small text-muted mb-1">{{ bedInfo }}</p>

          <div class="features mb-2">
            <span v-for="(f, i) in features" :key="i" class="badge bg-light text-muted me-1 small">{{ f }}</span>
          </div>

          <div class="text-muted small">Cancellation: <strong>{{ cancellation }}</strong></div>
        </div>
      </div>

      <div class="col-3 text-end">
        <div class="card-body py-2">
          <div class="price small text-muted">Per night</div>
          <div class="fw-bold fs-5">{{ currency }}{{ price }}</div>
          <div class="mb-2 text-success small">{{ availabilityText }}</div>
          <button class="btn btn-primary btn-sm" @click="$emit('select', id)">Select</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: [String, Number], required: true },
  images: { type: Array, default: () => ['/src/assets/images/hotel1.jpg'] },
  maxImages: { type: Number, default: 10 },
  name: { type: String, default: 'Standard Room' },
  bedInfo: { type: String, default: '1 king bed • 2 guests' },
  features: { type: Array, default: () => ['Breakfast', 'Wi-Fi'] },
  cancellation: { type: String, default: 'Free cancellation' },
  price: { type: [String, Number], default: 54 },
  currency: { type: String, default: 'USD' },
  availability: { type: [String, Number], default: 'Available' },
  showGallery: { type: Boolean, default: true },
})

const emits = defineEmits(['select', 'open-gallery'])

const availabilityText = typeof props.availability === 'number' ? `${props.availability} rooms left` : props.availability
</script>

<style scoped>
.room-card { 
  border-radius: 6px; 
  overflow: hidden;
  background-color: var(--bg-card);
  border-color: var(--border-color);
  transition: all 0.3s ease;
}

[data-theme="night"] .room-card {
  background-color: #0a1128;
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .room-card .card-title {
  color: var(--text-primary);
}

[data-theme="night"] .room-card .text-muted,
[data-theme="night"] .room-card .small {
  color: var(--text-secondary) !important;
}

[data-theme="night"] .room-card .badge.bg-light {
  background-color: #070e21 !important;
  color: #cbd5e1 !important;
}

[data-theme="night"] .room-card .fw-bold {
  color: var(--text-primary);
}

[data-theme="night"] .gallery-btn {
  background-color: #0a1128 !important;
  border-color: #1a2744 !important;
  color: #e2e8f0 !important;
}

.room-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.col-4.position-relative { min-height: 110px; }
.badge-qty { position: absolute; left: 8px; bottom: 8px; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 6px; font-size: 12px; border-radius: 12px; }
.gallery-btn { position: absolute; right: 8px; bottom: 8px; border-radius: 50%; }
.btn-primary { background-color: #0f8ed2; border-color: #0f8ed2; }
.btn-primary:hover { background-color: #0d79b8; border-color: #0d79b8; }
</style>