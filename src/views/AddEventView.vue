<script setup>
import { reactive, ref, watch, computed } from 'vue'
import { useEventStore } from '../stores/events'
import BookingModal from '../components/BookingModal.vue'
import EventVisual from '../components/EventVisual.vue'

const store = useEventStore()

const form = reactive({
  title: '',
  category: 'musica',
  date: '',
  location: '',
  description: '',
  image: ''
})

const isValid = ref(false)
const showConfirm = ref(false)

const previewEvent = computed(() => ({
  title: form.title.trim() || 'Titolo evento',
  category: form.category,
  date: form.date,
  location: form.location.trim() || 'Location da definire',
  description: form.description.trim() || 'La descrizione apparirà qui mentre compili il form.',
  image: form.image.trim()
}))

watch(
  form,
  (val) => {
    isValid.value = Boolean(val.title.trim() && val.date && val.location.trim())
  },
  { deep: true, immediate: true }
)

function submitEvent() {
  if (!isValid.value) return
  store.addEvent({ ...form })
  showConfirm.value = true
}

function closeConfirmAndReset() {
  showConfirm.value = false
  form.title = ''
  form.category = 'musica'
  form.date = ''
  form.location = ''
  form.description = ''
  form.image = ''
}
</script>

<template>
  <div class="container py-4 py-md-5">
    <PageHeader eyebrow="Proponi una data">Aggiungi evento</PageHeader>

    <div class="row g-4 g-lg-5 align-items-start">
      <form class="col-12 col-lg-8" @submit.prevent="submitEvent">
        <div class="surface p-3 p-md-4">
          <div class="row g-3">
            <div class="col-12">
              <label for="event-title" class="form-label">Titolo</label>
              <input id="event-title" v-model="form.title" type="text" class="form-control" required />
            </div>

            <div class="col-12 col-md-6">
              <label for="event-category" class="form-label">Categoria</label>
              <select id="event-category" v-model="form.category" class="form-select">
                <option value="musica">Musica</option>
                <option value="teatro">Teatro</option>
                <option value="podcast">Podcast</option>
              </select>
            </div>

            <div class="col-12 col-md-6">
              <label for="event-date" class="form-label">Data</label>
              <input id="event-date" v-model="form.date" type="date" class="form-control" required />
            </div>

            <div class="col-12">
              <label for="event-location" class="form-label">Location</label>
              <input id="event-location" v-model="form.location" type="text" class="form-control" required />
            </div>

            <div class="col-12">
              <label for="event-image" class="form-label">Immagine evento (URL, opzionale)</label>
              <input id="event-image" v-model="form.image" type="url" class="form-control" placeholder="https://..." />
              <div class="form-text">Se lasci vuoto, verrà mostrato il pattern grafico della categoria.</div>
            </div>

            <div class="col-12">
              <label for="event-description" class="form-label">Descrizione</label>
              <textarea id="event-description" v-model="form.description" class="form-control" rows="4"></textarea>
            </div>

            <div class="col-12 d-flex flex-column flex-sm-row align-items-sm-center gap-2 gap-sm-3">
              <button type="submit" class="btn-signal" :disabled="!isValid">+ Salva evento</button>
              <span v-if="!isValid" class="small form-hint">
                Compila titolo, data e location per continuare.
              </span>
            </div>
          </div>
        </div>
      </form>

      <aside class="col-12 col-lg-4" aria-label="Anteprima evento">
        <div class="surface p-3 preview-card sticky-lg-top">
          <p class="eyebrow mb-2">Anteprima</p>
          <EventVisual :event="previewEvent" />
          <span class="badge rounded-pill event-badge text-uppercase mb-2">{{ previewEvent.category }}</span>
          <h2 class="h5 display-font mb-1">{{ previewEvent.title }}</h2>
          <p class="text-accent small mb-1">{{ previewEvent.date || 'Data da definire' }}</p>
          <p class="event-location mb-3">{{ previewEvent.location }}</p>
          <p class="small mb-0">{{ previewEvent.description }}</p>
        </div>
      </aside>
    </div>

    <BookingModal
      v-if="showConfirm"
      title="Evento pubblicato"
      message="Il tuo evento è stato aggiunto al calendario di Fuori Programma."
      @close="closeConfirmAndReset"
    />
  </div>
</template>
