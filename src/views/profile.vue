<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="space-y-8">
      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-gray-900">{{ $t('account_security') }}</h1>
        <p class="text-gray-600">{{ $t('improve_security') }}</p>
      </div>

      <!-- 2FA Status -->
      <div class="space-y-6" v-if="isTwoFactorEnabled">
        <!-- Status Badge -->
        <div class="inline-flex items-center px-4 py-2 bg-green-50 rounded-full">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm font-medium text-green-700">{{ $t('2fa_active') }}</span>
        </div>

        <!-- Warning Alert -->
        <div class="p-4 bg-yellow-50 rounded-lg flex items-start gap-3">
          <svg class="w-5 h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <div class="text-sm text-yellow-700">
            {{ $t('2fa_warning') }}
          </div>
        </div>

        <!-- Action Button -->
        <div class="flex justify-center">
          <button
            @click="handleShowTwoFactorInfo"
            class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>{{ showCodes ? $t('hide_details') : $t('show_details') }}</span>
          </button>
        </div>

        <!-- QR and Recovery Codes Section -->
        <div v-if="showCodes" class="space-y-8">
          <div class="text-center space-y-4">
            <div class="mx-auto w-64 h-64 bg-white p-4 rounded-xl shadow-sm">
              <div v-html="qrCode" class="w-full h-full"></div>
            </div>
            <p class="text-sm text-gray-600">{{ $t('scan_qr') }}</p>
          </div>
      
          <!-- Recovery Codes Section -->
          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">{{ $t('recovery_codes') }}</h3>
              <div class="grid grid-cols-2 gap-2 font-mono text-sm">
                <div v-for="(code, index) in recoveryCodes" :key="index" class="p-2.5 bg-white rounded-md text-center border border-gray-100">
                  {{ code }}
                </div>
              </div>
              <p class="text-sm text-gray-500 mt-4">{{ $t('save_recovery_codes') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Activation Button -->
      <button v-else @click="activateTwoFactor" class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        {{ $t('activate_2fa') }}
      </button>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
  import { useTwoFactor } from "@/composables/api";
  const { isTwoFactorEnabled, showCodes, qrCode, recoveryCodes, handleShowTwoFactorInfo, activateTwoFactor} = useTwoFactor()

  </script>
  