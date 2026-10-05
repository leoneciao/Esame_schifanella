<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventStore } from '../stores/events'
import EventCard from '../components/EventCard.vue'
import BookingModal from '../components/BookingModal.vue'

const store = useEventStore()
const { events, categories, loading, error } = storeToRefs(store)

const query = ref('')
const category = ref('')
const resultsMessage = ref('')
const showConfirm = ref(false)
const bookedTitle = ref('')
const previousTitle = document.title

onMounted(() => {
  document.title = 'Cerca eventi — Fuori Programma'
})

onUnmounted(() => {
  document.title = previousTitle
})

const hasFilters = computed(() => Boolean(query.value.trim() || category.value))

const filteredEvents = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase()

  return events.value.filter((event) => {
    const searchableText = `${event.title} ${event.location} ${event.description || ''}`.toLowerCase()
    const matchText = normalizedQuery ? searchableText.includes(normalizedQuery) : true
    const matchCategory = category.value ? event.category === category.value : true
    return matchText && matchCategory
  })
})

watch(
  filteredEvents,
  (newVal) => {
    resultsMessage.value =
      newVal.length === 0 ? 'Nessun evento corrisponde alla ricerca.' : `${newVal.length} eventi trovati.`
  },
  { immediate: true }
)

function resetFilters() {
  query.value = ''
  category.value = ''
}

function prenotaEvento(event) {
  store.addBooking({ eventId: event.id, eventTitle: event.title, date: event.date, seats: 1 })
  bookedTitle.value = event.title
  showConfirm.value = true
}
</script>

<template>
  <div class="container py-4 py-md-5">
    <PageHeader eyebrow="Trova il tuo evento">
      Cerca
      <template #actions>
        <router-link :to="{ name: 'add-event' }" class="btn-signal-outline">+ Nuovo evento</router-link>
      </template>
    </PageHeader>

    <section class="surface p-3 p-md-4 mb-4" aria-label="Filtri di ricerca">
      <div class="row g-2 g-md-3 align-items-end">
        <div class="col-12 col-md-6">
          <label for="search-query" class="form-label">Titolo, luogo o descrizione</label>
          <input
            id="search-query"
            v-model="query"
            type="search"
            class="form-control"
            placeholder="Es. Mondovì, teatro…"
            @keyup.esc="resetFilters"
          />
        </div>
        <div class="col-12 col-md-4">
          <label for="search-category" class="form-label">Categoria</label>
          <select id="search-category" v-model="category" class="form-select">
            <option value="">Tutte le categorie</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="col-12 col-md-2 d-grid">
          <button v-show="hasFilters" type="button" class="btn-signal-outline justify-content-center" @click="resetFilters">
            Azzera
          </button>
        </div>
      </div>
    </section>

    <p class="small mb-3 results-message" aria-live="polite">{{ resultsMessage }}</p>

    <div v-if="error" class="surface state-panel" role="alert">{{ error }}</div>
    <div v-else-if="loading" class="surface state-panel">Caricamento eventi…</div>
    <div v-else-if="!filteredEvents.length" class="surface state-panel">
      Prova a cambiare parola chiave o categoria.
    </div>
    <div v-else class="row g-3 g-lg-4">
      <div class="col-12 col-md-6 col-lg-4" v-for="ev in filteredEvents" :key="ev.id">
        <EventCard :event="ev" @prenota="prenotaEvento" />
      </div>
    </div>

    <BookingModal
      v-if="showConfirm"
      title="Prenotazione aggiunta"
      :message="`Hai aggiunto un posto per ${bookedTitle}.`"
      @close="showConfirm = false"
    />
  </div>
</template>
