<template>
  <nav class="navbar">
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Left: Logo -->
      <div class="nav-left">
        <router-link to="/" class="brand d-flex align-items-center">
          <ExploreWorldLogo :height="65" />
        </router-link>
      </div>

      <!-- Middle: Menu (desktop) -->
      <div class="nav-center d-none d-md-flex">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/filter" class="nav-link">Hotels</router-link>
        <router-link v-if="auth.isAuthenticated.value" to="/dashboard" class="nav-link">Dashboard</router-link>
      </div>

      <!-- Right: Auth section (desktop) -->
      <div class="nav-right d-none d-md-flex align-items-center">
        <!-- Theme Toggle Button (SVG icons for crisp rendering) -->
        <button @click="toggleTheme" class="theme-toggle-btn me-3" style="background:transparent!important; box-shadow:none!important; backdrop-filter:none!important;" :aria-pressed="themeStore.theme === 'night'" :aria-label="themeStore.theme === 'day' ? 'Switch to night mode' : 'Switch to day mode'" :title="themeStore.theme === 'day' ? 'Switch to night mode' : 'Switch to day mode'">
            <svg v-if="themeStore.theme === 'day'" class="icon icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="background:transparent!important; box-shadow:none!important; backdrop-filter:none!important;">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
          </svg>
          <svg v-else class="icon icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.03-2.03l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM20 11v2h3v-2h-3zM4.24 19.16l1.8 1.79 1.79-1.79-1.79-1.79-1.8 1.79zM12 6a6 6 0 100 12 6 6 0 000-12z" fill="currentColor" />
          </svg>
        </button>
        
        <!-- Guest user buttons -->
        <template v-if="auth.isGuest.value">
          <router-link to="/login" class="btn btn-sm me-2 auth-btn auth-btn-outline">Login</router-link>
          <router-link to="/register" class="btn btn-sm auth-btn auth-btn-solid">Register</router-link>
        </template>
        
        <!-- Authenticated user menu -->
        <template v-else>
          <div class="dropdown">
            <button 
              class="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center"
              type="button"
              id="userDropdown"
              @click="toggleDropdown"
              @blur="closeDropdown"
            >
              <div class="user-avatar me-2">{{ auth.userInitials.value }}</div>
              {{ auth.userDisplayName.value }}
            </button>
            <ul 
              class="dropdown-menu"
              :class="{ show: showDropdown }"
            >
              <li>
                <router-link to="/profile" class="dropdown-item">
                  <i class="bi bi-person me-2"></i>Profile
                </router-link>
              </li>
              <li>
                <router-link to="/dashboard" class="dropdown-item">
                  <i class="bi bi-speedometer2 me-2"></i>Dashboard
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <button @click="handleLogout" class="dropdown-item">
                  <i class="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </nav>
  
  <!-- Mobile bottom bar (visible only on small screens) - OUTSIDE navbar -->
  <div class="mobile-bottom d-md-none">
    <router-link to="/" class="mobile-item">
      <i class="bi bi-house-door"></i>
      <span>Home</span>
    </router-link>
    <router-link to="/filter" class="mobile-item">
      <i class="bi bi-building"></i>
      <span>Hotels</span>
    </router-link>
    
    <!-- Theme Toggle for Mobile -->
    <button @click="toggleTheme" class="mobile-item mobile-theme-btn" :aria-label="themeStore.theme === 'day' ? 'Switch to night mode' : 'Switch to day mode'">
      <i v-if="themeStore.theme === 'day'" class="bi bi-moon-stars"></i>
      <i v-else class="bi bi-sun"></i>
      <span>{{ themeStore.theme === 'day' ? 'Night' : 'Day' }}</span>
    </button>
    
    <template v-if="auth.isAuthenticated.value">
      <router-link to="/dashboard" class="mobile-item">
        <i class="bi bi-speedometer2"></i>
        <span>Dashboard</span>
      </router-link>
      <router-link to="/profile" class="mobile-item">
        <i class="bi bi-person"></i>
        <span>Profile</span>
      </router-link>
    </template>
    <template v-else>
      <router-link to="/login" class="mobile-item">
        <i class="bi bi-box-arrow-in-right"></i>
        <span>Login</span>
      </router-link>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../auth/authStore.js'
import { useThemeStore } from '../stores/themeStore.js'
import ExploreWorldLogo from '../components/ExploreWorldLogo.vue'

