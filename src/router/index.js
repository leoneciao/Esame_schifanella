import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventDetailView from '../views/EventDetailView.vue'
import SearchView from '../views/SearchView.vue'
import AddEventView from '../views/AddEventView.vue'
import MyBookingsView from '../views/MyBookingsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, alias: '/eventi' },
  {
    path: '/eventi/:id',
    name: 'event-detail',
    component: EventDetailView,
    props: true
  },
  { path: '/cerca', name: 'search', component: SearchView },
  { path: '/aggiungi', name: 'add-event', component: AddEventView },
  { path: '/prenotazioni', name: 'my-bookings', component: MyBookingsView },
  { path: '/booking', redirect: { name: 'my-bookings' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
