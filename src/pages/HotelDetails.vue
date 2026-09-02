<template>
  <div class="hotel-details-page px-3 px-md-0" :class="{ 'modal-active': showAuthModal }">
    <div class="container main-container">
    <!-- Header / Search Bar -->
    <div class="search-header d-none d-md-block">
  <div class="search-container">
        <input type="text" placeholder="search here" class="search-input">
        <div class="date-picker">16 Oct 2025 - 17 Oct 2025</div>
        <div class="guests-picker">2 adults, 1 room</div>
        <button class="update-btn">UPDATE</button>
      </div>
    </div>

    <!-- Debug banner for guests to open auth modal manually -->
    <div v-if="!auth.isAuthenticated.value && !showAuthModal" class="guest-auth-banner d-md-none d-lg-block">
      <div class="py-2">
        <div class="alert alert-warning mb-0 d-flex justify-content-between align-items-center">
          <div>Please sign in or register to book rooms.</div>
          <div>
            <button class="btn btn-sm btn-outline-dark me-2" @click="authModalTab = 'login'; showAuthModal = true">Sign in</button>
            <button class="btn btn-sm btn-primary" @click="authModalTab = 'register'; showAuthModal = true">Register</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hotel Hero Section (photo grid, 30vh) -->
  <div class="hero-section py-4">
      <div class="image-gallery">
        <div class="gallery-grid">
          <div
            v-for="(img, idx) in hotelImages.slice(0,7)"
            :key="idx"
            :class="['gallery-item', { big: idx === 0 } ]"
            @click="openImageModal('all', idx)"
          >
            <img :src="img" :alt="`photo-${idx}`">
            <button v-if="idx === 0" class="see-all-btn" @click.stop="openImageModal('all', idx)">See all photos</button>
            <div v-if="idx === 0" class="favorite-bubble">♡</div>
          </div>
        </div>
      </div>
    </div>
  <!-- Highlights -->
  <!-- anchor for Overview -->
  <section id="overview" class="section-anchor"></section>
    <!-- Deal / Navigation Bar (tabs + CTA) -->
  <div ref="dealNav" class="deal-nav px-4 sticky-deal-nav">
      <button class="tabs-arrow left" type="button" @click.prevent="scrollTabs(-1)" aria-label="Scroll tabs left">
        <i class="bi bi-chevron-left" aria-hidden="true"></i>
      </button>
      <div class="deal-tabs" ref="dealTabs">
        <button :class="['tab', { active: activeDealTab === 'overview' }]" @click.prevent="scrollTo('overview')" aria-label="Overview">
          <i class="bi bi-info-circle" aria-hidden="true"></i>
          <span class="tab-text">Overview</span>
        </button>
        <button :class="['tab', { active: activeDealTab === 'rooms' }]" @click.prevent="scrollTo('rooms')" aria-label="Rooms">
          <i class="bi bi-door-open" aria-hidden="true"></i>
          <span class="tab-text">Rooms</span>
        </button>
        <button :class="['tab', { active: activeDealTab === 'trip' }]" @click.prevent="scrollTo('trip')" aria-label="Trip recommendations">
          <i class="bi bi-compass" aria-hidden="true"></i>
          <span class="tab-text">Trip</span>
        </button>
        <button :class="['tab', { active: activeDealTab === 'facilities' }]" @click.prevent="scrollTo('facilities')" aria-label="Facilities">
          <i class="bi bi-tools" aria-hidden="true"></i>
          <span class="tab-text">Facilities</span>
        </button>
        <button :class="['tab', { active: activeDealTab === 'reviews' }]" @click.prevent="scrollTo('reviews')" aria-label="Reviews">
          <i class="bi bi-star" aria-hidden="true"></i>
          <span class="tab-text">Reviews</span>
        </button>
        <button :class="['tab', { active: activeDealTab === 'location' }]" @click.prevent="scrollTo('location')" aria-label="Location">
          <i class="bi bi-geo-alt" aria-hidden="true"></i>
          <span class="tab-text">Location</span>
        </button>
        <button :class="['tab', { active: activeDealTab === 'policies' }]" @click.prevent="scrollTo('policies')" aria-label="Policies">
          <i class="bi bi-file-earmark-text" aria-hidden="true"></i>
          <span class="tab-text">Policies</span>
        </button>
      </div>
      <button class="tabs-arrow right" type="button" @click.prevent="scrollTabs(1)" aria-label="Scroll tabs right">
        <i class="bi bi-chevron-right" aria-hidden="true"></i>
      </button>
    </div>


    <!-- Hotel header + right summary box -->
  <div class="hotel-header">
      <div class="hotel-info">
        <div class="border p-3" style="border-radius: 2px;">
          <h1 class="hotel-name">Best Western S K S Chattogram <span class="stars">★★★★★</span></h1>
          <div class="hotel-address">SKTC, 8RG7+95R, 29 Agrabad C/A., Kotwali, Chittagong, Bangladesh, 4100 - <a href="#">SEE MAP</a></div>
        </div>
  <div class="staycation-section">
      <h3>Staycation offers available</h3>
      <p class="staycation-sub">Get special benefits for your stay</p>
      <div class="staycation-cards">
        <div class="staycard">
          <div class="staycard-icon">🍽️</div>
          <div class="staycard-body">
            <h4>Food and Drinks</h4>
            <div class="staycard-list">
              <div>✔ Room service [24-hour]</div>
              <div>✔ Coffee shop</div>
              <div>✔ Bar</div>
            </div>
            <a class="see-amenities" href="#">See all amenities</a>
          </div>
        </div>

        <div class="staycard">
          <div class="staycard-icon">💆‍♀️</div>
          <div class="staycard-body">
            <h4>Wellness</h4>
            <div class="staycard-list">
              <div>✔ Salon</div>
              <div>✔ Fitness center</div>
              <div>✔ Spa</div>
            </div>
            <a class="see-amenities" href="#">See all amenities</a>
          </div>
        </div>

        <div class="staycard">
          <div class="staycard-icon">🏖️</div>
          <div class="staycard-body">
            <h4>Activities</h4>
            <div class="staycard-list">
              <div>✔ Beach</div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      

      <div class="hotel-side">
        <div class="rating-box">
          <div class="rating-top">8.4 Excellent</div>
          <div class="rating-sub">57 reviews</div>
          <div class="rating-badges">
            <span class="badge small">Cleanliness 5.0</span>
            <span class="badge small">Facilities 5.0</span>
          </div>
        </div>

        <div class="mini-map">
          <div class="map-thumb">SEE MAP</div>
          <div class="map-rating">5.0 Review score<br><small>Location rating score</small></div>
        </div>

        <div class="parking-line">Parking <span class="free">FREE</span></div>

        <div class="landmarks">
          <h5>Closest landmarks</h5>
          <div>Jamyiatul Falah - 3.0 km</div>
          <div>AnderKilla Mosque - 3.0 km</div>
          <div>Agartala Airport - 183.7 km</div>
        </div>
      </div>
    </div>

  <div class="highlights-section">
      <h3>Highlights</h3>
      <div class="highlights-grid">
        <div class="highlight-item">
          <div class="highlight-icon">🏃‍♂️</div>
          <span>Great for activities</span>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">🛏️</div>
          <span>Excellent room comfort & quality</span>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">🅿️</div>
          <span>Car park</span>
        </div>
      </div>
    </div>

  <!-- Room Selection -->
  <section id="rooms" class="section-anchor"></section>
  <div class="room-selection">
      <h2>Select your room</h2>
      <div class="room-filter">
        <span class="filter-note">We price match!</span>
        <div class="filter-options">
          <button class="filter-btn">Non-smoking (3)</button>
          <button class="filter-btn active">Breakfast included (9)</button>
          <button class="filter-btn">Free cancellation (7)</button>
          <button class="filter-btn">Pay at the hotel (7)</button>
        </div>
      </div>

      <div class="room-count-header">
        <h3>6 room types | 11 room offers</h3>
        <p>Prices do not include taxes & fees</p>
      </div>

      <div class="rooms-list">
        <div v-for="room in roomTypes" :key="room.id" class="room-card">
          <div class="room-image" style="height: 100%;">
          <img class="" style="height: 100%; object-fit: cover;" :src="room.image" :alt="room.name" @click="openRoomGallery(room)">
          </div>
          
          <div class="room-details">
            <h4 class="room-name">{{ room.name }}</h4>
            <div class="room-specs">
              <div v-if="room.size" class="spec">Room size: {{ room.size }}</div>
              <div class="spec">{{ room.bedType }}</div>
              <div class="spec">{{ room.view }}</div>
            </div>
            
            <div class="room-amenities">
              <span v-for="amenity in room.amenities" :key="amenity" class="amenity-tag">
                {{ amenity }}
              </span>
            </div>
          </div>

          <div class="room-offers">
            <div v-for="offer in room.offers" :key="offer.id" class="offer-card">
              <div class="offer-badges">
                <span v-if="offer.breakfast" class="badge breakfast">🍽️ Breakfast included</span>
                <span v-if="offer.freeCancellation" class="badge cancellation">✓ Free cancellation</span>
                <span v-if="offer.payAtHotel" class="badge payment">💳 Pay at the hotel</span>
              </div>

              <div v-if="offer.availability" class="availability-warning">
                {{ offer.availability }}
              </div>
              <div class="offer-pricing">
                <div class="price-section">
                  <div v-if="offer.originalPrice" class="original-price">USD {{ offer.originalPrice }}</div>
                  <div class="current-price">USD {{ offer.price }}</div>
                  <div class="price-note">Per night before taxes and fees</div>
                </div>
                
                <button class="book-room-btn" @click="bookRoom(room, offer)">Book now</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- Transportation -->
  <section id="trip" class="section-anchor"></section>
  <div class="transportation-section">
      <h3>Plan your journey to your hotel</h3>
      <div class="transport-options">
        <div class="transport-card">
          <div class="transport-icon">🚗</div>
          <h4>Book your airport transfer</h4>
          <p>Get to your hotel easily and securely</p>
          <button class="search-btn">Search</button>
        </div>
        
        <div class="transport-card">
          <div class="transport-icon">🚙</div>
          <h4>Rent a car</h4>
          <p>Find an ideal ride for your trip</p>
          <button class="search-btn">Search</button>
        </div>
      </div>
    </div>

  <!-- Amenities Categories -->
  <section id="facilities" class="section-anchor"></section>
  <div class="amenities-categories">
      <div class="category">
        <h4>Food and Drinks</h4>
        <div class="amenity-items">
          <div class="amenity-item">🍽️ Room service [24-hour]</div>
          <div class="amenity-item">☕ Coffee shop</div>
          <div class="amenity-item">🍺 Bar</div>
        </div>
      </div>
      
      <div class="category">
        <h4>Wellness</h4>
        <div class="amenity-items">
          <div class="amenity-item">✂️ Salon</div>
          <div class="amenity-item">🏋️ Fitness center</div>
          <div class="amenity-item">🧖‍♀️ Spa</div>
        </div>
      </div>

      <div class="category">
        <h4>Activities</h4>
        <div class="amenity-items">
          <div class="amenity-item">🏖️ Beach</div>
        </div>
      </div>
    </div>

  <!-- About Section -->
  <section id="overview-about" class="section-anchor"></section>
  <div class="about-section">
      <h3>About us</h3>
      <p>{{ hotelData.description }}</p>
    </div>

  <!-- Detailed Facilities -->
  <!-- (kept under facilities anchor) -->
  <div class="facilities-section">
      <h3>Amenities and facilities</h3>
      
      <div class="facility-category">
        <h4>Languages spoken</h4>
        <div class="facility-item">
          <span class="flag">🇬🇧</span> English
        </div>
      </div>

      <div class="facility-category">
        <h4>Internet access</h4>
        <div class="facility-item">
          📶 Free Wi-Fi in all rooms!
        </div>
      </div>

      <div class="facility-category">
        <h4>Services and conveniences</h4>
        <div class="facility-grid">
          <div class="facility-item">🛗 Elevator</div>
          <div class="facility-item">🚭 Smoke-free property</div>
          <div class="facility-item">🚬 Smoking area</div>
        </div>
      </div>

      <div class="facility-category">
        <h4>Getting around</h4>
        <div class="facility-item">
          🅿️ Car park [free of charge]
        </div>
      </div>
    </div>

  <!-- Location -->
  <section id="location" class="section-anchor"></section>
  <div class="location-section">
      <h3>Location</h3>
      <div class="address">{{ hotelData.fullAddress }}</div>
      <div class="location-map" @click="showMap = true">
        <div class="map-placeholder">
          <i class="bi bi-map"></i>
          <span>Click to view map</span>
        </div>
      </div>
      
      <div class="nearby-landmarks">
        <h4>Closest landmarks</h4>
        <div class="landmark">Jamyiatul Falah - 3.0 km</div>
        <div class="landmark">AnderKilla Mosque - 3.0 km</div>
        <div class="landmark">Agartala Airport - 183.7 km</div>
      </div>
    </div>

  <!-- Property Policies -->
  <section id="policies" class="section-anchor"></section>
  <div class="policies-section">
      <h3>Property policies</h3>
      
      <div class="policy-item">
        <h4>Check-in/Check-out</h4>
        <div class="policy-grid">
          <div>📅 Check-in from: 02:00 PM</div>
          <div>📅 Check-out until: 12:00 PM</div>
        </div>
      </div>

      <div class="policy-item">
        <h4>Children and extra beds</h4>
        <p>All children are welcome. Extra beds are dependent on the room you choose.</p>
      </div>
    </div>

  <!-- Reviews Section -->
  <section id="reviews" class="section-anchor"></section>
  <div class="reviews-section">
      <h3>Reviews of Best Western S K S Chattogram from real guests</h3>
      
      <div class="rating-overview">
        <div class="overall-rating">
          <div class="rating-score-large">{{ hotelData.rating }}</div>
          <div class="rating-text-large">{{ hotelData.ratingText }}</div>
          <div class="review-count">{{ hotelData.reviewCount }} reviews</div>
        </div>

        <div class="rating-breakdown">
          <div class="rating-item">
            <span>Cleanliness</span>
            <span class="score">8.6</span>
          </div>
          <div class="rating-item">
            <span>Facilities</span>
            <span class="score">8.6</span>
          </div>
          <div class="rating-item">
            <span>Location</span>
            <span class="score">8.2</span>
          </div>
          <div class="rating-item">
            <span>Room comfort and quality</span>
            <span class="score">9.3</span>
          </div>
          <div class="rating-item">
            <span>Service</span>
            <span class="score">9.3</span>
          </div>
          <div class="rating-item">
            <span>Value for money</span>
            <span class="score">8.9</span>
          </div>
        </div>
      </div>

      <div class="individual-reviews">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="review-header">
            <div class="reviewer-rating">{{ review.rating }}</div>
            <div class="reviewer-info">
              <div class="reviewer-name">{{ review.reviewer }}</div>
              <div class="review-type">{{ review.type }}</div>
            </div>
          </div>
          
          <div class="review-content">
            <h5>{{ review.title }}</h5>
            <div class="review-likes">
              <strong>Things I like:</strong> {{ review.likes }}
            </div>
            <div v-if="review.dislikes" class="review-dislikes">
              <strong>Things I don't like:</strong> {{ review.dislikes }}
            </div>
            <div class="review-date">Reviewed {{ review.date }}</div>
          </div>
        </div>
      </div>
    </div>

