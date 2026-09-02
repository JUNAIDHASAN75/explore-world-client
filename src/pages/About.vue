<template>
  <div class="about-page">
    <div class="container mt-4">
      <h1>About</h1>
      <p>This is the About page (pages/About.vue recreated).</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 40px 0;
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .about-page {
  background: #070e21;
  color: #e2e8f0;
}

[data-theme="night"] h1 {
  color: #e2e8f0;
}

[data-theme="night"] p {
  color: #94a3b8;
}
</style>
