<template>
  <div class="profile-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Profile Header -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body text-center py-4">
              <div class="profile-avatar mb-3">
                {{ userInitials }}
              </div>
              <h4 class="mb-1">{{ user.name }}</h4>
              <p class="text-muted mb-0">{{ user.email }}</p>
              <small class="text-muted">Member since {{ formatDate(user.createdAt) }}</small>
            </div>
          </div>

          <!-- Profile Form -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-white border-0">
              <h5 class="mb-0">
                <i class="fas fa-user me-2"></i>
                Personal Information
              </h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="updateProfile">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Full Name *</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors.name }"
                      v-model="profileForm.name"
                      required
                    >
                    <div v-if="errors.name" class="invalid-feedback">
                      {{ errors.name }}
                    </div>
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Email Address *</label>
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors.email }"
                      v-model="profileForm.email"
                      required
                    >
                    <div v-if="errors.email" class="invalid-feedback">
                      {{ errors.email }}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Phone Number</label>
                    <input
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': errors.phone }"
                      v-model="profileForm.phone"
                      placeholder="+1 (555) 123-4567"
                    >
                    <div v-if="errors.phone" class="invalid-feedback">
                      {{ errors.phone }}
                    </div>
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Date of Birth</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="profileForm.dateOfBirth"
                    >
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Country</label>
                    <select class="form-select" v-model="profileForm.country">
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="IN">India</option>
                      <!-- Add more countries as needed -->
                    </select>
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Preferred Currency</label>
                    <select class="form-select" v-model="profileForm.currency">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                      <option value="AUD">AUD (A$)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                </div>

                <!-- Success/Error Messages -->
                <div v-if="updateMessage.text" :class="`alert alert-${updateMessage.type} alert-dismissible fade show`">
                  <i :class="`fas ${updateMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`"></i>
                  {{ updateMessage.text }}
                  <button type="button" class="btn-close" @click="clearMessage"></button>
                </div>

                <div class="d-flex justify-content-between">
                  <router-link to="/dashboard" class="btn btn-outline-secondary">
                    <i class="fas fa-arrow-left me-2"></i>
                    Back to Dashboard
                  </router-link>
                  <button type="submit" class="btn btn-primary" :disabled="isUpdating">
                    <i v-if="isUpdating" class="fas fa-spinner fa-spin me-2"></i>
                    <i v-else class="fas fa-save me-2"></i>
                    {{ isUpdating ? 'Updating...' : 'Update Profile' }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Change Password -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-white border-0">
              <h5 class="mb-0">
                <i class="fas fa-lock me-2"></i>
                Change Password
              </h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="changePassword">
                <div class="mb-3">
                  <label class="form-label">Current Password *</label>
                  <div class="input-group">
                    <input
                      :type="showCurrentPassword ? 'text' : 'password'"
                      class="form-control"
                      :class="{ 'is-invalid': passwordErrors.currentPassword }"
                      v-model="passwordForm.currentPassword"
                      required
                    >
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="showCurrentPassword = !showCurrentPassword"
                    >
                      <i :class="`fas ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}`"></i>
                    </button>
                  </div>
                  <div v-if="passwordErrors.currentPassword" class="invalid-feedback d-block">
                    {{ passwordErrors.currentPassword }}
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">New Password *</label>
                    <div class="input-group">
                      <input
                        :type="showNewPassword ? 'text' : 'password'"
                        class="form-control"
                        :class="{ 'is-invalid': passwordErrors.newPassword }"
                        v-model="passwordForm.newPassword"
                        @input="validatePasswords"
                        required
                      >
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="showNewPassword = !showNewPassword"
                      >
                        <i :class="`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`"></i>
                      </button>
                    </div>
                    <div v-if="passwordErrors.newPassword" class="invalid-feedback d-block">
                      {{ passwordErrors.newPassword }}
                    </div>
                    <!-- Password Strength Indicator -->
                    <div v-if="passwordForm.newPassword" class="mt-2">
                      <div class="password-strength">
                        <div class="strength-bar">
                          <div 
                            class="strength-fill" 
                            :class="`strength-${passwordStrength.level}`"
                            :style="{ width: passwordStrength.percentage + '%' }"
                          ></div>
                        </div>
                        <small :class="`text-${passwordStrength.color}`">
                          {{ passwordStrength.text }}
                        </small>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Confirm New Password *</label>
                    <input
                      type="password"
                      class="form-control"
                      :class="{ 'is-invalid': passwordErrors.confirmPassword }"
                      v-model="passwordForm.confirmPassword"
                      @input="validatePasswords"
                      required
                    >
                    <div v-if="passwordErrors.confirmPassword" class="invalid-feedback">
                      {{ passwordErrors.confirmPassword }}
                    </div>
                  </div>
                </div>

                <!-- Password Change Messages -->
                <div v-if="passwordMessage.text" :class="`alert alert-${passwordMessage.type} alert-dismissible fade show`">
                  <i :class="`fas ${passwordMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`"></i>
                  {{ passwordMessage.text }}
                  <button type="button" class="btn-close" @click="clearPasswordMessage"></button>
                </div>

                <button type="submit" class="btn btn-warning" :disabled="isChangingPassword || !isPasswordFormValid">
                  <i v-if="isChangingPassword" class="fas fa-spinner fa-spin me-2"></i>
                  <i v-else class="fas fa-key me-2"></i>
                  {{ isChangingPassword ? 'Changing...' : 'Change Password' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Account Settings -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0">
              <h5 class="mb-0">
                <i class="fas fa-cog me-2"></i>
                Account Settings
              </h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-check form-switch mb-3">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="emailNotifications"
                      v-model="settings.emailNotifications"
                      @change="updateSettings"
                    >
                    <label class="form-check-label" for="emailNotifications">
                      Email Notifications
                    </label>
                    <div class="form-text">Receive booking confirmations and updates via email</div>
                  </div>
                  
                  <div class="form-check form-switch mb-3">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="smsNotifications"
                      v-model="settings.smsNotifications"
                      @change="updateSettings"
                    >
                    <label class="form-check-label" for="smsNotifications">
                      SMS Notifications
                    </label>
                    <div class="form-text">Receive important updates via text message</div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="form-check form-switch mb-3">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="promotionalEmails"
                      v-model="settings.promotionalEmails"
                      @change="updateSettings"
                    >
                    <label class="form-check-label" for="promotionalEmails">
                      Promotional Emails
                    </label>
                    <div class="form-text">Receive special offers and travel deals</div>
                  </div>
                  
                  <div class="form-check form-switch mb-3">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="publicProfile"
                      v-model="settings.publicProfile"
                      @change="updateSettings"
                    >
                    <label class="form-check-label" for="publicProfile">
                      Public Profile
                    </label>
                    <div class="form-text">Allow others to see your travel reviews</div>
                  </div>
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
import { reactive, computed, onMounted, nextTick } from 'vue'
import { useAuth } from '@/auth/authStore'
import { authService } from '@/auth/authService'

const { user, updateUserProfile } = useAuth()

// Form data
const profileForm = reactive({
  name: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  country: '',
  currency: 'USD'
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const settings = reactive({
  emailNotifications: true,
  smsNotifications: false,
  promotionalEmails: true,
  publicProfile: false
})

// UI state
const errors = reactive({})
const passwordErrors = reactive({})
const isUpdating = reactive({ value: false })
const isChangingPassword = reactive({ value: false })
const showCurrentPassword = reactive({ value: false })
const showNewPassword = reactive({ value: false })

const updateMessage = reactive({
  text: '',
  type: ''
})

const passwordMessage = reactive({
  text: '',
  type: ''
})

// Computed
const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()
})

const passwordStrength = computed(() => {
  const password = passwordForm.newPassword
  if (!password) return { level: 0, percentage: 0, text: '', color: 'muted' }
  
  let score = 0
  let feedback = []
  
  if (password.length >= 8) score += 20
  else feedback.push('at least 8 characters')
  
  if (/[a-z]/.test(password)) score += 20
  else feedback.push('lowercase letter')
  
  if (/[A-Z]/.test(password)) score += 20
  else feedback.push('uppercase letter')
  
  if (/\d/.test(password)) score += 20
  else feedback.push('number')
  
  if (/[^A-Za-z0-9]/.test(password)) score += 20
  else feedback.push('special character')
  
  let level, text, color
  if (score < 40) {
    level = 1; text = 'Weak'; color = 'danger'
  } else if (score < 60) {
    level = 2; text = 'Fair'; color = 'warning'
  } else if (score < 80) {
    level = 3; text = 'Good'; color = 'info'
  } else {
    level = 4; text = 'Strong'; color = 'success'
  }
  
  return { level, percentage: score, text, color }
})

const isPasswordFormValid = computed(() => {
  return passwordForm.currentPassword && 
         passwordForm.newPassword && 
         passwordForm.confirmPassword &&
         passwordForm.newPassword === passwordForm.confirmPassword &&
         passwordForm.newPassword.length >= 6 &&
         !Object.keys(passwordErrors).length
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone) => {
  if (!phone) return true // Optional field
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

const validatePasswords = () => {
  // Clear previous errors
  Object.keys(passwordErrors).forEach(key => delete passwordErrors[key])
  
  if (passwordForm.newPassword && passwordForm.newPassword.length < 6) {
    passwordErrors.newPassword = 'Password must be at least 6 characters'
  }
  
  if (passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = 'Passwords do not match'
  }
}

const updateProfile = async () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  // Validate form
  if (!profileForm.name.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!profileForm.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(profileForm.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (profileForm.phone && !validatePhone(profileForm.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }
  
  if (Object.keys(errors).length > 0) {
    return
  }
  
  isUpdating.value = true
  
  try {
    const result = await authService.updateProfile(profileForm)
    
    if (result.success) {
      // Update the user in the store
      updateUserProfile(result.user)
      
      updateMessage.text = 'Profile updated successfully!'
      updateMessage.type = 'success'
      
      // Clear message after 5 seconds
      setTimeout(() => {
        clearMessage()
      }, 5000)
    } else {
      updateMessage.text = result.error || 'Failed to update profile'
      updateMessage.type = 'danger'
    }
  } catch (error) {
    console.error('Profile update error:', error)
    updateMessage.text = 'An error occurred while updating your profile'
    updateMessage.type = 'danger'
  } finally {
    isUpdating.value = false
  }
}

const changePassword = async () => {
  validatePasswords()
  
  if (Object.keys(passwordErrors).length > 0) {
    return
  }
  
  isChangingPassword.value = true
  
  try {
    const result = await authService.changePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword
    )
    
    if (result.success) {
      passwordMessage.text = 'Password changed successfully!'
      passwordMessage.type = 'success'
      
      // Clear form
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
      
      // Clear message after 5 seconds
      setTimeout(() => {
        clearPasswordMessage()
      }, 5000)
    } else {
      passwordMessage.text = result.error || 'Failed to change password'
      passwordMessage.type = 'danger'
    }
  } catch (error) {
    console.error('Password change error:', error)
    passwordMessage.text = 'An error occurred while changing your password'
    passwordMessage.type = 'danger'
  } finally {
    isChangingPassword.value = false
  }
}

const updateSettings = async () => {
  try {
    // TODO: Save settings to API/localStorage
    console.log('Settings updated:', settings)
  } catch (error) {
    console.error('Settings update error:', error)
  }
}

const clearMessage = () => {
  updateMessage.text = ''
  updateMessage.type = ''
}

const clearPasswordMessage = () => {
  passwordMessage.text = ''
  passwordMessage.type = ''
}

const loadUserData = () => {
  if (user.value) {
    profileForm.name = user.value.name || ''
    profileForm.email = user.value.email || ''
    profileForm.phone = user.value.phone || ''
    profileForm.dateOfBirth = user.value.dateOfBirth || ''
    profileForm.country = user.value.country || ''
    profileForm.currency = user.value.currency || 'USD'
    
    // Load user settings (from localStorage or API)
    const savedSettings = localStorage.getItem('explore_world_user_settings')
    if (savedSettings) {
      try {
        Object.assign(settings, JSON.parse(savedSettings))
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
  }
}

// Lifecycle
onMounted(() => {
  loadUserData()
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #0f8ed2 0%, #0a7bc4 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: white;
  font-size: 2rem;
  font-weight: 600;
}

.card {
  border-radius: 8px;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 8px;
}

.form-control,
.form-select {
  border-radius: 6px;
  border: 1px solid #ced4da;
  padding: 0.75rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #0f8ed2;
  box-shadow: 0 0 0 0.2rem rgba(15, 142, 210, 0.25);
}

.btn {
  border-radius: 6px;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
}

.btn-primary {
  background: #0f8ed2;
  border-color: #0f8ed2;
}

.btn-primary:hover {
  background: #0a7bc4;
  border-color: #0a7bc4;
}

.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  background: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.strength-1 { background: #dc3545; }
.strength-2 { background: #ffc107; }
.strength-3 { background: #17a2b8; }
.strength-4 { background: #28a745; }

.form-check-input:checked {
  background-color: #0f8ed2;
  border-color: #0f8ed2;
}

.form-check-input:focus {
  border-color: #0f8ed2;
  box-shadow: 0 0 0 0.25rem rgba(15, 142, 210, 0.25);
}

.alert {
  border-radius: 6px;
  border: none;
}

.invalid-feedback {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .profile-page .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .profile-avatar {
    width: 64px;
    height: 64px;
    font-size: 1.5rem;
  }
  
  .btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .profile-page {
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

[data-theme="night"] .form-label {
  color: #e2e8f0;
}

[data-theme="night"] .form-control,
[data-theme="night"] .form-select {
  background: #070e21;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .form-control:focus,
[data-theme="night"] .form-select:focus {
  background: #070e21;
  border-color: #60a5fa;
  color: #e2e8f0;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25);
}

[data-theme="night"] .btn-primary {
  background: #60a5fa;
  border-color: #60a5fa;
}

[data-theme="night"] .btn-primary:hover {
  background: #3b82f6;
  border-color: #3b82f6;
}

[data-theme="night"] .btn-outline-primary,
[data-theme="night"] .btn-outline-secondary {
  color: #60a5fa;
  border-color: #60a5fa;
}

[data-theme="night"] .btn-outline-primary:hover,
[data-theme="night"] .btn-outline-secondary:hover {
  background: #60a5fa;
  border-color: #60a5fa;
  color: white;
}

[data-theme="night"] .btn-warning {
  background: #fbbf24;
  border-color: #fbbf24;
  color: #1a1a1a;
}

[data-theme="night"] .form-check-input {
  background-color: #070e21;
  border-color: #1a2744;
}

[data-theme="night"] .form-check-input:checked {
  background-color: #60a5fa;
  border-color: #60a5fa;
}

[data-theme="night"] .form-check-input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 0.25rem rgba(96, 165, 250, 0.25);
}

[data-theme="night"] .form-check-label {
  color: #e2e8f0;
}

[data-theme="night"] .form-text {
  color: #94a3b8;
}

[data-theme="night"] .strength-bar {
  background: #070e21;
}

[data-theme="night"] .alert {
  background: #0a1128;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .alert-success {
  background: #1e4d3b;
  color: #10b981;
  border-color: #065f46;
}

[data-theme="night"] .alert-danger {
  background: #4d1e1e;
  color: #f87171;
  border-color: #7f1d1d;
}
</style>