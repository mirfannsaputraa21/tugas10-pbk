
import { createRouter, createWebHistory } from 'vue-router'
import home from '../halaman/home.vue'
import login from '../halaman/login.vue'
import notfound from '../halaman/notfound.vue'
import pemesanan from '../halaman/pemesanan.vue'
import contact from '../halaman/contact.vue'

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/pemesanan', component: pemesanan },
  { path: '/contact', component: contact },
  { path: '/:pathMatch(.*)*', component: notfound } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
