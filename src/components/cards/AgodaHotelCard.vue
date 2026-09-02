<template>
  <div class="agoda-hotel-card" @click="$emit('click', { id, name })">
    <div class="card-image">
      <img class="h-100 " style="height: 100%; object-fit: cover;" :src="image" :alt="name" />
      <div class="image-overlay">
        <button class="heart-btn">
          <i class="bi bi-heart"></i>
        </button>
      </div>
    </div>
    
    <div class="card-content">
      <div class="hotel-info">
        <div class="hotel-header">
          <h3 class="hotel-name">{{ name }}</h3>
          <div class="hotel-stars" v-if="starRating">
            <span v-for="n in starRating" :key="n" class="star">★</span>
          </div>
        </div>
        
        <div class="hotel-location">
          <i class="bi bi-geo-alt"></i>
          <span>{{ address }}</span>
        </div>
        
        <div class="hotel-amenities" v-if="amenities && amenities.length">
          <span class="amenity-tag" v-for="amenity in amenities.slice(0, 3)" :key="amenity">
            {{ amenity }}
          </span>
        </div>
        
        <div class="hotel-description" v-if="description">
          <p>{{ description }}</p>
        </div>
        
        <div class="hotel-tags" v-if="tags && tags.length">
          <span class="tag" v-for="tag in tags.slice(0, 2)" :key="tag">
            {{ tag }}
          </span>
        </div>
      </div>
      
      <div class="pricing-section">
        <div class="rating-score" v-if="rating">
          <div class="score-badge">{{ rating }}</div>
          <div class="rating-text">
            <div class="rating-label">{{ getRatingLabel(rating) }}</div>
            <div class="review-count" v-if="reviewCount">{{ reviewCount }} reviews</div>
          </div>
        </div>
        
        <div class="price-info">
          <div class="original-price" v-if="originalPrice && originalPrice > price">
            {{ currency }}{{ originalPrice }}
          </div>
          <div class="current-price">
            <span class="currency">{{ currency }}</span>
            <span class="amount">{{ price }}</span>
          </div>
          <div class="per-night">per night</div>
          <div class="taxes-info">+{{ currency }}{{ Math.round(price * 0.1) }} taxes and fees</div>
        </div>
        
        <div class="booking-actions">
          <button class="btn-select" @click.stop="$emit('book', { id, name, price })">
            Select
          </button>
          <div class="availability-info" v-if="availability">
            <span class="availability-text">{{ availability }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: { type: Number, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, default: null },
  reviewCount: { type: Number, default: null },
  starRating: { type: Number, default: null },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: null },
  currency: { type: String, default: 'USD' },
  amenities: { type: Array, default: () => [] },
  description: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
  availability: { type: String, default: '' }
})

defineEmits(['click', 'book'])

function getRatingLabel(rating) {
  if (rating >= 9) return 'Exceptional'
  if (rating >= 8) return 'Excellent'
  if (rating >= 7) return 'Very good'
  if (rating >= 6) return 'Good'
  return 'Pleasant'
}
</script>

<style scoped>
.agoda-hotel-card {
  height: 100%;
  display: flex;
  background: white;
  border-radius: 16px !important;
  border: 1px solid rgba(225, 229, 233, 0.5);
  overflow: hidden;
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.agoda-hotel-card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: #ff7a00;
}

.card-image {
  position: relative;
  width: 280px;
  height: auto;
  flex-shrink: 0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
}

.heart-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 2px !important;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.heart-btn:hover {
  background: white;
  color: #ff385c;
}

.card-content {
  flex: 1;
  display: flex;
  padding: 20px;
}

.hotel-info {
  flex: 1;
  padding-right: 20px;
}

.hotel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.hotel-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
}

.hotel-stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #ffa500;
  font-size: 14px;
}

.hotel-location {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #6b6b6b;
}

.hotel-amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.amenity-tag {
  background: #f0f2f5;
  color: #333;
  padding: 4px 8px;
  border-radius: 2px !important;
  font-size: 12px;
  font-weight: 500;
}

.hotel-description {
  margin-bottom: 12px;
}

.hotel-description p {
  font-size: 14px;
  color: #6b6b6b;
  margin: 0;
  line-height: 1.4;
}

.hotel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: #e7f3ff;
  color: #0084ff;
  padding: 2px 6px;
  border-radius: 2px !important;
  font-size: 11px;
  font-weight: 500;
}

.pricing-section {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.rating-score {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.score-badge {
  background: #0f8ed2;
  color: white;
  padding: 6px 8px;
  border-radius: 2px !important;
  font-weight: 600;
  font-size: 14px;
  min-width: 40px;
  text-align: center;
}

.rating-text {
  text-align: left;
}

.rating-label {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.2;
}

.review-count {
  font-size: 12px;
  color: #6b6b6b;
  line-height: 1.2;
}

.price-info {
  margin-bottom: 16px;
}

.original-price {
  font-size: 14px;
  color: #6b6b6b;
  text-decoration: line-through;
  margin-bottom: 4px;
}

.current-price {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin-bottom: 4px;
}

.currency {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-right: 2px;
}

.amount {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
}

.per-night {
  font-size: 12px;
  color: #6b6b6b;
  margin-bottom: 2px;
}

.taxes-info {
  font-size: 11px;
  color: #6b6b6b;
}

.booking-actions {
  margin-top: auto;
}

.btn-select {
  background: #ff7a00 !important;
  color: white !important;
  border: none !important;
  padding: 10px 20px;
  border-radius: 2px !important;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 100%;
}

.btn-select:hover {
  background: #e66a00 !important;
}

.availability-info {
  margin-top: 8px;
  text-align: center;
}

.availability-text {
  font-size: 12px;
  color: #ff6b35;
  font-weight: 500;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .agoda-hotel-card {
    flex-direction: column;
  }
  
  .card-image {
    width: 100%;
    height: 200px;
  }
  
  .card-content {
    flex-direction: column;
    padding: 16px;
  }
  
  .hotel-info {
    padding-right: 0;
    margin-bottom: 16px;
  }
  
  .pricing-section {
    min-width: auto;
    align-items: flex-start;
    text-align: left;
  }
  
  .rating-score {
    justify-content: flex-start;
  }
  
  .current-price {
    justify-content: flex-start;
  }
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .agoda-hotel-card {
  background: rgba(13, 25, 49, 0.95) !important;
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .agoda-hotel-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .heart-btn {
  background: rgba(26, 47, 92, 0.9);
  color: #e2e8f0;
}

[data-theme="night"] .heart-btn:hover {
  background: #0a1128;
  color: #ff385c;
}

[data-theme="night"] .hotel-name,
[data-theme="night"] .rating-label,
[data-theme="night"] .currency,
[data-theme="night"] .amount {
  color: #e2e8f0;
}

[data-theme="night"] .hotel-location,
[data-theme="night"] .hotel-description p,
[data-theme="night"] .review-count,
[data-theme="night"] .original-price,
[data-theme="night"] .per-night,
[data-theme="night"] .taxes-info {
  color: #94a3b8;
}

[data-theme="night"] .amenity-tag {
  background: #070e21;
  color: #e2e8f0;
}

[data-theme="night"] .tag {
  background: #1a2744;
  color: #60a5fa;
}

[data-theme="night"] .score-badge {
  background: #60a5fa;
}

[data-theme="night"] .availability-text {
  color: #fbbf24;
}
</style>