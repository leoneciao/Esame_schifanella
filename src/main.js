import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PageHeader from './components/PageHeader.vue'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Registrazione globale: PageHeader è condiviso da tutte le viste principali.
// Gli altri componenti restano registrati localmente dove servono.
app.component('PageHeader', PageHeader)

app.mount('#app')
