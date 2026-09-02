/**
 * Authentication Store
 * 
 * Vue 3 reactive store for managing authentication state
 * Uses Composition API with reactive() and computed()
 */

import { reactive, computed } from 'vue'
import { authService } from './authService.js'

// Create reactive state
const state = reactive({
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false
})

// Initialize state from localStorage on app start
const initializeAuth = () => {
  if (state.isInitialized) return
  
  try {
    const currentUser = authService.getCurrentUser()
    const token = authService.getToken()
    
    if (currentUser && token) {
      state.user = currentUser
    }
  } catch (error) {
    console.error('Failed to initialize auth state:', error)
    // Clear potentially corrupted data
    authService.logout()
  }
  
  state.isInitialized = true
}

// Computed properties
const isAuthenticated = computed(() => {
  return state.user !== null && authService.getToken() !== null
})

const isGuest = computed(() => {
  return !isAuthenticated.value
})

const userDisplayName = computed(() => {
  if (!state.user) return ''
  return `${state.user.firstName} ${state.user.lastName}`.trim()
})

const userInitials = computed(() => {
  if (!state.user) return ''
  const firstName = state.user.firstName || ''
  const lastName = state.user.lastName || ''
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
})

// Auth actions
const authStore = {
  // State
  state,
  
  // Computed properties
  isAuthenticated,
  isGuest,
  userDisplayName,
  userInitials,
  
  // Initialize auth state
  init() {
    initializeAuth()
  },
  
  /**
   * Register a new user
   */
  async register(userData) {
    state.isLoading = true
    state.error = null
    
    try {
      const result = await authService.register(userData)
      
      if (result.success) {
        state.user = result.user
        state.error = null
        return result
      }
    } catch (error) {
      state.error = error.message
      throw error
    } finally {
      state.isLoading = false
    }
  },
  
  /**
   * Login user
   */
  async login(credentials) {
    state.isLoading = true
    state.error = null
    
    try {
      const result = await authService.login(credentials)
      
      if (result.success) {
        state.user = result.user
        state.error = null
        return result
      }
    } catch (error) {
      state.error = error.message
      throw error
    } finally {
      state.isLoading = false
    }
  },
  
  /**
   * Logout user
   */
  logout() {
    try {
      const result = authService.logout()
      state.user = null
      state.error = null
      return result
    } catch (error) {
      state.error = error.message
      throw error
    }
  },
  
  /**
   * Update user profile
   */
  async updateProfile(updates) {
    state.isLoading = true
    state.error = null
    
    try {
      const result = await authService.updateProfile(updates)
      
      if (result.success) {
        state.user = result.user
        state.error = null
        return result
      }
    } catch (error) {
      state.error = error.message
      throw error
    } finally {
      state.isLoading = false
    }
  },
  
  /**
   * Change password
   */
  async changePassword(passwordData) {
    state.isLoading = true
    state.error = null
    
    try {
      const result = await authService.changePassword(passwordData)
      
      if (result.success) {
        state.error = null
        return result
      }
    } catch (error) {
      state.error = error.message
      throw error
    } finally {
      state.isLoading = false
    }
  },
  
  /**
   * Clear any errors
   */
  clearError() {
    state.error = null
  },
  
  /**
   * Check if user has specific role (placeholder for future role-based auth)
   */
  hasRole(role) {
    if (!state.user) return false
    // TODO: Implement role checking when roles are added
    return true
  },
  
  /**
   * Check if user has specific permission (placeholder for future permission system)
   */
  hasPermission(permission) {
    if (!state.user) return false
    // TODO: Implement permission checking when permissions are added
    return true
  },
  
  /**
   * Refresh user data (useful when user data might have changed)
   */
  refreshUser() {
    try {
      const currentUser = authService.getCurrentUser()
      if (currentUser) {
        state.user = currentUser
      } else {
        // User data is missing, logout
        this.logout()
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error)
      this.logout()
    }
  }
}

// Export the store
export { authStore }

// Auto-initialize when imported
authStore.init()

// Export for use in components
export default authStore

// Type definitions for better IDE support (optional)
export const AuthStatus = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error'
}

// Helper composable for using auth in components
export function useAuth() {
  return {
    // State
    user: computed(() => state.user),
    isLoading: computed(() => state.isLoading),
    error: computed(() => state.error),
    
    // Computed
    isAuthenticated,
    isGuest,
    userDisplayName,
    userInitials,
    
    // Actions
    register: authStore.register.bind(authStore),
    login: authStore.login.bind(authStore),
    logout: authStore.logout.bind(authStore),
    updateProfile: authStore.updateProfile.bind(authStore),
    changePassword: authStore.changePassword.bind(authStore),
    clearError: authStore.clearError.bind(authStore),
    refreshUser: authStore.refreshUser.bind(authStore),
    hasRole: authStore.hasRole.bind(authStore),
    hasPermission: authStore.hasPermission.bind(authStore)
  }
}

/**
 * Usage in components:
 * 
 * import { useAuth } from '@/auth/authStore.js'
 * 
 * export default {
 *   setup() {
 *     const auth = useAuth()
 *     
 *     return {
 *       auth
 *     }
 *   }
 * }
 * 
 * // In template:
 * <div v-if="auth.isAuthenticated.value">
 *   Welcome, {{ auth.userDisplayName.value }}!
 *   <button @click="auth.logout">Logout</button>
 * </div>
 */