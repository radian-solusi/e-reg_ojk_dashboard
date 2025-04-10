import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHandleError } from "@/composables/use-handle-error";
import { fetchWrapper } from "@/composables/fetchers";
import type { SuccessResponse, ErrorResponse } from "@/composables/types";

export function useResetPassword() {
  const router = useRouter();
  const route = useRoute();

  const forms = ref({
    password: "",
    password_confirmation: ""
  });

  const errors = ref({
    password: "",
    password_confirmation: "",
    message: ""
  });

  const loading = ref(false);

  // Reset error state
  const resetErrors = () => {
    errors.value = {
      password: "",
      password_confirmation: "",
      message: ""
    };
  };

  const { processErrors } = useHandleError(errors)

  const verifyEmailAndToken = async (): Promise<boolean> => {
    try {
      const response = await fetchWrapper<SuccessResponse<[]>>("POST", "/auth/verify-reset-password", {
        token: route.query?.token,
        email: route.query?.email
      });
      return response.success;
    } catch (err: unknown) {
      console.error((err as ErrorResponse).message);
      return false;
    }
  };

  const resetPassword = async () => {
    resetErrors();
    loading.value = true;

    try {
      const response = await fetchWrapper<SuccessResponse<[]>>("POST", "/auth/reset-password", {
        token: route.query?.token,
        email: route.query?.email,
        password: forms.value.password,
        password_confirmation: forms.value.password_confirmation
      });

      if (response.success) {
        router.push({ name: "login" });
      } else {
        console.log("Reset password failed:", response.message);
      }
    } catch (err: unknown) {
      const errorData = err as ErrorResponse;
      processErrors(errorData);
    } finally {
      loading.value = false;
    }
  };

  // Opsional: verifikasi token saat onMounted
//   onMounted(async () => {
//     if (!route.query.token || !route.query.email) {
//       router.push({ name: "login" });
//     } else {
//       const isValid = await verifyEmailAndToken();
//       if (!isValid) {
//         router.push({ name: "login" });
//       }
//     }
//   });

  return {
    forms,
    errors,
    loading,
    verifyEmailAndToken,
    resetPassword
  };
}
