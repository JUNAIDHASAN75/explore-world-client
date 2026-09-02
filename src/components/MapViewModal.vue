<template>
  <Teleport to="body">
    <div v-if="isVisible" class="map-modal-overlay" @click="closeModal">
      <div class="map-modal-container" @click.stop>
      <!-- Header -->
      <div class="map-header">
        <div class="header-left">
          <button class="hide-filters-btn" @click="toggleFilters">
              <i class="bi bi-funnel"></i>
              <span>{{ showFilters ? 'Hide filters' : 'Show filters' }}</span>
            </button>
          <div class="property-info">
            <span class="property-count">{{ totalProperties }} properties available</span>
            <span class="date-info">1 night (Oct 16 – Oct 17)</span>
          </div>
        </div>
        <div class="header-right">
          <button class="close-btn" @click="closeModal" aria-label="Close Map">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

  <div class="map-content" :class="{ 'filters-hidden': !showFilters }">
    <!-- Mobile tab bar: Filters | Hotels | Map -->
    <div class="mobile-tab-bar" v-if="isMobile">
      <button :class="{ active: mobileTab === 'filters' }" @click.stop.prevent="mobileTab = 'filters'">Filters</button>
      <button :class="{ active: mobileTab === 'hotels' }" @click.stop.prevent="mobileTab = 'hotels'">Hotels</button>
      <button :class="{ active: mobileTab === 'map' }" @click.stop.prevent="mobileTab = 'map'">Map</button>
    </div>
  <!-- Left Sidebar -->
  <div class="map-sidebar" :class="{ hidden: !showFilters }">
    <div class="sidebar-left">
      <div class="filters-container" v-show="!isMobile || mobileTab === 'filters'">
          <div class="sidebar-header">
            <div class="sort-section">
              <div class="sort-wrapper">
                <label for="sortSelect" class="sort-label">Sort by</label>
                <div class="select-wrapper">
                  <select id="sortSelect" class="sort-select" v-model="currentSort">
                    <option value="Recommended">Recommended</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Rating: High to Low">Rating: High to Low</option>
                  </select>
                  <i class="bi bi-chevron-down select-arrow"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Text Search -->
          <div class="text-search-section">
            <div class="search-input-group">
              <i class="bi bi-search search-icon"></i>
              <input 
                type="text" 
                class="text-search-input" 
                placeholder="Text search"
                v-model="searchQuery"
              >
            </div>
          </div>

          <!-- Budget Filter -->
          <div class="filter-section">
            <h6 class="filter-title">Your budget (per night)</h6>
            <div class="budget-controls">
              <div class="budget-inputs">
                <div class="budget-input-wrapper">
                  <span class="currency">USD</span>
                  <input type="number" class="budget-input" v-model="minPrice" :placeholder="minPrice">
                </div>
                <div class="budget-input-wrapper">
                  <span class="currency">USD</span>
                  <input type="number" class="budget-input" v-model="maxPrice" :placeholder="maxPrice">
                </div>
              </div>
              <div class="budget-slider">
                <input 
                  type="range" 
                  class="price-slider" 
                  :min="0" 
                  :max="200" 
                  v-model="budgetRange"
                >
              </div>
            </div>
          </div>

          <!-- Popular Filters -->
          <div class="filter-section">
            <h6 class="filter-title">Popular filters for Chittagong</h6>
            <div class="checkbox-filters">
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span class="star-rating">★★★★★</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span class="star-rating">★★★★</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span class="star-rating">★★★</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span>Breakfast included</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span>Free cancellation</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span>Pay at the hotel</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span>Book without credit card</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span>Guest rating: 8+ Excellent</span>
              </label>
            </div>
          </div>

          <!-- Property Type -->
          <div class="filter-section">
            <h6 class="filter-title">Property type</h6>
            <div class="checkbox-filters">
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span>Hotel</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span>Apartment</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" class="filter-checkbox">
                <span>Resort</span>
              </label>
            </div>
          </div>
      </div>
    </div>

    <div class="sidebar-right">
      <!-- Hotel Cards List (centered in the right column) -->
      <div class="hotel-cards-container" v-show="!isMobile || mobileTab === 'hotels'">
        <div 
          v-for="hotel in visibleHotels" 
          :key="hotel.id" 
          class="agoda-map-hotel-card"
          @click="selectHotel(hotel)"
        >
          <div class="hotel-image-container">
            <img :src="hotel.image" :alt="hotel.name" class="hotel-image">
            <div class="hotel-badges">
              <span v-if="hotel.discount" class="discount-badge">{{ hotel.discount }}% TODAY</span>
            </div>
          </div>
          
          <div class="hotel-details">
            <div class="hotel-name-section">
              <h4 class="hotel-name">{{ hotel.name }}</h4>
              <div class="star-rating">{{ hotel.stars }}</div>
            </div>
            
            <div class="rating-section">
              <span class="rating-score-badge">{{ hotel.rating }}</span>
              <span class="rating-text">{{ hotel.ratingText }}</span>
              <span class="review-count">{{ hotel.reviewCount }} reviews</span>
            </div>
            
            <div class="amenities-section" v-if="hotel.breakfast">
              <div class="amenity-item">
                <span class="amenity-icon">🍽️</span>
                <span class="amenity-text">{{ hotel.breakfast }}</span>
              </div>
            </div>
            
            <div class="pricing-section-card">
              <div class="price-details">
                <div class="original-price" v-if="hotel.originalPrice">USD {{ hotel.originalPrice }}</div>
                <div class="cashback-terms" v-if="hotel.cashback">Subject to Cashback Terms</div>
              </div>
              <div class="current-price-section">
                <div class="price-amount">
                  <span class="currency">USD</span>
                  <span class="price">{{ hotel.price }}</span>
                </div>
                <div class="price-note">Per night before taxes and fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Map Container -->
  <div class="map-container" :class="{ expanded: !showFilters }" v-show="!isMobile || mobileTab === 'map'">
          <!-- Map Search Bar -->
          <div class="map-search-bar">
            <div class="search-input-wrapper">
              <i class="bi bi-search"></i>
              <input 
                type="text" 
                placeholder="Search on map" 
                class="map-search-input"
                v-model="mapSearchQuery"
              >
            </div>
          </div>

          <!-- Show City Center Button -->
          <div class="city-center-btn-container">
            <button class="city-center-btn" @click="showCityCenter">
              <i class="bi bi-geo-alt"></i>
              Show me city center
            </button>
          </div>

          <!-- Bangladesh Map with Leaflet -->
          <div class="map-area" ref="mapContainer" id="bangladeshMap">
            <!-- Map will be rendered here by Leaflet -->
          </div>

          <!-- Map Controls -->
          <div class="map-controls">
            <button class="map-control-btn zoom-in" @click="zoomIn">+</button>
            <button class="map-control-btn zoom-out" @click="zoomOut">-</button>
          </div>
      </div>
    </div>
    </div>
  </div>
