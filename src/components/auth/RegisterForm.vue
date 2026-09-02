<template>
  <div class="auth-form">
    <form @submit.prevent="onSubmit">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" v-model="name" placeholder="First and last name" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" v-model="password" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Confirm Password</label>
        <input type="password" class="form-control" v-model="confirmPassword" required />
      </div>

      <div class="d-grid">
        <button class="btn btn-primary" :disabled="loading">{{ loading ? 'Creating...' : 'Create account' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../auth/authStore.js'

const emit = defineEmits(['authenticated'])
const auth = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  error.value = ''

  // Basic client-side validation
  const trimmedName = name.value.trim()
  if (!trimmedName) {
    error.value = 'Please enter your name'
    return
  }

  if (!email.value.trim()) {
    error.value = 'Please enter your email address'
    return
  }

  if (!password.value) {
    error.value = 'Please enter a password'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  try {
    const res = await auth.register({
      name: trimmedName,
      email: email.value.trim(),
      password: password.value,
      confirmPassword: confirmPassword.value
    })
    if (res && res.success) {
      emit('authenticated')
    }
  } catch (err) {
    error.value = err.message || (auth.error.value || 'Registration failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-form .form-control { border-radius: 6px; }
</style>