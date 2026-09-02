import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Check localStorage or default to 'day'
  const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
  const theme = ref(savedTheme || 'day')

  // Watch theme changes and persist to localStorage
  watch(theme, (newTheme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
      // Apply theme to document root
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }, { immediate: true })

  // Toggle between day and night
  function toggleTheme() {
    theme.value = theme.value === 'day' ? 'night' : 'day'
  }

  // Computed properties for convenience
  const isDark = () => theme.value === 'night'
  const isLight = () => theme.value === 'day'

  return {
    theme,
    toggleTheme,
    isDark,
    isLight
  }
})