</Teleport>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  hotels: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'hotelSelect'])

// Reactive data
const showFilters = ref(true)
const currentSort = ref('Recommended')
const searchQuery = ref('')
const mapSearchQuery = ref('')
const minPrice = ref(0)
const maxPrice = ref(140)
const budgetRange = ref(70)

// Mobile tab state
const mobileTab = ref('map') // 'filters' | 'hotels' | 'map'
const isMobile = ref(false)

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 1024
  if (!isMobile.value) {
    mobileTab.value = 'map'
  }
}

// initialize
onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

// Sample hotel data for map view
const mapHotels = ref([
  {
    id: 1,
    name: 'Best Western S K S Chattogram',
    stars: '★★★★★',
    rating: 8.4,
    ratingText: 'Excellent',
    reviewCount: 57,
    originalPrice: 67,
    price: 50,
    discount: 13,
    cashback: true,
    breakfast: 'Breakfast',
    image: '/src/assets/images/hotel1.jpg',
    soldOut: false
  },
  {
    id: 2,
    name: 'The Peninsula Chittagong Hotel',
    stars: '★★★★★',
    rating: 8.7,
    ratingText: 'Excellent',
    reviewCount: 307,
    originalPrice: 103,
    price: 52,
    discount: 49,
    cashback: true,
    breakfast: 'Breakfast',
    image: '/src/assets/images/hotel2.jpg',
    soldOut: false
  },
  {
    id: 2,
    name: 'The Peninsula Chittagong Hotel',
    stars: '★★★★★',
    rating: 8.7,
    ratingText: 'Excellent',
    reviewCount: 307,
    originalPrice: 103,
    price: 52,
    discount: 49,
    cashback: true,
    breakfast: 'Breakfast',
    image: '/src/assets/images/hotel2.jpg',
    soldOut: false
  },
  {
    id: 2,
    name: 'The Peninsula Chittagong Hotel',
    stars: '★★★★★',
    rating: 8.7,
    ratingText: 'Excellent',
    reviewCount: 307,
    originalPrice: 103,
    price: 52,
    discount: 49,
    cashback: true,
    breakfast: 'Breakfast',
    image: '/src/assets/images/hotel2.jpg',
    soldOut: false
  },
  {
    id: 2,
    name: 'The Peninsula Chittagong Hotel',
    stars: '★★★★★',
    rating: 8.7,
    ratingText: 'Excellent',
    reviewCount: 307,
    originalPrice: 103,
    price: 52,
    discount: 49,
    cashback: true,
    breakfast: 'Breakfast',
    image: '/src/assets/images/hotel2.jpg',
    soldOut: false
  },
  {
    id: 3,
    name: 'Sold Out Hotel',
    price: 100,
    soldOut: true,
    image: '/src/assets/images/hotel3.jpg'
  }
])

