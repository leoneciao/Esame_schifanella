<script setup>
import NavBar from './components/NavBar.vue'
import { useEventStore } from './stores/events'

const store = useEventStore()

// Avviamo il caricamento appena nasce l'app: in questo modo le viste possono
// usare subito loading/error dello store senza mostrare falsi "evento non trovato".
store.fetchEvents()
</script>

<template>
  <NavBar />
  <main>
    <router-view />
  </main>

  <footer class="surface mx-3 mx-md-5 mb-4 mt-5 p-4 text-center">
    <p class="display-font footer-brand mb-1">Fuori Programma</p>
    <p class="eyebrow mb-0">Progetto d'esame &middot; 2026 &middot; Morandini - Smoc</p>
  </footer>
</template>
