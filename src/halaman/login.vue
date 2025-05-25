  <template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const email = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()

  function handleLogin() {
    if (email.value === 'muhammadirfan@gmail.com' && password.value === 'coba123') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/')  // Redirect ke home setelah login sukses
    } else {
      error.value = 'Email atau Password salah!'
    }
  }
  </script>

