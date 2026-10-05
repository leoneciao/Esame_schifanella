import { defineStore } from 'pinia'
import axios from 'axios'

// Store Pinia — sostituisce Vuex (state/getters/actions, senza mutations separate).
// Simula il "database" dell'app come richiesto dalle specifiche.
export const useEventStore = defineStore('events', {
  state: () => ({
    events: [],
    bookings: [],
    loading: false,
    error: null
  }),

  getters: {
    categories: (state) => [...new Set(state.events.map((e) => e.category))],
    totalBookings: (state) => state.bookings.length,
    eventById: (state) => (id) => state.events.find((e) => String(e.id) === String(id)),
    bookingByEventId: (state) => (eventId) =>
      state.bookings.find((b) => String(b.eventId) === String(eventId))
  },

  actions: {
    // GET asincrona con axios verso un file JSON statico: per il progetto simula
    // una fonte dati esterna senza introdurre un backend non necessario.
    async fetchEvents() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/events.json')
        this.events = response.data
      } catch (err) {
        this.error = 'Impossibile caricare gli eventi.'
      } finally {
        this.loading = false
      }
    },

    addEvent(newEvent) {
      this.events.push({ id: Date.now(), ...newEvent })
    },

    addBooking(booking) {
      const seatsToAdd = booking.seats || 1
      const existing = this.bookingByEventId(booking.eventId)

      if (existing) {
        existing.seats += seatsToAdd
        return existing
      }

      const newBooking = { id: Date.now(), ...booking, seats: seatsToAdd }
      this.bookings.push(newBooking)
      return newBooking
    },

    removeBooking(id) {
      this.bookings = this.bookings.filter((b) => b.id !== id)
    }
  }
})