const router = useRouter()
const auth = useAuth()
const themeStore = useThemeStore()

// Dropdown state
const showDropdown = ref(false)

// Navbar scroll state removed - no shrinking behavior

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

const handleLogout = () => {
  try {
    auth.logout()
    showDropdown.value = false
    router.push({
      path: '/',
      query: { message: 'You have been successfully logged out' }
    })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.navbar {
  /* Fully transparent to show particle background */
  background: transparent;
  color: var(--text-primary);
  padding: 20px 0;
  font-family: 'Montserrat', sans-serif !important;
  transition: all 0.28s ease;
  border: none;
  position: sticky;
  top: 0;
  z-index: 10000; /* High z-index to stay above page content */
}

/* Night mode navbar adjustments - only when NOT scrolled */
[data-theme="night"] .navbar:not(.navbar--scrolled) {
  background: transparent;
  color: #e2e8f0;
  border: none;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .brand {
  color: #60a5fa;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .nav-center .nav-link {
  color: #e2e8f0;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .nav-center .nav-link:hover {
  color: #ffd700;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .auth-btn-outline {
  border-color: #60a5fa;
  color: #60a5fa;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .auth-btn-outline:hover {
  background: #60a5fa;
  color: #070e21;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .auth-btn-solid {
  border-color: #60a5fa;
  background: #60a5fa;
  color: #070e21;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .auth-btn-solid:hover {
  background: #3b82f6;
  border-color: #3b82f6;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .theme-toggle-btn {
  border-color: #1a2744;
  background: #0a1128;
  color: #fbbf24;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .theme-toggle-btn:hover {
  background: #fbbf24;
  color: #070e21;
  border-color: #fbbf24;
}

[data-theme="night"] .navbar:not(.navbar--scrolled) .dropdown-toggle {
  color: #e2e8f0 !important;
  background: rgba(96, 165, 250, 0.1) !important;
}

[data-theme="night"] .dropdown-menu {
  background: #0a1128;
  border-color: #1a2744;
}

[data-theme="night"] .dropdown-item {
  color: #e2e8f0;
}

[data-theme="night"] .dropdown-item:hover {
  background: #070e21;
  color: #60a5fa;
}

[data-theme="night"] .dropdown-divider {
  border-color: #1a2744;
}

[data-theme="night"] .user-avatar {
  background: rgba(96, 165, 250, 0.3);
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.navbar .brand {
  color: #0f8ed2; /* logo uses the current brand color when not scrolled */
  font-weight: 600;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif !important;
}
.nav-logo {
  height: 80px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}
.brand:hover .nav-logo,
.brand:hover .explore-world-logo-svg {
  transform: scale(1.03);
}
.nav-center .nav-link { 
  color: #1f2937; 
  margin: 0 0.75rem; 
  text-decoration: none; 
  font-weight: 500; 
  transition: color 0.3s ease;
}
.nav-center .nav-link:hover {
  color: #ffd700;
}

/* Auth buttons - default state (white navbar) */
.auth-btn {
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  transition: all 0.28s ease;
}

/* Theme Toggle Button - cleaner, borderless, visible */
.theme-toggle-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
  box-shadow: 0 6px 16px rgba(2,6,23,0.08);
  backdrop-filter: blur(6px);
}

.theme-toggle-btn .icon { color: currentColor; display: block; }

.theme-toggle-btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 10px 26px rgba(2,6,23,0.12);
}

.theme-toggle-btn:active {
  transform: translateY(-1px) scale(0.98);
}

/* Slight icon rotation when switching for delight */
.theme-toggle-btn .icon-moon { transform-origin: center; }
.theme-toggle-btn .icon-sun { transform-origin: center; }
.theme-toggle-btn[aria-pressed="true"] .icon-moon,
.theme-toggle-btn[aria-pressed="true"] .icon-sun {
  transform: rotate(10deg) scale(1.03);
}

.auth-btn-outline {
  border: 2px solid #0f8ed2;
  color: #0f8ed2;
  background: transparent;
}

.auth-btn-outline:hover {
  background: #0f8ed2;
  color: #ffffff;
}

.auth-btn-solid {
  border: 2px solid #0f8ed2;
  background: #0f8ed2;
  color: #ffffff;
}

.auth-btn-solid:hover {
  background: #0d7bb8;
  border-color: #0d7bb8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 142, 210, 0.3);
}

/* User dropdown */
.dropdown {
  position: relative;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: #e2e8f0; /* More visible in Day Mode */
  color: #1a2b3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid rgba(0,0,0,0.05);
}

.dropdown-toggle {
  border: none !important;
  background: transparent !important;
  color: inherit !important; /* Inherit from navbar/parent for correct contrast */
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 30px;
}

.dropdown-toggle:hover {
  background: rgba(0, 0, 0, 0.05) !important;
}

[data-theme="night"] .dropdown-toggle:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Smooth transitions for state changes */
.navbar,
.navbar .brand,
.navbar .nav-link,
.navbar .nav-right .btn,
.navbar .dropdown-toggle {
  transition: background-color 0.28s ease, color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 10001; /* Ensure dropdown is above all other page content */
  display: none;
  margin-top: 12px;
  overflow: hidden;
  padding: 8px 0;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #212529;
  text-decoration: none;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #0f8ed2;
}

.dropdown-divider {
  margin: 0.5rem 0;
  border-top: 1px solid #dee2e6;
}

/* Mobile bottom bar - hidden on desktop, enabled via media query for small screens */
.mobile-bottom {
  display: none !important;
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: var(--bg-primary) !important;
  justify-content: space-around !important;
  align-items: center !important;
  padding: 12px 0 max(14px, env(safe-area-inset-bottom)) 0 !important;
  z-index: 2147483647 !important; /* Maximum possible z-index kept for when visible */
  border-top: 1px solid var(--border-color) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  height: auto !important;
  min-height: 70px !important;
  pointer-events: all !important;
  transform: translateZ(0) !important;
  will-change: transform !important;
  transition: background-color 0.3s ease, border-color 0.3s ease !important;
}

.mobile-item { 
  color: var(--text-secondary) !important; 
  text-decoration: none !important; 
  font-weight: 500 !important; 
  padding: 6px 12px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.75rem !important;
  transition: all 0.2s ease !important;
  min-width: 65px !important;
  flex: 1 !important;
  position: relative !important;
  z-index: inherit !important;
}

.mobile-item:hover,
.mobile-item:active,
.mobile-item:focus {
  color: var(--text-primary) !important;
  transform: translateY(-2px) !important;
  text-decoration: none !important;
}

.mobile-item i {
  font-size: 1.5rem !important;
  margin-bottom: 4px !important;
  display: block !important;
  color: inherit !important;
}

.mobile-item span {
  font-size: 0.7rem !important;
  font-weight: 500 !important;
  display: block !important;
  line-height: 1.2 !important;
}

/* Mobile theme toggle button */
.mobile-theme-btn {
  background: none !important;
  border: none !important;
  cursor: pointer !important;
}

.mobile-theme-btn:hover {
  background: rgba(15, 142, 210, 0.1) !important;
  border-radius: 8px !important;
}

[data-theme="night"] .mobile-theme-btn:hover {
  background: rgba(96, 165, 250, 0.15) !important;
}

/* Ensure main content isn't hidden behind the bottom bar on small screens */
@media (max-width: 767.98px) {
  main { 
    padding-bottom: 110px !important; 
    margin-bottom: 0 !important;
  }

  /* Enable mobile bottom bar only on small screens */
  .mobile-bottom {
    display: flex !important;
    padding: 14px 0 max(16px, env(safe-area-inset-bottom)) 0 !important;
  }
}

/* Active link styles */
.nav-link.router-link-active,
.mobile-item.router-link-active {
  color: #0f8ed2 !important;
}

.mobile-item.router-link-active {
  background: rgba(15, 142, 210, 0.1) !important;
  border-radius: 8px !important;
}

.mobile-item.router-link-active i {
  color: #0f8ed2 !important;
}

[data-theme="night"] .nav-link.router-link-active,
[data-theme="night"] .mobile-item.router-link-active {
  color: #60a5fa !important;
}

[data-theme="night"] .mobile-item.router-link-active {
  background: rgba(96, 165, 250, 0.15) !important;
}

[data-theme="night"] .mobile-item.router-link-active i {
  color: #60a5fa !important;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .navbar {
    padding: 15px 0;
  }
  
  .nav-center .nav-link {
    margin: 0 0.5rem;
  }
}

@media (max-width: 576px) {
  .brand {
    font-size: 1.1rem;
  }
  
  .nav-right .btn {
    font-size: 0.8rem;
    padding: 0.375rem 0.75rem;
  }
  
  .user-avatar {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }
}
</style>
