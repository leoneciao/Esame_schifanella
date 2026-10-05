<script setup>
defineProps({
  eyebrow: { type: String, default: '' }
})
</script>

<template>
  <div class="page-header d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3 pb-3 pb-md-4">
    <div>
      <p v-if="eyebrow" class="eyebrow mb-1">{{ eyebrow }}</p>
      <h1 class="hero-title mb-0">
        <!-- slot di default: titolo della pagina -->
        <slot>Sezione</slot>
      </h1>
    </div>
    <div>
      <!-- named slot: azione a destra (bottone, filtro, ecc.) -->
      <slot name="actions"></slot>
    </div>
  </div>
</template>
