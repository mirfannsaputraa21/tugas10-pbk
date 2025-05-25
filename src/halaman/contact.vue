<script setup>
import { ref } from 'vue'

const whatsappNumber = ref('081261828727')
const whatsappUrl = ref(`https://wa.me/${whatsappNumber.value}`)
</script>

<template>
  <div class="contact-section">
    <h2>Hubungi Kami</h2>
    <div class="contact-info">
      <h4>WhatsApp</h4>
      <p>
        <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="whatsapp-link">
          Hubungi nomor WhatsApp kami: {{ whatsappNumber }}
        </a>
      </p>
      <div class="contact-details">
        <p>Siap melayani Anda untuk:</p>
        <ul>
          <li>Pemesanan makanan</li>
          <li>Informasi menu terbaru</li>
          <li>Konsultasi catering</li>
          <li>Pertanyaan lainnya</li>
        </ul>
      </div>
    </div>
  </div>
</template>
