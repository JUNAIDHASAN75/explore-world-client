import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import HotelDetails from '../pages/HotelDetails.vue'
import BookHotel from '../pages/BookHotel.vue'
import PaymentConfirmation from '../pages/PaymentConfirmation.vue'
import BookingSuccess from '../pages/BookingSuccess.vue'
import { authStore } from '../auth/authStore.js'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/hotel/:id', name: 'hotel-details', component: HotelDetails },
  { 
    path: '/book/:id', 
    name: 'hotel-book', 
    component: BookHotel,
    meta: { requiresAuth: true }
  },
  { 
    path: '/payment/:id', 
    name: 'payment-confirmation', 
    component: PaymentConfirmation,
    meta: { requiresAuth: true }
  },
  { 
    path: '/booking-success', 
    name: 'booking-success', 
    component: BookingSuccess,
    meta: { requiresAuth: true }
  },
  { path: '/filter', name: 'filter', component: () => import('../pages/FilterPage.vue') },
  { 
    path: '/login', 
    name: 'login', 
    component: () => import('../pages/Login.vue'),
    meta: { requiresGuest: true }
  },
  { 
    path: '/register', 
    name: 'register', 
    component: () => import('../pages/Register.vue'),
    meta: { requiresGuest: true }
  },
  // Dashboard route for authenticated users
  { 
    path: '/dashboard', 
    name: 'dashboard', 
    component: () => import('../pages/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  // Profile routes
  { 
    path: '/profile', 
    name: 'profile', 
    component: () => import('../pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  // Catch-all route - redirect to home
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    redirect: '/' 
  }
]

// simple in-memory map to store scroll positions per route
const scrollPositions = new Map()

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // if browser provides a savedPosition (popstate), use it
    if (savedPosition) return savedPosition

    // try to restore from our map
    const pos = scrollPositions.get(to.fullPath)
    if (pos) return pos

    // default: scroll to top
    return { left: 0, top: 0 }
  }
})

// Authentication guard
router.beforeEach((to, from, next) => {
  // Save scroll position
  if (from && from.fullPath) {
    scrollPositions.set(from.fullPath, { left: window.scrollX, top: window.scrollY })
  }

  // Initialize auth store if needed
  authStore.init()

  const isAuthenticated = authStore.isAuthenticated.value
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login with return path
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (requiresGuest && isAuthenticated) {
    // Redirect authenticated users away from login/register
    next('/dashboard')
  } else {
    // Allow navigation
    next()
  }
})

export default router