// Hotel markers positions (simulated coordinates)
const hotelMarkers = ref([
  { id: 1, x: 200, y: 150, hotel: mapHotels.value[0] },
  { id: 2, x: 350, y: 200, hotel: mapHotels.value[1] },
  { id: 3, x: 450, y: 300, hotel: mapHotels.value[2] },
  { id: 4, x: 300, y: 350, hotel: { id: 4, price: 41, soldOut: false } },
  { id: 5, x: 500, y: 250, hotel: { id: 5, price: 51, soldOut: false } },
  { id: 6, x: 150, y: 400, hotel: { id: 6, price: 60, soldOut: false } },
])

const totalProperties = computed(() => mapHotels.value.length)
const visibleHotels = computed(() => mapHotels.value.filter(hotel => !hotel.soldOut))

// Map instance
let leafletMap = null

// Methods
function closeModal() {
  emit('close')
}

function toggleFilters() {
  showFilters.value = !showFilters.value
}

function selectHotel(hotel) {
  console.log('Selected hotel:', hotel)
  emit('hotelSelect', hotel)
}

function showCityCenter() {
  console.log('Show city center clicked')
}

function zoomIn() {
  console.log('Zoom in')
}

function zoomOut() {
  if (leafletMap) {
    leafletMap.zoomOut()
  }
}

// Initialize Bangladesh map with Leaflet
async function initializeMap() {
  if (!window.L) return
  
  // If map already exists, just refresh it
  if (leafletMap) {
    setTimeout(() => {
      leafletMap.invalidateSize()
    }, 100)
    return
  }
  
  await nextTick()
  const mapElement = document.getElementById('bangladeshMap')
  if (!mapElement) return

  // Initialize map centered on Bangladesh (Dhaka)
  leafletMap = window.L.map('bangladeshMap').setView([23.8103, 90.4125], 7)

  // Add OpenStreetMap tiles
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(leafletMap)

  // Critical for flex/modal layouts: ensure Leaflet knows its container size
  setTimeout(() => {
    if (leafletMap) {
      leafletMap.invalidateSize()
    }
  }, 300)

  // Add hotel markers for Bangladesh cities
  const bangladeshHotels = [
    { id: 1, lat: 23.8103, lng: 90.4125, name: 'Dhaka Hotel', price: 50 },
    { id: 2, lat: 22.3569, lng: 91.7832, name: 'Chittagong Hotel', price: 45 },
    { id: 3, lat: 24.3636, lng: 88.6241, name: 'Rajshahi Hotel', price: 40 },
    { id: 4, lat: 25.7439, lng: 89.2752, name: 'Rangpur Hotel', price: 35 },
    { id: 5, lat: 24.8949, lng: 91.8687, name: 'Sylhet Hotel', price: 55 }
  ]

  bangladeshHotels.forEach(hotel => {
    const marker = window.L.marker([hotel.lat, hotel.lng])
      .bindPopup(`<b>${hotel.name}</b><br>USD ${hotel.price} per night`)
      .addTo(leafletMap)
    
    marker.on('click', () => {
      selectHotel({ ...hotel, image: '/src/assets/images/hotel1.jpg' })
    })
  })
}

