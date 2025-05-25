<script setup>
import { ref } from 'vue'

const makananList = ref([
  { id: 1, nama: 'Nasi Goreng Spesial', deskripsi: 'Nasi goreng dengan bumbu rahasia dan telur mata sapi', harga: 25000 },
  { id: 2, nama: 'Ayam Bakar Taliwang', deskripsi: 'Ayam bakar khas Lombok dengan sambal pedas', harga: 35000 },
  { id: 3, nama: 'Sate Ayam', deskripsi: 'Sate ayam dengan bumbu kacang yang gurih', harga: 20000 },
  { id: 4, nama: 'Mie Goreng Jawa', deskripsi: 'Mie goreng dengan rasa manis dan pedas', harga: 22000 },
  { id: 5, nama: 'Es Teh Manis', deskripsi: 'Teh manis dingin segar', harga: 7000 }
])
</script>

<template>
  <div class="home">
    <h4>Daftar Makanan</h4>
    <ul class="menu-list">
      <li v-for="makanan in makananList" :key="makanan.id" class="menu-item">
        <h5>{{ makanan.nama }}</h5>
        <p>{{ makanan.deskripsi }}</p>
        <p class="harga">Rp {{ makanan.harga.toLocaleString() }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
