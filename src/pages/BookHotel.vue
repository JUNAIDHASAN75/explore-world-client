<template>
  <div class="book-hotel-page">
    <!-- Header with Progress Steps -->
    <div class="booking-header bg-light py-3">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <img src="../assets/images/logo.svg" alt="Explore World" class="logo" style="height: 45px; width: auto;">
          </div>
          <div class="col-md-6">
            <div class="progress-steps d-flex justify-content-end">
              <span class="step active">1 Guest information</span>
              <span class="step">2 Payment information</span>
              <span class="step">3 Booking is confirmed</span>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <div class="booking-notice text-center">
              <span class="text-danger">⏰ We are holding your room... 09:17:34</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-4">
      <div class="row">
        <!-- Left Column - Booking Form -->
        <div class="col-lg-8">
          <!-- Guest Information -->
          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">👤 Guest Information</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">First Name *</label>
                    <input type="text" class="form-control" v-model="guestInfo.firstName" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Last Name *</label>
                    <input type="text" class="form-control" v-model="guestInfo.lastName" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Email Address *</label>
                    <input type="email" class="form-control" v-model="guestInfo.email" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Phone Number *</label>
                    <input type="tel" class="form-control" v-model="guestInfo.phone" required>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Who's the lead guest? -->
          <div class="card mb-4">
            <div class="card-header">
              <h6 class="mb-0">Who's the lead guest?</h6>
            </div>
            <div class="card-body">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="leadGuest" id="leadGuest1" v-model="leadGuest" value="booking">
                <label class="form-check-label" for="leadGuest1">
                  I am the lead guest
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="leadGuest" id="leadGuest2" v-model="leadGuest" value="other">
                <label class="form-check-label" for="leadGuest2">
                  Someone else
                </label>
              </div>
              <div class="mt-3" v-if="leadGuest === 'other'">
                <input type="email" class="form-control" placeholder="someone@example.com">
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="card mb-4">
            <div class="card-header">
              <h6 class="mb-0">Choose your payment option</h6>
            </div>
            <div class="card-body">
              <div class="form-check mb-3">
                <input class="form-check-input" type="radio" name="paymentMethod" id="payAtProperty" v-model="paymentMethod" value="property">
                <label class="form-check-label" for="payAtProperty">
                  <strong>Pay at the property (USD)</strong>
                  <br><small class="text-muted">✓ Pay from the comfort of your property.</small>
                  <br><small class="text-muted">✓ Look for free cancellation or pay later options if flexibility is important to you.</small>
                </label>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="radio" name="paymentMethod" id="payNow" v-model="paymentMethod" value="now">
                <label class="form-check-label" for="payNow">
                  <strong>Pay now</strong>
                  <br><small class="text-muted">We accept most major credit cards and alternative payment methods.</small>
                </label>
              </div>
              
              <div v-if="paymentMethod === 'now'" class="mt-3">
                <div class="payment-icons d-flex gap-2 mb-3">
                  <span class="badge bg-primary">💳 Visa</span>
                  <span class="badge bg-primary">💳 Mastercard</span>
                  <span class="badge bg-primary">💳 Amex</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Special Requests -->
          <div class="card mb-4">
            <div class="card-header">
              <h6 class="mb-0">Special requests</h6>
              <small class="text-muted">Select your preferences. Subject to availability.</small>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <h6>Which bed setup would you prefer?</h6>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="bedNonSmoking">
                    <label class="form-check-label" for="bedNonSmoking">
                      Bed: Non-smoking
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="bedSmoking">
                    <label class="form-check-label" for="bedSmoking">
                      Bed: Smoking
                    </label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="bedTwin">
                    <label class="form-check-label" for="bedTwin">
                      2 bed: 1 king bed
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="bedKing">
                    <label class="form-check-label" for="bedKing">
                      Bed: twin beds
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="mt-3">
                <button class="btn btn-link p-0 text-decoration-none" type="button" @click="showAdditionalPreferences = !showAdditionalPreferences">
                  Show additional preferences ➤
                </button>
              </div>
            </div>
          </div>

          <!-- Rewards Section -->
          <div class="card mb-4">
            <div class="card-header bg-success text-white">
              <h6 class="mb-0">🏆 Rewards</h6>
            </div>
            <div class="card-body">
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="earnCashback">
                <label class="form-check-label" for="earnCashback">
                  <strong>Earn cashback</strong>
                </label>
              </div>
              <p class="small text-muted mb-3">
                Experience rewards on every stay. Collect PointsMAX rewards from this program partner, which can be used for other rewards. Refer to our <a href="#">T&Cs</a> and the partner's website for more details.
              </p>
              
              <p class="small text-muted">
                Looking to accelerate your rewards? Make sure you're enrolled! <a href="#">Learn more about rewards</a>
              </p>
            </div>
          </div>

          <!-- Room Upgrade Deals -->
          <div class="card mb-4">
            <div class="card-header">
              <h6 class="mb-0">Room upgrade deals</h6>
              <small class="text-muted">Recommended add-ons for your trip</small>
            </div>
            <div class="card-body">
              <div class="upgrade-option border rounded p-3 mb-3">
                <div class="row">
                  <div class="col-8">
                    <div class="d-flex align-items-center mb-2">
                      <span class="badge bg-success me-2">Breakfast</span>
                      <span class="badge bg-success">SAVE</span>
                    </div>
                    <h6>Breakfast</h6>
                    <small class="text-muted">Recommended add-ons for your trip</small>
                  </div>
                  <div class="col-4 text-end">
                    <div class="text-success fw-bold">FREE</div>
                    <button class="btn btn-outline-success btn-sm">Select</button>
                  </div>
                </div>
              </div>
              
              <div class="upgrade-option border rounded p-3 mb-3">
                <div class="row">
                  <div class="col-8">
                    <div class="d-flex align-items-center mb-2">
                      <span class="badge bg-success me-2">Fully refundable</span>
                      <span class="badge bg-success">SAVE</span>
                    </div>
                    <h6>Fully refundable</h6>
                    <small class="text-muted">Protection for higher-tier rooms and add-ons</small>
                  </div>
                  <div class="col-4 text-end">
                    <div class="text-success fw-bold">FREE</div>
                    <button class="btn btn-outline-success btn-sm">Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Booking Summary -->
        <div class="col-lg-4">
          <div class="card sticky-top">
            <div class="card-body">
              <!-- Hotel Info -->
              <div class="d-flex mb-3">
                <img :src="hotelInfo.image" alt="Hotel" class="hotel-thumb me-3">
                <div>
                  <h6 class="mb-1">{{ hotelInfo.name }}</h6>
                  <div class="rating mb-1">
                    <span class="badge bg-primary">{{ hotelInfo.rating }}</span>
                    <span class="ms-1">{{ hotelInfo.reviews }} reviews</span>
                  </div>
                  <small class="text-muted">{{ hotelInfo.location }}</small>
                </div>
              </div>

              <!-- Stay Details -->
              <div class="stay-details mb-3">
                <div class="row text-center border rounded p-2 mb-2">
                  <div class="col-6">
                    <small class="text-muted">Thu, Oct 16</small>
                    <div class="fw-bold">Check-in</div>
                  </div>
                  <div class="col-6">
                    <small class="text-muted">Fri, Oct 17</small>
                    <div class="fw-bold">Check-out</div>
                  </div>
                </div>
                <div class="text-center">
                  <span class="nights-count">1 night, 1 room</span>
                </div>
              </div>

              <!-- Room Type -->
              <div class="room-type mb-3">
                <h6>1 x {{ selectedRoom.name }}</h6>
                <div class="room-features">
                  <div class="feature-item">📍 Great central location • 7.1 score for 2-person trip and 13</div>
                  <div class="feature-item">🚭 Non-smoking room</div>
                  <div class="feature-item" v-if="selectedRoom.breakfast">🍳 Breakfast included</div>
                  <div class="feature-item">❄️ Air conditioning</div>
                  <div class="feature-item">📶 Free WiFi</div>
                  <div class="feature-item" v-if="selectedRoom.freeCancellation">✅ Free cancellation</div>
                  <div class="feature-item" v-if="selectedRoom.payAtHotel">💳 Pay at hotel</div>
                </div>
              </div>

              <!-- Price Breakdown -->
              <div class="price-breakdown">
                <h6>How much will it cost to cancel?</h6>
                <p class="small" :class="selectedRoom.freeCancellation ? 'text-success' : 'text-warning'">
                  <span v-if="selectedRoom.freeCancellation">
                    Free cancellation until 11:59 PM on 15 Oct, 2024. You can cancel for free before this date. If you cancel after this time there are no additional fees.
                  </span>
                  <span v-else>
                    Non-refundable booking. Cancellation charges may apply.
                  </span>
                </p>
                
                <div class="pricing-details mt-3">
                  <div class="d-flex justify-content-between" v-if="selectedRoom.originalPrice">
                    <span>Original price (1 room × 1 night):</span>
                    <span>USD {{ selectedRoom.originalPrice.toFixed(2) }}</span>
                  </div>
                  <div class="d-flex justify-content-between" v-if="selectedRoom.originalPrice">
                    <span>Instant discount:</span>
                    <span class="text-success">-USD {{ (selectedRoom.originalPrice - selectedRoom.price).toFixed(2) }}</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Total (per night):</span>
                    <span>USD {{ selectedRoom.price.toFixed(2) }}</span>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between fw-bold">
                    <span>Booking total:</span>
                    <span>USD {{ selectedRoom.price.toFixed(2) }}</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Subjects to Cambodia Taxes:</span>
                    <span>USD {{ (selectedRoom.price * 0.3).toFixed(2) }}</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Pay now to the property you pick up:</span>
                    <span>USD 0.00</span>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between fw-bold fs-5">
                    <span>Total:</span>
                    <span>USD {{ (selectedRoom.price + (selectedRoom.price * 0.3)).toFixed(2) }}</span>
                  </div>
                </div>

                <div class="tax-info mt-3 p-2 bg-light rounded">
                  <small>
                    <strong>Included in your final price:</strong><br>
                    Your booking confirmation shows you the price charged at checkout by our sister hotel terms.<br><br>
                    <span class="text-muted">Taxes:</span> + Govt.
                  </small>
                </div>

                <!-- Coupons -->
                <div class="coupons-section mt-3">
                  <h6>🎫 Coupons</h6>
                  <div class="coupon-item d-flex align-items-center p-2 border rounded">
                    <span class="badge bg-success me-2">100%</span>
                    <div>
                      <small><strong>Renovation Discount</strong></small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Final CTA -->
              <button class="btn btn-primary w-100 mt-4 py-3" @click="proceedToPayment">
                NEXT: FINAL STEP
                <div><small>Just one final check and you're all set at this price</small></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const id = route.params.id

