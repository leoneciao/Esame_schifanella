<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white site-navbar" aria-label="Navigazione principale">
    <div class="container">
      <router-link class="navbar-brand display-font" :to="{ name: 'home' }">
        <span>Fuori</span><span class="text-accent">Programma</span>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMain"
        aria-controls="navMain"
        aria-expanded="false"
        aria-label="Apri o chiudi il menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav ms-auto gap-md-3 text-uppercase">
          <li class="nav-item"><router-link class="nav-link site-nav-link" :to="{ name: 'home' }">Eventi</router-link></li>
          <li class="nav-item"><router-link class="nav-link site-nav-link" :to="{ name: 'search' }">Cerca</router-link></li>
          <li class="nav-item"><router-link class="nav-link site-nav-link" :to="{ name: 'add-event' }">Aggiungi</router-link></li>
          <li class="nav-item"><router-link class="nav-link site-nav-link" :to="{ name: 'my-bookings' }">Prenotazioni</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
