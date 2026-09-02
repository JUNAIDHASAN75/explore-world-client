<script setup>
import { onMounted } from 'vue'
import Navbar from './shared/Navbar.vue'
import Footer from './shared/Footer.vue'
import { useThemeStore } from './stores/themeStore.js'

const themeStore = useThemeStore()

onMounted(() => {
  // Initialize theme on mount
  document.documentElement.setAttribute('data-theme', themeStore.theme)
})
</script>

<template>
  <div :data-theme="themeStore.theme" class="app-wrapper">
    <!-- Global Decorative Background Elements -->
    <div class="global-background" aria-hidden="true">
      <div class="floating-shape shape-1" title="orb-1"></div>
      <div class="floating-shape shape-2" title="orb-2"></div>
      <div class="floating-shape shape-3" title="orb-3"></div>
      <div class="culture-shape" title="culture motif"></div>
      <div class="destiny-shape" title="destiny symbol"></div>
      <div class="pattern-overlay"></div>
    </div>
    
    <Navbar />
    <main>
      <keep-alive include="Home">
        <router-view />
      </keep-alive>
    </main>
    <Footer />
  </div>
</template>

<style>
/* Global Theme Variables */
:root {
  scroll-behavior: smooth;
}

:root[data-theme="day"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-card: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border-color: #e2e8f0;
  --shadow: rgba(0, 0, 0, 0.1);
  --banner-bg: #ffffff;
}

:root[data-theme="night"] {
  --bg-primary: #070e21;
  --bg-secondary: #0a1128;
  --bg-card: #0a1128;
  --text-primary: #e2e8f0;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  --border-color: #1a2744;
  --shadow: rgba(0, 0, 0, 0.3);
  --banner-bg: #070e21;
}

/* Apply theme colors globally */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Global Z-Index Hierarchy */
/* Layer 0: Background particles (0) */
/* Layer 1: Main content (1) */
/* Layer 2: Sticky elements (10-100) */
/* Layer 3: Dropdowns, tooltips (1000-5000) */
/* Layer 4: Modals, overlays (5000-9000) */
/* Layer 5: Photo galleries (9000-9500) */
/* Layer 6: Critical UI - Bottom Nav Bar (999999) - ALWAYS ON TOP */

main {
  background-color: transparent;
  min-height: 50vh;
  position: relative;
  z-index: 1;
}

/* Card styling for theme */
.card {
  background-color: var(--bg-card) !important;
  color: var(--text-primary) !important;
  border-color: var(--border-color) !important;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.card-title,
.card-text {
  color: var(--text-primary) !important;
}

.text-muted {
  color: var(--text-muted) !important;
}

/* Night mode specific overrides */
[data-theme="night"] .text-dark {
  color: var(--text-primary) !important;
}

[data-theme="night"] .bg-white {
  background-color: var(--bg-card) !important;
}

[data-theme="night"] .bg-light {
  background-color: var(--bg-secondary) !important;
}

/* Section headings */
[data-theme="night"] h1,
[data-theme="night"] h2,
[data-theme="night"] h3,
[data-theme="night"] h4,
[data-theme="night"] h5,
[data-theme="night"] h6 {
  color: var(--text-primary);
}

/* Links */
[data-theme="night"] a:not(.btn) {
  color: #60a5fa;
}

[data-theme="night"] a:not(.btn):hover {
  color: #93c5fd;
}

/* See all links and similar */
[data-theme="night"] .see-all-link {
  color: #60a5fa !important;
}

[data-theme="night"] .see-all-link:hover {
  color: #93c5fd !important;
}

/* Container backgrounds */
[data-theme="night"] .container {
  color: var(--text-primary);
}

/* Swiper navigation buttons */
[data-theme="night"] .custom-swiper-btn {
  background: #0a1128 !important;
  border-color: #1a2744 !important;
  color: #e2e8f0 !important;
}

[data-theme="night"] .custom-swiper-btn:hover {
  background: #60a5fa !important;
  color: #070e21 !important;
}

/* Modal and popover styling */
[data-theme="night"] .modal-content {
  background-color: #0a1128;
  color: var(--text-primary);
  border-color: #1a2744;
}

[data-theme="night"] .modal-header,
[data-theme="night"] .modal-footer {
  border-color: #1a2744;
}

/* Form controls */
[data-theme="night"] .form-control,
[data-theme="night"] .form-select {
  background-color: #0a1128;
  border-color: #1a2744;
  color: var(--text-primary);
}

[data-theme="night"] .form-control:focus,
[data-theme="night"] .form-select:focus {
  background-color: #070e21;
  border-color: #60a5fa;
  color: var(--text-primary);
}

[data-theme="night"] .form-control::placeholder {
  color: #64748b;
}

/* Buttons */
[data-theme="night"] .btn-light {
  background-color: #0a1128;
  border-color: #1a2744;
  color: var(--text-primary);
}

[data-theme="night"] .btn-light:hover {
  background-color: #1a2744;
  border-color: #1a2744;
}

/* Tables */
[data-theme="night"] .table {
  color: var(--text-primary);
  border-color: #1a2744;
}

[data-theme="night"] .table thead th {
  background-color: #0a1128;
  border-color: #1a2744;
}

[data-theme="night"] .table tbody tr {
  border-color: #1a2744;
}

[data-theme="night"] .table tbody tr:hover {
  background-color: #0a1128;
}

/* ========== GLOBAL PARTICLE BACKGROUND ========== */
.app-wrapper {
  position: relative;
  min-height: 100vh;
  background-color: var(--bg-primary);
  transition: background-color 0.3s ease;
}

/* Global Decorative Background Elements */
.global-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  contain: paint;
}

