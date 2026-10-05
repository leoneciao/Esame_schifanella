# Fuori Programma eventi-app

**Fuori Programma** è una Single Page Application dedicata alla scoperta, ricerca, pubblicazione e prenotazione di eventi locali.

Il progetto è stato realizzato con **Vue 3 + Vite** e integra **Vue Router**, **Pinia**, **Axios**, **Bootstrap 5**, HTML5 e CSS3. L'obiettivo è mantenere il codice semplice da leggere e da spiegare, ma allo stesso tempo mostrare in modo concreto gli argomenti richiesti dal corso.

## Cosa contiene

L'applicazione è organizzata come progetto Vue classico, con componenti riutilizzabili, viste separate, routing e stato globale.

Le viste principali sono:

- `HomeView.vue` — home con elenco eventi e accesso al dettaglio;
- `EventDetailView.vue` — dettaglio del singolo evento tramite route dinamica;
- `SearchView.vue` — ricerca e filtro degli eventi;
- `AddEventView.vue` — form per aggiungere un nuovo evento;
- `MyBookingsView.vue` — gestione delle prenotazioni;
- `NotFoundView.vue` — pagina 404.

I componenti principali sono:

- `EventCard.vue` — card riutilizzabile per gli eventi;
- `EventVisual.vue` — gestione di immagini e fallback grafici;
- `PageHeader.vue` — intestazione riutilizzabile con slot;
- `BookingModal.vue` — modal di conferma;
- `NavBar.vue` — navigazione principale responsive.

Lo stato globale è gestito con **Pinia** in `src/stores/events.js`. Lo store contiene eventi, prenotazioni, stato di caricamento ed eventuali errori, oltre alle action per caricare, aggiungere e prenotare eventi.

I dati iniziali vengono caricati da `public/events.json` tramite **Axios**. Le immagini locali si trovano in `public/img/`.

## Vue e routing

Nel progetto sono presenti sia **Options API** sia **Composition API**.

Le viste Home e Dettaglio usano principalmente Options API, mentre Cerca, Aggiungi e Prenotazioni usano Composition API con `<script setup>`.

Sono utilizzati i principali costrutti visti a lezione, tra cui:

- interpolation `{{ }}`;
- `v-bind`, `v-if`, `v-else`, `v-show`, `v-for`;
- `v-model`;
- eventi con `@click`, `@submit` e altri listener;
- props ed eventi con `$emit` / `defineEmits`;
- computed properties e watchers;
- lifecycle hooks;
- componenti locali e globali;
- slot di default e named slot;
- route nominate, route dinamiche, redirect, alias e pagina 404;
- struttura master/detail tra lista eventi e dettaglio.

Il router si trova in `src/router/index.js`.

## Responsive e Bootstrap

Il progetto è pensato in modo **mobile-first** e usa Bootstrap 5 per griglia, navbar, form, modal, tabelle e utility responsive.

Il layout cambia in base alla dimensione dello schermo:

- Home: 1 colonna su mobile, 2 su tablet, 3 su desktop;
- Dettaglio evento: una colonna su mobile e due colonne su desktop;
- Aggiungi evento: form e anteprima affiancati su desktop, impilati su mobile;
- Prenotazioni: card su smartphone e tabella da tablet in su;
- Navbar responsive con collapse sui dispositivi piccoli.

Le regole principali di stile e le media query sono in `src/assets/main.css`.

## Stile grafico

L'identità visiva usa principalmente **rosa, bianco e nero**, con card arrotondate, bordi sottili, bottoni pill e tipografia bold.

Il font principale previsto è **Cy Grotesk**. Essendo un font a pagamento, non viene incluso nel progetto. Se disponibile, i file `.woff2` possono essere inseriti in `src/assets/fonts/`.

In assenza di Cy Grotesk viene usato **Space Grotesk** tramite Google Fonts.

## Funzionalità principali

L'utente può:

- visualizzare gli eventi disponibili;
- aprire il dettaglio di un evento;
- cercare per titolo, luogo o descrizione;
- filtrare per categoria;
- aggiungere un nuovo evento tramite form;
- vedere un'anteprima dell'evento durante la compilazione;
- prenotare un evento;
- visualizzare e rimuovere le proprie prenotazioni.

Gli eventi aggiunti e le prenotazioni vengono mantenuti nello store durante la sessione, ma non vengono salvati dopo il refresh perché non è presente un backend reale.
