<template>
    <div class="max-w-3xl mx-auto px-4 py-8">
      <div class="space-y-8">
        <!-- Header -->
        <div class="space-y-2">
          <h1 class="text-3xl font-bold text-gray-900">Keamanan Akun</h1>
          <p class="text-gray-600">Tingkatkan keamanan akun Anda dengan autentikasi dua faktor</p>
        </div>
  
        <!-- 2FA Status -->
        <div class="space-y-6" v-if="isTwoFactorEnabled">
          <!-- Status Badge -->
          <div class="inline-flex items-center px-4 py-2 bg-green-50 rounded-full">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium text-green-700">Autentikasi Dua Faktor Aktif</span>
          </div>
  
          <!-- Warning Alert -->
          <div class="p-4 border border-yellow-200 bg-yellow-50 rounded-lg flex items-start">
            <svg class="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <div class="text-sm text-yellow-700">
              Pastikan Anda telah menyimpan kode recovery di tempat yang aman dan sudah memindai QR Code
            </div>
          </div>
  
          <!-- Action Buttons -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button 
              @click="showQr = !showQr"
              class="flex items-center justify-center gap-2 w-full px-4 py-2.5 border rounded-lg hover:bg-gray-50 transition-colors"
              :class="showQr ? 'bg-blue-50 border-blue-200' : 'border-gray-200'"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h16M4 4h16"/>
              </svg>
              {{ showQr ? 'Sembunyikan QR Code' : 'Tampilkan QR Code' }}
            </button>
  
            <button 
              @click="showRecovery = !showRecovery"
              class="flex items-center justify-center gap-2 w-full px-4 py-2.5 border rounded-lg hover:bg-gray-50 transition-colors"
              :class="showRecovery ? 'bg-blue-50 border-blue-200' : 'border-gray-200'"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
              {{ showRecovery ? 'Sembunyikan Kode Recovery' : 'Tampilkan Kode Recovery' }}
            </button>
          </div>
  
          <!-- QR Code Section -->
          <div v-if="showQr" class="space-y-4">
            <div class="border p-4 rounded-lg">
              <div class="mx-auto w-64 h-64" v-html="qrCode"></div>
            </div>
            
            <div class="max-w-xs mx-auto space-y-3">
              <label class="text-sm font-medium text-gray-700">Masukkan Kode Verifikasi</label>
              <div class="flex gap-2">
                <input
                  v-model="code"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="6-digit kode"
                />
                <button 
                  @click="confirmCode"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Verifikasi
                </button>
              </div>
            </div>
          </div>
  
          <!-- Recovery Codes Section -->
          <div v-if="showRecovery" class="space-y-4">
            <div class="p-4 bg-gray-50 rounded-lg border">
              <div class="grid grid-cols-2 gap-2 font-mono text-sm">
                <div 
                  v-for="(code, index) in recoveryCodes"
                  :key="index"
                  class="p-2 bg-white rounded-md text-center"
                >
                  {{ code }}
                </div>
              </div>
              
              <p class="mt-4 text-sm text-gray-500">
                * Simpan kode-kode ini di tempat aman. Setiap kode hanya bisa digunakan sekali.
              </p>
            </div>
          </div>
        </div>
  
        <!-- Activation Button -->
        <button 
          v-else
          @click="activateTwoFactor"
          class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          Aktifkan Autentikasi Dua Faktor
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const isTwoFactorEnabled = ref(false);
  const showQr = ref(false);
  const showRecovery = ref(false);
  const qrCode = ref(`<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"192\" height=\"192\" viewBox=\"0 0 192 192\"><rect x=\"0\" y=\"0\" width=\"192\" height=\"192\" fill=\"#ffffff\"/><g transform=\"scale(4.683)\"><g transform=\"translate(0.000,0.000)\"><path fill-rule=\"evenodd\" d=\"M8 0L8 1L9 1L9 2L8 2L8 5L9 5L9 6L8 6L8 7L9 7L9 8L8 8L8 9L7 9L7 8L6 8L6 9L7 9L7 10L5 10L5 11L7 11L7 10L10 10L10 9L12 9L12 10L11 10L11 11L10 11L10 12L9 12L9 13L7 13L7 12L4 12L4 13L3 13L3 15L2 15L2 14L1 14L1 13L2 13L2 10L1 10L1 12L0 12L0 14L1 14L1 16L0 16L0 18L2 18L2 19L1 19L1 20L2 20L2 19L5 19L5 18L6 18L6 19L8 19L8 21L7 21L7 20L5 20L5 22L6 22L6 23L7 23L7 22L8 22L8 23L10 23L10 26L11 26L11 23L13 23L13 25L12 25L12 27L11 27L11 29L12 29L12 30L8 30L8 28L9 28L9 29L10 29L10 27L8 27L8 25L9 25L9 24L3 24L3 23L4 23L4 20L3 20L3 22L2 22L2 21L0 21L0 23L1 23L1 24L0 24L0 27L1 27L1 29L2 29L2 28L3 28L3 29L4 29L4 30L5 30L5 29L4 29L4 28L6 28L6 29L7 29L7 30L6 30L6 31L8 31L8 32L11 32L11 35L9 35L9 37L8 37L8 41L10 41L10 39L9 39L9 37L10 37L10 38L12 38L12 40L11 40L11 41L12 41L12 40L13 40L13 41L14 41L14 40L13 40L13 38L12 38L12 36L11 36L11 35L14 35L14 33L13 33L13 31L14 31L14 32L15 32L15 33L16 33L16 32L18 32L18 33L17 33L17 34L18 34L18 35L16 35L16 36L14 36L14 39L15 39L15 40L16 40L16 41L19 41L19 40L16 40L16 39L15 39L15 37L17 37L17 36L18 36L18 35L19 35L19 36L20 36L20 38L18 38L18 39L21 39L21 40L20 40L20 41L24 41L24 40L25 40L25 41L26 41L26 40L27 40L27 39L26 39L26 37L27 37L27 38L28 38L28 40L29 40L29 37L31 37L31 36L32 36L32 38L31 38L31 39L32 39L32 40L30 40L30 41L33 41L33 40L34 40L34 41L37 41L37 40L38 40L38 39L36 39L36 40L34 40L34 37L36 37L36 38L39 38L39 41L40 41L40 39L41 39L41 37L40 37L40 38L39 38L39 36L41 36L41 35L40 35L40 34L41 34L41 33L40 33L40 31L39 31L39 30L38 30L38 27L37 27L37 26L39 26L39 27L41 27L41 24L40 24L40 22L41 22L41 19L40 19L40 15L41 15L41 11L40 11L40 9L41 9L41 8L40 8L40 9L39 9L39 8L36 8L36 9L34 9L34 8L32 8L32 9L31 9L31 6L32 6L32 7L33 7L33 3L32 3L32 4L29 4L29 3L26 3L26 2L25 2L25 0L20 0L20 5L19 5L19 6L18 6L18 4L17 4L17 3L18 3L18 2L19 2L19 0L15 0L15 1L18 1L18 2L15 2L15 3L14 3L14 8L12 8L12 7L13 7L13 5L12 5L12 4L13 4L13 2L14 2L14 0L13 0L13 1L12 1L12 0ZM26 0L26 1L27 1L27 0ZM29 0L29 2L30 2L30 3L31 3L31 1L32 1L32 2L33 2L33 0ZM10 1L10 2L9 2L9 5L10 5L10 6L9 6L9 7L10 7L10 8L9 8L9 9L10 9L10 8L11 8L11 7L12 7L12 5L11 5L11 4L12 4L12 1ZM21 1L21 4L23 4L23 5L22 5L22 6L21 6L21 8L22 8L22 9L21 9L21 11L20 11L20 9L19 9L19 8L20 8L20 6L19 6L19 8L18 8L18 9L17 9L17 10L18 10L18 11L16 11L16 10L15 10L15 12L13 12L13 14L12 14L12 16L11 16L11 13L12 13L12 11L11 11L11 12L10 12L10 13L9 13L9 14L7 14L7 13L5 13L5 16L4 16L4 15L3 15L3 16L2 16L2 18L5 18L5 17L6 17L6 18L7 18L7 17L8 17L8 19L10 19L10 20L11 20L11 21L10 21L10 22L12 22L12 20L13 20L13 18L17 18L17 16L19 16L19 15L21 15L21 14L22 14L22 13L23 13L23 17L25 17L25 18L22 18L22 17L21 17L21 19L20 19L20 18L18 18L18 19L16 19L16 20L15 20L15 21L13 21L13 22L14 22L14 23L15 23L15 24L14 24L14 25L13 25L13 26L14 26L14 27L13 27L13 28L12 28L12 29L14 29L14 27L17 27L17 28L15 28L15 30L14 30L14 31L18 31L18 29L20 29L20 27L22 27L22 28L21 28L21 30L20 30L20 32L19 32L19 33L20 33L20 32L22 32L22 33L21 33L21 34L19 34L19 35L21 35L21 34L22 34L22 33L25 33L25 34L24 34L24 35L23 35L23 36L24 36L24 35L25 35L25 34L26 34L26 36L27 36L27 37L29 37L29 36L30 36L30 35L31 35L31 34L32 34L32 29L33 29L33 28L34 28L34 30L33 30L33 32L37 32L37 31L38 31L38 30L37 30L37 29L35 29L35 28L37 28L37 27L36 27L36 26L37 26L37 24L39 24L39 25L40 25L40 24L39 24L39 23L36 23L36 24L35 24L35 23L34 23L34 24L31 24L31 23L32 23L32 22L29 22L29 24L28 24L28 20L29 20L29 21L30 21L30 20L32 20L32 21L33 21L33 19L35 19L35 21L36 21L36 19L37 19L37 17L38 17L38 19L39 19L39 22L40 22L40 19L39 19L39 14L37 14L37 13L38 13L38 12L39 12L39 13L40 13L40 12L39 12L39 11L38 11L38 10L39 10L39 9L37 9L37 12L34 12L34 11L33 11L33 10L34 10L34 9L33 9L33 10L30 10L30 9L29 9L29 7L30 7L30 5L27 5L27 4L25 4L25 5L26 5L26 6L25 6L25 8L24 8L24 4L23 4L23 3L24 3L24 2L23 2L23 3L22 3L22 1ZM15 4L15 9L16 9L16 8L17 8L17 7L18 7L18 6L17 6L17 4ZM10 6L10 7L11 7L11 6ZM16 6L16 7L17 7L17 6ZM22 6L22 8L23 8L23 9L22 9L22 11L23 11L23 13L24 13L24 16L25 16L25 17L26 17L26 16L27 16L27 14L29 14L29 15L28 15L28 16L29 16L29 15L32 15L32 12L33 12L33 11L30 11L30 12L31 12L31 14L30 14L30 13L28 13L28 12L27 12L27 10L24 10L24 8L23 8L23 6ZM26 6L26 9L28 9L28 8L27 8L27 6ZM28 6L28 7L29 7L29 6ZM0 8L0 9L3 9L3 11L4 11L4 8ZM13 9L13 11L14 11L14 9ZM28 10L28 11L29 11L29 10ZM35 10L35 11L36 11L36 10ZM18 11L18 13L16 13L16 14L14 14L14 15L16 15L16 16L15 16L15 17L16 17L16 16L17 16L17 15L18 15L18 14L19 14L19 13L20 13L20 12L19 12L19 11ZM26 12L26 13L25 13L25 14L27 14L27 12ZM34 13L34 14L33 14L33 16L31 16L31 17L27 17L27 18L26 18L26 19L29 19L29 20L30 20L30 19L31 19L31 17L34 17L34 15L36 15L36 16L35 16L35 17L37 17L37 15L36 15L36 14L35 14L35 13ZM6 14L6 15L7 15L7 14ZM9 14L9 15L10 15L10 14ZM25 15L25 16L26 16L26 15ZM3 16L3 17L4 17L4 16ZM6 16L6 17L7 17L7 16ZM10 16L10 19L11 19L11 18L13 18L13 16L12 16L12 17L11 17L11 16ZM29 18L29 19L30 19L30 18ZM32 18L32 19L33 19L33 18ZM35 18L35 19L36 19L36 18ZM22 19L22 20L20 20L20 21L21 21L21 22L22 22L22 23L23 23L23 24L22 24L22 25L23 25L23 24L24 24L24 26L25 26L25 25L26 25L26 27L27 27L27 26L28 26L28 27L29 27L29 26L31 26L31 29L30 29L30 30L29 30L29 31L28 31L28 29L27 29L27 28L24 28L24 27L23 27L23 26L22 26L22 27L23 27L23 28L24 28L24 29L22 29L22 30L26 30L26 29L27 29L27 31L28 31L28 32L29 32L29 33L28 33L28 35L27 35L27 36L28 36L28 35L30 35L30 34L31 34L31 32L30 32L30 30L31 30L31 29L32 29L32 28L33 28L33 27L34 27L34 28L35 28L35 27L34 27L34 26L36 26L36 25L33 25L33 26L31 26L31 25L30 25L30 24L29 24L29 25L27 25L27 23L25 23L25 24L24 24L24 21L23 21L23 19ZM18 20L18 21L17 21L17 22L16 22L16 21L15 21L15 22L16 22L16 24L15 24L15 26L16 26L16 25L17 25L17 26L18 26L18 25L17 25L17 23L18 23L18 22L19 22L19 20ZM37 20L37 21L38 21L38 20ZM6 21L6 22L7 22L7 21ZM25 21L25 22L27 22L27 21ZM1 22L1 23L2 23L2 22ZM19 23L19 24L20 24L20 25L19 25L19 27L20 27L20 26L21 26L21 24L20 24L20 23ZM1 24L1 25L2 25L2 26L4 26L4 27L6 27L6 28L7 28L7 27L6 27L6 26L7 26L7 25L5 25L5 26L4 26L4 25L2 25L2 24ZM17 28L17 29L18 29L18 28ZM39 28L39 29L40 29L40 28ZM0 30L0 31L1 31L1 30ZM35 30L35 31L36 31L36 30ZM2 31L2 32L1 32L1 33L4 33L4 32L5 32L5 31L4 31L4 32L3 32L3 31ZM11 31L11 32L12 32L12 31ZM22 31L22 32L25 32L25 31ZM6 32L6 33L7 33L7 32ZM26 32L26 33L27 33L27 32ZM8 33L8 34L9 34L9 33ZM12 33L12 34L13 34L13 33ZM29 33L29 34L30 34L30 33ZM33 33L33 36L36 36L36 33ZM38 33L38 34L37 34L37 37L38 37L38 36L39 36L39 35L38 35L38 34L39 34L39 33ZM34 34L34 35L35 35L35 34ZM21 37L21 38L23 38L23 39L22 39L22 40L24 40L24 39L25 39L25 40L26 40L26 39L25 39L25 38L24 38L24 37ZM32 38L32 39L33 39L33 38ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM41 0L34 0L34 7L41 7ZM40 1L35 1L35 6L40 6ZM39 2L36 2L36 5L39 5ZM0 41L7 41L7 34L0 34ZM1 40L6 40L6 35L1 35ZM2 39L5 39L5 36L2 36Z\" fill=\"#2d3748\"/></g></g></svg>`); // Ganti dengan QR Code yang sesuai
  const recoveryCodes = ref("Kode1\nKode2\nKode3\nKode4");
  const code = ref("");
  
  const activateTwoFactor = () => {
    isTwoFactorEnabled.value = true;
  };
  
  const confirmCode = () => {
    if (code.value === "123456") {
      alert("Kode berhasil dikonfirmasi!");
    } else {
      alert("Kode salah, coba lagi.");
    }
  };
  </script>
  