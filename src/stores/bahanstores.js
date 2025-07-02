// src/stores/authStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

// Ganti URL ini dengan URL My JSON Server Anda untuk koleksi 'users'
const API_URL_USERS = 'https://my-json-server.typicode.com/<mirfannsaputraa21>/<tugas10-pbk>/users';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    async login(credentials) {
      try {
        // Gunakan API_URL_USERS yang baru
        const response = await axios.get(`${API_URL_USERS}?username=${credentials.username}&password=${credentials.password}`);
        
        if (response.data.length > 0) {
          const user = response.data[0];
          this.user = user;
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          router.push('/');
        } else {
          alert('Username atau password salah!');
        }
      } catch (error) {
        console.error('Gagal melakukan login:', error);
        alert('Terjadi kesalahan saat login.');
      }
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      router.push('/login');
    },
    checkLoginStatus() {
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        this.user = JSON.parse(localStorage.getItem('user')) || null;
    }
  },
});