/* Ensure content appears above background with proper stacking */
.app-wrapper > .navbar {
  z-index: 10000;
}

.app-wrapper > main {
  position: relative;
  z-index: 1;
}

.app-wrapper > :not(.global-background) {
  position: relative;
}

/* Animation keyframes */
@keyframes float {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(0, -20px, 0) rotate(5deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1) translate3d(0, 0, 0);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.1) translate3d(0, 0, 0);
    opacity: 0.6;
  }
}

/* Floating Shapes */
.floating-shape {
  position: absolute;
  border-radius: 20px;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  top: 15%;
  left: 10%;
  animation-delay: 0s;
  transform: rotate(45deg);
}

.shape-2 {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.15), rgba(0, 242, 254, 0.15));
  top: 60%;
  right: 15%;
  animation-delay: 1.5s;
  border-radius: 50%;
}

.shape-3 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1));
  bottom: 20%;
  left: 5%;
  animation-delay: 3s;
}

/* Cultural motif (textile / folk pattern) */
.culture-shape {
  position: absolute;
  width: 140px;
  height: 140px;
  top: 12%;
  right: 12%;
  border-radius: 18px;
  background: repeating-linear-gradient(45deg,
    rgba(255,122,0,0.06) 0 6px,
    rgba(118,75,162,0.06) 6px 12px);
  box-shadow: 0 10px 30px rgba(102,126,234,0.06);
  transform: rotate(12deg);
  filter: drop-shadow(0 8px 20px rgba(118,75,162,0.06));
  animation: float 7s ease-in-out infinite;
}

.culture-shape::before {
  content: '';
  position: absolute;
  inset: 16px;
  border-radius: 10px;
  background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0 6px, transparent 7px),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.35) 0 4px, transparent 5px);
  opacity: 0.9;
}

/* Destiny symbol: star / compass */
.destiny-shape {
  position: absolute;
  width: 80px;
  height: 80px;
  bottom: 18%;
  right: 20%;
  background: radial-gradient(circle at 30% 30%, #fff7ed 0%, #ffb88c 50%, #ff7a00 100%);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  box-shadow: 0 10px 28px rgba(255,122,0,0.18);
  transform: rotate(-8deg);
  animation: pulse 6s ease-in-out infinite;
}

/* Pattern Overlay */
.pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(240, 147, 251, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(79, 172, 254, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .culture-shape { width: 110px; height: 110px; right: 8%; top: 10%; }  .destiny-shape { width: 60px; height: 60px; right: 14%; bottom: 16%; }
  .floating-shape { opacity: 0.3; }
  
  /* Ensure mobile bottom bar is always visible on top */
  body {
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
  /* Reduce overall vertical spacing on mobile for Home sections */
  .container { padding-left: 12px; padding-right: 12px; }
  /* Tighter section paddings and margins for mobile readability */
  section[class*="py-"] { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
  .py-4, .py-5 { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
  .mt-5 { margin-top: 0.6rem !important; }
  .mb-3 { margin-bottom: 0.5rem !important; }
  /* Specific Home components */
  .banner-section { padding: 8px 12px 16px !important; min-height: auto !important; }
  .popular-hotels, .popular-destinations { margin-bottom: 10px !important; padding-bottom: 6px !important; }
  .popular-hotels .container, .popular-destinations .container { max-width: 100% !important; }
  .popular-swiper-wrapper { margin-top: 6px !important; }
  /* Reduce card bottom spacing inside swipers */
  .swiper-slide .hotel-card, .swiper-slide .destination-card { padding-bottom: 6px !important; }
  /* Reduce banner title/subtitle spacing */
  .banner-title { font-size: 2rem !important; }
  .banner-subtitle { font-size: 0.95rem !important; }
}
</style>
