<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 355 80" :height="height" width="auto" class="explore-world-logo-svg">
    <defs>
      <linearGradient :id="'primaryGrad_' + uid" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0ea5e9" />
        <stop offset="50%" stop-color="#2563eb" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
      <linearGradient :id="'accentGrad_' + uid" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
      <linearGradient :id="'textGrad_' + uid" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0ea5e9" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
      <filter :id="'glow_' + uid" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Group Logo Icon -->
    <g transform="translate(8, 5)">
      <!-- Globe Circle Outer Glow -->
      <circle cx="35" cy="35" r="32" :fill="`url(#primaryGrad_${uid})`" opacity="0.15" />
      
      <!-- Globe Base Grid -->
      <circle cx="35" cy="35" r="28" fill="none" :stroke="`url(#primaryGrad_${uid})`" stroke-width="2.5" />
      <ellipse cx="35" cy="35" rx="14" ry="28" fill="none" :stroke="`url(#primaryGrad_${uid})`" stroke-width="1.5" opacity="0.7" />
      <ellipse cx="35" cy="35" rx="28" ry="12" fill="none" :stroke="`url(#primaryGrad_${uid})`" stroke-width="1.5" opacity="0.7" />
      <line x1="7" y1="35" x2="63" y2="35" :stroke="`url(#primaryGrad_${uid})`" stroke-width="1.5" opacity="0.7" />

      <!-- Flight Trail Arc -->
      <path d="M 12 52 C 20 20, 50 15, 66 18" fill="none" :stroke="`url(#accentGrad_${uid})`" stroke-width="2.5" stroke-dasharray="3 3" stroke-linecap="round" />

      <!-- Soaring Jet Icon -->
      <g transform="translate(56, 11) rotate(25) scale(0.85)">
        <path d="M 12 0 L 16 12 L 28 16 L 16 20 L 14 28 L 10 21 L 4 22 L 7 16 L 0 14 Z" :fill="`url(#accentGrad_${uid})`" :filter="`url(#glow_${uid})`" />
      </g>

      <!-- Location Pin / Hotel Star Badge -->
      <g transform="translate(25, 20)">
        <path d="M 10 0 C 4.5 0 0 4.5 0 10 C 0 17 10 25 10 25 C 10 25 20 17 20 10 C 20 4.5 15.5 0 10 0 Z" :fill="`url(#primaryGrad_${uid})`" />
        <!-- Star inside pin -->
        <polygon points="10,4 11.8,7.6 15.7,8.2 12.8,11 13.5,14.9 10,13 6.5,14.9 7.2,11 4.3,8.2 8.2,7.6" fill="#ffffff" />
      </g>
    </g>

    <!-- Typography -->
    <!-- "EXPLORE" - Pure White (#ffffff) in Night Mode / Dark background, Dark Slate (#0f172a) in Day mode -->
    <text x="88" y="42" font-family="'Montserrat', 'Inter', 'Segoe UI', sans-serif" font-weight="800" font-size="25" letter-spacing="0.5" class="explore-text-mark" :fill="exploreColor">
      EXPLORE
    </text>
    
    <!-- "WORLD" -->
    <text x="208" y="42" font-family="'Montserrat', 'Inter', 'Segoe UI', sans-serif" font-weight="800" font-size="25" letter-spacing="0.5" :fill="`url(#textGrad_${uid})`">
      WORLD
    </text>

    <!-- Tagline -->
    <text x="89" y="58" font-family="'Montserrat', 'Inter', 'Segoe UI', sans-serif" font-weight="600" font-size="9" letter-spacing="2" :fill="`url(#accentGrad_${uid})`">
      HOTELS &amp; TRAVEL BOOKING
    </text>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../stores/themeStore.js'

const props = defineProps({
  height: { type: [Number, String], default: 65 },
  isDarkBg: { type: Boolean, default: false },
  forceWhite: { type: Boolean, default: false }
})

const themeStore = useThemeStore()
const uid = Math.random().toString(36).substring(2, 9)

const exploreColor = computed(() => {
  if (props.forceWhite || props.isDarkBg || themeStore.theme === 'night') {
    return '#ffffff'
  }
  return '#0f172a'
})
</script>

<style scoped>
.explore-world-logo-svg {
  display: block;
  transition: transform 0.3s ease;
  overflow: visible;
}

/* CSS fallback for dark mode */
:root[data-theme="night"] .explore-text-mark {
  fill: #ffffff !important;
}
</style>
