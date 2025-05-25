// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import home from '../halaman/home.vue'
import Login from '../halaman/Login.vue'
import NotFound from '../halaman/NotFound.vue'
import Pemesanan from '../halaman/Pemesanan.vue'
import Contact from '../halaman/Contact.vue'

const routes = [
  { path: '/', component: home },
  { path: '/login', component: Login },
  { path: '/pemesanan', component: Pemesanan },
  { path: '/contact', component: Contact },
  { path: '/:pathMatch(.*)*', component: NotFound } // wildcard (404)
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
