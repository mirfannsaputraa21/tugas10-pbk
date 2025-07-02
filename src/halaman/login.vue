<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authstore';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');

const handleLogin = () => {
  if (!username.value || !password.value) {
    alert('Username dan password harus diisi!');
    return;
  }
  authStore.login({
    username: username.value,
    password: password.value,
  });
};
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1> GUDANG RUMAH MAKAN SEDERHANA</h1>
      <p>email:Muhammadirfansaputra@gmail.com </p>
      <p>password :admin123 </p>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>
