<template>
  <section class="banner-section d-flex align-items-center justify-content-center" :style="bannerStyle">
    <div class="banner-content text-center">
      <div class="title-wrapper mb-4">
        <h1 class="banner-title fw-bold mb-3">Discover Your Perfect Stay</h1>
        <p class="banner-subtitle mb-0">
          <i class="fas fa-location-dot me-2"></i>
          Book hotels, resorts, and vacation rentals with the best prices
          <i class="fas fa-heart ms-2"></i>
        </p>
      </div>
      
      <!-- Search Form with modern white card design -->
      <div class="search-form material-card bg-white p-4 p-lg-5 shadow-lg d-flex flex-column justify-content-end h-100">
        <!-- Location field full width on top -->
        <div class="row mb-4">
          <div class="col-12" style="position:relative">
              <label for="destination-input" class="form-label fw-bold text-dark mb-3 text-start d-flex align-items-center">
                <i class="fas fa-map-marker-alt me-2 text-primary"></i>
                <span>Where are you going?</span>
              </label>
              <div class="input-wrapper">
                <i class="fas fa-search input-icon"></i>
                <input id="destination-input" type="text" class="form-control form-control-lg modern-input" placeholder="Search destinations, hotels, or cities..." v-model="searchData.location"
                  @input="onLocationInput" @focus="showSuggestions = true" @blur="onLocationBlur" autocomplete="off">
              </div>

              <!-- Suggestions dropdown grouped by division -->
              <div v-if="showSuggestions && filteredGroups.length" class="suggestions-dropdown shadow bg-white">
                <div class="suggestions-header px-3 py-2 bg-light">
                  <small class="text-muted">Popular Destinations</small>
                </div>
                <div v-for="group in filteredGroups" :key="group.division" class="suggestion-group">
                  <div class="suggestion-division fw-bold text-primary">
                    <i class="fas fa-location-dot me-2"></i>{{ group.division }}
                  </div>
                  <div class="d-flex flex-wrap gap-2 mt-2">
                    <button type="button" class="btn btn-sm suggestion-item" v-for="district in group.districts" :key="district"
                      @mousedown.prevent="selectDistrict(district, group.division)">
                      <i class="fas fa-map-pin me-1"></i>{{ district }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        
        <!-- Date + Guests fields -->
        <div class="row g-4 mb-5">
          <div class="col-lg-7 col-md-12">
            <label class="form-label fw-bold text-dark mb-3 d-flex align-items-center">
              <i class="fas fa-calendar-days me-2 text-primary"></i>
              <span>When's your trip?</span>
            </label>
            <div class="date-selector-wrapper">
              <button type="button" class="date-btn-unified" @click="toggleCalendar" aria-haspopup="dialog" aria-expanded="false" aria-controls="calendar-popover">
                <div class="date-unified-content">
                  <div class="date-section">
                    <div class="date-label-small">CHECK-IN</div>
                    <div class="date-value-large">{{ formattedCheckinShort }}</div>
                  </div>
                  <div class="date-divider">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                  <div class="date-section">
                    <div class="date-label-small">CHECK-OUT</div>
                    <div class="date-value-large">{{ formattedCheckoutShort }}</div>
                  </div>
                  <div class="nights-info" v-if="nightsCount > 0">
                    {{ nightsCount }} night{{ nightsCount > 1 ? 's' : '' }}
                  </div>
                </div>
              </button>
            </div>
          </div>
        
          <div class="col-lg-5 col-md-12">
            <label class="form-label fw-bold text-dark mb-3 d-flex align-items-center">
              <i class="fas fa-user-group me-2 text-primary"></i>
              <span>Who's coming?</span>
            </label>
            <div class="guest-control position-relative">
              <button type="button" class="guest-btn" @click="toggleGuests($event)">
                <div class="guest-btn-content">
                  <div class="guest-main">
                    <i class="fas fa-users me-2"></i>
                    <span class="fw-bold">{{ adults + children }} Guest{{ (adults + children) > 1 ? 's' : '' }}</span>
                  </div>
                  <div class="guest-details">
                    {{ rooms }} room{{ rooms > 1 ? 's' : '' }}{{ children > 0 ? ' · ' + children + ' children' : '' }}
                  </div>
                </div>
                <i class="fas fa-chevron-down"></i>
              </button>

              <div v-show="guestsOpen" class="guest-popover card shadow-lg" :class="{ 'popover-up': popoverDirection === 'up' }">
                <div class="guest-popover-header px-4 py-3 bg-light border-bottom">
                  <h6 class="mb-0 fw-bold">Select guests</h6>
                </div>
                
                <div class="p-4">
                  <div class="guest-row d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                    <div class="guest-info">
                      <div class="fw-bold">
                        <i class="fas fa-door-open me-2 text-primary"></i>Rooms
                      </div>
                      <div class="small text-muted">Number of rooms</div>
                    </div>
                    <div class="counter-controls d-flex align-items-center gap-3">
                      <button class="btn btn-counter" @click="decrement('rooms')" :disabled="rooms <= 1" aria-label="Decrease rooms">
                        <i class="bi bi-dash"></i>
                      </button>
                      <div class="counter-value fw-bold">{{ rooms }}</div>
                      <button class="btn btn-counter" @click="increment('rooms')" :disabled="rooms >= 5" aria-label="Increase rooms">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div class="guest-row d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                    <div class="guest-info">
                      <div class="fw-bold">
                        <i class="fas fa-user me-2 text-primary"></i>Adults
                      </div>
                      <div class="small text-muted">Ages 18 or above</div>
                    </div>
                    <div class="counter-controls d-flex align-items-center gap-3">
                      <button class="btn btn-counter" @click="decrement('adults')" :disabled="adults <= 1" aria-label="Decrease adults">
                        <i class="bi bi-dash"></i>
                      </button>
                      <div class="counter-value fw-bold">{{ adults }}</div>
                      <button class="btn btn-counter" @click="increment('adults')" :disabled="adults >= 9" aria-label="Increase adults">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div class="guest-row d-flex align-items-center justify-content-between">
                    <div class="guest-info">
                      <div class="fw-bold">
                        <i class="fas fa-child me-2 text-primary"></i>Children
                      </div>
                      <div class="small text-muted">Ages 0-17</div>
                    </div>
                    <div class="counter-controls d-flex align-items-center gap-3">
                      <button class="btn btn-counter" @click="decrement('children')" :disabled="children <= 0" aria-label="Decrease children">
                        <i class="bi bi-dash"></i>
                      </button>
                      <div class="counter-value fw-bold">{{ children }}</div>
                      <button class="btn btn-counter" @click="increment('children')" :disabled="children >= 9" aria-label="Increase children">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="px-4 pb-4">
                  <button class="btn btn-primary w-100 py-2 fw-semibold" @click="applyGuests">
                    <i class="fas fa-check me-2"></i>Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search button centered and half width -->
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <button class="btn btn-primary btn-lg search-btn fw-bold" @click="searchHotels" aria-label="Search hotels">
              <i class="fas fa-magnifying-glass me-3"></i>SEARCH HOTELS
              <i class="fas fa-arrow-right ms-3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Calendar Modal - Outside search form -->
    <div v-show="calendarOpen" class="calendar-modal-overlay" @click="closeCalendarIfOutside">
      <div class="calendar-modal" @click.stop>
        <div class="calendar-modal-header">
          <h5 class="mb-0 fw-bold">Select your dates</h5>
          <button type="button" class="btn-close-modal" @click="closeCalendar" aria-label="Close calendar">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="calendar-popover card shadow-lg">
          <!-- Tabs: Calendar / I'm flexible -->
          <div class="calendar-tabs d-flex border-bottom position-relative">
            <button 
              class="tab-btn flex-fill py-3 border-0 bg-transparent fw-semibold"
              :class="{ active: activeTab === 'calendar' }"
              @click="activeTab = 'calendar'"
            >
              <i class="fas fa-calendar me-2"></i>Choose dates
            </button>
            <button 
              class="tab-btn flex-fill py-3 border-0 bg-transparent fw-semibold"
              :class="{ active: activeTab === 'flexible' }"
              @click="activeTab = 'flexible'"
            >
              <i class="fas fa-sliders me-2"></i>Flexible dates
            </button>
          </div>

          <!-- Calendar Tab Content -->
          <div v-show="activeTab === 'calendar'" class="calendar-content p-3">
            <Datepicker
              v-model="dateRange"
              :range="true"
              :min-date="minDate"
              :format="'dd MMM yyyy'"
              :multi-calendars="calendars"
              :inline="true"
              class="agoda-calendar"
            />
            
            <!-- Action Buttons for calendar -->
            <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
              <button class="btn btn-link text-decoration-none text-secondary" @click="clearCalendarSelection">
                <i class="fas fa-rotate-left me-1"></i>Clear
              </button>
              <div class="text-muted small" v-if="nightsCount > 0">
                <i class="fas fa-moon me-1"></i>{{ nightsCount }} night{{ nightsCount > 1 ? 's' : '' }}
              </div>
              <button class="btn btn-primary px-4 py-2 fw-semibold" @click="closeCalendar">
                <i class="fas fa-check me-1"></i>Apply
              </button>
            </div>
          </div>

          <!-- Flexible Tab Content -->
          <div v-show="activeTab === 'flexible'" class="flexible-content p-4">
            <!-- Duration Selection -->
            <div class="mb-4">
              <h5 class="mb-3 fw-bold">
                <i class="fas fa-clock me-2 text-primary"></i>Trip duration
              </h5>
              <div class="d-flex gap-3 flex-wrap">
                <button 
                  class="btn duration-btn flex-fill"
                  :class="{ active: selectedDuration === '3nights' }"
                  @click="selectedDuration = '3nights'"
                >
                  <i class="fas fa-moon me-2"></i>3 nights
                </button>
                <button 
                  class="btn duration-btn flex-fill"
                  :class="{ active: selectedDuration === '1week' }"
                  @click="selectedDuration = '1week'"
                >
                  <i class="fas fa-calendar-week me-2"></i>1 week
                </button>
                <button 
                  class="btn duration-btn flex-fill"
                  :class="{ active: selectedDuration === '1month' }"
                  @click="selectedDuration = '1month'"
                >
                  <i class="fas fa-calendar me-2"></i>1 month
                </button>
              </div>
            </div>

            <!-- Month Selection -->
            <div class="mb-4">
              <h5 class="mb-2 fw-bold">
                <i class="fas fa-calendar-days me-2 text-primary"></i>Travel months
              </h5>
              <p class="text-muted small mb-3">Select one or more months for your trip</p>
              
              <div class="months-grid">
                <button 
                  v-for="month in availableMonths" 
                  :key="month.value"
                  class="btn month-btn"
                  :class="{ active: selectedMonths.includes(month.value) }"
                  @click="toggleMonth(month.value)"
                >
                  <i class="fas fa-calendar-day mb-2"></i>
                  <div class="fw-bold">{{ month.name }}</div>
                  <div class="small text-muted">{{ month.year }}</div>
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex justify-content-between align-items-center">
              <button class="btn btn-link text-decoration-none text-secondary" @click="clearFlexible">
                <i class="fas fa-rotate-left me-2"></i>Clear selection
              </button>
              <button class="btn btn-primary px-4 py-2 fw-semibold" @click="applyFlexible">
                <i class="fas fa-check me-2"></i>Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import bdLocations from '../data/bd-locations.js'


// Reactive search data (keeps string ISO dates for existing logic)
const searchData = ref({
  location: '',
  checkin: '',
  checkout: '',
  guests: '2'
})

// Separate check-in and check-out Date objects for compatibility
const checkinDate = ref(null)
const checkoutDate = ref(null)
// Range picker state
const dateRange = ref([null, null])
const calendarOpen = ref(false)
const activeTab = ref('calendar')
// responsive calendar count (2 on desktop, 1 on mobile)
const calendars = ref(2)

// Flexible dates state
const selectedDuration = ref('1week')
const selectedMonths = ref(['2025-11'])

const availableMonths = computed(() => [
  { value: '2025-10', name: 'October', year: '2025' },
  { value: '2025-11', name: 'November', year: '2025' },
  { value: '2025-12', name: 'December', year: '2025' },
  { value: '2026-01', name: 'January', year: '2026' },
  { value: '2026-02', name: 'February', year: '2026' },
  { value: '2026-03', name: 'March', year: '2026' }
])

function toggleMonth(monthValue) {
  const index = selectedMonths.value.indexOf(monthValue)
  if (index > -1) {
    selectedMonths.value.splice(index, 1)
  } else {
    selectedMonths.value.push(monthValue)
  }
}

function clearFlexible() {
  selectedDuration.value = '1week'
  selectedMonths.value = []
}

function applyFlexible() {
  // Convert flexible selection to actual dates
  if (selectedMonths.value.length > 0) {
    const firstMonth = selectedMonths.value[0]
    const [year, month] = firstMonth.split('-')
    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1)
    
    let endDate = new Date(startDate)
    if (selectedDuration.value === '3nights') {
      endDate.setDate(startDate.getDate() + 3)
    } else if (selectedDuration.value === '1week') {
      endDate.setDate(startDate.getDate() + 7)
    } else if (selectedDuration.value === '1month') {
      endDate.setMonth(startDate.getMonth() + 1)
    }
    
    dateRange.value = [startDate, endDate]
    closeCalendar()
  }
}

