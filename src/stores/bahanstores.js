import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://irfan-json-server.glitch.me/bahan';

export const useBahanStore = defineStore('bahan', {
  state: () => ({
    bahan: [],
    isLoading: false,
  }),
  getters: {
    totalJenisBahan: (state) => state.bahan.length,
  },
  actions: {
    // 1. FETCH (GET) - Sudah ada
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

    // 2. TAMBAH (POST) - Baru
    async tambahBahan(bahanBaru) {
      try {
        const response = await axios.post(API_URL, bahanBaru);
        // Tambahkan data baru ke state lokal agar UI langsung update
        this.bahan.push(response.data);
      } catch (error) {
        console.error('Gagal menambah data:', error);
      }
    },

    // 3. UPDATE (PUT) - Baru
    async updateBahan(bahanDiupdate) {
      try {
        // Kirim permintaan PUT ke /bahan/:id
        const response = await axios.put(`${API_URL}/${bahanDiupdate.id}`, bahanDiupdate);
        // Cari index data lama di state dan ganti dengan data baru
        const index = this.bahan.findIndex(b => b.id === bahanDiupdate.id);
        if (index !== -1) {
          this.bahan[index] = response.data;
        }
      } catch (error) {
        console.error('Gagal mengupdate data:', error);
      }
    },

    // 4. HAPUS (DELETE) - Baru
    async hapusBahan(id) {
      try {
        // Kirim permintaan DELETE ke /bahan/:id
        await axios.delete(`${API_URL}/${id}`);
        // Hapus data dari state lokal berdasarkan id
        this.bahan = this.bahan.filter(b => b.id !== id);
      } catch (error) {
        console.error('Gagal menghapus data:', error);
      }
    },
  },
});