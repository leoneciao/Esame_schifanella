<script>
import { useEventStore } from '../stores/events'
import EventVisual from '../components/EventVisual.vue'
import BookingModal from '../components/BookingModal.vue'

export default {
  name: 'EventDetailView',
  components: { EventVisual, BookingModal },
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      store: useEventStore(),
      showConfirm: false,
      previousTitle: document.title
    }
  },
  computed: {
    event() {
      return this.store.eventById(this.id)
    },
    isWaitingForData() {
      return this.store.loading || (!this.store.events.length && !this.store.error)
    },
    formattedDate() {
      if (!this.event?.date) return ''
      return new Intl.DateTimeFormat('it-IT', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(new Date(`${this.event.date}T12:00:00`))
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        // Se si passa direttamente da un dettaglio a un altro, chiudiamo eventuali modal aperti.
        this.showConfirm = false
      }
    }
  },
  methods: {
    prenotaEvento() {
      if (!this.event) return
      this.store.addBooking({
        eventId: this.event.id,
        eventTitle: this.event.title,
        date: this.event.date,
        seats: 1
      })
      this.showConfirm = true
    },
    closeConfirm() {
      this.showConfirm = false
    }
  },
  mounted() {
    if (this.event) document.title = `${this.event.title} — Fuori Programma`
  },
  updated() {
    // Utile quando i dati arrivano dopo il primo render asincrono.
    if (this.event) document.title = `${this.event.title} — Fuori Programma`
  },
  unmounted() {
    document.title = this.previousTitle
  }
}
</script>

<template>
  <div class="container py-4 py-md-5">
    <div v-if="store.error" class="surface state-panel" role="alert">
      {{ store.error }}
    </div>

    <div v-else-if="isWaitingForData" class="surface state-panel" aria-live="polite">
      Caricamento evento…
    </div>

    <template v-else-if="event">
      <PageHeader :eyebrow="event.category">{{ event.title }}</PageHeader>

      <div class="row g-4 align-items-stretch">
        <div class="col-12 col-lg-7">
          <EventVisual :event="event" large />
        </div>

        <div class="col-12 col-lg-5">
          <section class="surface p-4 h-100 d-flex flex-column detail-panel">
            <p class="eyebrow mb-2">Quando e dove</p>
            <p class="display-font detail-date mb-2">{{ formattedDate }}</p>
            <p class="event-location mb-4">{{ event.location }}</p>

            <p class="detail-copy mb-4">{{ event.description }}</p>

            <div class="d-flex flex-wrap gap-2 mt-auto">
              <button type="button" class="btn-signal" @click="prenotaEvento">+ Prenota</button>
              <router-link :to="{ name: 'home' }" class="btn-signal-outline">← Eventi</router-link>
            </div>
          </section>
        </div>
      </div>

      <BookingModal
        v-if="showConfirm"
        title="Prenotazione aggiunta"
        :message="`Hai aggiunto un posto per ${event.title}.`"
        @close="closeConfirm"
      />
    </template>

    <div v-else class="surface state-panel">
      <p class="display-font h4 mb-2">Evento non trovato</p>
      <p class="mb-3">L'evento richiesto non è presente nel calendario.</p>
      <router-link :to="{ name: 'home' }" class="btn-signal-outline">← Torna agli eventi</router-link>
    </div>
  </div>
</template>