ReferenceError: Cannot access 'imageTabs' before initialization
    at setup (HotelDetails.vue?t=1760164350250:47:28)
    at callWithErrorHandling (chunk-LG6AQRJS.js?v=1148f6f5:2296:19)
    at setupStatefulComponent (chunk-LG6AQRJS.js?v=1148f6f5:10108:25)
    at setupComponent (chunk-LG6AQRJS.js?v=1148f6f5:10069:36)
    at mountComponent (chunk-LG6AQRJS.js?v=1148f6f5:7405:7)
    at processComponent (chunk-LG6AQRJS.js?v=1148f6f5:7371:9)
    at patch (chunk-LG6AQRJS.js?v=1148f6f5:6885:11)
    at ReactiveEffect.componentUpdateFn [as fn] (chunk-LG6AQRJS.js?v=1148f6f5:7597:9)
    at ReactiveEffect.run (chunk-LG6AQRJS.js?v=1148f6f5:505:19)
    at ReactiveEffect.runIfDirty (chunk-LG6AQRJS.js?v=1148f6f5:543:12)
overrideMethod @ installHook.js:1
triggerError @ vue-router.js?v=1148f6f5:2773
(anonymous) @ vue-router.js?v=1148f6f5:2798
Promise.catch
handleScroll @ vue-router.js?v=1148f6f5:2798
finalizeNavigation @ vue-router.js?v=1148f6f5:2678
(anonymous) @ vue-router.js?v=1148f6f5:2587
Promise.then
pushWithRedirect @ vue-router.js?v=1148f6f5:2555
push @ vue-router.js?v=1148f6f5:2481
install @ vue-router.js?v=1148f6f5:2836
use @ chunk-LG6AQRJS.js?v=1148f6f5:6041
(anonymous) @ main.js?t=1760164350250:18Understand this error
HotelDetails.vue?t=1760164350250:47 Uncaught (in promise) ReferenceError: Cannot access 'imageTabs' before initialization
    at setup (HotelDetails.vue?t=1760164350250:47:28)
    at callWithErrorHandling (chunk-LG6AQRJS.js?v=1148f6f5:2296:19)
    at setupStatefulComponent (chunk-LG6AQRJS.js?v=1148f6f5:10108:25)
    at setupComponent (chunk-LG6AQRJS.js?v=1148f6f5:10069:36)
    at mountComponent (chunk-LG6AQRJS.js?v=1148f6f5:7405:7)
    at processComponent (chunk-LG6AQRJS.js?v=1148f6f5:7371:9)
    at patch (chunk-LG6AQRJS.js?v=1148f6f5:6885:11)
    at ReactiveEffect.componentUpdateFn [as fn] (chunk-LG6AQRJS.js?v=1148f6f5:7597:9)
    at ReactiveEffect.run (chunk-LG6AQRJS.js?v=1148f6f5:505:19)
    at ReactiveEffect.runIfDirty (chunk-LG6AQRJS.js?v=1148f6f5:543:12)    <!-- Photo Gallery Component -->
    <PhotoGallery 
      :is-visible="showImageGallery"
      :title="`${hotelData.name} - Photos`"
      :image-tabs="imageTabsState"
      :start-index="carouselIndex"
      @close="closeImageModal"
    />

    <!-- Carousel Slider -->
    <div v-if="showCarousel" class="carousel-modal" @click="closeCarousel">
      <div class="carousel-container">
        <!-- Left side: Image and navigation -->
        <div class="carousel-main" @click.stop>
          <div class="carousel-header">
            <div class="carousel-tabs">
              <button class="carousel-tab active">Gallery</button>
            </div>
            <button class="carousel-close d-flex align-items-center justify-content-center " @click="closeCarousel">×</button>
          </div>
          
          <div class="carousel-image-container">
            <img :src="currentTabImages[carouselIndex]" :alt="`Image ${carouselIndex + 1}`" class="carousel-image">
            
            <!-- Navigation arrows -->
            <button class="carousel-nav prev" @click="prevCarouselImage" v-if="carouselIndex > 0">❮</button>
            <button class="carousel-nav next" @click="nextCarouselImage" v-if="carouselIndex < currentTabImages.length - 1">❯</button>
            
            <!-- Image counter -->
            <div class="carousel-counter">{{ carouselIndex + 1 }}/{{ currentTabImages.length }}</div>
          </div>
          
          <!-- Thumbnail strip -->
          <div class="carousel-thumbnails">
            <div 
              v-for="(image, idx) in currentTabImages" 
              :key="idx"
              :class="['carousel-thumb', { active: idx === carouselIndex }]"
              @click="carouselIndex = idx"
            >
              <img style="" :src="image" :alt="`Thumb ${idx + 1}`">
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <!-- Map Modal -->
    <!-- Room Carousel Modal (per-room) -->
    <div v-if="showRoomCarousel" class="carousel-modal" @click="closeRoomCarousel">
      <div class="carousel-container">
        <div class="carousel-main" @click.stop>
          <div class="carousel-header">
            <div class="carousel-tabs">
              <button class="carousel-tab active">Room photos</button>
            </div>
            <button class="carousel-close" @click="closeRoomCarousel">×</button>
          </div>

          <div class="carousel-image-container">
            <img :src="roomCarouselImages[roomCarouselIndex]" :alt="`Room image ${roomCarouselIndex + 1}`" class="carousel-image">

            <button class="carousel-nav prev" @click="prevRoomImage" v-if="roomCarouselIndex > 0">❮</button>
            <button class="carousel-nav next" @click="nextRoomImage" v-if="roomCarouselIndex < roomCarouselImages.length - 1">❯</button>

            <div class="carousel-counter">{{ roomCarouselIndex + 1 }}/{{ roomCarouselImages.length }}</div>
          </div>

          <div class="carousel-thumbnails">
            <div v-for="(img, idx) in roomCarouselImages" :key="idx" :class="['carousel-thumb', { active: idx === roomCarouselIndex }]" @click="roomCarouselIndex = idx">
              <img :src="img" :alt="`Thumb ${idx + 1}`">
            </div>
          </div>
        </div>

        <div class="carousel-sidebar">
          <div class="sidebar-section booking-info">
            <button class="carousel-book-btn" @click.stop="goToBooking">See deals for this room</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Authentication Modal for guests (shows Login/Register) -->
    <teleport to="body" v-if="showAuthModal">
      <div class="auth-modal-overlay" @click.self="closeAuthModal">
        <div class="auth-modal">
          <div class="auth-modal-header">
            <h4 v-if="authModalTab === 'login'">Please sign in to continue</h4>
            <h4 v-else>Register to book</h4>
            <button class="close-btn" @click="closeAuthModal">×</button>
          </div>

          <div class="auth-modal-tabs">
            <button :class="['tab-btn', { active: authModalTab === 'login' }]" @click="authModalTab = 'login'">Login</button>
            <button :class="['tab-btn', { active: authModalTab === 'register' }]" @click="authModalTab = 'register'">Register</button>
          </div>

          <div class="auth-modal-body">
            <LoginForm v-if="authModalTab === 'login'" @authenticated="handleAuthenticated" />
            <RegisterForm v-else @authenticated="handleAuthenticated" />
          </div>
        </div>
      </div>
    </teleport>

    </div> <!-- .main-container -->
    <MapViewModal :isVisible="showMap" @close="showMap = false" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import MapViewModal from '../components/MapViewModal.vue'
