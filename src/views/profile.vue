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
                <form class="flex gap-2" @submit.prevent="verifyMultiFactorCode">
                    <input
                    v-model="otpCode"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="6-digit kode"
                    />
                    <button 
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                    Verifikasi
                    </button>
                </form>


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
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <svg 
                        v-else-if="otpFeedback.type === 'error'"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        <span class="text-sm">{{ otpFeedback.message }}</span>
                    </div>
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
  
  <script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import { fetchWrapper } from '@/composables/fetchers';
  import { useAuthStore } from "@/stores";
  import { MultiFactorResponse, ErrorResponse, SuccessResponse } from "@/composables/types";


  const authStore = useAuthStore()
  const isTwoFactorEnabled = ref(authStore.isMultiFactorActive);
  const showQr = ref(false);
  const showRecovery = ref(false);
  const qrCode = ref(``); // Ganti dengan QR Code yang sesuai
  const recoveryCodes = ref([""]);
  const otpCode = ref("");
  const otpFeedback = ref<{ type: 'success' | 'error', message: string } | null>(null);
  const error = ref("")
  
  const activateTwoFactor = () => {
    isTwoFactorEnabled.value = true;
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

    // onMounted cycle to get get user 2FA auth informaton
    onMounted(async () => {
        if( authStore.isMultiFactorActive) {
            await getUserMultiFactorInfo()
        }
    })
  </script>
  