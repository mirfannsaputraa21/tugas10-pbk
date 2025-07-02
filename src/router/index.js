import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authstore'
import dasboard from '../halaman/dasboard.vue'
import daftarbahan from '../halaman/daftarbahan.vue'
import login from '../halaman/login.vue'

const routes = [
  {
    path: '/dasboard',
    name: 'dashboard', // nama untuk navigasi
    component: dasboard,
    meta: { requiresAuth: true } // penanda rute yang dilindungi
  },
  {
    path: '/daftarbahan',
    name: 'daftar-bahan', // nama untuk navigasi
    component: daftarbahan,
    meta: { requiresAuth: true } // penanda rute yang dilindungi
  },
  {
    path: '/login',
    name: 'login', // nama untuk navigasi
    component: login
  },
  {
    // Jika pengguna membuka alamat root, alihkan ke dashboard
    path: '/',
    redirect: '/dasboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard (Penjaga Rute)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Panggil checkLoginStatus untuk memastikan state sesuai localStorage
  authStore.checkLoginStatus();

  // Cek apakah rute tujuan membutuhkan autentikasi dan pengguna belum login
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Arahkan ke halaman login
    next({ name: 'login' });
  } else if (to.name === 'login' && authStore.isLoggedIn) {
    // Jika sudah login dan mencoba ke halaman login, arahkan ke dashboard
    next({ name: 'dashboard' });
  } else {
    // Izinkan navigasi
    next();
  }
});

export default router