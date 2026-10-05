<script setup>
defineProps({
  title: { type: String, default: 'Conferma' },
  message: { type: String, default: '' }
})
const emit = defineEmits(['close'])
</script>

<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true" style="background: rgba(0,0,0,0.6)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content surface">
        <div class="modal-header" style="border-color: var(--color-border)">
          <h5 class="modal-title display-font">{{ title }}</h5>
          <button type="button" class="btn-close" aria-label="Chiudi" @click="emit('close')"></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">{{ message }}</p>
        </div>
        <div class="modal-footer" style="border-color: var(--color-border)">
          <button class="btn-signal" @click="emit('close')">Ok, capito</button>
        </div>
      </div>
    </div>
  </div>
</template>