// Get room details from query parameters
const selectedRoom = computed(() => {
  return {
    id: route.query.roomId || null,
    name: route.query.roomName || 'Deluxe Twin Room - City View',
    price: parseFloat(route.query.price) || 54.00,
    originalPrice: route.query.originalPrice ? parseFloat(route.query.originalPrice) : null,
    breakfast: route.query.breakfast === 'true',
    freeCancellation: route.query.freeCancellation === 'true',
    payAtHotel: route.query.payAtHotel === 'true'
  }
})

// Reactive data
const guestInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const leadGuest = ref('booking')
const paymentMethod = ref('property')
const showAdditionalPreferences = ref(false)

// Hotel info (could be passed as props or from route params)
const hotelInfo = ref({
  name: 'Best Western S K S Chattogram',
  image: '/src/assets/images/hotel1.jpg',
  rating: '8.4',
  reviews: '57 reviews',
  location: 'SKTC, 8RG7+95R, 29 Agrabad C/A., Kotwali, Chittagong, Bangladesh, 4100'
})

// Methods
function confirmBooking() {
  // Validate form
  if (!guestInfo.value.firstName || !guestInfo.value.lastName || !guestInfo.value.email || !guestInfo.value.phone) {
    alert('Please fill in all required fields')
    return
  }
  
  // Navigate to confirmation page or process booking
  console.log('Booking confirmed:', {
    guestInfo: guestInfo.value,
    leadGuest: leadGuest.value,
    paymentMethod: paymentMethod.value,
    selectedRoom: selectedRoom.value,
    totalPrice: (selectedRoom.value.price + (selectedRoom.value.price * 0.3)).toFixed(2)
  })
  
  // For now, show success message
  alert(`Booking confirmed for ${selectedRoom.value.name} at USD ${(selectedRoom.value.price + (selectedRoom.value.price * 0.3)).toFixed(2)}! Redirecting to confirmation page...`)
  // router.push('/booking-confirmation')
}

