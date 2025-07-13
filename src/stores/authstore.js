// src/stores/authStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router'; // Kita butuh router untuk redirect

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Cek localStorage saat pertama kali state dibuat
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  
  actions: {
    async login(credentials) {
      try {
        // Cari user berdasarkan username & password
const response = await axios.get(`https://68733304c75558e273538faa.mockapi.io/users?username=${credentials.username}&password=${credentials.password}`);

        
        if (response.data.length > 0) {
          // Jika user ditemukan
          const user = response.data[0];
          this.user = user;
          this.isLoggedIn = true;

          // Simpan status login di localStorage agar tidak hilang saat refresh
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(user));

          // Arahkan ke halaman utama setelah login berhasil
          router.push('/');
        } else {
          // Jika user tidak ditemukan
          alert('Username atau password salah!');
        }
      } catch (error) {
        console.error('Gagal melakukan login:', error);
        alert('Terjadi kesalahan saat login.');
      }
    },
    logout() {
      // Hapus semua state dan data dari localStorage
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');

      // Arahkan ke halaman login
      router.push('/login');
    },
    checkLoginStatus() {
        // Fungsi ini bisa dipanggil saat aplikasi pertama kali dimuat
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        this.user = JSON.parse(localStorage.getItem('user')) || null;
    }
  },
});