import PhotoGallery from '../components/PhotoGallery.vue'
// Use relative import for auth store to avoid alias resolution issues
import { useAuth } from '../auth/authStore.js'
import LoginForm from '../components/auth/LoginForm.vue'
import RegisterForm from '../components/auth/RegisterForm.vue'

const router = useRouter()

// Reactive data
const currentImageIndex = ref(0)
const showMap = ref(false)
// Auth modal state
const showAuthModal = ref(false)
const authModalTab = ref('login') // 'login' or 'register'
const auth = useAuth()
// pending booking info (route) to navigate to after successful auth
const pendingBooking = ref(null)

// Photo gallery state
const showImageGallery = ref(false)

// Deal-nav / tabs state
const activeDealTab = ref('overview')
const dealNav = ref(null)
const dealTabs = ref(null)

function scrollTabs(direction = 1) {
  const el = dealTabs.value
  if (!el) return
  const amount = Math.max(120, Math.floor(el.clientWidth * 0.6)) * direction
  el.scrollBy({ left: amount, behavior: 'smooth' })
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  // offset to accommodate sticky nav height
  const navHeight = dealNav.value ? dealNav.value.getBoundingClientRect().height : 72
  const top = window.scrollY + el.getBoundingClientRect().top - navHeight - 8
  window.scrollTo({ top, behavior: 'smooth' })
}