function toggleCalendar() {
  calendarOpen.value = !calendarOpen.value
}

function closeCalendarIfOutside(e) {
  // Only close if clicking directly on the overlay
  if (e.target.classList.contains('calendar-modal-overlay')) {
    closeCalendar()
  }
}

function closeCalendar() {
  calendarOpen.value = false
  // sync values
  if (Array.isArray(dateRange.value)) {
    const [s, e] = dateRange.value
    if (s) {
      checkinDate.value = new Date(s)
      searchData.value.checkin = checkinDate.value.toISOString().split('T')[0]
    }
    if (e) {
      checkoutDate.value = new Date(e)
      searchData.value.checkout = checkoutDate.value.toISOString().split('T')[0]
    }
  }
}

function clearCalendarSelection() {
  dateRange.value = [null, null]
  checkinDate.value = null
  checkoutDate.value = null
  searchData.value.checkin = ''
  searchData.value.checkout = ''
  // keep calendar open so user can choose again
}

const formattedCheckin = computed(() => checkinDate.value ? checkinDate.value.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : 'Add dates')
const formattedCheckout = computed(() => checkoutDate.value ? checkoutDate.value.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : 'Add dates')
const checkinDayName = computed(() => checkinDate.value ? checkinDate.value.toLocaleDateString(undefined, { weekday: 'long' }) : '')
const checkoutDayName = computed(() => checkoutDate.value ? checkoutDate.value.toLocaleDateString(undefined, { weekday: 'long' }) : '')

