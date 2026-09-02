<template>
  <div class="hotel-details-page">
    <!-- Hotel Header -->
    <div class="hotel-header-section">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="breadcrumb-nav mb-2">
          <router-link to="/" class="text-primary">Home</router-link>
          <span class="text-muted"> / </span>
          <router-link to="/filter" class="text-primary">Hotels</router-link>
          <span class="text-muted"> / </span>
          <span class="text-dark">{{ hotelData.name }}</span>
        </div>

        <div class="row align-items-start">
          <div class="col-lg-8">
            <!-- Hotel Name & Stars -->
            <div class="d-flex align-items-center gap-2 mb-2">
              <div class="star-rating">
                <i class="bi bi-star-fill text-warning" v-for="n in 5" :key="n"></i>
              </div>
              <span class="text-muted small">5-star hotel</span>
            </div>
            
            <h1 class="hotel-name mb-2">{{ hotelData.name }}</h1>
            
            <!-- Location -->
            <div class="hotel-location d-flex align-items-center gap-2 mb-3">
              <i class="bi bi-geo-alt text-muted"></i>
              <span class="text-muted">{{ hotelData.address }}</span>
              <button class="btn btn-link btn-sm p-0 text-primary">SEE MAP</button>
            </div>

            <!-- Highlights -->
            <div class="highlights mb-3">
              <h6 class="mb-2">Highlights</h6>
              <div class="row g-2">
                <div class="col-auto" v-for="highlight in hotelData.highlights" :key="highlight">
                  <div class="highlight-badge">
                    <i class="bi bi-check-circle-fill text-success me-1"></i>
                    <span class="small">{{ highlight }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <!-- Review Score -->
            <div class="review-score-card">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <div class="score-number">{{ hotelData.reviewScore }}</div>
                  <div class="score-text">{{ hotelData.scoreText }}</div>
                  <div class="review-count">{{ hotelData.reviewCount }} reviews</div>
                </div>
                <button class="btn btn-outline-primary btn-sm">Read all reviews</button>
              </div>
              
              <!-- Review breakdown -->
              <div class="score-breakdown mt-3">
                <div class="row g-2 text-center">
                  <div class="col" v-for="category in reviewCategories" :key="category.name">
                    <div class="category-score">{{ category.score }}</div>
                    <div class="category-name">{{ category.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Photo Gallery -->
    <div class="photo-gallery-section">
      <div class="container px-0">
        <div class="gallery-layout">
          <div class="main-photo" @click="openPhotoModal">
            <img :src="galleryImages[0]" alt="Hotel Main Photo" />
            <div class="photo-overlay">
              <button class="btn btn-dark btn-sm see-all-btn">
                <i class="bi bi-images me-1"></i>
                See all {{ galleryImages.length }} photos
              </button>
            </div>
          </div>
          
          <div class="photo-thumbnails">
            <div 
              v-for="(image, index) in galleryImages.slice(1, 5)" 
              :key="index"
              class="thumbnail-photo"
              @click="openPhotoModal"
            >
              <img :src="image" :alt="`Hotel photo ${index + 2}`" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content-section">
      <div class="container">
        <div class="row">
          <!-- Left Column -->
          <div class="col-lg-8">
            
            <!-- Room Selection -->
            <section class="room-selection-section mb-5">
              <div class="section-title d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h3>Select your room</h3>
                  <p class="text-muted mb-0">We price match! <i class="bi bi-info-circle"></i></p>
                </div>
              </div>

              <!-- Room Filters -->
              <div class="room-filters mb-4">
                <div class="d-flex align-items-center gap-3 flex-wrap">
                  <span class="filter-label">Filter room options by:</span>
                  <button class="btn btn-outline-secondary btn-sm">Clear all</button>
                  <div class="filter-badges">
                    <span class="badge bg-light text-dark">Non-smoking ({{ rooms.length }})</span>
                    <span class="badge bg-light text-dark">Breakfast included ({{ rooms.filter(r => r.breakfast).length }})</span>
                    <span class="badge bg-light text-dark">Free cancellation ({{ rooms.filter(r => r.freeCancellation).length }})</span>
                  </div>
                </div>
              </div>

              <!-- Room Types Counter -->
              <div class="room-summary mb-4">
                <h5>{{ rooms.length }} room types | {{ totalRoomOffers }} room offers</h5>
                <p class="text-muted small mb-0">Prices do not include taxes & fees</p>
              </div>

              <!-- Room Cards -->
              <div class="rooms-list">
                <div v-for="room in rooms" :key="room.id" class="room-card mb-4">
                  <div class="row g-0">
                    <!-- Room Image -->
                    <div class="col-md-3">
                      <div class="room-image-container">
                        <img :src="room.mainImage" :alt="room.name" class="room-image">
                        <button class="btn btn-link room-photos-btn">
                          <i class="bi bi-images me-1"></i>
                          Room photos and details
                        </button>
                      </div>
                    </div>

                    <!-- Room Info -->
                    <div class="col-md-4 p-4">
                      <h4 class="room-name mb-2">{{ room.name }}</h4>
                      
                      <!-- Room Features -->
                      <div class="room-features mb-3">
                        <div v-if="room.roomSize" class="feature-item">
                          <i class="bi bi-house me-1"></i>
                          <span>Room size: {{ room.roomSize }}</span>
                        </div>
                        <div v-if="room.bedType" class="feature-item">
                          <i class="bi bi-bed me-1"></i>
                          <span>{{ room.bedType }}</span>
                        </div>
                        <div v-if="room.view" class="feature-item">
                          <i class="bi bi-eye me-1"></i>
                          <span>{{ room.view }}</span>
                        </div>
                        <div class="feature-item">
                          <i class="bi bi-snow me-1"></i>
                          <span>Air conditioning</span>
                        </div>
                      </div>
                      
                      <button class="btn btn-link p-0 text-primary">See all room facilities</button>
                    </div>

                    <!-- Room Offers -->
                    <div class="col-md-5 p-4">
                      <div v-for="offer in room.offers" :key="offer.id" class="room-offer mb-3 p-3 border rounded">
                        <!-- Offer Features -->
                        <div class="offer-features mb-2">
                          <div v-if="offer.breakfast" class="offer-badge breakfast-badge mb-2">
                            <i class="bi bi-cup-hot me-1"></i>
                            Breakfast included
                          </div>
                          
                          <div v-if="offer.freeCancellation" class="cancellation-policy mb-2">
                            <i class="bi bi-check-circle text-success me-1"></i>
                            <span class="text-success">Free cancellation before 23:59 on {{ cancellationDate }}</span>
                          </div>
                          
                          <div v-if="offer.payAtHotel" class="policy-badge mb-1">
                            <i class="bi bi-credit-card me-1"></i>
                            Pay at the hotel
                          </div>
                          
                          <div v-if="offer.noCreditCard" class="policy-badge mb-1">
                            <i class="bi bi-person-check me-1"></i>
                            Book without credit card
                          </div>
                          
                          <div v-if="offer.parking" class="policy-badge mb-1">
                            <i class="bi bi-p-square me-1"></i>
                            Parking
                          </div>
                        </div>

                        <!-- Pricing -->
                        <div class="pricing-section">
                          <div v-if="offer.specialBadge" class="special-badge mb-2">
                            {{ offer.specialBadge }}
                          </div>
                          
                          <div v-if="offer.originalPrice && offer.originalPrice !== offer.price" class="original-price text-muted text-decoration-line-through">
                            USD {{ offer.originalPrice }}
                          </div>
                          
                          <div class="current-price">
                            <span class="price-amount">USD {{ offer.price }}</span>
                            <span class="price-period">Per night before taxes and fees</span>
                          </div>
                          
                          <div v-if="offer.availability" class="availability-notice text-warning small">
                            {{ offer.availability }}
                          </div>
                        </div>

                        <!-- Book Button -->
                        <button class="btn btn-primary w-100 mt-3 book-btn" @click="bookRoom(room.id, offer.id)">
                          <span class="me-2">{{ offer.roomCount || 1 }}</span>
                          Book now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- About This Property -->
            <section class="about-section mb-5">
              <h3 class="mb-3">About us</h3>
              <p class="text-muted">{{ hotelData.description }}</p>
              <button class="btn btn-link p-0 text-primary">Read more</button>
            </section>

          </div>

          <!-- Right Column -->
          <div class="col-lg-4">
            
            <!-- Facilities Card -->
            <div class="facilities-card mb-4">
              <h5 class="card-title mb-3">Facilities</h5>
              
              <!-- Quick Facilities -->
              <div class="quick-facilities mb-4">
                <div v-for="facility in quickFacilities" :key="facility" class="facility-item mb-2">
                  <i class="bi bi-check-circle text-success me-2"></i>
                  <span>{{ facility }}</span>
                </div>
              </div>

              <!-- Facility Categories -->
              <div class="facility-categories">
                <div v-for="category in facilityCategories" :key="category.name" class="category-section mb-3">
                  <h6 class="category-title mb-2">{{ category.name }}</h6>
                  <div class="row g-2">
                    <div v-for="facility in category.items" :key="facility" class="col-6">
                      <div class="facility-badge">
                        <i class="bi bi-check me-1"></i>
                        <span class="small">{{ facility }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button class="btn btn-outline-primary btn-sm w-100">See all amenities</button>
            </div>

            <!-- Location Card -->
            <div class="location-card mb-4">
              <h5 class="card-title mb-3">Location</h5>
              <div class="location-score mb-3">
                <span class="score-badge">{{ hotelData.locationScore }}</span>
                <span class="ms-2">Location rating score</span>
              </div>
              
              <div class="location-features mb-3">
                <div class="feature-item mb-2">
                  <i class="bi bi-p-square text-success me-2"></i>
                  <span>Parking <strong>FREE</strong></span>
                </div>
              </div>
              
              <h6 class="landmarks-title mb-2">Closest landmarks</h6>
              <div class="landmarks-list">
                <div v-for="landmark in nearbyLandmarks" :key="landmark.name" class="landmark-item mb-2">
                  <span class="landmark-name">{{ landmark.name }}</span>
                  <span class="landmark-distance text-muted">{{ landmark.distance }}</span>
                </div>
              </div>
              
              <button class="btn btn-outline-primary btn-sm w-100">See nearby places</button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Photo Modal -->
    <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ hotelData.name }} - Photos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div v-for="(image, index) in galleryImages" :key="index" class="col-md-4 col-lg-3">
                <img :src="image" :alt="`Hotel photo ${index + 1}`" class="img-fluid rounded">
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
import { useRoute } from 'vue-router'

const route = useRoute()
const hotelId = route.params.id

// Hotel Data
const hotelData = ref({
  name: 'Best Western S K S Chattogram',
  address: 'SKTC, 8RG7+95R, 29 Agrabad C/A., Kotwali, Chittagong, Bangladesh, 4100',
  reviewScore: '8.4',
  scoreText: 'Excellent',
  reviewCount: '57',
  locationScore: '5.0',
  highlights: [
    'Great for activities',
    'Excellent room comfort & quality'
  ],
  description: 'Conveniently situated in the Kotwali part of Chittagong, this property puts you close to attractions and interesting dining options. This 5-star property is packed with in-house facilities to improve the quality and joy of your stay.'
})

// Gallery Images
const galleryImages = [
  '/src/assets/images/hotel1.jpg',
  '/src/assets/images/hotel2.jpg',
  '/src/assets/images/hotel3.jpg',
  '/src/assets/images/hotel4.jpg',
  '/src/assets/images/hotel5.jpg',
  '/src/assets/images/hotel6.jpg',
  '/src/assets/images/hotel7.jpg',
  '/src/assets/images/hotel8.jpg'
]

// Review Categories
const reviewCategories = ref([
  { name: 'Cleanliness', score: '5.0' },
  { name: 'Facilities', score: '5.0' },
  { name: 'Location', score: '5.0' },
  { name: 'Service', score: '5.0' }
])

// Room Data
const rooms = ref([
  {
    id: 'superior-twin',
    name: 'Superior Twin Room',
    mainImage: '/src/assets/images/hotel1.jpg',
    roomSize: null,
    bedType: '2 single beds',
    view: null,
    offers: [
      {
        id: 'superior-twin-1',
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        noCreditCard: true,
        parking: true,
        specialBadge: 'CHEAPEST PRICE YOU\'VE SEEN!',
        price: 54,
        originalPrice: null,
        availability: 'Our last 5 rooms!',
        roomCount: 1
      }
    ]
  },
  {
    id: 'deluxe-twin',
    name: 'Deluxe Twin Room',
    mainImage: '/src/assets/images/hotel2.jpg',
    roomSize: '21 m²/226 ft²',
    bedType: '2 single beds',
    view: 'Outdoor view',
    offers: [
      {
        id: 'deluxe-twin-1',
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        noCreditCard: true,
        parking: true,
        price: 54,
        originalPrice: null,
        availability: 'Limited availability',
        roomCount: 1
      },
      {
        id: 'deluxe-twin-2',
        breakfast: true,
        freeCancellation: false,
        payAtHotel: false,
        noCreditCard: false,
        parking: true,
        specialBadge: 'Non-refundable (Low price!)',
        price: 58,
        originalPrice: 66,
        availability: 'Our last room!',
        roomCount: 1
      }
    ]
  },
  {
    id: 'deluxe-king',
    name: 'Deluxe King Room',
    mainImage: '/src/assets/images/hotel3.jpg',
    roomSize: '21 m²/226 ft²',
    bedType: '1 double bed',
    view: 'Outdoor view',
    offers: [
      {
        id: 'deluxe-king-1',
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        noCreditCard: true,
        parking: true,
        specialBadge: 'Lowest price available!',
        price: 54,
        originalPrice: null,
        availability: 'Our last 3 rooms!',
        roomCount: 1
      },
      {
        id: 'deluxe-king-2',
        breakfast: true,
        freeCancellation: false,
        payAtHotel: false,
        noCreditCard: false,
        parking: true,
        specialBadge: 'Non-refundable (Low price!)',
        price: 58,
        originalPrice: 66,
        availability: 'Our last room!',
        roomCount: 1
      }
    ]
  },
  {
    id: 'superior-king',
    name: 'Superior King Room',
    mainImage: '/src/assets/images/hotel4.jpg',
    roomSize: null,
    bedType: '1 double bed',
    view: null,
    offers: [
      {
        id: 'superior-king-1',
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        noCreditCard: true,
        parking: true,
        price: 59,
        originalPrice: null,
        availability: 'Our last 5 rooms!',
        roomCount: 1
      }
    ]
  },
  {
    id: 'junior-suite',
    name: 'Junior Suite',
    mainImage: '/src/assets/images/hotel5.jpg',
    roomSize: null,
    bedType: '1 double bed',
    view: null,
    offers: [
      {
        id: 'junior-suite-1',
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        noCreditCard: true,
        parking: true,
        price: 77,
        originalPrice: null,
        availability: 'Our last 3 rooms!',
        roomCount: 1
      }
    ]
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    mainImage: '/src/assets/images/hotel6.jpg',
    roomSize: null,
    bedType: '1 double bed',
    view: null,
    offers: [
      {
        id: 'executive-suite-1',
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        noCreditCard: true,
        parking: true,
        price: 99,
        originalPrice: null,
        availability: 'Our last room!',
        roomCount: 1
      }
    ]
  }
])

// Facilities
const quickFacilities = ref([
  'Free parking',
  'Smoke-free property',
  'English'
])

const facilityCategories = ref([
  {
    name: 'Food and Drinks',
    items: ['Room service [24-hour]', 'Coffee shop', 'Bar']
  },
  {
    name: 'Wellness',
    items: ['Salon', 'Fitness center', 'Spa']
  },
  {
    name: 'Activities',
    items: ['Beach']
  }
])

// Nearby Landmarks
const nearbyLandmarks = ref([
  { name: 'Jamyiatul Falah', distance: '3.0 km' },
  { name: 'AnderKilla Mosque', distance: '3.0 km' },
  { name: 'Agartala Airport', distance: '183.7 km' }
])

// Computed Properties
const totalRoomOffers = computed(() => {
  return rooms.value.reduce((total, room) => total + room.offers.length, 0)
})

const cancellationDate = computed(() => {
  return 'October 8, 2025'
})

// Methods
function openPhotoModal() {
  // Bootstrap modal functionality
  const modal = new bootstrap.Modal(document.getElementById('photoModal'))
  modal.show()
}

function bookRoom(roomId, offerId) {
  console.log(`Booking room ${roomId} with offer ${offerId}`)
  // Add booking logic here
}
</script>

<style scoped>
/* Hotel Header */
.hotel-header-section {
  background: #fff;
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
}

.breadcrumb-nav {
  font-size: 0.9rem;
}

.hotel-name {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
}

.star-rating i {
  font-size: 0.9rem;
}

.hotel-location {
  font-size: 0.9rem;
}

.highlight-badge {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
}

/* Review Score Card */
.review-score-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.score-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #059669;
}

.score-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #059669;
}

