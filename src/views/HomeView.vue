<script>
import { useEventStore } from '../stores/events'
import EventCard from '../components/EventCard.vue'
import BookingModal from '../components/BookingModal.vue'

export default {
  name: 'HomeView',
  components: { EventCard, BookingModal },
  data() {
    return {
      store: useEventStore(),
      showConfirm: false,
      bookedTitle: ''
    }
  },
  computed: {
    events() {
      return [...this.store.events].sort((a, b) => a.date.localeCompare(b.date))
    },
    totalBookings() {
      return this.store.totalBookings
    }
  },
  methods: {
    prenotaEvento(event) {
      this.store.addBooking({
        eventId: event.id,
        eventTitle: event.title,
        date: event.date,
        seats: 1
      })
      this.bookedTitle = event.title
      this.showConfirm = true
    },
    closeConfirm() {
      this.showConfirm = false
    }
  },
  created() {
    // Hook Options API: lo store è già disponibile quando nasce la vista.
    this.bookedTitle = ''
  }
}
</script>

<template>
  <div class="container py-4 py-md-5">
    <PageHeader eyebrow="Fuori Programma">
      Eventi in programma
      <template #actions>
        <router-link :to="{ name: 'my-bookings' }" class="btn-signal-outline">
          Prenotazioni <span class="ms-1">{{ totalBookings }}</span>
        </router-link>
      </template>
    </PageHeader>

    <p v-show="events.length" class="section-intro mb-4">
      Musica, teatro e podcast dal vivo. Apri un evento per i dettagli oppure prenota direttamente dalla card.
    </p>

    <div v-if="store.error" class="surface state-panel" role="alert">
      {{ store.error }}
    </div>
    <div v-else-if="store.loading" class="surface state-panel" aria-live="polite">
      Caricamento eventi…
    </div>
    <div v-else-if="!events.length" class="surface state-panel">
      Nessun evento disponibile al momento.
    </div>
    <div v-else class="row g-3 g-lg-4">
      <div class="col-12 col-md-6 col-lg-4" v-for="ev in events" :key="ev.id">
        <EventCard :event="ev" @prenota="prenotaEvento" />
      </div>
    </div>

    <BookingModal
      v-if="showConfirm"
      title="Prenotazione aggiunta"
      :message="`Hai aggiunto un posto per ${bookedTitle}.`"
      @close="closeConfirm"
    />
  </div>
</template>
