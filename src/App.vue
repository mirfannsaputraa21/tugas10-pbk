<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/authStore'; // 1. Import store autentikasi
import { onMounted } from 'vue';

// 2. Inisialisasi store
const authStore = useAuthStore();

// 3. Cek status login setiap kali aplikasi dimuat ulang
onMounted(() => {
  authStore.checkLoginStatus();
});
</script>

<template>
  <header v-if="authStore.isLoggedIn">
    <div class="navbar-content">
      <div class="navbar-title">Gudang Rumah Makan Sederhana</div>
      
      <nav>
        <RouterLink to="/dasboard">Beranda</RouterLink>
        <RouterLink to="/daftarbahan">Daftar Bahan</RouterLink>
        <a href="#" @click.prevent="authStore.logout()">Logout</a>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>