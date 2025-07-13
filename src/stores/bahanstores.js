import { defineStore } from 'pinia';
import axios from 'axios';

// GANTI URL INI dengan URL dari Supabase, Firebase, atau MockAPI.io Anda
const API_URL = 'https://db-json-api-tau.vercel.app/bahan';

export const useBahanStore = defineStore('bahan', {
  state: () => ({
    bahan: [],
    isLoading: false,
    error: null, // Tambahkan state untuk menampung pesan error
  }),
  getters: {
    totalJenisBahan: (state) => state.bahan.length,
  },
  actions: {
    async fetchBahan() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(API_URL);
        this.bahan = response.data;
      } catch (error) {
        console.error('Gagal mengambil data:', error);
        this.error = 'Gagal mengambil data dari server.';
      } finally {
        this.isLoading = false;
      }
    },

    // PERBAIKAN: Terima objek tanpa ID, karena ID dibuat oleh backend
    async tambahBahan(bahanTanpaId) {
      this.error = null;
      try {
        // Kirim data tanpa ID, biarkan server yang membuat ID
        const response = await axios.post(API_URL, bahanTanpaId);
        // Tambahkan data baru (yang sekarang sudah punya ID dari server) ke state
        this.bahan.push(response.data);
      } catch (error) {
        console.error('Gagal menambah data:', error);
        this.error = 'Gagal menambah data ke server.';
      }
    },

    async updateBahan(bahanDiupdate) {
      this.error = null;
      try {
        const response = await axios.put(`${API_URL}/${bahanDiupdate.id}`, bahanDiupdate);
        const index = this.bahan.findIndex(b => b.id === bahanDiupdate.id);
        if (index !== -1) {
          this.bahan[index] = response.data;
        }
      } catch (error) {
        console.error('Gagal mengupdate data:', error);
        this.error = `Gagal mengupdate data: ${error.message}`;
      }
    },

    async hapusBahan(id) {
      this.error = null;
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.bahan = this.bahan.filter(b => b.id !== id);
      } catch (error) {
        console.error('Gagal menghapus data:', error);
        this.error = 'Gagal menghapus data dari server.';
      }
    },
  },
});