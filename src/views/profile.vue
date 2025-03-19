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
        <div class="p-4 bg-yellow-50 rounded-lg flex items-start gap-3">
          <svg class="w-5 h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <div class="text-sm text-yellow-700">
            Pastikan Anda telah menyimpan kode recovery di tempat yang aman dan sudah memindai QR Code
          </div>
        </div>

        <!-- Action Button -->
        <div class="flex justify-center">
          <button
            @click="handleShowTwoFactorInfo"
            class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h16M4 4h16"/>
            </svg>
            {{ showCodes ? 'Sembunyikan Detail' : 'Tampilkan Detail Autentikasi' }}
          </button>
        </div>

        <!-- QR and Recovery Codes Section -->
        <div v-if="showCodes" class="space-y-8">
          <!-- QR Code Section -->
          <div class="text-center space-y-4">
            <div class="mx-auto w-64 h-64 bg-white p-4 rounded-xl shadow-sm">
              <div v-html="qrCode" class="w-full h-full"></div>
            </div>
            <p class="text-sm text-gray-600">Scan QR code menggunakan aplikasi autentikator seperti Google Authenticator</p>
          </div>

          <!-- OTP Verification Section -->
          <div class="max-w-md mx-auto space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Verifikasi Kode OTP</label>
              <form class="flex gap-2" @submit.prevent="verifyMultiFactorCode">
                <input
                  v-model="otpCode"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  placeholder="Masukkan 6-digit kode"
                  maxlength="6"
                />
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Verifikasi
                </button>
              </form>
            </div>

            <!-- Feedback Section -->
            <div v-if="otpFeedback" class="mt-2">
              <div
                class="p-3 rounded-lg flex items-center gap-2 transition-all duration-300"
                :class="{
                  'bg-green-50 text-green-700': otpFeedback.type === 'success',
                  'bg-red-50 text-red-700': otpFeedback.type === 'error'
                }"
              >
                <svg
                  v-if="otpFeedback.type === 'success'"
                  class="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg
                  v-else-if="otpFeedback.type === 'error'"
                  class="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="text-sm">{{ otpFeedback.message }}</span>
              </div>
            </div>
          </div>

          <!-- Recovery Codes Section -->
          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Kode Recovery</h3>
              <div class="grid grid-cols-2 gap-2 font-mono text-sm">
                <div
                  v-for="(code, index) in recoveryCodes"
                  :key="index"
                  class="p-2.5 bg-white rounded-md text-center border border-gray-100"
                >
                  {{ code }}
                </div>
              </div>
              <p class="text-sm text-gray-500 mt-4">
                * Simpan kode-kode ini di tempat aman. Setiap kode hanya bisa digunakan sekali.
              </p>
            </div>
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
  
  <script lang="ts" setup>
  import { onMounted, ref, computed } from "vue";
  import { fetchWrapper } from '@/composables/fetchers';
  import { useAuthStore } from "@/stores";
  import { MultiFactorResponse, ErrorResponse, SuccessResponse } from "@/composables/types";


  const authStore = useAuthStore()
  const isTwoFactorEnabled = computed(() => authStore.isMultiFactorActive);
  const isAlreadyFetchTwoFactorInfo = ref(false);
  const showCodes = ref(false);
  const qrCode = ref(``); // Ganti dengan QR Code yang sesuai
  const recoveryCodes = ref([""]);
  const otpCode = ref("");
  const otpFeedback = ref<{ type: 'success' | 'error', message: string } | null>(null);
  const error = ref("")
  
  const handleShowTwoFactorInfo = async () => {
    showCodes.value = !showCodes.value;
    
    if (showCodes.value && !isAlreadyFetchTwoFactorInfo.value) {
      await getUserMultiFactorInfo();
      isAlreadyFetchTwoFactorInfo.value = true;
    }
  };
  
  const activateTwoFactor = async () => {
    try {
            const response = await fetchWrapper<SuccessResponse<[]>>("POST", "/ojk/2fa/activate");

            if (response.success) {
              await authStore.activateMultiFactor()
            }
        }
    catch (err: unknown) {
            const errorData = err as ErrorResponse;
            console.log(errorData) 
            
    }

  };
  

    const verifyMultiFactorCode = async () => {
        otpFeedback.value = null

        try {
            const response = await fetchWrapper<SuccessResponse<[]>>("POST", "/ojk/2fa/verify", {
                otp: otpCode.value
            });

            if (response.success) {
                otpFeedback.value = {
                    type: 'success',
                    message: 'Kode OTP valid! Autentikasi berhasil.'
                };
            } else {
                otpFeedback.value = {
                    type: 'error',
                    message: 'Kode OTP tidak valid. Silakan coba lagi.'
                };
            }
        }
        catch (err: unknown) {
            const errorData = err as ErrorResponse;
            console.log(errorData) 
            
            if (errorData?.error_type === "invalid_credential"){
                otpFeedback.value = {
                type: 'error',
                message: 'Kode OTP tidak valid.'
                };           
            }
        }
    }

    const getUserMultiFactorInfo = async () => {
        try {
            const response = await fetchWrapper<MultiFactorResponse>("GET", "/ojk/2fa/info");

            if (response.success) {
                qrCode.value = response.data.qr_code,
                recoveryCodes.value = response.data.recovery_codes
            } else {
                console.log("Login failed:", response.message);
            }
        }
        catch (err: unknown) {
            const errorData = err as ErrorResponse;
            console.log(errorData) 
            
            if (errorData?.error_type === "invalid_credential"){
                error.value = errorData.data.error
            }
        }
    }

  </script>
  