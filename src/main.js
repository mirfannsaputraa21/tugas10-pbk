import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. Import Pinia
import App from './App.vue'
import router from './router'
import './stylecss/style.css'
// Buat instance aplikasi Vue
const app = createApp(App)

// Buat instance Pinia
const pinia = createPinia()

// Daftarkan plugin yang akan digunakan
app.use(router)
app.use(pinia) // 2. Gunakan Pinia di aplikasi Anda

// Mount aplikasi ke DOM
app.mount('#app')