.review-count {
  font-size: 0.9rem;
  color: #6b7280;
}

.score-breakdown {
  border-top: 1px solid #e5e7eb;
  padding-top: 15px;
}

.category-score {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
}

.category-name {
  font-size: 0.8rem;
  color: #6b7280;
}

/* Photo Gallery */
.photo-gallery-section {
  margin-bottom: 30px;
}

.gallery-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4px;
  height: 400px;
}

.main-photo {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.main-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-overlay {
  position: absolute;
  bottom: 16px;
  right: 16px;
}

.see-all-btn {
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.7) !important;
  border: none;
}

.photo-thumbnails {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

.thumbnail-photo {
  overflow: hidden;
  cursor: pointer;
}

.thumbnail-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.thumbnail-photo:hover img {
  transform: scale(1.05);
}

/* Main Content */
.main-content-section {
  padding: 30px 0;
  background: #f9fafb;
}

.section-title h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
}

/* Room Selection */
.room-filters {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.filter-label {
  font-weight: 600;
  color: #374151;
}

.filter-badges .badge {
  margin-right: 8px;
  margin-bottom: 4px;
}

.room-summary h5 {
  font-weight: 700;
  color: #1a202c;
}

/* Room Cards */
.room-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.room-image-container {
  position: relative;
  height: 100%;
  min-height: 200px;
}

.room-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.room-photos-btn {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
}

.room-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
}