// Mutable tabs state for PhotoGallery so we can inject per-room tabs
// initialize empty and populate after imageTabs is declared to avoid TDZ errors
const imageTabsState = ref([])

function openRoomGallery(room, startIndex = 0) {
  const roomImages = (room.images && room.images.length) ? room.images : [room.image || hotelImages[0]]
  // Create a focused tab just for this room and a fallback 'All' tab
  imageTabsState.value = [
    { id: 'room', name: room.name || 'Room photos', images: roomImages },
    ...imageTabs
  ]
  // set active tab and open gallery at requested image
  activeImageTab.value = 'room'
  carouselIndex.value = Math.max(0, Math.min(startIndex, roomImages.length - 1))
  showImageGallery.value = true
}

function handleAuthenticated() {
  showAuthModal.value = false
  if (pendingBooking.value) {
    const target = pendingBooking.value
    pendingBooking.value = null
    router.push(target)
  }
}

function closeAuthModal() {
  showAuthModal.value = false
  // If user closes modal without authenticating, redirect to home
  if (!auth.isAuthenticated.value) {
    router.push('/')
  }
}
const activeImageTab = ref('all')
const showCarousel = ref(false)
const carouselIndex = ref(0)
const modalGalleryRef = ref(null)
const highlightIndex = ref(-1)

// Hotel data
const hotelData = {
  name: 'Best Western S K S Chattogram',
  stars: '★★★★★',
  rating: 8.4,
  ratingText: 'Excellent',
  reviewCount: 57,
  location: 'SKTC, 8RG7+95R, 29 Agrabad C/A., Kotwali, Chittagong, Bangladesh, 4100',
  fullAddress: 'SKTC, 8RG7+95R, 29 Agrabad C/A., Kotwali, Chittagong, Bangladesh, 4100',
  description: 'Conveniently situated in the Kotwali part of Chittagong, this property puts you close to attractions and interesting dining options. This 5-star property is packed with in-house facilities to improve the quality and joy of your stay.'
}

const hotelImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80'
]

// Categorized images for modal tabs (moved up so functions can reference)
const imageCategories = {
  all: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551882547-ff43c63fedfe?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80'
  ],
  rooms: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80'
  ],
  facilities: [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80'
  ],
  corridor: [
    'https://images.unsplash.com/photo-1551882547-ff43c63fedfe?auto=format&fit=crop&w=800&q=80'
  ],
  pools: [
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80'
  ]
}

const imageTabs = [
  { id: 'all', name: 'All', images: imageCategories.all },
  { id: 'rooms', name: 'Rooms', images: imageCategories.rooms },
  { id: 'facilities', name: 'Facilities', images: imageCategories.facilities },
  { id: 'corridor', name: 'Corridor', images: imageCategories.corridor },
  { id: 'pools', name: 'Pools', images: imageCategories.pools }
]

// populate runtime tabs state with defaults
imageTabsState.value = [...imageTabs]

const roomTypes = [
  {
    id: 1,
    name: 'Superior Twin Room',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    bedType: '2 single beds',
    view: 'Air conditioning',
    amenities: ['Non-smoking', 'Private bathroom', 'Air conditioning'],
    offers: [
      {
        id: 1,
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        price: 54,
        availability: 'Our last 5 rooms!'
      }
    ]
  },
  {
    id: 2,
    name: 'Deluxe Twin Room',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    size: '21 m²/226 ft²',
    bedType: '2 single beds',
    view: 'Outdoor view',
    amenities: ['Non-smoking', 'Private bathroom', 'Closet', 'Air conditioning', 'Coffee/tea maker'],
    offers: [
      {
        id: 1,
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        price: 54,
        availability: 'Limited availability'
      }
    ]
  },
  {
    id: 3,
    name: 'Deluxe King Room',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
    size: '21 m²/226 ft²',
    bedType: '1 double bed',
    view: 'Outdoor view',
    amenities: ['Bathtub', 'Private bathroom', 'Closet', 'Air conditioning', 'Electric kettle'],
    offers: [
      {
        id: 1,
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        price: 54,
        availability: 'Our last 3 rooms!',
        badge: 'Lowest price available!'
      }
    ]
  },
  {
    id: 4,
    name: 'Superior King Room',
    image: '/src/assets/images/hotel4.jpg',
    bedType: '1 double bed',
    amenities: ['Air conditioning'],
    offers: [
      {
        id: 1,
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        price: 59,
        availability: 'Our last 5 rooms!'
      }
    ]
  },
  {
    id: 5,
    name: 'Junior Suite',
    image: '/src/assets/images/hotel5.jpg',
    bedType: '1 double bed',
    amenities: ['Air conditioning'],
    offers: [
      {
        id: 1,
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        price: 77,
        availability: 'Our last 3 rooms!'
      }
    ]
  },
  {
    id: 6,
    name: 'Executive Suite',
    image: '/src/assets/images/hotel6.jpg',
    bedType: '1 double bed',
    amenities: ['Air conditioning'],
    offers: [
      {
        id: 1,
        breakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        price: 99,
        availability: 'Our last room!'
      }
    ]
  }
]

const reviews = [
  {
    id: 1,
    rating: 4.0,
    reviewer: 'Moshiur',
    type: 'Business traveler',
    title: 'Acceptable',
    likes: 'Good hotel',
    dislikes: 'Reception',
    date: 'August 22, 2025'
  },
  {
    id: 2,
    rating: 7.0,
    reviewer: 'Jewel-Asad',
    type: 'Business traveler',
    title: 'Good quality Breakfast, Staff are well behaved and clean',
    likes: 'Good quality Breakfast and Staff are well behaved',
    dislikes: 'room Service is not satisfactory',
    date: 'August 07, 2025'
  },
  {
    id: 3,
    rating: 10.0,
    reviewer: 'MOHAMMAD',
    type: 'Group',
    title: 'Awesome,,',
    likes: 'Good breakfast & Awesome location also river view from room. Strongly recommended to all visitors like families, friends, solo also.',
    dislikes: 'Ground space prefer to large.',
    date: 'September 01, 2025'
  }
]

// Room carousel state
const showRoomCarousel = ref(false)
const roomCarouselImages = ref([])
const roomCarouselIndex = ref(0)

function openRoomCarousel(room) {
  // If room has multiple images, use them; else fallback to hotelImages
  roomCarouselImages.value = room.images && room.images.length ? room.images : [room.image || hotelImages[0]]
  roomCarouselIndex.value = 0
  showRoomCarousel.value = true
}

function closeRoomCarousel() {
  showRoomCarousel.value = false
}

function prevRoomImage() {
  if (roomCarouselIndex.value > 0) roomCarouselIndex.value--
}

function nextRoomImage() {
  if (roomCarouselIndex.value < roomCarouselImages.value.length - 1) roomCarouselIndex.value++
}

// Computed properties
const mainImage = computed(() => hotelImages[currentImageIndex.value])
const lowestPrice = computed(() => {
  const prices = roomTypes.flatMap(room => room.offers.map(offer => offer.price))
  return Math.min(...prices)
})
const currentTabImages = computed(() => {
  const tab = imageTabs.find(t => t.id === activeImageTab.value)
  return tab ? tab.images : imageCategories.all
})

// Methods
function prevImage() {
  currentImageIndex.value = (currentImageIndex.value - 1 + hotelImages.length) % hotelImages.length
}

function nextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % hotelImages.length
}

