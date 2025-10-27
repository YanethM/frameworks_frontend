import CharactersView from '@/views/CharactersView.vue'
import EpisodesView from '@/views/EpisodesView.vue'
import HomeView from '@/views/HomeView.vue'
import LocationsView from '@/views/LocationsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersView,
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: EpisodesView,
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationsView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  //Scroll al top al cambiar de ruta
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