// Short format for unified display
const formattedCheckinShort = computed(() => checkinDate.value ? checkinDate.value.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : 'Add date')
const formattedCheckoutShort = computed(() => checkoutDate.value ? checkoutDate.value.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : 'Add date')

// Calculate nights
const nightsCount = computed(() => {
  if (checkinDate.value && checkoutDate.value) {
    const diffTime = checkoutDate.value.getTime() - checkinDate.value.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }
  return 0
})

// close calendar on outside click
function onDocClickCalendar(e) {
  const pop = document.querySelector('.calendar-popover')
  const btn = document.querySelector('.date-btn-unified')
  if (!calendarOpen.value) return
  if (pop && pop.contains(e.target)) return
  if (btn && btn.contains(e.target)) return
  calendarOpen.value = false
}

// responsive calendars setup
function updateCalendars() {
  try {
    const w = window.innerWidth || document.documentElement.clientWidth
    calendars.value = w <= 576 ? 1 : 2
  } catch (e) {
    calendars.value = 2
  }
}

const todayIso = () => new Date().toISOString().split('T')[0]

const bannerStyle = computed(() => ({
  background: 'transparent',
  position: 'relative',
  overflow: 'visible'
}))

const router = useRouter()

// Guest picker state
const guestsOpen = ref(false)
const popoverDirection = ref('down')
const rooms = ref(1)
const adults = ref(2)
const children = ref(0)