function openImageModal(tabId = 'all', imageIndex = 0) {
  // Set active tab and carousel index for backwards compatibility
  activeImageTab.value = tabId
  const tab = imageTabs.find(t => t.id === tabId) || imageTabs[0]
  const idx = Math.max(0, Math.min(imageIndex, (tab.images?.length || 0) - 1))
  carouselIndex.value = idx
  
  // Show photo gallery first (not carousel directly)
  showImageGallery.value = true
}



function closeImageModal() {
  showImageGallery.value = false
  highlightIndex.value = -1
}

// Reset gallery tabs to default when closed
watch(() => showImageGallery.value, (val) => {
  if (!val) {
    imageTabsState.value = [...imageTabs]
    carouselIndex.value = 0
  }
})

function openCarousel(imageIndex) {
  carouselIndex.value = imageIndex
  showCarousel.value = true
}

function closeCarousel() {
  showCarousel.value = false
}

function prevCarouselImage() {
  if (carouselIndex.value > 0) {
    carouselIndex.value--
  }
}

function nextCarouselImage() {
  if (carouselIndex.value < currentTabImages.value.length - 1) {
    carouselIndex.value++
  }
}

// Navigation function
function goToBooking() {
  if (!auth.isAuthenticated.value) {
    // store pending route and show auth modal
    pendingBooking.value = { path: '/book/1' }
    authModalTab.value = 'login'
    showAuthModal.value = true
    return
  }
  router.push('/book/1') // Navigate to booking page with hotel ID
}

// Book specific room
function bookRoom(room, offer) {
  // Navigate to booking page with room and offer details
  if (!auth.isAuthenticated.value) {
    pendingBooking.value = {
      path: '/book/1',
      query: {
        roomId: room.id,
        roomName: room.name,
        offerId: offer.id,
        price: offer.price,
        originalPrice: offer.originalPrice || null,
        breakfast: offer.breakfast || false,
        freeCancellation: offer.freeCancellation || false,
        payAtHotel: offer.payAtHotel || false
      }
    }
    authModalTab.value = 'register'
    showAuthModal.value = true
    return
  }

  router.push({
    path: '/book/1',
    query: {
      roomId: room.id,
      roomName: room.name,
      offerId: offer.id,
      price: offer.price,
      originalPrice: offer.originalPrice || null,
      breakfast: offer.breakfast || false,
      freeCancellation: offer.freeCancellation || false,
      payAtHotel: offer.payAtHotel || false
    }
  })
}

// Close auth modal when user logs in
watch(() => auth.isAuthenticated.value, (val) => {
  if (val) showAuthModal.value = false
})

// Show auth modal immediately when visiting page if unauthenticated
onMounted(() => {
  // Give auth store time to initialize, then check
  setTimeout(() => {
    console.log('[HotelDetails] auth.isAuthenticated:', auth.isAuthenticated.value)
    if (!auth.isAuthenticated.value) {
      authModalTab.value = 'login'
      showAuthModal.value = true
    }
  }, 100)

  // Setup IntersectionObserver to track sections and update activeDealTab
  nextTick(() => {
    const sectionIds = ['overview','rooms','trip','facilities','reviews','location','policies']
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return

    const opts = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // center bias
      threshold: 0
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          activeDealTab.value = e.target.id
        }
      })
    }, opts)

    sections.forEach(s => io.observe(s))
  })
})
</script>

<style scoped>
.hotel-details-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1a1a1a;
  line-height: 1.5;
}

