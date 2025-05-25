<template>
  <div>
    <h2>Form Pemesanan Makanan</h2>
    <form @submit.prevent="pesanMakanan">
      <div>
        <label>Nama Pelanggan:</label>
        <input v-model="nama" required />
      </div>
      <div>
        <label>Pilih Makanan:</label>
        <select v-model="makanan">
          <option>Nasi Goreng Spesial</option>
          <option>Ayam Bakar Taliwang</option>
          <option>Sate Ayam</option>
          <option>Mie Goreng Jawa</option>
          <option>Es Teh Manis</option>
        </select>
      </div>
      <div>
        <label>Jumlah:</label>
        <input type="number" v-model.number="jumlah" min="1" required />
      </div>
      <button type="submit">Pesan Sekarang</button>
    </form>

    <div v-if="pesanan">
      <h3>Ringkasan Pesanan:</h3>
      <p>Nama: {{ pesanan.nama }}</p>
      <p>Makanan: {{ pesanan.makanan }}</p>
      <p>Jumlah: {{ pesanan.jumlah }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nama = ref('')
const makanan = ref('Nasi Goreng')
const jumlah = ref(1)
const pesanan = ref(null)

function pesanMakanan() {
  pesanan.value = {
    nama: nama.value,
    makanan: makanan.value,
    jumlah: jumlah.value
  }
}
</script>