.room-features .feature-item {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 4px;
}

/* Room Offers */
.room-offer {
  background: #f9fafb;
}

.offer-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 600;
}

.breakfast-badge {
  background: #fef3c7;
  color: #92400e;
  padding: 4px 8px;
  border-radius: 4px;
}

.cancellation-policy {
  font-size: 0.85rem;
}

.policy-badge {
  font-size: 0.8rem;
  color: #6b7280;
}

.special-badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.pricing-section {
  margin: 15px 0;
}

.original-price {
  font-size: 0.9rem;
}

.current-price .price-amount {
  font-size: 1.4rem;
  font-weight: 700;
  color: #dc2626;
}

.current-price .price-period {
  display: block;
  font-size: 0.8rem;
  color: #6b7280;
}

.availability-notice {
  font-weight: 600;
}

.book-btn {
  background: #2563eb;
  border: none;
  font-weight: 600;
  padding: 12px;
}

.book-btn:hover {
  background: #1d4ed8;
}

/* Facilities Card */
.facilities-card, .location-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.card-title {
  font-weight: 700;
  color: #1a202c;
}

.quick-facilities .facility-item {
  font-size: 0.9rem;
  color: #374151;
}

.category-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.facility-badge {
  background: #f3f4f6;
  border-radius: 4px;
  padding: 4px 6px;
  font-size: 0.8rem;
  color: #374151;
}

