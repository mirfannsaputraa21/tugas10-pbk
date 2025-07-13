
<script setup>
import { ref, onMounted } from 'vue';
import { useBahanStore } from '../stores/bahanstores';

const bahanStore = useBahanStore();

const editingId = ref(null);
const editForm = ref({ id: '', nama: '', stok: 0, satuan: '' });

// Form untuk menambah data baru, tidak perlu properti 'id'
const addForm = ref({
  nama: '',
  stok: 0,
  satuan: ''
});

onMounted(() => {
  bahanStore.fetchBahan();
});

const startEdit = (bahan) => {
  editingId.value = bahan.id;
  editForm.value = { ...bahan };
};

const saveEdit = async () => {
  await bahanStore.updateBahan(editForm.value);
  editingId.value = null;
};

const cancelEdit = () => {
  editingId.value = null;
};

// FUNGSI YANG DIPERBAIKI
const addNewBahan = async () => {
  if (!addForm.value.nama || !addForm.value.satuan) {
    alert('Nama bahan dan satuan tidak boleh kosong!');
    return;
  }

  // Buat objek baru TANPA ID
  const bahanBaru = {
    nama: addForm.value.nama,
    stok: parseInt(addForm.value.stok) || 0,
    satuan: addForm.value.satuan,
  };
  
  // Panggil action store. Backend akan membuat ID.
  await bahanStore.tambahBahan(bahanBaru);

  // Kosongkan form setelah ditambah
  addForm.value = { nama: '', stok: 0, satuan: '' };
};
</script>

<template>
  <div>
    <h1>Daftar Bahan Makanan</h1>
    
    <!-- Tampilkan pesan error jika ada -->
    <div v-if="bahanStore.error" style="color: red; margin-bottom: 1rem;">
      <strong>Error:</strong> {{ bahanStore.error }}
    </div>

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