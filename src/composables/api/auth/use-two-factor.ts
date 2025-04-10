import { ref, computed } from "vue";
import { useAuthStore } from "@/stores";
import { fetchWrapper } from "@/composables/fetchers";
import type { MultiFactorResponse, ErrorResponse, SuccessResponse } from "@/composables/types";

export function useTwoFactor() {
  const authStore = useAuthStore();

  // State UI
  const showCodes = ref(false);
  const isAlreadyFetchTwoFactorInfo = ref(false);
  const qrCode = ref("");
  const recoveryCodes = ref<string[]>([]);
  const error = ref("");

  // Computed: ambil status 2FA dari auth store
  const isTwoFactorEnabled = computed(() => authStore.isMultiFactorActive);

  // Function to toggle dan fetch data 2FA
  const handleShowTwoFactorInfo = async () => {
    showCodes.value = !showCodes.value;
    if (showCodes.value && !isAlreadyFetchTwoFactorInfo.value) {
      await getUserMultiFactorInfo();
      isAlreadyFetchTwoFactorInfo.value = true;
    }
  };

  // Aktifkan 2FA
  const activateTwoFactor = async () => {
    try {
      const response = await fetchWrapper<SuccessResponse<[]>>("POST", "/2fa/activate");
      if (response.success) {
        // Update state di authStore (misalnya method activateMultiFactor di store)
        await authStore.activateMultiFactor();
      }
    } catch (err: unknown) {
      const errorData = err as ErrorResponse;
      error.value = errorData.message;
    }
  };

  // Fetch info 2FA dari API
  const getUserMultiFactorInfo = async () => {
    try {
      const response = await fetchWrapper<MultiFactorResponse>("GET", "/2fa/info");
      if (response.success) {
        qrCode.value = response.data.qr_code;
        recoveryCodes.value = response.data.recovery_codes;
      } else {
        console.log("Fetch 2FA info failed:", response.message);
      }
    } catch (err: unknown) {
      const errorData = err as ErrorResponse;
      error.value = errorData.message
    }
  };

  return {
    isTwoFactorEnabled,
    showCodes,
    qrCode,
    recoveryCodes,
    error,
    handleShowTwoFactorInfo,
    activateTwoFactor,
    getUserMultiFactorInfo,
  };
}
