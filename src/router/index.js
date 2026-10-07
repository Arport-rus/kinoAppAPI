import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/views/Home.vue'
import AboutCard from '@/views/AboutCard.vue'

const routes = [
  { path: '/', component: Home },

  { path: '/about/:id', component: AboutCard, props:true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router