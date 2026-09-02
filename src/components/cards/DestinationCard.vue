<template>
  <div class="destination-card" @click="onClick" role="button" tabindex="0">
    <div class="image-wrap">
        <img :src="image" :alt="name" loading="lazy" class="dest-img" />
        <div class="overlay">
          <h4 class="dest-name">{{ name }}</h4>
        </div>
      </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({ id: [String, Number], image: String, name: String })
const emit = defineEmits(['select'])
function onClick() {
  emit('select', { id: props.id, name: props.name })
}
</script>

<style scoped>
.destination-card {
  width: 100%;
  cursor: pointer;
  transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  transform: translate3d(0, 0, 0);
  contain: content;
}

.destination-card:focus,
.destination-card:hover {
  transform: translate3d(0, -8px, 0);
}

.destination-card {
  content-visibility: auto;
}

.image-wrap {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.32s ease;
  border: 2px solid transparent;
}

.destination-card:hover .image-wrap {
  box-shadow: 0 12px 32px rgba(255, 122, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 122, 0, 0.3);
}

[data-theme="night"] .image-wrap {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-color: rgba(45, 68, 112, 0.5);
}

[data-theme="night"] .destination-card:hover .image-wrap {
  box-shadow: 0 12px 32px rgba(96, 165, 250, 0.25), 0 8px 16px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(21, 33, 54, 0.8) !important;
}

.dest-img {
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.32s ease;
}

.destination-card:hover .dest-img {
  transform: scale(1.1) translate3d(0, 0, 0);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  transition: background 0.32s ease;
}

.destination-card:hover .overlay {
  background: linear-gradient(
    180deg,
    rgba(255, 122, 0, 0.2) 0%,
    rgba(255, 122, 0, 0.5) 50%,
    rgba(255, 122, 0, 0.8) 100%
  );
}

[data-theme="night"] .overlay {
  background: linear-gradient(
    180deg,
    rgba(14, 33, 72, 0.2) 0%,
    rgba(14, 33, 72, 0.5) 50%,
    rgba(14, 33, 72, 0.8) 100%
  );
}

[data-theme="night"] .destination-card:hover .overlay {
  background: rgba(13, 25, 49, 0.95) !important;
}

.dest-name {
  color: #fff;
  text-align: center;
  margin: 0;
  padding: 0.75rem 1rem;
  font-weight: 700;
  font-size: 1.35rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
  text-transform: capitalize;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.32s ease;
  position: relative;
  overflow: hidden;
}

.dest-name::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.destination-card:hover .dest-name::before {
  left: 100%;
}

.destination-card:hover .dest-name {
  background: rgba(255, 122, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translate3d(0, -4px, 0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

[data-theme="night"] .destination-card:hover .dest-name {
  background: rgba(13, 25, 49, 0.95) !important;
}
</style>