/* Search Header */
.search-header {
  background: #fff;
  border-bottom: 1px solid #e1e5e9;
  padding: 16px 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

.search-container {
  display: flex;
  align-items: center;
  gap: 16px;
  /* container will handle width */
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.date-picker, .guests-picker {
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
}

.update-btn {
  background: #0084ff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

/* Hero Section */
.hero-section {
  display: block;
  /* padding: 24px 0; */
  /* container will handle width */
  /* container controls horizontal alignment */
}

.image-gallery {
  width: 100%;
}


.gallery-grid {
  display: grid;
  /* 4 columns and 2 rows */
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 8px;
  height: 30vh;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.gallery-item.big {
  /* first image spans 1 column and 2 rows */
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.9);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.prev-btn { left: 16px; }
.next-btn { right: 16px; }

.see-all-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: white;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
}

.thumbnail-strip {
  display: flex;
  gap: 8px;
}

.thumbnail {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0.7;
  border: 2px solid transparent;
}

.thumbnail.active {
  opacity: 1;
  border-color: #0084ff;
}

/* Booking Sidebar */
.booking-sidebar {
  position: sticky;
  top: 24px;
  height: fit-content;
}

.booking-card {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 24px 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.price-section {
  margin-bottom: 20px;
}

.main-price {
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
}

.price-note {
  color: #6b6b6b;
  font-size: 14px;
  margin-top: 4px;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-weight: 600;
  font-size: 14px;
  color: #1a1a1a;
}

.form-group input, .form-group select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.book-now-btn {
  background: #0084ff;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 16px;
}

.book-now-btn:hover {
  background: #006fd6;
}

.booking-benefits {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.benefit {
  font-size: 14px;
  color: #2d8a2d;
  font-weight: 500;
}

/* Hotel Header */
.hotel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  /* padding: 24px 0; */
  padding: 24px 0;
  border-bottom: 1px solid #e1e5e9;
  margin: 0 auto;
  border-bottom: 1px solid #e1e5e9;
}

.hotel-info .hotel-name {
  font-size: 26px;
  margin: 0 0 8px 0;
}

.hotel-address {
  color: #6b6b6b;
}

.hotel-side {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rating-box {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 10px;
  text-align: left;
}

.rating-top {
  font-weight: 700;
  color: #0b76ff;
}

.rating-badges .badge.small {
  display: inline-block;
  background: #e9f7ef;
  color: #2d8a2d;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 8px;
  margin-right: 6px;
}

.mini-map {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.map-thumb {
  height: 80px;
  background: linear-gradient(135deg,#f8f9fa,#eef5ff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b6b6b;
  font-weight: 700;
}

.map-rating {
  padding: 8px 12px;
  font-size: 14px;
}

.parking-line {
  padding: 8px 0;
}

.parking-line .free {
  color: #28a745;
  font-weight: 700;
  float: right;
}

.landmarks h5 {
  margin: 8px 0;
}

@media (max-width: 900px) {
  .hotel-header { flex-direction: column; }
  .hotel-side { width: 100%; }
}

.hotel-info {
  flex: 1;
}

.hotel-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.star-rating {
  color: #ffa500;
  font-size: 16px;
  margin-bottom: 8px;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rating-score {
  background: #0084ff;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
}

.rating-text {
  font-weight: 600;
  color: #0084ff;
}

.review-count {
  color: #6b6b6b;
}

.location {
  color: #6b6b6b;
  display: flex;
  align-items: center;
  gap: 4px;
}

.map-btn {
  background: white;
  border: 1px solid #0084ff;
  color: #0084ff;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Highlights */
.highlights-section {
  padding: 24px 0;
  border-bottom: 1px solid #e1e5e9;
}

/* Staycation Offers */
.staycation-section {
  padding: 24px 0;
  border-bottom: 1px solid #e1e5e9;
  margin: 12px auto;
  padding: 18px;
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.staycation-sub {
  color: #6b6b6b;
  margin-top: 4px;
  margin-bottom: 12px;
}

.staycation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}

.staycard {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
  align-items: flex-start;
}

.staycard-icon {
  font-size: 28px;
}

.staycard-body h4 {
  margin: 0 0 8px 0;
}

.staycard-list div {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
}

.see-amenities {
  display: inline-block;
  margin-top: 8px;
  color: #0b76ff;
  font-weight: 600;
  text-decoration: none;
}

/* Deal / Navigation Bar */
.deal-nav {
  width: 100%;
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  margin: 16px auto;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(233, 236, 239, 0.5);
  border-radius: 16px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.sticky-deal-nav {
  position: sticky;
  top: 0;
  z-index: 4000; /* above page content but below modals */
  backdrop-filter: blur(4px);
}

.deal-tabs {
  display: flex;
  width: 100%;
  gap: 12px; /* slightly larger gap for centered layout */
  justify-content: space-between; /* center items inside the nav */
  align-items: center;
  flex-wrap: wrap;
}
.deal-tabs .tab {
  background: transparent;
  border: none;
  padding: 6px 8px; /* slightly smaller padding to reduce horizontal space */
  border-radius: 6px;
  cursor: pointer;
  color: #22313f;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.deal-tabs .tab i {
  font-size: 1rem;
  line-height: 1;
}

.deal-tabs .tab .tab-text {
  display: inline-block;
}

.deal-cta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.from-label {
  color: #6b6b6b;
  font-size: 14px;
}

.deal-price {
  color: #d9534f;
  font-weight: 700;
}

.view-deal-btn {
  background: #0b76ff;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 24px;
  font-weight: 700;
  cursor: pointer;
}

.highlights-section h3 {
  margin-bottom: 16px;
  font-size: 20px;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.highlight-icon {
  font-size: 24px;
}

/* Room Selection */
.room-selection {
  padding: 24px 0;
  border-bottom: 1px solid #e1e5e9;
}

.room-selection h2 {
  margin-bottom: 16px;
  font-size: 24px;
}

.room-filter {
  margin-bottom: 20px;
}

.filter-note {
  color: #0084ff;
  font-weight: 600;
  margin-bottom: 12px;
  display: block;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn {
  background: white;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.filter-btn.active {
  background: #0084ff;
  color: white;
  border-color: #0084ff;
}

.room-count-header h3 {
  margin-bottom: 4px;
}

.room-count-header p {
  color: #6b6b6b;
  margin-bottom: 24px;
}

.rooms-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.room-card {
  display: grid;
  grid-template-columns: 320px 1fr auto;
  gap: 0;
  border: 1px solid rgba(225, 229, 233, 0.5);
  border-radius: 16px !important;
  background: white;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border-color: #ff7a00;
}

.room-image {
  position: relative;
  overflow: hidden;
}

.room-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.room-card:hover .room-image img {
  transform: scale(1.05);
}

.room-details h4 {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
}

.room-specs {
  margin-bottom: 12px;
}

.spec {
  color: #6b6b6b;
  font-size: 14px;
  margin-bottom: 4px;
}

.room-amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.amenity-tag {
  background: #f1f7ff;
  color: #005bb5;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.room-details {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.room-offers {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 300px;
  border-left: 1px solid rgba(225, 229, 233, 0.5);
  background: #fafafa;
}

.offer-card {
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.offer-badges {
  margin-bottom: 12px;
}

.badge {
  display: block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 4px;
}

.badge.breakfast {
  background: #e8f5e8;
  color: #2d5a2d;
}

.badge.cancellation {
  background: #e8f5e8;
  color: #2d5a2d;
}

.badge.payment {
  background: #fff3cd;
  color: #856404;
}

.offer-pricing {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
}

/* Ensure only one visible Book now button per offer-card (hide accidental duplicates) */
.offer-card .book-room-btn:not(:first-of-type) {
  display: none !important;
}

.original-price {
  text-decoration: line-through;
  color: #6b6b6b;
  font-size: 14px;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
}

.book-room-btn {
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.availability-warning {
  color: #dc3545;
  font-size: 12px;
  font-weight: 500;
}

/* Transportation */
.transportation-section {
  padding: 24px 0;
  border-bottom: 1px solid #e1e5e9;
  border-bottom: 1px solid #e1e5e9;
}

.transport-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.transport-card {
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  text-align: center;
}

.transport-icon {
  font-size: 60px;
  margin-bottom: 12px;
}

.search-btn {
  background: #0084ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

/* Amenities Categories */
.amenities-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 24px 0;
  /* container will handle width */
  border-bottom: 1px solid #e1e5e9;
}

.category h4 {
  margin-bottom: 12px;
}

.amenity-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.amenity-item {
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

/* About Section */
.about-section, .facilities-section, .location-section, .policies-section, .reviews-section {
  padding: 24px 0;
  /* container will handle width */
  border-bottom: 1px solid #e1e5e9;
}

.about-section h3, .facilities-section h3, .location-section h3, .policies-section h3, .reviews-section h3 {
  margin-bottom: 16px;
  font-size: 20px;
  margin-bottom: 16px;
}

/* Facilities */
.facility-category {
  margin-bottom: 24px;
}

.facility-category h4 {
  margin-bottom: 12px;
  font-size: 16px;
}

.facility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.facility-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Location */
.address {
  color: #6b6b6b;
  margin-bottom: 16px;
}

.location-map {
  height: 200px;
  background: #f0f2f5;
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
}

.map-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6b6b6b;
}

.nearby-landmarks h4 {
  margin-bottom: 8px;
}

.landmark {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

/* Policies */
.policy-item {
  margin-bottom: 20px;
}

.policy-item h4 {
  margin-bottom: 8px;
}

.policy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

/* Reviews */
.rating-overview {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  margin-bottom: 32px;
}

.overall-rating {
  text-align: center;
}

.rating-score-large {
  font-size: 48px;
  font-weight: 700;
  color: #0084ff;
}

.rating-text-large {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.rating-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rating-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.score {
  font-weight: 700;
  color: #0084ff;
}

.individual-reviews {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-card {
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.reviewer-rating {
  background: #0084ff;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 700;
  min-width: 40px;
  text-align: center;
}

.reviewer-name {
  font-weight: 600;
}

.reviewer-type {
  color: #6b6b6b;
  font-size: 14px;
}

.review-content h5 {
  margin-bottom: 12px;
  font-size: 16px;
}

.review-likes, .review-dislikes {
  margin-bottom: 8px;
  font-size: 14px;
}

.review-date {
  color: #6b6b6b;
  font-size: 12px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
  }
  
  .booking-sidebar {
    position: static;
  }
  
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .room-card {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .rating-overview {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .highlights-grid {
    grid-template-columns: 1fr;
  }
  
  .amenities-categories {
    grid-template-columns: 1fr;
  }
}

/* Force all border radii inside this page to 16px for premium look */
.hotel-details-page * {
  border-radius: 16px !important;
}

.form-check-input, .btn-close, .badge, .tab, .amenity-tag {
  border-radius: 6px !important;
}

/* Make all buttons orange on this page */
.hotel-details-page button,
.hotel-details-page .book-room-btn,
.hotel-details-page .view-deal-btn,
.hotel-details-page .search-btn,
.hotel-details-page .see-all-btn {
  background: #ff7a00 !important;
  color: #fff !important;
  border-color: #ff7a00 !important;
}

.hotel-details-page .tab:not(.deal-tabs .tab) {
  background: #ff7a00 !important;
  color: #fff !important;
}

.hotel-details-page .tab {
  padding: 8px 12px !important;
  border-radius: 2px !important;
}

.hotel-details-page .book-room-btn:hover,
.hotel-details-page .view-deal-btn:hover,
.hotel-details-page button:hover {
  filter: brightness(0.95) !important;
}

/* Exclude the top navigation tabs from the orange button rule so they remain transparent */
.deal-tabs .tab {
  background: transparent !important;
  color: #1a2b3c !important; /* Darker, high-contrast color for Day Mode */
  border: none !important;
  transition: all 0.3s ease;
  font-weight: 600;
}

.deal-tabs .tab i,
.deal-tabs .tab span {
  color: inherit !important;
}

.deal-tabs .tab:hover,
.deal-tabs .tab.active {
  color: #ff7a00 !important;
}

/* Bootstrap Image Gallery Modal Styles */
#imageGalleryModal .modal-dialog {
  max-width: 90vw;
  max-height: 90vh;
  margin: 1rem auto;
}

#imageGalleryModal .modal-content {
  height: auto;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

#imageGalleryModal .modal-body {
  flex: 1;
  overflow-y: auto;
  max-height: calc(90vh - 70px);
}

#imageGalleryModal .nav-pills .nav-link {
  color: #ff7a00;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  margin: 0 2px;
}

#imageGalleryModal .nav-pills .nav-link.active {
  background-color: #ff7a00;
  color: white;
  border-color: #ff7a00;
}

.gallery-item-wrapper {
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.gallery-item-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.gallery-item-wrapper.highlighted {
  box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.3);
  transform: scale(1.02);
}

.gallery-image {
  transition: transform 0.3s ease;
}

.gallery-item-wrapper:hover .gallery-image {
  transform: scale(1.05);
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  #imageGalleryModal .modal-dialog {
    max-width: 95vw;
    max-height: 95vh;
    margin: 0.5rem auto;
  }
  
  #imageGalleryModal .modal-content {
    max-height: 95vh;
  }
  
  #imageGalleryModal .modal-body {
    max-height: calc(95vh - 70px);
  }
  
  #imageGalleryModal .nav-pills {
    padding: 0.75rem !important;
  }
  
  #imageGalleryModal .nav-pills .nav-link {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
  }
}

@media (max-width: 576px) {
  #imageGalleryModal .modal-dialog {
    max-width: 98vw;
    max-height: 98vh;
    margin: 0.25rem auto;
  }
  
  #imageGalleryModal .modal-content {
    max-height: 98vh;
  }
  
  #imageGalleryModal .modal-body {
    max-height: calc(98vh - 70px);
  }
}

/* Mobile: reduce modal-tab vertical padding and text size */


/* Carousel Slider */
.carousel-modal {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.95);
  z-index: 1100;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

/* Full screen carousel: container fills viewport */
.carousel-container {
  width: 100%;
  height: 100%;
  display: flex;
  background: transparent;
  overflow: hidden;
}

.carousel-main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background: #000;
  min-width: 0; /* allow children to shrink */
  overflow: hidden;
  align-items: stretch;
}

.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: rgba(0,0,0,0.8);
  border-bottom: 1px solid #333;
}

.carousel-tabs {
  display: flex;
  gap: 8px;
}

.carousel-tab {
  background: transparent;
  border: none;
  color: #0084ff;
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 2px solid #0084ff;
}

.carousel-close {
  /* match modal close button style */
  background: #ff7a00 !important;
  color: #fff !important;
  border: none !important;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  border-radius: 2px !important;
  box-shadow: 0 4px 10px rgba(0,0,0,0.18);
}

.carousel-close:hover { transform: scale(1.03); }
.carousel-close:focus { outline: none; box-shadow: 0 0 0 4px rgba(255,122,0,0.18); }

.carousel-image-container {
  flex: 1 1 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #ff7a00; /* orange background */
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 12px; /* rounded */
  cursor: pointer;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: #ffffff; /* white arrow */
  box-shadow: 0 6px 14px rgba(0,0,0,0.25);
  transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
}

.carousel-nav.prev {
  left: 20px;
}

.carousel-nav.next {
  right: 20px;
}

/* Hover / focus states for nav buttons */
.carousel-nav:hover {
  transform: translateY(-50%) scale(1.04);
  box-shadow: 0 10px 20px rgba(0,0,0,0.28);
  opacity: 0.98;
}

.carousel-nav:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(255,122,0,0.18), 0 10px 20px rgba(0,0,0,0.28);
}

/* Make nav buttons slightly larger and more tappable on mobile */
@media (max-width: 768px) {
  .carousel-nav {
    width: 44px;
    height: 44px;
    font-size: 20px;
    border-radius: 10px;
  }
}

.carousel-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
}

.carousel-thumbnails {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  overflow-x: auto;
  background: rgba(0,0,0,0.8);
  border-top: 1px solid #333;
  height: 20vh; /* fixed height */
  min-height: 80px;
  box-sizing: border-box;
  align-items: center;
}

.carousel-thumb {
  width: 100px;
  height: calc(20vh - 48px);
  max-height: 140px;
  overflow: hidden;
  border-radius: 2px;
  cursor: pointer;
  opacity: 0.6;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-thumb.active {
  opacity: 1;
  border-color: #0084ff;
}

.carousel-thumb {
  background: rgba(0,0,0,0.06);
}

.carousel-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* show full image scaled */
  background: rgba(0,0,0,0.12);
  display: block;
}

.carousel-sidebar {
  width: 360px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
  overflow-y: auto;
}

.sidebar-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
}

.love-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
}

.love-icon {
  font-size: 20px;
}

.booking-info {
  margin-top: auto;
}

.price-info {
  margin-bottom: 16px;
}

.price-label {
  color: #666;
  font-size: 14px;
}

.price-amount {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.carousel-book-btn {
  width: 100%;
  background: #0084ff;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 768px) {
  .carousel-container {
    flex-direction: column;
  }
  
  .carousel-sidebar {
    width: 100%;
    height: auto;
    padding: 16px;
  }
  
  .carousel-thumbnails {
    padding: 4px 16px;
  }

  /* Mobile: reduce thumbnail bar height and thumb sizes */
  .carousel-thumbnails {
    height: 8vh !important;
    min-height: 56px !important;
  }

  .carousel-thumb {
    width: 72px !important;
    height: calc(8vh - 16px) !important;
    max-height: 80px !important;
  }
}

/* Mobile gallery: show only first 3 photos and make "See all photos" smaller */
@media (max-width: 768px) {
  .gallery-grid {
    /* make grid 3 columns and let items flow naturally */
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    gap: 6px;
    height: auto;
  }

  /* Prevent the large hero item from spanning rows on mobile so grid stays consistent */
  .gallery-item.big {
    grid-column: auto !important;
    grid-row: auto !important;
    border-radius: 2px !important;
  }

  /* Hide any gallery items after the first 3 on mobile */
  .gallery-item:nth-child(n+4) {
    display: none !important;
  }

  /* Make the "See all photos" button smaller and less intrusive on mobile */
  .see-all-btn {
    padding: 6px 10px !important;
    font-size: 12px !important;
    border-radius: 12px !important;
    top: 8px !important;
    right: 8px !important;
  }

  /* mobile: show icon above small text (column layout) */
  .deal-tabs {
    /* single row, don't wrap; allow horizontal scroll when needed */
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    gap: 6px;
    flex-wrap: nowrap !important;
    justify-content: flex-start; /* left-align so first tab is visible */
    scroll-snap-type: x mandatory;
    padding-left: 6px; /* small inset to separate from border */
  }

  /* hide native scrollbar for cleaner UI */
  .deal-tabs::-webkit-scrollbar { height: 0; }
  .deal-tabs { -ms-overflow-style: none; scrollbar-width: none; }

  /* arrow buttons attached half into the section */
  .tabs-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
    color: #ff7a00; /* arrow color */
    position: relative;
    z-index: 20;
    cursor: pointer;
  }

  .tabs-arrow.left { margin-right: 8px; transform: translateX(-50%); }
  .tabs-arrow.right { margin-left: 8px; transform: translateX(50%); }

  /* on smaller screens shrink arrows slightly and attach half outside */
  @media (max-width: 768px) {
    .tabs-arrow { width: 32px; height: 32px; }
    .tabs-arrow.left { transform: translateX(-60%); }
    .tabs-arrow.right { transform: translateX(60%); }
  }

  .deal-tabs .tab {
    padding: 6px 8px !important;
    font-size: 12px !important;
    display: inline-flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 56px;
    white-space: normal; /* allow label wrapping under icon only */
    scroll-snap-align: start;
  }

  /* Keep first tab similar size to others to avoid large gap */
  .deal-tabs .tab:first-child {
    min-width: 56px;
  }

  /* On ultra-narrow screens give it slightly more room but not full-width */
  @media (max-width: 360px) {
    .deal-tabs .tab:first-child {
      min-width: 72px;
      flex: 0 0 auto;
    }
  }

  .deal-tabs .tab i {
    font-size: 18px !important;
    display: block;
  }

  .deal-tabs .tab .tab-text {
    display: block !important;
    font-size: 8px !important;
    line-height: 1 !important;
    margin-top: 4px;
    text-align: center;
  }

  .deal-cta .from-label { font-size: 12px; }
  .deal-cta .deal-price { font-size: 14px; }
}

/* Blur main content when modal is active */
.hotel-details-page.modal-active {
  filter: blur(3px);
  transition: filter 0.3s ease;
}

/* Remove blur when modal is closed */
.hotel-details-page {
  filter: blur(0px);
  transition: filter 0.3s ease;
}

/* Auth modal styles */
.auth-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  /* Keep below the photo gallery overlay which uses z-index:5000 */
  z-index: 3000;
}

.auth-modal {
  width: 420px;
  max-width: 95vw;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  overflow: hidden;
  transform: scale(0.9);
  animation: modalAppear 0.3s ease forwards;
}

@keyframes modalAppear {
  to {
    transform: scale(1);
  }
}

.auth-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.auth-modal-tabs {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #f4f4f4;
}

.tab-btn {
  padding: 8px 12px;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 6px;
}

.tab-btn.active {
  background: #ff7a00;
  color: #fff;
  border-color: #ff7a00;
}

.auth-modal-body {
  padding: 16px;
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .hotel-details-page {
  background: #070e21;
  color: #e2e8f0;
}

[data-theme="night"] .search-header {
  background: #0a1128;
  border-bottom-color: #1a2744;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

[data-theme="night"] .search-input {
  background: #070e21;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .date-picker,
[data-theme="night"] .guests-picker {
  background: #0a1128;
  color: #e2e8f0;
}

[data-theme="night"] .update-btn {
  background: #60a5fa;
}

[data-theme="night"] .room-card {
  background: rgba(13, 25, 49, 0.7) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

[data-theme="night"] .room-offers {
  background: rgba(0, 0, 0, 0.2);
  border-left-color: rgba(255, 255, 255, 0.05);
}

[data-theme="night"] .offer-card,
[data-theme="night"] .transport-card,
[data-theme="night"] .review-card {
  background: transparent !important;
}

[data-theme="night"] .hotel-header {
  border-bottom-color: #1a2744;
}

[data-theme="night"] .hotel-name,
[data-theme="night"] .room-details h4,
[data-theme="night"] .category h4,
[data-theme="night"] .facility-category h4 {
  color: #e2e8f0;
}

[data-theme="night"] .hotel-address,
[data-theme="night"] .location,
[data-theme="night"] .review-count,
[data-theme="night"] .spec,
[data-theme="night"] .price-note {
  color: #94a3b8;
}

[data-theme="night"] .rating-box,
[data-theme="night"] .mini-map {
  background: #0a1128;
  border-color: #1a2744;
}

[data-theme="night"] .map-thumb {
  background: linear-gradient(135deg, #0a1128, #1a2744);
  color: #94a3b8;
}

[data-theme="night"] .rating-score {
  background: #60a5fa;
}

[data-theme="night"] .rating-text {
  color: #60a5fa;
}

[data-theme="night"] .map-btn {
  background: #0a1128;
  border-color: #60a5fa;
  color: #60a5fa;
}

[data-theme="night"] .staycation-section {
  background: rgba(10, 17, 40, 0.5);
  border-color: #1a2744;
}

[data-theme="night"] .staycation-section h3 {
  color: #e2e8f0;
}

[data-theme="night"] .staycard {
  background: rgba(13, 25, 49, 0.7) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}

[data-theme="night"] .staycard h4 {
  color: #e2e8f0;
}

[data-theme="night"] .see-amenities {
  color: #60a5fa;
}

[data-theme="night"] .deal-nav {
  background: rgba(10, 17, 40, 0.8);
  backdrop-filter: blur(12px);
  border-color: rgba(26, 39, 68, 0.5);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

[data-theme="night"] .deal-tabs .tab {
  color: #e2e8f0 !important; /* Force off-white in night mode */
}

[data-theme="night"] .deal-tabs .tab:hover,
[data-theme="night"] .deal-tabs .tab.active {
  color: #ff7a00 !important;
}

[data-theme="night"] .from-label,
[data-theme="night"] .staycation-sub {
  color: #94a3b8;
}

[data-theme="night"] .highlight-item,
[data-theme="night"] .amenity-item,
[data-theme="night"] .facility-item {
  background: #070e21;
}

[data-theme="night"] .filter-btn {
  background: #0a1128;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .filter-btn.active {
  background: #60a5fa;
  border-color: #60a5fa;
}

[data-theme="night"] .form-group input,
[data-theme="night"] .form-group select {
  background: #070e21;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .form-group label {
  color: #e2e8f0;
}

[data-theme="night"] .amenity-tag {
  background: #1a2744;
  color: #60a5fa;
}

[data-theme="night"] .original-price {
  color: #94a3b8;
}

[data-theme="night"] .current-price {
  color: #e2e8f0;
}

[data-theme="night"] .address,
[data-theme="night"] .landmark,
[data-theme="night"] .reviewer-type,
[data-theme="night"] .review-date,
[data-theme="night"] .staycard-list div {
  color: #94a3b8;
}

[data-theme="night"] .landmark {
  border-bottom-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .review-content h5,
[data-theme="night"] .review-likes,
[data-theme="night"] .review-dislikes,
[data-theme="night"] .policy-item p,
[data-theme="night"] .policy-item h4 {
  color: #e2e8f0;
}

[data-theme="night"] .badge.payment {
  background: #2d2a1e !important;
  color: #fbbf24 !important;
}

[data-theme="night"] .badge.breakfast,
[data-theme="night"] .badge.cancellation {
  background: #1e2d1e !important;
  color: #4ade80 !important;
}

[data-theme="night"] .highlight-item span {
  color: #e2e8f0;
}

[data-theme="night"] .availability-warning {
  color: #f87171;
}

[data-theme="night"] .rating-item {
  border-bottom-color: #1a2744;
}

[data-theme="night"] .location-map {
  background: #070e21;
}

[data-theme="night"] .map-placeholder {
  color: #94a3b8;
}

[data-theme="night"] .score {
  color: #60a5fa;
}

[data-theme="night"] .reviewer-rating {
  background: #60a5fa;
}

[data-theme="night"] .reviewer-name {
  color: #e2e8f0;
}

[data-theme="night"] .carousel-modal {
  background: rgba(14, 33, 72, 0.95);
}

[data-theme="night"] .carousel-main {
  background: #070e21;
}

[data-theme="night"] .carousel-header {
  background: rgba(26, 47, 92, 0.8);
  border-bottom-color: #1a2744;
}

[data-theme="night"] .carousel-tab {
  color: #60a5fa;
  border-bottom-color: #60a5fa;
}

[data-theme="night"] .carousel-thumbnails {
  background: rgba(26, 47, 92, 0.8);
  border-top-color: #1a2744;
}

[data-theme="night"] .carousel-counter {
  background: rgba(26, 47, 92, 0.7);
}

[data-theme="night"] .carousel-sidebar {
  background: #0a1128;
  color: #e2e8f0;
}

[data-theme="night"] .price-amount {
  color: #e2e8f0;
}

[data-theme="night"] .price-label {
  color: #94a3b8;
}

[data-theme="night"] .auth-modal {
  background: #0a1128;
  color: #e2e8f0;
}

[data-theme="night"] .auth-modal-header {
  border-bottom-color: #1a2744;
}

[data-theme="night"] .auth-modal-tabs {
  border-bottom-color: #1a2744;
}

[data-theme="night"] .tab-btn.active {
  background: #ff7a00;
  border-color: #ff7a00;
}

[data-theme="night"] .tabs-arrow {
  background: #0a1128;
  border-color: #1a2744;
  color: #ff7a00;
}

[data-theme="night"] .see-all-btn {
  background: #0a1128;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .nav-btn {
  background: rgba(26, 47, 92, 0.9);
  color: #e2e8f0;
}
</style>