// Load Leaflet CSS and JS
function loadLeaflet() {
  return new Promise((resolve) => {
    if (window.L) {
      resolve()
      return
    }

    // Load CSS
    const cssLink = document.createElement('link')
    cssLink.rel = 'stylesheet'
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(cssLink)

    // Load JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = resolve
    document.head.appendChild(script)
  })
}

// Robust body scroll lock: save scroll position, fix body, restore on close
let _bodyLocked = false
let _savedScrollY = 0

function lockBodyScroll() {
  if (_bodyLocked) return
  _savedScrollY = window.scrollY || window.pageYOffset || 0
  document.body.style.position = 'fixed'
  document.body.style.top = `-${_savedScrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
  _bodyLocked = true
}

function unlockBodyScroll() {
  if (!_bodyLocked) return
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  _bodyLocked = false
  // restore scroll position
  window.scrollTo(0, _savedScrollY)
}

watch(() => props.isVisible, async (visible) => {
  if (visible) {
    lockBodyScroll()
    await loadLeaflet()
    await initializeMap()
  } else {
    unlockBodyScroll()
  }
})

onUnmounted(() => {
  unlockBodyScroll()
  if (leafletMap) {
    leafletMap.remove()
    leafletMap = null
  }
})
</script>

<style scoped>
.map-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #070e21;
  z-index: 20000;
  display: block; /* Removed flex centering to allow container to fill */
}

.map-modal-container {
  width: 100%;
  height: 100%;
  background: #13131e;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: rgba(19, 19, 30, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1010;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hide-filters-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ff7a00;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.hide-filters-btn:hover {
  background: rgba(255, 122, 0, 0.1);
  border-color: #ff7a00;
}

.property-info {
  display: flex;
  flex-direction: column;
}

.property-count {
  font-weight: 700;
  color: #e2e8f0;
  font-size: 16px;
}

.date-info {
  color: #94a3b8;
  font-size: 13px;
}

.header-right {
  display: flex;
  align-items: center;
}

.close-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #e2e8f0;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #ff4b2b;
  color: white;
  transform: rotate(90deg);
  border-color: #ff4b2b;
}

.map-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 65px);
  width: 100%;
}

.map-sidebar {
  flex: 0 0 750px; /* Wider sidebar to accommodate two columns */
  background: #13131e;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: row;
  min-height: 0;
  z-index: 1005;
}

/* Split sidebar into left filters (1/3) and right hotel list (2/3) */
.map-sidebar {
  display: flex;
  flex-direction: row;
}

.sidebar-left {
  flex: 0 0 280px;
  padding: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: rgba(255, 255, 255, 0.02);
}

.filters-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
  max-height: calc(100vh - 120px);
}

/* Hide scrollbars but keep scrolling (WebKit, Firefox, IE/Edge) */
.filters-container::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.filters-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.sidebar-right {
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 16px;
  background: #0f0f18;
  min-height: 0;
}

.sidebar-right .hotel-cards-container {
  width: 100%;
  max-width: 720px; /* keep list centered and constrained */
  background: transparent;
  padding: 0;
  overflow-y: auto; /* independent scroll */
  max-height: calc(100vh - 160px); /* keep within modal height */
}

/* hide scrollbar for hotel list */
.sidebar-right .hotel-cards-container::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.sidebar-right .hotel-cards-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* When filters are hidden: completely hide the sidebar so the map fills the modal */
.map-sidebar.hidden {
  display: none !important;
}

/* Let the map expand behind the overlay when filters hidden */
.map-content .map-container {
  transition: all 0.25s ease;
}
.map-content.filters-hidden .map-container,
.map-content .map-container.expanded {
  flex: 1 1 auto;
  width: 100%;
}

.sidebar-header {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.03);
}

.sort-section {
  margin-bottom: 0;
}

.sort-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sort-label {
  font-weight: 600;
  color: #94a3b8;
  font-size: 13px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.sort-select {
  width: 100%;
  padding: 12px 35px 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  font-size: 14px;
  color: #e2e8f0;
  appearance: none;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
  border-color: #0084ff;
  box-shadow: 0 0 0 2px rgba(0, 132, 255, 0.1);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b6b6b;
  pointer-events: none;
  font-size: 12px;
}

.text-search-section {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.search-input-group {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b6b6b;
}

.text-search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  font-size: 14px;
  color: #e2e8f0;
}

.filter-section {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.filter-title {
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 16px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.budget-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.budget-inputs {
  display: flex;
  gap: 8px;
  /* width: 70%; */
}

.budget-input-wrapper {
  display: flex;
  align-items: center;
  width: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 14px;
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
}

.currency {
  font-weight: 700;
  margin-right: 8px;
  color: #ff7a00;
}

.budget-input {
  border: none;
  background: transparent;
  outline: none;
  width: 100% !important;
  color: #e2e8f0;
  font-size: 14px;
}

.price-slider {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #e1e5e9;
  outline: none;
}

.checkbox-filters {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.filter-checkbox {
  margin: 0;
}

.star-rating {
  color: #ffa500;
}

.hotel-cards-container {
  padding: 12px 16px 24px 16px;
  flex: 1;
  overflow-y: auto;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agoda-map-hotel-card {
  display: flex;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 140px;
  backdrop-filter: blur(4px);
}

.agoda-map-hotel-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.07);
  border-color: #ff7a00;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.hotel-image-container {
  position: relative;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
}

.hotel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hotel-badges {
  position: absolute;
  top: 8px;
  right: 8px;
}

.discount-badge {
  background: #dc3545;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.hotel-details {
  flex: 1;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hotel-name-section {
  margin-bottom: 8px;
}

.hotel-name {
  font-size: 18px;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.star-rating {
  color: #ff7a00;
  font-size: 14px;
  letter-spacing: 1px;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.rating-score-badge {
  background: #ff7a00;
  color: white;
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: 800;
  font-size: 14px;
  min-width: 36px;
  text-align: center;
}

.rating-text {
  color: #60a5fa;
  font-weight: 700;
  font-size: 14px;
}

.review-count {
  color: #94a3b8;
  font-size: 13px;
}

.amenities-section {
  margin-bottom: 12px;
}

.amenity-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(96, 165, 250, 0.1);
  padding: 6px 12px;
  border-radius: 30px;
  display: inline-flex;
  font-size: 12px;
  color: #60a5fa;
  font-weight: 600;
}

.amenity-icon {
  font-size: 14px;
}

.pricing-section-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.price-details {
  flex: 1;
}

.original-price {
  text-decoration: line-through;
  color: #6b6b6b;
  font-size: 13px;
  margin-bottom: 2px;
}

.cashback-terms {
  color: #6b6b6b;
  font-size: 11px;
  line-height: 1.2;
}

.current-price-section {
  text-align: right;
}

.price-amount {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 2px;
}

.currency {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.price {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
}

.price-note {
  font-size: 10px;
  color: #6b6b6b;
  text-align: right;
  line-height: 1.2;
  margin-top: 2px;
}

.map-container {
  flex: 1; /* Occupy all remaining space */
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.map-search-bar {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1002; /* above overlay but below sidebar overlay which uses 1001 */
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input-wrapper i {
  position: absolute;
  left: 12px;
  color: #6b6b6b;
}

.map-search-input {
  padding: 12px 12px 12px 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  background: rgba(19, 19, 30, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 300px;
  font-size: 14px;
  color: #e2e8f0;
}

.city-center-btn-container {
  position: absolute;
  bottom: 80px;
  right: 16px;
  z-index: 1002;
}

.city-center-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 30px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-weight: 600;
  color: #e2e8f0;
  transition: all 0.3s ease;
}

.city-center-btn:hover {
  background: #ff7a00;
  color: white;
  border-color: #ff7a00;
}

.map-area {
  width: 100%;
  height: 100%; /* fill the map column height */
  position: relative;
  background: #0a0a0f;
  min-height: calc(100vh - 120px); /* full height minus header */
}

#bangladeshMap {
  height: 100%;
  width: 100%;
}

.map-bg {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #a8e6cf 0%, #88d8c0 25%, #7fcdcd 50%, #78c2ad 75%, #6bb6a0 100%);
  position: relative;
  overflow: hidden;
}

.map-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px);
}

.map-placeholder::after {
  content: 'Google Maps';
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: rgba(0,0,0,0.6);
  font-size: 12px;
  font-weight: 500;
  background: rgba(255,255,255,0.8);
  padding: 4px 8px;
  border-radius: 2px;
}

.hotel-marker {
  position: absolute;
  cursor: pointer;
  z-index: 50;
}

.marker-content {
  background: #ff7a00;
  border: 2px solid white;
  border-radius: 30px;
  padding: 6px 14px;
  font-weight: 800;
  font-size: 13px;
  color: white;
  box-shadow: 0 4px 12px rgba(255, 122, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.marker-content:hover {
  transform: scale(1.15) translateY(-5px);
  box-shadow: 0 8px 20px rgba(255, 122, 0, 0.6);
}

.marker-content.sold-out {
  background: #f8f9fa;
  border-color: #6b6b6b;
  color: #6b6b6b;
}

.sold-out-text {
  font-size: 10px;
}

.marker-price {
  white-space: nowrap;
}

.map-controls {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 1002;
}

/* Mobile tab bar (visible <=1024px) */
.mobile-tab-bar {
  display: none;
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1003;
  background: rgba(255,255,255,0.95);
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 4px;
}
.mobile-tab-bar button {
  background: transparent;
  border: none;
  padding: 8px 12px;
  font-weight: 600;
  color: #6b6b6b;
  cursor: pointer;
  border-radius: 999px;
}
.mobile-tab-bar button.active {
  background: #ff7a00;
  color: white;
}

.map-control-btn {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  color: #e2e8f0;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.map-control-btn:hover {
  background: #ff7a00;
  color: white;
  border-color: #ff7a00;
}

/* Mobile responsive */
@media (max-width: 1024px) {
  .map-content {
    flex-direction: column;
  }
  .mobile-tab-bar { display: flex; gap: 4px; }

  .map-sidebar {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: auto;
    border-right: none;
    flex-direction: column;
  }

  /* On mobile stack: show map on top with larger height, then filters/list underneath */
  .map-container {
    width: 100%;
    height: 80vh; /* larger map height on mobile */
    flex: 0 0 auto;
  }

  /* Make the filters and hotel list scroll independently and occupy remaining viewport */
  .filters-container {
    max-height: calc(100vh - 220px);
  }

  .sidebar-right .hotel-cards-container {
    max-height: calc(100vh - 260px);
  }

  .map-sidebar.hidden {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .map-search-input {
    width: 100%;
    max-width: calc(100vw - 64px);
  }

  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .agoda-map-hotel-card {
    min-height: 110px;
    flex-direction: row;
  }

  .hotel-image-container {
    width: 100px;
    height: 100px;
  }

  .hotel-details {
    padding: 10px 12px;
  }

  .hotel-name {
    font-size: 15px;
  }

  .price {
    font-size: 18px;
  }

  /* Mobile: map taller and the list scrolls below */
  .map-container {
    height: 55vh;
  }

  .map-sidebar {
    height: auto;
  }

  /* touch targets larger */
  .map-control-btn, .city-center-btn {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
}
</style>