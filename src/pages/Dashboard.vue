<template>
  <div class="dashboard">
    <div class="container py-5">
      <!-- Welcome Section -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm bg-primary text-white">
            <div class="card-body">
              <h2 class="mb-3">Welcome back, {{ user.name }}!</h2>
              <p class="mb-0 opacity-75">
                Manage your bookings, explore new destinations, and enjoy personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="row mb-4">
        <div class="col-md-3 col-6 mb-3">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div class="icon-circle bg-success mb-2">
                <i class="fas fa-calendar-check"></i>
              </div>
              <h4 class="mb-1">{{ bookingStats.total }}</h4>
              <small class="text-muted">Total Bookings</small>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6 mb-3">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div class="icon-circle bg-warning mb-2">
                <i class="fas fa-clock"></i>
              </div>
              <h4 class="mb-1">{{ bookingStats.upcoming }}</h4>
              <small class="text-muted">Upcoming</small>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6 mb-3">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div class="icon-circle bg-info mb-2">
                <i class="fas fa-star"></i>
              </div>
              <h4 class="mb-1">{{ bookingStats.points }}</h4>
              <small class="text-muted">Reward Points</small>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6 mb-3">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div class="icon-circle bg-danger mb-2">
                <i class="fas fa-heart"></i>
              </div>
              <h4 class="mb-1">{{ bookingStats.favorites }}</h4>
              <small class="text-muted">Saved Hotels</small>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Recent Bookings -->
        <div class="col-lg-8 mb-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 pb-0">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Recent Bookings</h5>
                <router-link to="/my-bookings" class="btn btn-sm btn-outline-primary">
                  View All
                </router-link>
              </div>
            </div>
            <div class="card-body">
              <div v-if="recentBookings.length === 0" class="text-center py-4">
                <i class="fas fa-calendar-alt fa-3x text-muted mb-3"></i>
                <h6 class="text-muted">No bookings yet</h6>
                <p class="text-muted mb-3">Start your journey by booking your first hotel!</p>
                <router-link to="/hotels" class="btn btn-primary">
                  Browse Hotels
                </router-link>
              </div>
              
              <div v-else>
                <div 
                  v-for="booking in recentBookings" 
                  :key="booking.id"
                  class="booking-item mb-3 p-3 border rounded"
                >
                  <div class="row align-items-center">
                    <div class="col-md-2 text-center mb-2 mb-md-0">
                      <img 
                        :src="booking.hotel.image" 
                        :alt="booking.hotel.name"
                        class="img-fluid rounded"
                        style="max-height: 60px; object-fit: cover;"
                      >
                    </div>
                    <div class="col-md-6">
                      <h6 class="mb-1">{{ booking.hotel.name }}</h6>
                      <p class="mb-1 text-muted small">
                        <i class="fas fa-map-marker-alt"></i>
                        {{ booking.hotel.location }}
                      </p>
                      <p class="mb-0 small">
                        <strong>Check-in:</strong> {{ formatDate(booking.checkIn) }} |
                        <strong>Check-out:</strong> {{ formatDate(booking.checkOut) }}
                      </p>
                    </div>
                    <div class="col-md-2 text-center">
                      <span :class="`badge badge-${getStatusColor(booking.status)} px-2 py-1`">
                        {{ booking.status }}
                      </span>
                    </div>
                    <div class="col-md-2 text-center">
                      <strong class="text-primary">${{ booking.totalAmount }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions & Profile Summary -->
        <div class="col-lg-4">
          <!-- Quick Actions -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-white border-0 pb-0">
              <h5 class="mb-0">Quick Actions</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <router-link to="/hotels" class="btn btn-primary">
                  <i class="fas fa-search me-2"></i>
                  Find Hotels
                </router-link>
                <router-link to="/my-bookings" class="btn btn-outline-primary">
                  <i class="fas fa-list me-2"></i>
                  My Bookings
                </router-link>
                <router-link to="/profile" class="btn btn-outline-secondary">
                  <i class="fas fa-user me-2"></i>
                  Edit Profile
                </router-link>
              </div>
            </div>
          </div>

          <!-- Profile Summary -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0 pb-0">
              <h5 class="mb-0">Profile Summary</h5>
            </div>
            <div class="card-body">
              <div class="text-center mb-3">
                <div class="profile-avatar mx-auto mb-2">
                  {{ user.name?.charAt(0)?.toUpperCase() }}
                </div>
                <h6 class="mb-1">{{ user.name }}</h6>
                <p class="text-muted small mb-0">{{ user.email }}</p>
              </div>
              
              <div class="profile-info">
                <div class="info-item mb-2">
                  <small class="text-muted">Member since</small>
                  <div>{{ formatDate(user.createdAt) }}</div>
                </div>
                <div class="info-item mb-2">
                  <small class="text-muted">Phone</small>
                  <div>{{ user.phone || 'Not provided' }}</div>
                </div>
                <div class="info-item">
                  <small class="text-muted">Preferred Currency</small>
                  <div>USD ($)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useAuth } from '@/auth/authStore'

