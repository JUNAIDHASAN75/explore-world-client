<template>
  <teleport to="body">
    <div v-if="isVisible" class="photo-gallery-overlay" @click="closeGallery">
      <div class="photo-gallery-container" @click.stop>
      <!-- Header -->
      <div class="gallery-header">
        <h3>{{ title }}</h3>
        <button class="gallery-close-btn" @click="closeGallery" aria-label="Close gallery">
          <i class="bi bi-x-lg" aria-hidden="true"></i>
        </button>
      </div>

      <!-- Tab Navigation -->
      <div class="gallery-tabs">
        <button 
          v-for="tab in imageTabs" 
          :key="tab.id"
          :class="['gallery-tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.name }} ({{ tab.images.length }})
        </button>
      </div>

      <!-- Photo Grid -->
      <div class="gallery-grid">
        <div 
          v-for="(image, idx) in currentImages" 
          :key="idx"
          class="gallery-item"
          @click="openImage(idx)"
        >
          <img :src="image" :alt="`Photo ${idx + 1}`" />
        </div>
      </div>
      </div>

      <!-- Lightbox for individual image -->
      <div v-if="selectedImageIndex !== -1" class="lightbox" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" @click="closeLightbox" aria-label="Close image">
            <i class="bi bi-x-lg" aria-hidden="true"></i>
          </button>
          <img :src="currentImages[selectedImageIndex]" :alt="`Photo ${selectedImageIndex + 1}`" />

          <!-- Navigation -->
          <button 
            v-if="selectedImageIndex > 0"
            class="lightbox-nav prev" 
            @click="selectedImageIndex--"
            aria-label="Previous image"
          >
            <i class="bi bi-chevron-left" aria-hidden="true"></i>
          </button>
          <button 
            v-if="selectedImageIndex < currentImages.length - 1"
            class="lightbox-nav next" 
            @click="selectedImageIndex++"
            aria-label="Next image"
          >
            <i class="bi bi-chevron-right" aria-hidden="true"></i>
          </button>

          <!-- Counter -->
          <div class="lightbox-counter">
            {{ selectedImageIndex + 1 }} / {{ currentImages.length }}
          </div>

          <!-- Thumbnails -->
          <div class="lightbox-thumbs" v-if="currentImages && currentImages.length > 1">
            <div 
              v-for="(thumb, tIdx) in currentImages" 
              :key="tIdx"
              :class="['thumb', { active: tIdx === selectedImageIndex }]
              "
              @click="selectedImageIndex = tIdx"
            >
              <img :src="thumb" :alt="`Thumb ${tIdx + 1}`" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  isVisible: Boolean,
  title: String,
  imageTabs: Array,
  // optional starting index for the lightbox
  startIndex: {
    type: Number,
    default: -1
  }
})

const emit = defineEmits(['close'])

const activeTab = ref(props.imageTabs && props.imageTabs.length ? props.imageTabs[0].id : 'all')
// Do not auto-open the lightbox when the gallery becomes visible.
// Always start with no selected image; open lightbox only on user click.
const selectedImageIndex = ref(-1)

const currentImages = computed(() => {
  const tab = props.imageTabs?.find(t => t.id === activeTab.value)
  return tab ? tab.images : []
})

function closeGallery() {
  selectedImageIndex.value = -1
  emit('close')
}

function openImage(index) {
  // Open component's internal lightbox at the clicked image
  selectedImageIndex.value = index
}

function closeLightbox() {
  selectedImageIndex.value = -1
}

// Set default tab when gallery opens and manage keyboard + body scroll
function handleKeydown(event) {
  if (!props.isVisible) return

  if (event.key === 'Escape') {
    if (selectedImageIndex.value !== -1) {
      closeLightbox()
    } else {
      closeGallery()
    }
  } else if (selectedImageIndex.value !== -1) {
    if (event.key === 'ArrowLeft' && selectedImageIndex.value > 0) {
      selectedImageIndex.value--
    } else if (event.key === 'ArrowRight' && selectedImageIndex.value < currentImages.value.length - 1) {
      selectedImageIndex.value++
    }
  }
}

let keyListenerAdded = false

