<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import '../src/stylecss/style.css'
const router = useRouter()
const isAuthenticated = ref(false)

onMounted(() => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
})

function logout() {
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
  router.push('/login')
}
</script>

<template>
  <div id="app">
      <nav class="navbar-nav">
        <div class="navbar">
        <h1>PEMESANAN MAKANAN RUMAH MAKAN RAKYAT</h1>

      </div>
        <RouterLink to="/">HOME</RouterLink>
        <RouterLink to="/contact">CONTACT</RouterLink>
        <RouterLink to="/pemesanan">PESANAN</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/login">LOGIN</RouterLink>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
      </nav>
     
 
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