const { user, isAuthenticated } = useAuth()

// Demo data - replace with API calls
const bookingStats = reactive({
  total: 0,
  upcoming: 0,
  points: 1250,
  favorites: 0
})

const recentBookings = reactive([
  // Demo booking - replace with API data
  // {
  //   id: 1,
  //   hotel: {
  //     name: 'Grand Hotel Paradise',
  //     location: 'Maldives',
  //     image: '/src/assets/images/hotel1.jpg'
  //   },
  //   checkIn: '2024-02-15',
  //   checkOut: '2024-02-20',
  //   status: 'Confirmed',
  //   totalAmount: 1250
  // }
])

// Computed properties
const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'confirmed': return 'success'
    case 'pending': return 'warning'
    case 'cancelled': return 'danger'
    case 'completed': return 'info'
    default: return 'secondary'
  }
}

const loadDashboardData = async () => {
  // TODO: Replace with actual API calls
  try {
    // Simulate API loading
    setTimeout(() => {
      // Update stats based on user's actual data
      bookingStats.total = recentBookings.length
      bookingStats.upcoming = recentBookings.filter(b => 
        new Date(b.checkIn) > new Date()
      ).length
    }, 500)
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f8f9fa;
}

.bg-primary {
  background: linear-gradient(135deg, #0f8ed2 0%, #0a7bc4 100%) !important;
}

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: white;
  font-size: 1.2rem;
}

.booking-item {
  border: 1px solid #e9ecef !important;
  border-radius: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.booking-item:hover {
  border-color: #0f8ed2 !important;
  box-shadow: 0 2px 8px rgba(15, 142, 210, 0.1);
}

.profile-avatar {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #0f8ed2 0%, #0a7bc4 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

.profile-info .info-item {
  padding: 8px 0;
  border-bottom: 1px solid #f1f3f4;
}

.profile-info .info-item:last-child {
  border-bottom: none;
}

.badge {
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success { background: #28a745; }
.badge-warning { background: #ffc107; color: #212529; }
.badge-danger { background: #dc3545; }
.badge-info { background: #17a2b8; }
.badge-secondary { background: #6c757d; }

.card {
  border-radius: 8px;
}

.btn {
  border-radius: 6px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .dashboard .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .booking-item .row .col-md-6 {
    margin-bottom: 10px;
  }
  
  .profile-avatar {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .dashboard {
  background: #070e21;
  color: #e2e8f0;
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

[data-theme="night"] .bg-primary {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%) !important;
}

[data-theme="night"] .icon-circle {
  opacity: 0.9;
}

[data-theme="night"] .booking-item {
  border-color: #1a2744 !important;
  background: #070e21;
}

[data-theme="night"] .booking-item:hover {
  border-color: #60a5fa !important;
  box-shadow: 0 2px 8px rgba(96, 165, 250, 0.1);
}

[data-theme="night"] .btn-primary {
  background: #60a5fa;
  border-color: #60a5fa;
  color: white;
}

[data-theme="night"] .btn-primary:hover {
  background: #3b82f6;
  border-color: #3b82f6;
}

[data-theme="night"] .btn-outline-primary {
  color: #60a5fa;
  border-color: #60a5fa;
}

[data-theme="night"] .btn-outline-primary:hover {
  background: #60a5fa;
  border-color: #60a5fa;
  color: white;
}

[data-theme="night"] .btn-outline-secondary {
  color: #94a3b8;
  border-color: #1a2744;
}

[data-theme="night"] .btn-outline-secondary:hover {
  background: #1a2744;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .profile-info .info-item {
  border-bottom-color: #1a2744;
}
</style>