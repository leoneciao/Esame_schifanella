<template>
  <div class="container py-5 text-center">
    <div class="surface p-4 p-md-5 mx-auto not-found-panel">
      <p class="eyebrow">Errore 404</p>
      <h1 class="hero-title">Segnale perso</h1>
      <p class="event-location mb-4">Questa pagina non esiste.</p>
      <router-link :to="{ name: 'home' }" class="btn-signal">Torna alla home</router-link>
    </div>
  </div>
</template>