function proceedToPayment() {
  // Validate form
  if (!guestInfo.value.firstName || !guestInfo.value.lastName || !guestInfo.value.email || !guestInfo.value.phone) {
    alert('Please fill in all required fields')
    return
  }
  
  // Navigate to payment page with booking details
  router.push({
    path: '/payment/1',
    query: {
      roomName: selectedRoom.value.name,
      price: selectedRoom.value.price,
      originalPrice: selectedRoom.value.originalPrice,
      email: guestInfo.value.email,
      firstName: guestInfo.value.firstName,
      lastName: guestInfo.value.lastName,
      phone: guestInfo.value.phone,
      paymentMethod: paymentMethod.value
    }
  })
}
</script>

<style scoped>
.book-hotel-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.booking-header {
  border-bottom: 1px solid #dee2e6;
}

.logo {
  max-height: 32px;
}

.progress-steps {
  display: flex;
  gap: 20px;
}

.progress-steps .step {
  position: relative;
  padding: 8px 0;
  font-size: 14px;
  color: #6c757d;
}

.progress-steps .step.active {
  color: #0d6efd;
  font-weight: 600;
}

.progress-steps .step.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #0d6efd;
}

.booking-notice {
  background-color: #fff3cd;
  padding: 8px;
  border-radius: 4px;
}

