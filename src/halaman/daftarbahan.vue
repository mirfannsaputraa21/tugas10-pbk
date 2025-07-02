<script setup>
import { ref, onMounted } from 'vue';
import { useBahanStore } from '../stores/bahanstores';

const bahanStore = useBahanStore();

// Variabel untuk melacak baris yang sedang diedit
const editingId = ref(null);

// Variabel untuk menampung data form edit
const editForm = ref({
  id: '',
  nama: '',
  stok: 0,
  satuan: ''
});

// Variabel untuk form tambah data baru
const addForm = ref({
  nama: '',
  stok: 0,
  satuan: ''
});

onMounted(() => {
  bahanStore.fetchBahan();
});

// Fungsi untuk masuk ke mode edit
const startEdit = (bahan) => {
  editingId.value = bahan.id;
  editForm.value = { ...bahan }; // Salin data ke form
};

// Fungsi untuk menyimpan perubahan (update)
const saveEdit = () => {
  bahanStore.updateBahan(editForm.value);
  editingId.value = null; // Keluar dari mode edit
};

// Fungsi untuk batal edit
const cancelEdit = () => {
  editingId.value = null;
};

// Fungsi untuk menambah data baru dengan ID berurutan
const addNewBahan = () => {
  if (!addForm.value.nama || !addForm.value.satuan) {
    alert('Nama bahan dan satuan tidak boleh kosong!');
    return;
  }

  // 1. Cari ID tertinggi dari data yang sudah ada
const maxId = bahanStore.bahan.reduce((max, bahan) => parseInt(bahan.id) > max ? parseInt(bahan.id) : max, 0);
  // 2. Buat objek data baru dengan ID berikutnya
  const bahanBaru = {
    id: maxId + 1,
    nama: addForm.value.nama,
    stok: parseInt(addForm.value.stok) || 0,
    satuan: addForm.value.satuan,
  };
  
  // 3. Panggil action dengan data yang sudah memiliki ID
  bahanStore.tambahBahan(bahanBaru);

  // Kosongkan form setelah ditambah
  addForm.value = { nama: '', stok: 0, satuan: '' };
};
</script>

<template>
  <div>
    <h1>Daftar Bahan Makanan</h1>
    
    <div v-if="bahanStore.isLoading">
      Memuat data...
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>Nama Bahan</th>
          <th>Stok</th>
          <th>Satuan</th>
          <th style="width: 210px;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in bahanStore.bahan" :key="item.id">
          
          <template v-if="item.id === editingId">
            <td><input type="text" v-model="editForm.nama" /></td>
            <td><input type="number" v-model="editForm.stok" /></td>
            <td><input type="text" v-model="editForm.satuan" /></td>
            <td>
              <button @click="saveEdit()">Simpan</button>
              <button @click="cancelEdit()">Batal</button>
            </td>
          </template>

          <template v-else>
            <td>{{ item.nama }}</td>
            <td>{{ item.stok }}</td>
            <td>{{ item.satuan }}</td>
            <td>
              <button @click="startEdit(item)">Edit</button>
              <button @click="bahanStore.hapusBahan(item.id)">Hapus</button>
            </td>
          </template>
        </tr>
      </tbody>
      
      <tfoot>
        <tr>
          <td><input type="text" v-model="addForm.nama" placeholder="Nama bahan baru"></td>
          <td><input type="number" v-model="addForm.stok" placeholder="0"></td>
          <td><input type="text" v-model="addForm.satuan" placeholder="Satuan"></td>
          <td>
            <button @click="addNewBahan()">Tambah Data Baru</button>
          </td>
        </tr>
      </tfoot>
    </table>
    <p>Total Jenis Bahan: {{ bahanStore.totalJenisBahan }}</p>
  </div>
</template>
