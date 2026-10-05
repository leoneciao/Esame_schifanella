<script setup>
import { computed } from 'vue'
import EventVisual from './EventVisual.vue'

const props = defineProps({
  event: { type: Object, required: true }
})
const emit = defineEmits(['prenota'])

const formattedDate = computed(() => {
  if (!props.event.date) return ''
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${props.event.date}T12:00:00`))
})
</script>

<template>
  <article class="surface p-3 h-100 ticket-card d-flex flex-column">
    <EventVisual :event="event" />

    <span class="badge rounded-pill mb-2 text-uppercase event-badge align-self-start">
      {{ event.category }}
    </span>
    <h2 class="h5 display-font mb-1">{{ event.title }}</h2>
    <p class="text-accent small mb-1">{{ formattedDate }}</p>
    <p class="mb-3 event-location">{{ event.location }}</p>

    <div class="d-flex flex-wrap gap-2 mt-auto">
      <router-link :to="{ name: 'event-detail', params: { id: event.id } }" class="btn-signal-outline btn-sm">
        Dettagli
      </router-link>
      <button type="button" class="btn-signal btn-sm" @click="emit('prenota', event)">+ Prenota</button>
    </div>
  </article>
</template>

<style scoped>
.ticket-card { position: relative; }
</style>