.hotel-thumb {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.stay-details .nights-count {
  background-color: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.room-features .feature-item {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 4px;
}

.upgrade-option {
  transition: all 0.2s ease;
}

.upgrade-option:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.pricing-details {
  font-size: 14px;
}

.coupon-item {
  background-color: #f8f9fa;
}

/* Bootstrap customizations */
.card {
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.card-header {
  border-bottom: 1px solid #dee2e6;
  background-color: #f8f9fa !important;
}

.card-header.bg-primary {
  background-color: #0d6efd !important;
}

.card-header.bg-success {
  background-color: #198754 !important;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

@media (max-width: 768px) {
  .progress-steps {
    flex-direction: column;
    gap: 8px;
  }
  
  .hotel-thumb {
    width: 60px;
    height: 45px;
  }
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .booking-page {
  background-color: #070e21;
  color: #e2e8f0;
}

[data-theme="night"] .booking-header {
  background: #0a1128;
  border-bottom-color: #1a2744;
}

[data-theme="night"] .progress-steps .step {
  color: #94a3b8;
}

[data-theme="night"] .progress-steps .step.active {
  color: #60a5fa;
}

[data-theme="night"] .progress-steps .step.completed {
  color: #10b981;
}

[data-theme="night"] .card {
  background: rgba(13, 25, 49, 0.95) !important;
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .card-header {
  background-color: #070e21 !important;
  border-bottom-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .form-label {
  color: #e2e8f0;
}

[data-theme="night"] .form-control,
[data-theme="night"] .form-select {
  background-color: #070e21;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .form-control:focus,
[data-theme="night"] .form-select:focus {
  background-color: #070e21;
  border-color: #60a5fa;
  box-shadow: 0 0 0 0.25rem rgba(96, 165, 250, 0.25);
  color: #e2e8f0;
}

[data-theme="night"] .btn-primary {
  background-color: #60a5fa;
  border-color: #60a5fa;
}

[data-theme="night"] .btn-primary:hover {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

[data-theme="night"] .btn-outline-primary {
  color: #60a5fa;
  border-color: #60a5fa;
}

[data-theme="night"] .btn-outline-primary:hover {
  background-color: #60a5fa;
  border-color: #60a5fa;
  color: white;
}

[data-theme="night"] .alert {
  background: #0a1128;
  border-color: #1a2744;
  color: #e2e8f0;
}
</style>
