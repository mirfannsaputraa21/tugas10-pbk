<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/authstore'; // 1. Impor store autentikasi
import { onMounted } from 'vue';

// 2. Inisialisasi store
const authStore = useAuthStore();

// 3. Periksa status login setiap kali aplikasi dimuat ulang
onMounted(() => {
  authStore.checkLoginStatus();
});
</script>

<template>
  <header v-if="authStore.isLoggedIn">
    <div class="navbar-content">
      <div class="navbar-title">Gudang Rumah Makan Sederhana</div>
      
      <nav>
        <router-link to="/dasboard"> beranda </router-link>
        <RouterLink to="/daftarbahan">Daftar Bahan</RouterLink>
        <a href="#" @click.prevent="authStore.logout()">Logout</a>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>