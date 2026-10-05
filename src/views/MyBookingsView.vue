<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventStore } from '../stores/events'

const store = useEventStore()
const { bookings, totalBookings } = storeToRefs(store)

const sortedBookings = computed(() => [...bookings.value].sort((a, b) => a.date.localeCompare(b.date)))
const totalSeats = computed(() => bookings.value.reduce((sum, booking) => sum + booking.seats, 0))

function remove(id) {
  store.removeBooking(id)
}
</script>

<template>
  <div class="container py-4 py-md-5">
    <PageHeader eyebrow="Il tuo calendario">
      Prenotazioni
      <template #actions>
        <router-link :to="{ name: 'search' }" class="btn-signal-outline">+ Cerca eventi</router-link>
      </template>
    </PageHeader>

    <div v-if="sortedBookings.length">
      <div class="row g-2 mb-4">
        <div class="col-6 col-md-3">
          <div class="surface p-3 h-100">
            <p class="eyebrow mb-1">Eventi</p>
            <p class="display-font booking-stat mb-0">{{ totalBookings }}</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="surface p-3 h-100">
            <p class="eyebrow mb-1">Posti</p>
            <p class="display-font booking-stat mb-0">{{ totalSeats }}</p>
          </div>
        </div>
      </div>

      <div class="surface p-3 table-responsive d-none d-md-block">
        <table class="table align-middle mb-0">
          <thead>
            <tr class="text-uppercase small booking-table-head">
              <th>Evento</th>
              <th>Data</th>
              <th>Posti</th>
              <th><span class="visually-hidden">Azioni</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in sortedBookings" :key="booking.id">
              <td>
                <router-link
                  :to="{ name: 'event-detail', params: { id: booking.eventId } }"
                  class="display-font booking-link"
                >
                  {{ booking.eventTitle }}
                </router-link>
              </td>
              <td>{{ booking.date }}</td>
              <td>{{ booking.seats }}</td>
              <td class="text-end">
                <button type="button" class="btn-signal-outline btn-sm" @click="remove(booking.id)">Rimuovi</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-md-none d-grid gap-2">
        <article v-for="booking in sortedBookings" :key="booking.id" class="surface p-3 booking-mobile-card">
          <p class="eyebrow mb-1">{{ booking.date }}</p>
          <router-link
            :to="{ name: 'event-detail', params: { id: booking.eventId } }"
            class="display-font booking-link d-inline-block mb-2"
          >
            {{ booking.eventTitle }}
          </router-link>
          <div class="d-flex justify-content-between align-items-center gap-3">
            <span class="small">Posti: <strong>{{ booking.seats }}</strong></span>
            <button type="button" class="btn-signal-outline btn-sm" @click="remove(booking.id)">Rimuovi</button>
          </div>
        </article>
      </div>
    </div>

    <div v-else class="surface state-panel">
      <p class="display-font h4 mb-2">Calendario vuoto</p>
      <p class="mb-3">Non hai ancora prenotazioni. Cerca un evento e aggiungilo al tuo calendario.</p>
      <router-link :to="{ name: 'search' }" class="btn-signal">Cerca eventi</router-link>
    </div>
  </div>
</template>
