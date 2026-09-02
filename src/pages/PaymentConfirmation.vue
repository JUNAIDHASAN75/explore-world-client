<template>
  <div class="payment-page-wrapper">
  <div class="payment-page">
    <!-- Header with Progress Steps -->
    <div class="booking-header bg-light py-3">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <img src="../assets/images/logo.svg" alt="Explore World" class="logo" style="height: 45px; width: auto;">
          </div>
          <div class="col-md-6">
            <div class="progress-steps d-flex justify-content-end">
              <span class="step completed">1 Guest information</span>
              <span class="step active">2 Payment information</span>
              <span class="step">3 Booking is confirmed</span>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <div class="booking-notice text-center">
              <span class="text-danger">⏰ We are holding your price... 00:15:42</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-4">
      <div class="row">
        <!-- Left Column - Payment Form -->
        <div class="col-lg-8">
          <!-- Payment Date Selection -->
          <div class="card mb-4">
            <div class="card-header">
              <h6 class="mb-0">Choose your payment option</h6>
            </div>
            <div class="card-body">
              <div class="form-check mb-3">
                <input class="form-check-input" type="radio" name="paymentDate" id="payOct16" v-model="paymentDate" value="oct16">
                <label class="form-check-label" for="payOct16">
                  <strong>📅 Pay on 16 October 2025</strong>
                  <br><small class="text-muted">✓ Pay flexible, pay securely through Agoda</small>
                  <br><small class="text-muted">✓ You will be charged USD 66.10 after booking (as per your date)</small>
                  <br><small class="text-success">Learn more about the offers for you</small>
                </label>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="radio" name="paymentDate" id="payNow" v-model="paymentDate" value="now" checked>
                <label class="form-check-label" for="payNow">
                  <strong>Pay now</strong>
                </label>
              </div>
            </div>
          </div>

          <!-- Secure Payment Section -->
          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <div class="d-flex align-items-center">
                <span class="me-2">🔒</span>
                <span>Secure payment</span>
              </div>
              <small>All card information is fully encrypted, secure and protected.</small>
            </div>
            <div class="card-body">
              <!-- Payment Method Selection -->
              <div class="mb-4">
                <label class="form-label">Select payment method</label>
                <div class="payment-methods">
                  <div class="payment-method-tabs d-flex gap-2 mb-3">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%231A1F71'/%3E%3Ctext x='20' y='15' text-anchor='middle' fill='white' font-size='8' font-weight='bold'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" class="payment-icon">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%23EB001B'/%3E%3Ccircle cx='15' cy='12' r='6' fill='%23EB001B'/%3E%3Ccircle cx='25' cy='12' r='6' fill='%23FF5F00'/%3E%3C/svg%3E" alt="Mastercard" class="payment-icon">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%23006FCF'/%3E%3Ctext x='20' y='15' text-anchor='middle' fill='white' font-size='6' font-weight='bold'%3EAMEX%3C/text%3E%3C/svg%3E" alt="American Express" class="payment-icon">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%235D9CEC'/%3E%3Ctext x='20' y='15' text-anchor='middle' fill='white' font-size='6' font-weight='bold'%3EJCB%3C/text%3E%3C/svg%3E" alt="JCB" class="payment-icon">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%23003087'/%3E%3Ctext x='20' y='15' text-anchor='middle' fill='white' font-size='6' font-weight='bold'%3EUNION%3C/text%3E%3C/svg%3E" alt="UnionPay" class="payment-icon">
                  </div>
                </div>
              </div>

              <!-- Card Details Form -->
              <form @submit.prevent="processPayment">
                <div class="row mb-3">
                  <div class="col-12">
                    <label class="form-label">Card number</label>
                    <div class="input-group">
                      <select class="form-select" style="max-width: 120px;" v-model="cardType">
                        <option value="visa">Visa / Mastercard / Amex / JCB</option>
                      </select>
                      <input type="text" class="form-control" v-model="cardNumber" placeholder="Card number" maxlength="19">
                    </div>
                    <small class="text-muted">Real-time: Your card will not be charged now. Your card is only required to confirm this booking.</small>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">First name / last name *</label>
                    <input type="text" class="form-control" v-model="cardholderName" placeholder="Cardholder name">
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-6">
                        <label class="form-label">Expiry date *</label>
                        <select class="form-select" v-model="expiryMonth">
                          <option value="">MM/YY</option>
                          <option v-for="month in 12" :key="month" :value="month.toString().padStart(2, '0')">
                            {{ month.toString().padStart(2, '0') }}
                          </option>
                        </select>
                      </div>
                      <div class="col-6">
                        <label class="form-label">&nbsp;</label>
                        <select class="form-select" v-model="expiryYear">
                          <option value="">Year</option>
                          <option v-for="year in 10" :key="year" :value="(2025 + year - 1).toString().slice(-2)">
                            {{ 2025 + year - 1 }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Security code *</label>
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="securityCode" placeholder="CVV" maxlength="4">
                      <span class="input-group-text">?</span>
                    </div>
                    <small class="text-muted">🔒 All card information is fully encrypted and protected.</small>
                  </div>
                </div>

                <!-- Billing Address -->
                <h6 class="mb-3">Billing address</h6>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Country</label>
                    <select class="form-select" v-model="billingCountry">
                      <option value="BD">Bangladesh</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="IN">India</option>
                    </select>
                  </div>
                </div>
              </form>

              <!-- Digital Payment Button -->
              <button class="btn btn-primary w-100 py-3 mb-3" @click="processPayment">
                🔒 DIGITAL PAYMENT
              </button>

              <!-- Terms and Conditions -->
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="agreeTerms" v-model="agreeTerms">
                <label class="form-check-label small" for="agreeTerms">
                  I agree to receive updates and promotions about Agoda and its affiliated businesses partners via various channels, including WhatsApp. See our <a href="#">Privacy Policy</a>.
                </label>
              </div>

              <div class="mb-3">
                <small class="text-muted">
                  🔒 Proceeding with this booking, I agree to Agoda's <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
                </small>
              </div>
            </div>
          </div>

          <!-- Confirmation Message -->
          <div class="confirmation-notice p-3 bg-light rounded">
            <p class="mb-2">
              <strong>📧 We'll send confirmation of your booking to:</strong> 
              {{ guestEmail || 'guest@example.com' }}
            </p>
            <button class="btn btn-success btn-lg w-100 py-3" @click="confirmBooking">
              📋 BOOK NOW & PAY LATER
              <div><small>Pay nothing now. Pay later at the hotel.</small></div>
            </button>
          </div>
        </div>

        <!-- Right Column - Booking Summary -->
        <div class="col-lg-4">
          <div class="card sticky-top">
            <div class="card-body">
              <!-- Hotel Info -->
              <div class="d-flex mb-3">
                <img :src="selectedRoom.image || '/src/assets/images/hotel1.jpg'" alt="Hotel" class="hotel-thumb me-3">
                <div>
                  <h6 class="mb-1">{{ hotelInfo.name }}</h6>
                  <div class="rating mb-1">
                    <span class="badge bg-primary">{{ hotelInfo.rating }}</span>
                    <span class="ms-1">{{ hotelInfo.reviews }} reviews</span>
                  </div>
                  <small class="text-muted">Room - City View</small>
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
              </div>

              <!-- Alerts -->
              <div class="alert alert-warning py-2 mb-3">
                <small>⚠️ <strong>Hurry! Our last room for your dates at this price</strong></small>
              </div>

              <div class="alert alert-info py-2 mb-3">
                <small>🎯 <strong>Auto-applied coupon</strong></small>
              </div>

              <div class="alert alert-success py-2 mb-3">
                <small>💰 <strong>Instant discount</strong><br>
                Get 7% off
                </small>
              </div>

              <!-- Pricing Breakdown -->
              <div class="pricing-section">
                <div class="d-flex justify-content-between mb-2">
                  <span>Original price (1 room × 1 night):</span>
                  <span>USD 67.50</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Our price</span>
                  <span>USD 47.63</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Instant discount:</span>
                  <span class="text-success">-USD 3.76</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Agent price (1 room × 1 night):</span>
                  <span>USD 43.87</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Taxes and Fees</span>
                  <span>USD 6.76</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Booking total</span>
                  <span>USD 50.63</span>
                </div>
                <hr>

                <!-- Payment Schedule -->
                <h6 class="mb-3">Subject to Cambodia Taxes:</h6>
                <div class="d-flex justify-content-between mb-2">
                  <span>Pay now (to secure your booking):</span>
                  <span class="fw-bold">USD 16.10</span>
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <span>Pay anytime from 16 October 2025 on:</span>
                  <span class="fw-bold">USD 0.00</span>
                </div>

                <!-- Final Price -->
                <div class="final-price bg-light p-3 rounded">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <div class="fw-bold fs-4 text-primary">USD 61.39</div>
                      <small class="text-muted">Subject to Cambodia Taxes: USD 16.10</small>
                    </div>
                  </div>
                </div>

                <!-- Cancellation Policy -->
                <div class="mt-3">
                  <h6>How much will it cost to cancel?</h6>
                  <p class="small text-success">
                    Free Cancel Cancel for free before 11:59 PM on 15 Oct 2025. After this time, you will be charged the full amount of your stay if you cancel.
                  </p>
                  <div class="d-flex justify-content-between small">
                    <span>15 Oct</span>
                    <span class="text-success">Free</span>
                  </div>
                  <div class="d-flex justify-content-between small">
                    <span>16 Oct</span>
                    <span>USD 61.39</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Trust Signals -->
    <div class="footer-trust bg-light py-4">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4">
            <div class="trust-item">
              <h6>100+ MILLION VERIFIED REVIEWS</h6>
              <small>Find the perfect place to stay. Real traveler reviews from the expert travel community.</small>
            </div>
          </div>
          <div class="col-md-4">
            <div class="trust-item">
              <h6>BEST PRICE GUARANTEE</h6>
              <small>Previous users rate this app 4 stars on the App Store, find it fast they want. Book by today and save money in rates.</small>
            </div>
          </div>
          <div class="col-md-4">
            <div class="trust-item">
              <h6>FREE 24/7 CUSTOMER SERVICE</h6>
              <small>Experience 21 languages every day, every step of the way, here to help you.</small>
            </div>
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

// Form data
const paymentDate = ref('now')
const cardType = ref('visa')
const cardNumber = ref('')
const cardholderName = ref('')
const expiryMonth = ref('')
const expiryYear = ref('')
const securityCode = ref('')
const billingCountry = ref('BD')
const agreeTerms = ref(false)

// Guest info (could come from previous step)
const guestEmail = ref(route.query.email || 'guest@example.com')

// Hotel and room info (from previous steps)
const hotelInfo = ref({
  name: 'Best Western S K S Chattogram',
  rating: '8.4',
  reviews: '57 reviews'
})

const selectedRoom = ref({
  name: route.query.roomName || 'Deluxe Twin Room - City View',
  image: '/src/assets/images/hotel1.jpg',
  price: parseFloat(route.query.price) || 54.00
})

// Payment processing
function processPayment() {
  if (!validatePaymentForm()) {
    return
  }
  
  console.log('Processing payment:', {
    paymentDate: paymentDate.value,
    cardType: cardType.value,
    cardNumber: cardNumber.value.replace(/\s/g, ''),
    cardholderName: cardholderName.value,
    expiryMonth: expiryMonth.value,
    expiryYear: expiryYear.value,
    securityCode: securityCode.value,
    billingCountry: billingCountry.value
  })
  
  // Navigate to success page with booking details
  router.push({
    path: '/booking-success',
    query: {
      firstName: route.query.firstName || 'Guest',
      lastName: route.query.lastName || 'User',
      email: guestEmail.value,
      roomName: selectedRoom.value.name,
      totalAmount: '61.39',
      paymentMethod: 'Credit Card'
    }
  })
}

function validatePaymentForm() {
  if (!cardNumber.value || !cardholderName.value || !expiryMonth.value || !expiryYear.value || !securityCode.value) {
    alert('Please fill in all payment details')
    return false
  }
  
  if (!agreeTerms.value) {
    alert('Please agree to terms and conditions')
    return false
  }
  
  return true
}

function confirmBooking() {
  console.log('Booking confirmed without payment')
  
  // Navigate to success page with booking details  
  router.push({
    path: '/booking-success',
    query: {
      firstName: route.query.firstName || 'Guest',
      lastName: route.query.lastName || 'User',
      email: guestEmail.value,
      roomName: selectedRoom.value.name,
      totalAmount: '50.63',
      paymentMethod: 'Pay at Hotel'
    }
  })
}

// Format card number with spaces
function formatCardNumber() {
  const value = cardNumber.value.replace(/\s/g, '')
  const formattedValue = value.replace(/(.{4})/g, '$1 ')
  cardNumber.value = formattedValue.trim()
}
</script>

<style scoped>
.payment-page {
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

.progress-steps .step.completed {
  color: #198754;
  font-weight: 600;
}

.progress-steps .step.active::after,
.progress-steps .step.completed::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
}

.progress-steps .step.active::after {
  background-color: #0d6efd;
}

.progress-steps .step.completed::after {
  background-color: #198754;
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

.payment-methods {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
}

.payment-icon {
  width: 40px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.final-price {
  border: 2px solid #0d6efd;
}

.trust-item h6 {
  color: #0d6efd;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
}

.trust-item small {
  font-size: 11px;
  line-height: 1.4;
}

.confirmation-notice {
  border: 1px solid #dee2e6;
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

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-success {
  background-color: #198754;
  border-color: #198754;
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
  
  .payment-methods {
    padding: 10px;
  }
  
  .payment-icon {
    width: 32px;
    height: 20px;
  }
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .payment-page {
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

[data-theme="night"] .booking-notice {
  background-color: #4d4015;
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

[data-theme="night"] .card-header.bg-primary {
  background-color: #60a5fa !important;
}

[data-theme="night"] .form-control,
[data-theme="night"] .form-select,
[data-theme="night"] .input-group-text {
  background-color: #070e21;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .form-control:focus,
[data-theme="night"] .form-select:focus {
  background-color: #070e21;
  border-color: #60a5fa;
  color: #e2e8f0;
}

[data-theme="night"] .payment-methods {
  border-color: #1a2744;
}

[data-theme="night"] .confirmation-notice {
  background: #0a1128;
  border-color: #1a2744;
}

[data-theme="night"] .final-price {
  background: #070e21;
  border-color: #60a5fa;
}

[data-theme="night"] .alert-warning {
  background: #4d4015;
  color: #fbbf24;
  border-color: #92400e;
}

[data-theme="night"] .alert-info {
  background: #1a2744;
  color: #60a5fa;
  border-color: #3b5998;
}

[data-theme="night"] .alert-success {
  background: #1e4d3b;
  color: #10b981;
  border-color: #065f46;
}

[data-theme="night"] .footer-trust {
  background: #0a1128;
}

[data-theme="night"] .btn-primary {
  background-color: #60a5fa;
  border-color: #60a5fa;
}

[data-theme="night"] .btn-primary:hover {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

[data-theme="night"] .btn-success {
  background-color: #10b981;
  border-color: #10b981;
}
</style>