/* Location Card */
.score-badge {
  background: #059669;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.landmarks-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.landmark-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.landmark-name {
  color: #374151;
}

.landmark-distance {
  font-size: 0.8rem;
}

/* About Section */
.about-section {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

/* Responsive Design */
@media (max-width: 991px) {
  .gallery-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 250px auto;
  }
  
  .photo-thumbnails {
    grid-template-columns: repeat(4, 1fr);
    height: 100px;
  }
  
  .hotel-name {
    font-size: 1.5rem;
  }
  
  .review-score-card {
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .room-card .row {
    flex-direction: column;
  }
  
  .room-image-container {
    min-height: 150px;
  }
  
  .filter-badges {
    width: 100%;
    margin-top: 10px;
  }
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .hotel-header-section {
  background: #0a1128;
  border-bottom-color: #1a2744;
}

[data-theme="night"] .hotel-name,
[data-theme="night"] .room-name,
[data-theme="night"] .card-title,
[data-theme="night"] .section-title h3,
[data-theme="night"] .room-summary h5 {
  color: #e2e8f0;
}

[data-theme="night"] .breadcrumb-nav a,
[data-theme="night"] .breadcrumb-nav span {
  color: #94a3b8;
}

[data-theme="night"] .highlight-badge {
  background: #1a2744;
  border-color: #3b5998;
  color: #e2e8f0;
}

[data-theme="night"] .review-score-card,
[data-theme="night"] .room-card,
[data-theme="night"] .facilities-card,
[data-theme="night"] .location-card,
[data-theme="night"] .about-section {
  background: rgba(13, 25, 49, 0.95) !important;
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .score-number,
[data-theme="night"] .score-text {
  color: #60a5fa;
}

[data-theme="night"] .review-count,
[data-theme="night"] .category-name,
[data-theme="night"] .landmark-distance {
  color: #94a3b8;
}

[data-theme="night"] .category-score {
  color: #e2e8f0;
}

[data-theme="night"] .score-breakdown {
  border-top-color: #1a2744;
}

[data-theme="night"] .main-content-section {
  background: #070e21;
}

[data-theme="night"] .room-filters {
  background: #0a1128;
  border-color: #1a2744;
}

[data-theme="night"] .filter-label {
  color: #e2e8f0;
}

[data-theme="night"] .room-features .feature-item,
[data-theme="night"] .policy-badge {
  color: #94a3b8;
}

[data-theme="night"] .room-offer {
  background: #070e21;
}

[data-theme="night"] .breakfast-badge {
  background: #4d4015;
  color: #fbbf24;
}

[data-theme="night"] .special-badge {
  background: #1a2744;
  color: #60a5fa;
}

[data-theme="night"] .current-price .price-amount {
  color: #f87171;
}

[data-theme="night"] .current-price .price-period {
  color: #94a3b8;
}

[data-theme="night"] .book-btn {
  background: #60a5fa;
}

[data-theme="night"] .book-btn:hover {
  background: #3b82f6;
}

[data-theme="night"] .quick-facilities .facility-item {
  color: #e2e8f0;
}

[data-theme="night"] .category-title {
  color: #94a3b8;
}

[data-theme="night"] .facility-badge {
  background: #070e21;
  color: #e2e8f0;
}

[data-theme="night"] .landmarks-title,
[data-theme="night"] .landmark-name {
  color: #e2e8f0;
}

[data-theme="night"] .room-photos-btn {
  background: rgba(26, 47, 92, 0.7);
}
</style>