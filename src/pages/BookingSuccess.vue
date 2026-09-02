<template>
  <div class="booking-success-page">
    <!-- Header -->
    <div class="success-header bg-success text-white py-4">
      <div class="container text-center">
        <div class="mb-3">
          <div class="success-icon">✅</div>
        </div>
        <h2>Booking Confirmed!</h2>
        <p class="mb-0">Your reservation has been successfully processed</p>
      </div>
    </div>

    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Booking Details Card -->
          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">📋 Booking Confirmation</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-8">
                  <h6 class="mb-3">{{ hotelName }}</h6>
                  <div class="booking-info">
                    <div class="info-row">
                      <strong>Confirmation Number:</strong> 
                      <span class="text-primary">{{ confirmationNumber }}</span>
                    </div>
                    <div class="info-row">
                      <strong>Guest Name:</strong> {{ guestName }}
                    </div>
                    <div class="info-row">
                      <strong>Room Type:</strong> {{ roomType }}
                    </div>
                    <div class="info-row">
                      <strong>Check-in:</strong> October 16, 2025
                    </div>
                    <div class="info-row">
                      <strong>Check-out:</strong> October 17, 2025
                    </div>
                    <div class="info-row">
                      <strong>Total Amount:</strong> 
                      <span class="text-success fw-bold">USD {{ totalAmount }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <img src="/src/assets/images/hotel1.jpg" alt="Hotel" class="img-fluid rounded">
                </div>
              </div>
            </div>
          </div>

          <!-- What's Next -->
          <div class="card mb-4">
            <div class="card-header">
              <h6 class="mb-0">📧 What happens next?</h6>
            </div>
            <div class="card-body">
              <ul class="list-unstyled">
                <li class="mb-2">
                  <span class="text-success">✓</span> 
                  You'll receive a confirmation email at <strong>{{ guestEmail }}</strong>
                </li>
                <li class="mb-2">
                  <span class="text-success">✓</span> 
                  The hotel will prepare your room for arrival
                </li>
                <li class="mb-2">
                  <span class="text-success">✓</span> 
                  Present this confirmation at check-in
                </li>
                <li class="mb-0">
                  <span class="text-success">✓</span> 
                  Free cancellation until 11:59 PM on October 15, 2025
                </li>
              </ul>
            </div>
          </div>

          <!-- Actions -->
          <div class="text-center">
            <button class="btn btn-primary btn-lg me-3" @click="downloadConfirmation">
              📄 Download Confirmation
            </button>
            <button class="btn btn-outline-primary btn-lg" @click="backToHome">
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer bg-light py-4 mt-5">
      <div class="container text-center">
        <p class="mb-0 text-muted">
          Thank you for choosing our booking platform. Have a great stay!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Booking details
const confirmationNumber = ref('')
const hotelName = ref('Best Western S K S Chattogram')
const guestName = ref('')
const guestEmail = ref('')
const roomType = ref('Deluxe Twin Room - City View')
const totalAmount = ref('61.39')

onMounted(() => {
  // Generate confirmation number
  confirmationNumber.value = 'BRB' + Date.now().toString().slice(-8)
  
  // Get guest details from query params if available
  guestName.value = `${route.query.firstName || 'John'} ${route.query.lastName || 'Doe'}`
  guestEmail.value = route.query.email || 'guest@example.com'
  roomType.value = route.query.roomName || 'Deluxe Twin Room - City View'
  totalAmount.value = route.query.totalAmount || '61.39'
})

function downloadConfirmation() {
  // Create a simple text confirmation
  const confirmationText = `
BOOKING CONFIRMATION

Confirmation Number: ${confirmationNumber.value}
Hotel: ${hotelName.value}
Guest: ${guestName.value}
Email: ${guestEmail.value}
Room: ${roomType.value}
Check-in: October 16, 2025
Check-out: October 17, 2025
Total: USD ${totalAmount.value}

Thank you for your booking!
  `.trim()

  const blob = new Blob([confirmationText], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `booking-confirmation-${confirmationNumber.value}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

function backToHome() {
  router.push('/')
}
</script>

<style scoped>
.booking-success-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.success-header {
  background: linear-gradient(135deg, #198754 0%, #20c997 100%) !important;
}

.success-icon {
  font-size: 4rem;
  animation: bounce 1s ease-in-out;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.booking-info .info-row {
  padding: 8px 0;
  border-bottom: 1px solid #f8f9fa;
}

.booking-info .info-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.card {
  border: none;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  border-radius: 12px;
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
  padding: 12px 24px;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-outline-primary {
  padding: 12px 24px;
}

@media (max-width: 768px) {
  .success-icon {
    font-size: 3rem;
  }
  
  .btn-lg {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .btn-lg.me-3 {
    margin-right: 0 !important;
  }
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .booking-success-page {
  background-color: #070e21;
  color: #e2e8f0;
}

[data-theme="night"] .success-header {
  background: linear-gradient(135deg, #065f46 0%, #10b981 100%) !important;
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

[data-theme="night"] .booking-info .info-row {
  border-bottom-color: #1a2744;
}

[data-theme="night"] .footer {
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

[data-theme="night"] .btn-outline-primary {
  color: #60a5fa;
  border-color: #60a5fa;
}

[data-theme="night"] .btn-outline-primary:hover {
  background-color: #60a5fa;
  border-color: #60a5fa;
  color: white;
}
</style>