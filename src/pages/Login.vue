<template>
  <div class="login-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="login-card">
            <!-- Header -->
            <div class="text-center mb-4">
              <h2 class="login-title">Welcome Back</h2>
              <p class="text-muted">Sign in to your Explore World account</p>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
              {{ successMessage }}
              <button type="button" class="btn-close" @click="clearMessages"></button>
            </div>

            <!-- Error Message -->
            <div v-if="auth.error.value || localError" class="alert alert-danger alert-dismissible fade show" role="alert">
              {{ auth.error.value || localError }}
              <button type="button" class="btn-close" @click="clearMessages"></button>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="login-form">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  class="form-control"
                  :class="{ 'is-invalid': emailError }"
                  id="email"
                  v-model="formData.email"
                  placeholder="Enter your email"
                  required
                  @blur="validateEmail"
                  @input="clearFieldError('email')"
                >
                <div v-if="emailError" class="invalid-feedback">
                  {{ emailError }}
                </div>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <div class="position-relative">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    class="form-control"
                    :class="{ 'is-invalid': passwordError }"
                    id="password"
                    v-model="formData.password"
                    placeholder="Enter your password"
                    required
                    @input="clearFieldError('password')"
                  >
                  <button 
                    type="button" 
                    class="btn btn-link password-toggle"
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
                <div v-if="passwordError" class="invalid-feedback">
                  {{ passwordError }}
                </div>
              </div>

              <div class="mb-3 d-flex justify-content-between align-items-center">
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    value="" 
                    id="rememberMe"
                    v-model="formData.rememberMe"
                  >
                  <label class="form-check-label" for="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#" class="text-decoration-none forgot-password">
                  Forgot password?
                </a>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary w-100 login-btn"
                :disabled="auth.isLoading.value || !isFormValid"
              >
                <span v-if="auth.isLoading.value" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ auth.isLoading.value ? 'Signing In...' : 'Sign In' }}
              </button>
            </form>

            <!-- Divider -->
            <div class="divider my-4">
              <span>or</span>
            </div>

            <!-- Social Login -->
            <div class="social-login mb-4">
              <button class="btn btn-outline-secondary w-100 mb-2" disabled>
                <i class="bi bi-google me-2"></i>
                Continue with Google
              </button>
              <button class="btn btn-outline-secondary w-100" disabled>
                <i class="bi bi-facebook me-2"></i>
                Continue with Facebook
              </button>
            </div>

            <!-- Sign Up Link -->
            <div class="text-center">
              <p class="mb-0">
                Don't have an account? 
                <router-link to="/register" class="text-decoration-none">
                  Sign up here
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../auth/authStore.js'

const router = useRouter()
const route = useRoute()
const auth = useAuth()

// Form data
const formData = ref({
  email: '',
  password: '',
  rememberMe: false
})

// UI state
const showPassword = ref(false)
const localError = ref('')
const successMessage = ref('')
const emailError = ref('')
const passwordError = ref('')

// Computed
const isFormValid = computed(() => {
  return formData.value.email && 
         formData.value.password && 
         !emailError.value && 
         !passwordError.value
})

// Methods
const validateEmail = () => {
  const email = formData.value.email.trim()
  if (!email) {
    emailError.value = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

const clearFieldError = (field) => {
  if (field === 'email') emailError.value = ''
  if (field === 'password') passwordError.value = ''
  localError.value = ''
  auth.clearError()
}

const clearMessages = () => {
  localError.value = ''
  successMessage.value = ''
  auth.clearError()
}

const handleLogin = async () => {
  // Clear previous errors
  clearMessages()
  emailError.value = ''
  passwordError.value = ''

  // Validate form
  validateEmail()
  
  if (!formData.value.password) {
    passwordError.value = 'Password is required'
    return
  }

  if (!isFormValid.value) {
    return
  }

  try {
    const result = await auth.login({
      email: formData.value.email.trim(),
      password: formData.value.password
    })

    if (result.success) {
      successMessage.value = result.message
      
      // Redirect to intended page or dashboard
      const redirectTo = route.query.redirect || '/dashboard'
      
      setTimeout(() => {
        router.push(redirectTo)
      }, 1500)
    }
  } catch (error) {
    // Error is handled by the auth store
    console.error('Login failed:', error.message)
  }
}

// Check for success messages from registration
onMounted(() => {
  if (route.query.message) {
    successMessage.value = route.query.message
  }
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
}

.login-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border: none;
}

.login-title {
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.login-form .form-control {
  border-radius: 6px;
  border: 1px solid #e1e5e9;
  padding: 0.75rem;
  font-size: 1rem;
}

.login-form .form-control:focus {
  border-color: #ff7a00;
  box-shadow: 0 0 0 0.2rem rgba(255, 122, 0, 0.25);
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #6c757d;
  padding: 0;
  font-size: 1rem;
}

.password-toggle:hover {
  color: #495057;
}

.login-btn {
  background: #ff7a00;
  border: #ff7a00;
  border-radius: 6px;
  padding: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  background: #e66a00;
  border-color: #e66a00;
  transform: translateY(-1px);
}

.login-btn:disabled {
  background: #6c757d;
  border-color: #6c757d;
}

.forgot-password {
  color: #ff7a00;
  font-size: 0.9rem;
}

.forgot-password:hover {
  color: #e66a00;
}

.divider {
  position: relative;
  text-align: center;
  color: #6c757d;
  font-size: 0.9rem;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #dee2e6;
}

.divider span {
  background: white;
  padding: 0 1rem;
}

.social-login .btn-outline-secondary {
  border: 1px solid #dee2e6;
  color: #495057;
}

.social-login .btn-outline-secondary:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #dee2e6;
}

.alert {
  border-radius: 6px;
  border: none;
}

.alert-success {
  background: #d1edff;
  color: #0c5460;
}

.alert-danger {
  background: #f8d7da;
  color: #721c24;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .login-card {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .login-page {
    padding: 1rem 0;
  }
}
</style>