function toggleGuests(event) {
  guestsOpen.value = !guestsOpen.value
  if (guestsOpen.value && event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    // If less than 450px below the button, open upwards
    popoverDirection.value = spaceBelow < 450 ? 'up' : 'down'
  }
}

function increment(field) {
  if (field === 'rooms') rooms.value = Math.min(5, rooms.value + 1)
  if (field === 'adults') adults.value = Math.min(9, adults.value + 1)
  if (field === 'children') children.value = Math.min(9, children.value + 1)
}

function decrement(field) {
  if (field === 'rooms') rooms.value = Math.max(1, rooms.value - 1)
  if (field === 'adults') adults.value = Math.max(1, adults.value - 1)
  if (field === 'children') children.value = Math.max(0, children.value - 1)
}

function applyGuests() {
  // update searchData.guests as a simple string e.g. '2' or '5+' if >=5
  const totalGuests = adults.value + children.value
  searchData.value.guests = totalGuests >= 5 ? '5+' : String(totalGuests)
  guestsOpen.value = false
}

// close popover on outside click
function onDocClick(e) {
  const pop = document.querySelector('.guest-popover')
  const btn = document.querySelector('.guest-btn')
  if (!pop || !guestsOpen.value) return
  if (pop.contains(e.target) || (btn && btn.contains(e.target))) return
  guestsOpen.value = false
}

// minDate for checkin is today
const minDate = new Date()

// checkoutMinDate is checkin + 1 day (if checkin set) otherwise today + 1
const checkoutMinDate = computed(() => {
  if (checkinDate.value) {
    const d = new Date(checkinDate.value)
    d.setDate(d.getDate() + 1)
    return d
  }
  const t = new Date()
  t.setDate(t.getDate() + 1)
  return t
})

// Initialize defaults on mount and sync refs with searchData
onMounted(() => {
  // Initialize dates
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (searchData.value.checkin && searchData.value.checkout) {
    checkinDate.value = new Date(searchData.value.checkin)
    checkoutDate.value = new Date(searchData.value.checkout)
    dateRange.value = [new Date(searchData.value.checkin), new Date(searchData.value.checkout)]
  } else {
    searchData.value.checkin = today.toISOString().split('T')[0]
    searchData.value.checkout = tomorrow.toISOString().split('T')[0]
    checkinDate.value = today
    checkoutDate.value = tomorrow
    dateRange.value = [today, tomorrow]
  }

  // Setup event listeners
  document.addEventListener('click', onDocClick)
  
  // Setup responsive calendars
  updateCalendars()
  window.addEventListener('resize', updateCalendars)
})

// Cleanup all event listeners
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  window.removeEventListener('resize', updateCalendars)
})

