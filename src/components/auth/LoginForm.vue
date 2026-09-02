<template>
  <div class="auth-form">
    <form @submit.prevent="onSubmit">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <div class="position-relative">
          <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="password" required />
          <button type="button" class="btn btn-link password-toggle" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</button>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <input id="remember" type="checkbox" v-model="remember" />
          <label for="remember" class="ms-1">Remember me</label>
        </div>
      </div>

      <div class="d-grid">
        <button class="btn btn-primary" :disabled="loading">{{ loading ? 'Signing in...' : 'Sign In' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../auth/authStore.js'

const emit = defineEmits(['authenticated'])
const auth = useAuth()

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    const res = await auth.login({ email: email.value.trim(), password: password.value })
    if (res && res.success) {
      emit('authenticated')
    }
  } catch (err) {
    error.value = err.message || (auth.error.value || 'Login failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-form .form-control { border-radius: 6px; }
.password-toggle { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); border: none; background: transparent; }
</style>