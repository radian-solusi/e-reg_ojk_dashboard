import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useHandleError } from "@/composables/use-handle-error";
import { fetchWrapper } from "@/composables/fetchers";
import { ErrorResponse, LoginResponse } from "@/composables/types";

export function useLogin() {
    const router = useRouter();
    const authStore = useAuthStore();
    const loadingButton = ref(false);
    const requireOtp = ref(false);

    // Forms & Errors as reactive refs
    const forms = ref({
        email: '',
        password: '',
        remember: false,
        otp: ''
    });

    const errors = ref({
        email: '',
        password: '',
        message: '',
        otp: ''
    });

    const resetErrors = () => {
        errors.value = {
            email: '',
            password: '',
            message: '',
            otp: ''
        };
    };
    const {processErrors} = useHandleError(errors);


    const verifyUser = async () => {
        resetErrors();
        loadingButton.value = true;

        try {
            const response = await fetchWrapper<LoginResponse>("POST", "/auth/login", forms.value);

            if (response.success) {
                if (!response.data.require_otp) {
                    authStore.login({
                        username: response.data.name,
                        token: response.data.token,
                        isMultiFactorActive: response.data.is_multi_factor_active,
                    })
                    router.push({ name: "home" });
                } else {
                    requireOtp.value = true;
                }
            } else {
                console.log("Login failed:", response.message);
            }
        } catch (err: unknown) {
            const errorData = err as ErrorResponse;
            processErrors(errorData);
        } finally {
            loadingButton.value = false;
        }
    };

    const verifyOtp = async () => {
        resetErrors();
        loadingButton.value = true;

        try {
            const response = await fetchWrapper<LoginResponse>("POST", "/auth/verify-otp", forms.value);

            if (response.success && !response.data.require_otp) {
                authStore.login({
                    username: response.data.name,
                    token: response.data.token,
                    isMultiFactorActive: response.data.is_multi_factor_active,
                })
                router.push({ name: "home" });
            } else {
                console.log("OTP verification failed:", response.message);
            }
        } catch (err: unknown) {
            const errorData = err as ErrorResponse;
            processErrors(errorData);
        } finally {
            loadingButton.value = false;
        }
    };

    return { forms, errors, verifyUser, verifyOtp, loadingButton, requireOtp };
}