function onCheckinChange(newDate) {
  // newDate may be a Date or null
  if (newDate) {
    checkinDate.value = newDate
    // ensure checkout at least one day after
    const minCheckout = new Date(newDate)
    minCheckout.setDate(minCheckout.getDate() + 1)
    if (!checkoutDate.value || checkoutDate.value <= newDate) {
      checkoutDate.value = new Date(minCheckout)
    }
    searchData.value.checkin = newDate.toISOString().split('T')[0]
    searchData.value.checkout = checkoutDate.value.toISOString().split('T')[0]
  }
}

function onCheckoutChange(newDate) {
  if (newDate) {
    // ensure checkout is after checkin
    if (checkinDate.value && newDate <= checkinDate.value) {
      // push checkout to checkin + 1
      const tmp = new Date(checkinDate.value)
      tmp.setDate(tmp.getDate() + 1)
      checkoutDate.value = tmp
    } else {
      checkoutDate.value = newDate
    }
    searchData.value.checkout = checkoutDate.value.toISOString().split('T')[0]
  }
}

function searchHotels() {
  // Navigate to the filter page with query parameters so FilterPage can show results
  const q = {
    destination: searchData.value.location || '',
    checkin: searchData.value.checkin || '',
    checkout: searchData.value.checkout || '',
    guests: searchData.value.guests || ''
  }
  router.push({ name: 'filter', query: q })
}

// Helper to prevent selecting past dates in the datepicker

function onDateFocus(event) {
  // keep existing minor focus behavior for styling
  if (event && event.target && event.target.parentElement) {
    event.target.parentElement.classList.add('focused')
  }
}

// --- Bangladesh locations autocomplete ---
const showSuggestions = ref(false)
const locationQuery = ref('')

watch(() => searchData.value.location, (v) => {
  locationQuery.value = v || ''
})

// Watch dateRange changes to update checkin/checkout
watch(dateRange, (newRange) => {
  if (Array.isArray(newRange) && newRange[0] && newRange[1]) {
    checkinDate.value = new Date(newRange[0])
    checkoutDate.value = new Date(newRange[1])
    searchData.value.checkin = checkinDate.value.toISOString().split('T')[0]
    searchData.value.checkout = checkoutDate.value.toISOString().split('T')[0]
  }
})

function onLocationInput(e) {
  locationQuery.value = e.target.value
  showSuggestions.value = true
}

function onLocationBlur() {
  // Delay hiding so click on suggestion registers (mousedown used on buttons)
  setTimeout(() => {
    showSuggestions.value = false
  }, 150)
}

function selectDistrict(district, division) {
  searchData.value.location = `${district}, ${division}`
  showSuggestions.value = false
}

// Filter and group matches by division. If query is empty, return all districts grouped by division
const filteredGroups = computed(() => {
  const q = (locationQuery.value || '').trim().toLowerCase()
  const groups = []
  for (const g of bdLocations) {
    if (!q) {
      // show full group when there's no query (so focus shows all suggestions)
      groups.push({ division: g.division, districts: g.districts.slice() })
    } else {
      const matches = g.districts.filter(d => d.toLowerCase().includes(q))
      if (matches.length) groups.push({ division: g.division, districts: matches })
    }
  }
  return groups
})
</script>

