<template>
  <div class="register-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="register-card">
            <!-- Header -->
            <div class="text-center mb-4">
              <h2 class="register-title">Create Account</h2>
              <p class="text-muted">Join Explore World and start your journey</p>
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

            <!-- Registration Form -->
            <form @submit.prevent="handleRegister" class="register-form">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input 
                    type="text" 
                    class="form-control"
                    :class="{ 'is-invalid': fieldErrors.firstName }"
                    id="firstName"
                    v-model="formData.firstName"
                    placeholder="Enter your first name"
                    required
                    @blur="validateField('firstName')"
                    @input="clearFieldError('firstName')"
                  >
                  <div v-if="fieldErrors.firstName" class="invalid-feedback">
                    {{ fieldErrors.firstName }}
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input 
                    type="text" 
                    class="form-control"
                    :class="{ 'is-invalid': fieldErrors.lastName }"
                    id="lastName"
                    v-model="formData.lastName"
                    placeholder="Enter your last name"
                    required
                    @blur="validateField('lastName')"
                    @input="clearFieldError('lastName')"
                  >
                  <div v-if="fieldErrors.lastName" class="invalid-feedback">
                    {{ fieldErrors.lastName }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  class="form-control"
                  :class="{ 'is-invalid': fieldErrors.email }"
                  id="email"
                  v-model="formData.email"
                  placeholder="Enter your email"
                  required
                  @blur="validateField('email')"
                  @input="clearFieldError('email')"
                >
                <div v-if="fieldErrors.email" class="invalid-feedback">
                  {{ fieldErrors.email }}
                </div>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <div class="position-relative">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    class="form-control"
                    :class="{ 'is-invalid': fieldErrors.password }"
                    id="password"
                    v-model="formData.password"
                    placeholder="Create a password"
                    required
                    @blur="validateField('password')"
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
                <div v-if="fieldErrors.password" class="invalid-feedback">
                  {{ fieldErrors.password }}
                </div>
                <!-- Password strength indicator -->
                <div v-if="formData.password" class="password-strength mt-2">
                  <div class="strength-bar">
                    <div 
                      class="strength-fill" 
                      :class="passwordStrengthClass"
                      :style="{ width: passwordStrengthWidth + '%' }"
                    ></div>
                  </div>
                  <small class="text-muted">{{ passwordStrengthText }}</small>
                </div>
              </div>

              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <div class="position-relative">
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    class="form-control"
                    :class="{ 'is-invalid': fieldErrors.confirmPassword }"
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    placeholder="Confirm your password"
                    required
                    @blur="validateField('confirmPassword')"
                    @input="clearFieldError('confirmPassword')"
                  >
                  <button 
                    type="button" 
                    class="btn btn-link password-toggle"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
                <div v-if="fieldErrors.confirmPassword" class="invalid-feedback">
                  {{ fieldErrors.confirmPassword }}
                </div>
              </div>

              <div class="mb-4">
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="agreeTerms"
                    v-model="formData.agreeToTerms"
                    required
                  >
                  <label class="form-check-label" for="agreeTerms">
                    I agree to the 
                    <a href="#" class="text-decoration-none">Terms of Service</a> 
                    and 
                    <a href="#" class="text-decoration-none">Privacy Policy</a>
                  </label>
                </div>
                <div class="form-check mt-2">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="subscribeNewsletter"
                    v-model="formData.subscribeToNewsletter"
                  >
                  <label class="form-check-label" for="subscribeNewsletter">
                    Subscribe to our newsletter for travel deals and updates
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary w-100 register-btn"
                :disabled="auth.isLoading.value || !isFormValid"
              >
                <span v-if="auth.isLoading.value" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ auth.isLoading.value ? 'Creating Account...' : 'Create Account' }}
              </button>
            </form>

            <!-- Divider -->
            <div class="divider my-4">
              <span>or</span>
            </div>

            <!-- Social Registration -->
            <div class="social-register mb-4">
              <button class="btn btn-outline-secondary w-100 mb-2" disabled>
                <i class="bi bi-google me-2"></i>
                Sign up with Google
              </button>
              <button class="btn btn-outline-secondary w-100" disabled>
                <i class="bi bi-facebook me-2"></i>
                Sign up with Facebook
              </button>
            </div>

            <!-- Login Link -->
            <div class="text-center">
              <p class="mb-0">
                Already have an account? 
                <router-link to="/login" class="text-decoration-none">
                  Sign in here
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../auth/authStore.js'

const router = useRouter()
const auth = useAuth()

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
  subscribeToNewsletter: false
})

