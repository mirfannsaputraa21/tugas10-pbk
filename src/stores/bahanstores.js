import { defineStore } from 'pinia';
import axios from 'axios';

// Definisikan URL API di satu tempat agar mudah diubah
const API_URL = 'http://localhost:3000/bahan';

export const useBahanStore = defineStore('bahan', {
  state: () => ({
    bahan: [],
    isLoading: false,
  }),

  getters: {
    totalJenisBahan: (state) => state.bahan.length,
  },

  actions: {
    /**
     * READ: Mengambil semua data dari server
     */
    async fetchBahan() {
      this.isLoading = true;
      try {
        const response = await axios.get(API_URL);
        this.bahan = response.data;
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * CREATE: Menambahkan data baru ke server
     */
    async tambahBahan(bahanBaru) {
      try {
        // Kirim data baru ke server
        const response = await axios.post(API_URL, bahanBaru);
        // Tambahkan data balasan dari server ke state lokal agar UI update
        this.bahan.push(response.data);
      } catch (error) {
        console.error('Gagal menambah data:', error);
      }
    },

    /**
     * UPDATE: Mengedit data yang ada di server
     */
    async updateBahan(bahanDiupdate) {
      try {
        // Kirim data yang sudah diubah ke server berdasarkan ID
        const response = await axios.put(`${API_URL}/${bahanDiupdate.id}`, bahanDiupdate);
        // Cari data lama di state dan ganti dengan data baru
        const index = this.bahan.findIndex(b => b.id === bahanDiupdate.id);
        if (index !== -1) {
          this.bahan[index] = response.data;
        }
      } catch (error) {
        console.error('Gagal mengupdate data:', error);
      }
    },

    /**
     * DELETE: Menghapus data dari server
     */
    async hapusBahan(id) {
      try {
        // Kirim perintah hapus ke server berdasarkan ID
        await axios.delete(`${API_URL}/${id}`);
        // Hapus data dari state lokal agar UI update
        this.bahan = this.bahan.filter(b => b.id !== id);
      } catch (error) {
        console.error('Gagal menghapus data:', error);
      }
    },
  },
});