watch(() => props.isVisible, (visible) => {
  if (visible) {
    // default tab
    if (props.imageTabs?.length > 0) activeTab.value = props.imageTabs[0].id

    // NOTE: we intentionally do NOT auto-open the lightbox even if parent
    // passed a startIndex. This keeps the gallery visible first; the
    // lightbox opens when the user clicks an image.

    // lock body scroll
    document.body.style.overflow = 'hidden'

    // add key listener once
    if (!keyListenerAdded) {
      document.addEventListener('keydown', handleKeydown)
      keyListenerAdded = true
    }
  } else {
    // restore body scroll
    document.body.style.overflow = ''

    // remove key listener
    if (keyListenerAdded) {
      document.removeEventListener('keydown', handleKeydown)
      keyListenerAdded = false
    }
  }
})

// clean up on unmount in case parent forgets to close
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  if (keyListenerAdded) document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.photo-gallery-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 17, 40, 0.85);
  backdrop-filter: blur(12px);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.photo-gallery-container {
  width: 95vw;
  height: 90vh;
  background: #0a1128;
  border-radius: 16px !important;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
}

.gallery-header h3 {
  margin: 0;
  color: #e2e8f0;
  font-size: 1.5rem;
  font-weight: 600;
}

.gallery-close-btn {
  background: #ff7a00;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-bottom: 6px; */
}

.gallery-close-btn:hover {
  background: #e66a00;
  transform: scale(1.1);
}

.gallery-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 32px;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.gallery-tab-btn {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-tab-btn.active {
  background: #ff7a00;
  color: white;
  border-color: #ff7a00;
  box-shadow: 0 4px 15px rgba(255, 122, 0, 0.3);
}

.gallery-tab-btn:hover:not(.active) {
  background: #dee2e6;
}

.gallery-grid {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.gallery-item {
  overflow: hidden;
  border-radius: 12px !important;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: #111;
  position: relative;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.gallery-item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}

.gallery-item:hover::after {
  opacity: 0;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.98);
  z-index: 9001; /* above gallery overlay */
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.lightbox-content img {
  max-width: 90%;
  max-height: calc(100vh - 250px);
  object-fit: contain;
  border-radius: 12px !important;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
}

.lightbox-thumbs {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  max-width: 90vw;
  z-index: 9002;
  scrollbar-width: none; /* Hide scrollbar for clean look */
}

.lightbox-thumbs::-webkit-scrollbar {
  display: none;
}

.lightbox-thumbs .thumb {
  width: 80px;
  height: 54px;
  flex: 0 0 auto;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2.5px solid transparent; /* slightly thicker for better visibility */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.lightbox-thumbs .thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lightbox-thumbs .thumb:hover {
  transform: translateY(-5px);
}

.lightbox-thumbs .thumb.active {
  border-color: #ff7a00;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 122, 0, 0.4);
}

.lightbox-close {
  position: fixed;
  top: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 9002;
}

.lightbox-close:hover {
  background: #ff7a00;
  border-color: #ff7a00;
  transform: rotate(90deg) scale(1.1);
}

.lightbox-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 9002;
}

.lightbox-nav:hover {
  background: #ff7a00;
  border-color: #ff7a00;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 30px rgba(255, 122, 0, 0.4);
}

.lightbox-nav.prev {
  left: 40px;
}

.lightbox-nav.next {
  right: 40px;
}

.lightbox-counter {
  position: fixed;
  top: 40px;
  left: 40px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 9002;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .photo-gallery-container {
    width: 98vw;
    height: 95vh;
    border-radius: 8px;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    padding: 15px;
  }
  
  .gallery-tabs {
    flex-direction: column;
    gap: 5px;
  }
  
  .gallery-tab-btn {
    width: 100%;
    text-align: center;
  }
  
  .lightbox-nav {
    width: 40px;
    height: 40px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 8px !important;
  }
  
  .lightbox-nav.prev {
    left: -50px;
  }
  
  .lightbox-nav.next {
    right: -50px;
  }
}

@media (max-width: 576px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .lightbox-nav.prev {
    left: 10px;
  }
  
  .lightbox-nav.next {
    right: 10px;
  }
}
</style>