// UI state
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const localError = ref('')
const successMessage = ref('')
const fieldErrors = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Password strength calculation
const passwordStrength = computed(() => {
  const password = formData.value.password
  if (!password) return { strength: 0, text: '' }
  
  let score = 0
  let feedback = []
  
  // Length check
  if (password.length >= 8) score += 25
  else feedback.push('at least 8 characters')
  
  // Uppercase check
  if (/[A-Z]/.test(password)) score += 25
  else feedback.push('an uppercase letter')
  
  // Lowercase check
  if (/[a-z]/.test(password)) score += 25
  else feedback.push('a lowercase letter')
  
  // Number or special character check
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 25
  else feedback.push('a number or special character')
  
  let text = ''
  if (score < 50) text = 'Weak - Add ' + feedback.slice(0, 2).join(' and ')
  else if (score < 75) text = 'Fair - Add ' + feedback[0] || 'Good'
  else if (score < 100) text = 'Good'
  else text = 'Strong'
  
  return { strength: score, text }
})

const passwordStrengthWidth = computed(() => passwordStrength.value.strength)
const passwordStrengthText = computed(() => passwordStrength.value.text)
const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value.strength
  if (strength < 50) return 'strength-weak'
  if (strength < 75) return 'strength-fair'
  if (strength < 100) return 'strength-good'
  return 'strength-strong'
})

// Form validation
const isFormValid = computed(() => {
  return formData.value.firstName.trim() && 
         formData.value.lastName.trim() && 
         formData.value.email.trim() && 
         formData.value.password && 
         formData.value.confirmPassword &&
         formData.value.agreeToTerms &&
         !Object.values(fieldErrors.value).some(error => error)
})

// Methods
const validateField = (fieldName) => {
  const value = formData.value[fieldName]
  
  switch (fieldName) {
    case 'firstName':
    case 'lastName':
      if (!value || !value.trim()) {
        fieldErrors.value[fieldName] = `${fieldName === 'firstName' ? 'First' : 'Last'} name is required`
      } else if (value.trim().length < 2) {
        fieldErrors.value[fieldName] = `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`
      } else {
        fieldErrors.value[fieldName] = ''
      }
      break
      
    case 'email':
      if (!value || !value.trim()) {
        fieldErrors.value.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        fieldErrors.value.email = 'Please enter a valid email address'
      } else {
        fieldErrors.value.email = ''
      }
      break
      
    case 'password':
      if (!value) {
        fieldErrors.value.password = 'Password is required'
      } else if (value.length < 6) {
        fieldErrors.value.password = 'Password must be at least 6 characters long'
      } else {
        fieldErrors.value.password = ''
        // Re-validate confirm password if it exists
        if (formData.value.confirmPassword) {
          validateField('confirmPassword')
        }
      }
      break
      
    case 'confirmPassword':
      if (!value) {
        fieldErrors.value.confirmPassword = 'Please confirm your password'
      } else if (value !== formData.value.password) {
        fieldErrors.value.confirmPassword = 'Passwords do not match'
      } else {
        fieldErrors.value.confirmPassword = ''
      }
      break
  }
}

const clearFieldError = (fieldName) => {
  fieldErrors.value[fieldName] = ''
  localError.value = ''
  auth.clearError()
}

const clearMessages = () => {
  localError.value = ''
  successMessage.value = ''
  auth.clearError()
}

const handleRegister = async () => {
  // Clear previous messages
  clearMessages()
  
  // Validate all fields
  Object.keys(fieldErrors.value).forEach(validateField)
  
  // Check if form is valid
  if (!isFormValid.value) {
    localError.value = 'Please correct the errors above'
    return
  }
  
  try {
    const result = await auth.register({
      firstName: formData.value.firstName.trim(),
      lastName: formData.value.lastName.trim(),
      email: formData.value.email.trim(),
      password: formData.value.password,
      confirmPassword: formData.value.confirmPassword
    })
    
    if (result.success) {
      successMessage.value = result.message
      
      // Redirect to dashboard or login page
      setTimeout(() => {
        router.push({
          path: '/dashboard',
          query: { message: 'Welcome to Explore World! Your account has been created successfully.' }
        })
      }, 2000)
    }
  } catch (error) {
    // Error is handled by the auth store
    console.error('Registration failed:', error.message)
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
}

.register-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border: none;
}

.register-title {
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.register-form .form-control {
  border-radius: 6px;
  border: 1px solid #e1e5e9;
  padding: 0.75rem;
  font-size: 1rem;
}

.register-form .form-control:focus {
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

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  background: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
}

.strength-weak { background: #dc3545; }
.strength-fair { background: #ffc107; }
.strength-good { background: #17a2b8; }
.strength-strong { background: #28a745; }

.register-btn {
  background: #ff7a00;
  border: #ff7a00;
  border-radius: 6px;
  padding: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.register-btn:hover:not(:disabled) {
  background: #e66a00;
  border-color: #e66a00;
  transform: translateY(-1px);
}

.register-btn:disabled {
  background: #6c757d;
  border-color: #6c757d;
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

.social-register .btn-outline-secondary {
  border: 1px solid #dee2e6;
  color: #495057;
}

.social-register .btn-outline-secondary:hover:not(:disabled) {
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

.form-check-label a {
  color: #ff7a00;
}

.form-check-label a:hover {
  color: #e66a00;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .register-card {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .register-page {
    padding: 1rem 0;
  }
}
</style>