<style scoped>
/* Modern White Background Banner Design */

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translate3d(0, -10px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translate3d(0, 30px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}

/* Banner Section - Transparent, inherits page background */
.banner-section {
  /* Fit into a single viewport height and reduce vertical spacing */
  /* Use a slightly smaller top offset so banner content sits closer to the navbar.
     `min-height` keeps the full-viewport impression while allowing a small navbar gap. */
  min-height: calc(100vh - 56px);
  background: transparent;
  position: relative;
  overflow: visible !important;
  /* reduce top padding to pull content up; keep some bottom padding for the overlapping button */
  padding: 12px 16px 24px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

[data-theme="night"] .banner-title {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

[data-theme="night"] .banner-subtitle {
  color: #cbd5e1;
}

[data-theme="night"] .search-form {
  background: rgba(13, 25, 49, 0.95) !important;
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .form-label {
  color: #e2e8f0 !important;
}

[data-theme="night"] .modern-input {
  background: #0a1128;
  border-color: #1a2744 !important;
  color: #e2e8f0;
}

[data-theme="night"] .modern-input::placeholder {
  color: #64748b;
}

[data-theme="night"] .modern-input:focus {
  background: #070e21;
  border-color: #667eea !important;
}

[data-theme="night"] .suggestions-dropdown {
  background: rgba(13, 25, 49, 0.95) !important;
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .suggestions-header {
  background: #070e21 !important;
}

[data-theme="night"] .suggestion-item {
  background: #070e21;
  border-color: #1a2744;
  color: #cbd5e1;
}

[data-theme="night"] .suggestion-item:hover {
  background: #3b82f6;
  color: white;
}

[data-theme="night"] .date-btn-unified,
[data-theme="night"] .guest-btn {
  background: linear-gradient(135deg, #0a1128 0%, #070e21 100%);
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .date-value-large,
[data-theme="night"] .guest-main {
  color: #e2e8f0;
}

[data-theme="night"] .date-label-small,
[data-theme="night"] .guest-details {
  color: #94a3b8;
}

[data-theme="night"] .guest-popover,
[data-theme="night"] .calendar-modal {
  background: rgba(13, 25, 49, 0.95) !important;
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .guest-popover-header,
[data-theme="night"] .calendar-modal-header {
  background: #070e21 !important;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .btn-counter {
  background: #070e21;
  border-color: #1a2744;
  color: #60a5fa;
}

[data-theme="night"] .btn-counter i {
  color: #60a5fa;
}

[data-theme="night"] .btn-counter:hover:not(:disabled) {
  background: #3b82f6;
  color: white;
}

[data-theme="night"] .btn-counter:hover:not(:disabled) i {
  color: white;
}

[data-theme="night"] .counter-value {
  color: #e2e8f0;
}

[data-theme="night"] .guest-info .text-muted {
  color: #94a3b8 !important;
}

[data-theme="night"] .guest-info .fw-bold {
  color: #e2e8f0;
}

[data-theme="night"] .guest-row {
  border-color: #1a2744 !important;
}

[data-theme="night"] .calendar-popover {
  background: rgba(13, 25, 49, 0.95) !important;
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

[data-theme="night"] .calendar-tabs {
  background: #070e21;
}

[data-theme="night"] .tab-btn {
  color: #94a3b8;
}

[data-theme="night"] .tab-btn.active {
  color: #3b82f6;
}

[data-theme="night"] .duration-btn,
[data-theme="night"] .month-btn {
  background: #070e21;
  border-color: #1a2744;
  color: #cbd5e1;
}

[data-theme="night"] .duration-btn:hover,
[data-theme="night"] .month-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

[data-theme="night"] .duration-btn.active,
[data-theme="night"] .month-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 0 1rem;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  animation: fadeInUp 0.8s ease-out;
}

/* Title Section */
.title-wrapper {
  margin-bottom: 1.25rem !important;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  background: #ff7a00;
  color: white;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(255, 122, 0, 0.25);
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.banner-title {
  font-size: 3.5rem;
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  line-height: 1.2;
  animation: popupBounce 1s ease-out 0.2s both;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform-origin: center;
}

@keyframes popupBounce {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-50px);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.banner-subtitle {
  font-size: 1.15rem;
  color: #64748b;
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.banner-subtitle i {
  color: #667eea;
}

/* Modern Search Form Card (compact) */
.search-form {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px);
  border-radius: 16px !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.8);
  animation: fadeInUp 0.6s ease-out 0.2s both;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}

.search-form:hover {
  box-shadow: 0 16px 40px rgba(102, 126, 234, 0.08) !important;
  transform: translateY(-2px);
}

/* Ensure the datepicker popup appears above the banner overlay */
.vue-datepicker,
.vue-datepicker *,
.vp__calendar,
.vp__popover,
.vdp-datepicker,
.vdp-datepicker * {
  z-index: 8500 !important;
}

.vp__time,
.vdp-time,
.vdp-time__container {
  display: none !important;
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  width: 90%;
  margin: 0 auto;
  padding: 0 1rem;
  font-family: 'Montserrat', sans-serif;
  overflow: visible !important;
}

.banner-title {
  font-size: 3rem;
  color: #222;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.banner-subtitle {
  font-size: 1.2rem;
  color: gray;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  opacity: 0.95;
}

/* Modern Search Form */
.search-form {
  background: #0f8ed212 !important;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(10px);
  overflow: visible !important;
}

/* Form Labels & Input Styling */
.form-label {
  font-size: 0.95rem;
  color: #1e293b !important;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.form-label i {
  font-size: 1.1rem;
  color: #667eea;
}

/* Modern Input Wrapper */
.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-size: 1.1rem;
  z-index: 10;
  transition: all 0.3s ease;
}

.modern-input {
  padding: 18px 18px 18px 52px !important;
  border: 2px solid #e2e8f0 !important;
  border-radius: 14px !important;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8fafc;
  color: #1e293b;
}

.modern-input:focus {
  border-color: #667eea !important;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1) !important;
  background: white;
  transform: translateY(-2px);
}

.modern-input:focus + .input-icon {
  color: #667eea;
  transform: translateY(-50%) scale(1.1);
}

.modern-input:hover:not(:focus) {
  border-color: #cbd5e1;
  /* background: white; */
}

.modern-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

/* Suggestions dropdown */
.suggestions-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  z-index: 1050;
  max-height: 360px;
  overflow: auto;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  animation: slideDown 0.2s ease;
}



.suggestions-header {
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
}

.suggestion-group {
  padding: 1rem;
  text-align: left;
}

.suggestion-group + .suggestion-group {
  border-top: 1px solid #f1f5f9;
}

.suggestion-division {
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  padding: 0.25rem 0;
}

.suggestion-item {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  color: #475569;
}

.suggestion-item:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Modern Date Selector */
.date-selector-wrapper {
  position: relative;
}

.date-btn-unified {
  width: 100%;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 20px;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  min-height: 80px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.date-btn-unified::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.date-btn-unified:hover {
  border-color: #667eea;
  /* background: white; */
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.date-btn-unified:hover::after {
  opacity: 1;
}

.date-unified-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}

.date-section {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.date-label-small {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.date-value-large {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
}

.date-divider {
  color: #94a3b8;
  font-size: 1rem;
  padding: 0 8px;
}

.nights-info {
  font-size: 0.85rem;
  color: #3b82f6;
  font-weight: 600;
  white-space: nowrap;
  background: #dbeafe;
  padding: 4px 12px;
  border-radius: 20px;
}

/* Calendar Modal Overlay */
.calendar-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 8500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}



.calendar-modal {
  position: relative;
  max-width: 750px;
  width: 100%;
  animation: slideUp 0.3s ease;
}



.calendar-modal-header {
  background: white;
  padding: 20px 24px;
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f1f5f9;
}

.btn-close-modal {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: #f8fafc;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-close-modal:hover {
  background: #fee2e2;
  color: #dc2626;
}

/* Calendar Popover */
.calendar-popover {
  position: relative;
  width: 100%;
  max-height: 600px;
  overflow: hidden;
  border-radius: 0 0 16px 16px !important;
  border: none;
  box-shadow: none;
}

.calendar-tabs {
  background: #f8fafc;
  border-radius: 16px 16px 0 0;
}

.tab-btn {
  color: #64748b;
  font-weight: 600;
  transition: all 0.2s ease;
  position: relative;
  font-size: 0.95rem;
}

.tab-btn.active {
  color: #3b82f6;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #3b82f6;
  border-radius: 3px 3px 0 0;
}

.tab-btn:hover:not(.active) {
  color: #475569;
  background: rgba(0, 0, 0, 0.03);
}

/* Datepicker customization */
:deep(.agoda-calendar) {
  width: 100%;
}

:deep(.agoda-calendar .dp__main) {
  width: 100%;
}

:deep(.agoda-calendar .dp__calendar_wrap) {
  display: flex;
  gap: 20px;
}

:deep(.agoda-calendar .dp__calendar) {
  flex: 1;
  min-width: 260px;
}

:deep(.agoda-calendar .dp__calendar_header) {
  padding: 12px 0;
  font-weight: 700;
  color: #1e293b;
  font-size: 1rem;
}

:deep(.agoda-calendar .dp__cell_inner) {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

:deep(.agoda-calendar .dp__cell_inner:hover) {
  background: #dbeafe !important;
  transform: scale(1.05);
}

:deep(.agoda-calendar .dp__range_start .dp__cell_inner),
:deep(.agoda-calendar .dp__range_end .dp__cell_inner) {
  background: #3b82f6 !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

:deep(.agoda-calendar .dp__range_between) {
  background: #dbeafe;
}

:deep(.agoda-calendar .dp__today .dp__cell_inner) {
  border: 2px solid #3b82f6;
  color: #3b82f6;
  font-weight: 700;
}

.price-hint {
  border-radius: 8px;
}

/* Flexible dates styling */
.duration-btn {
  border: 2px solid #e2e8f0;
  background: white;
  color: #475569;
  padding: 12px 20px;
  border-radius: 10px;
  transition: all 0.2s ease;
  font-weight: 600;
}

.duration-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.duration-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.months-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.month-btn {
  border: 2px solid #e2e8f0;
  background: white;
  color: #475569;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.2s ease;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.month-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
}

.month-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.month-btn i {
  font-size: 1.5rem;
  opacity: 0.8;
}

/* Guest Control */
.guest-btn {
  width: 100%;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 16px;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  position: relative;
  overflow: hidden;
}

.guest-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.guest-btn:hover {
  border-color: #667eea;
  /* background: white; */
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.guest-btn:hover::after {
  opacity: 1;
}

.guest-btn-content {
  flex: 1;
}

.guest-main {
  font-size: 1rem;
  color: #1e293b;
  margin-bottom: 4px;
}

.guest-details {
  font-size: 0.85rem;
  color: #64748b;
}

.guest-popover {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 12px);
  z-index: 1050;
  min-width: 350px;
  border-radius: 16px !important;
  border: none;
  animation: slideDown 0.3s ease;
  transform-origin: top;
}

.guest-popover.popover-up {
  top: auto;
  bottom: calc(100% + 12px);
  transform-origin: bottom;
  animation: slideUp 0.3s ease;
}

.guest-popover-header {
  border-radius: 16px 16px 0 0;
}

.guest-row {
  min-height: 60px;
}

.guest-info {
  flex: 1;
}

.counter-controls {
  display: flex;
  align-items: center;
}

.btn-counter {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 2px solid #e2e8f0;
  background: white;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
}

.btn-counter i {
  color: currentColor;
  font-size: 1.1rem;
  line-height: 1;
  display: inline-block;
}

.btn-counter:hover:not(:disabled) {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-counter:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.counter-value {
  min-width: 40px;
  text-align: center;
  font-size: 1.1rem;
  color: #1e293b;
}

/* Search Button - Eye-catching Design */
.search-btn {
  /* Absolute centered and overlapping at bottom (negative bottom) */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  max-width: 480px;
  padding: 14px 0;
  font-weight: 700;
  font-size: 1.05rem;
  bottom: -28px;
  background: #ff7a00 !important;
  color: white !important;
  border: none !important;
  border-radius: 60px !important;
  box-shadow: 0 12px 30px rgba(255, 122, 0, 0.32), 0 4px 10px rgba(255, 122, 0, 0.16);
  transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 1.2px;
  overflow: hidden;
  z-index: 3;
}

.search-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.search-btn:hover::before {
  left: 100%;
}

.search-btn:hover {
  /* Preserve the horizontal centering translateX(-50%) so the button doesn't shift right */
  transform: translateX(-50%) translateY(-6px) scale(1.03);
  box-shadow: 
    0 20px 50px rgba(255, 122, 0, 0.45),
    0 8px 20px rgba(255, 122, 0, 0.28);
}

.search-btn:active {
  /* Keep translateX to maintain centered position when active */
  transform: translateX(-50%) translateY(-3px) scale(1.01);
  box-shadow: 
    0 12px 30px rgba(255, 122, 0, 0.35),
    0 4px 12px rgba(255, 122, 0, 0.22);
}

/* Responsive Design */
@media (max-width: 992px) {
  .banner-section {
    /* let content flow on smaller screens and reduce vertical spacing */
    height: auto;
    padding: 24px 12px;
  }
}

@media (max-width: 768px) {
  .banner-section {
    height: auto;
    padding: 20px 10px 60px 10px;
  }
  
  .banner-title {
    font-size: 1.5rem !important;
  }

  .badge-tag {
    font-size: 0.8rem;
    padding: 8px 18px;
  }
  
  .banner-subtitle {
    font-size: 0.8rem !important;
  }
  
  .banner-content {
    width: 95%;
  }

  .search-form {
    padding: 1.25rem !important;
    margin-bottom: 3rem !important;
  }
  
  .search-btn {
    width: 80%;
    font-size: 1rem;
    padding: 14px 0;
    bottom: -24px;
  }
  
  .date-unified-content {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .nights-info {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .banner-title {
    font-size: 1.25rem !important;
    margin-bottom: 0.5rem !important;
    line-height: 1.3;
  }
  
  .banner-subtitle {
    font-size: 0.7rem !important;
  }
  
  .title-wrapper {
    margin-bottom: 1rem !important;
  }
  
  .form-label {
    font-size: 0.8rem !important;
    margin-bottom: 0.5rem !important;
  }
  
  .modern-input {
    padding: 10px 10px 10px 38px !important;
    font-size: 0.85rem !important;
  }
  
  .input-icon {
    left: 12px;
    font-size: 0.95rem;
  }
  
  .date-btn-unified,
  .guest-btn {
    font-size: 0.8rem !important;
    padding: 10px 12px !important;
  }

  .search-btn {
    width: 85% !important;
    bottom: -18px !important;
    margin-top: 0;
    font-size: 0.85rem !important;
    padding: 12px 0 !important;
    letter-spacing: 0.5px !important;
    max-width: 320px;
  }

  .calendar-modal-overlay {
    padding: 0;
    align-items: flex-end;
  }
  
  .calendar-modal {
    max-width: 100%;
    width: 100%;
    max-height: 90vh;
    border-radius: 16px 16px 0 0;
  }
  
  .calendar-modal-header {
    border-radius: 16px 16px 0 0;
  }
  
  .calendar-popover {
    border-radius: 0 !important;
    max-height: calc(90vh - 80px);
    overflow-y: auto;
  }

  .guest-popover {
    position: fixed !important;
    left: 8px !important;
    right: 8px !important;
    bottom: 80px !important;
    top: auto !important;
    z-index: 8500 !important;
    min-width: auto !important;
    max-width: calc(100% - 16px) !important;
  }
  
  .calendar-modal-overlay {
    z-index: 8500 !important;
  }

  :deep(.agoda-calendar .dp__calendar_wrap) {
    flex-direction: column;
    gap: 8px;
  }
  
  .months-grid {
    grid-template-columns: 1fr;
  }
  
  .duration-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}

@media (max-width: 992px) {
  .banner-title {
    font-size: 2.5rem;
  }
  
  .banner-subtitle {
    font-size: 1rem;
  }
  
  .months-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .calendar-popover {
    min-width: 100%;
  }
}
</style>
