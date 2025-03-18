<template>
    <div>
        <div class="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>

        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        >
            <img src="/assets/images/auth/coming-soon-object1.png" alt="image" class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/assets/images/auth/coming-soon-object2.png" alt="image" class="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/assets/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
            <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
            <div
                class="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]"
            >
                <div class="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                    <div class="absolute top-3 end-6">
                        <div class="dropdown">
                            <!-- language dropdown -->
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
                                <button
                                    type="button"
                                    class="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                >
                                    <div>
                                        <img :src="currentFlag" alt="image" class="h-5 w-5 rounded-full object-cover" />
                                    </div>
                                    <div class="text-base font-bold uppercase">{{ store.locale }}</div>
                                    <span class="shrink-0">
                                        <icon-caret-down />
                                    </span>
                                </button>
                                <template #content="{ close }">
                                    <ul class="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        <template v-for="item in store.languageList" :key="item.code">
                                            <li>
                                                <button
                                                    type="button"
                                                    class="w-full hover:text-primary"
                                                    :class="{ 'bg-primary/10 text-primary': i18n.locale === item.code }"
                                                    @click="changeLanguage(item), close()"
                                                >
                                                    <img
                                                        class="w-5 h-5 object-cover rounded-full"
                                                        :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`"
                                                        alt=""
                                                    />
                                                    <span class="ltr:ml-3 rtl:mr-3">{{ item.name }}</span>
                                                </button>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="mx-auto w-full max-w-[440px]">
                        <div class="mb-3">
                            <div class="grid grid-cols-1 gap-4 items-center">
                                <div class="w-full h-[10%] -mt-[120%] md:-mt-[150%]">
                                    <img src="/assets/images/ojk.svg" alt="" class="w-full" />
                                </div>
                            </div>
                        </div>
                        <p v-if="errors.message" class="text-red-500 text-sm text-center mb-4">
                            {{ errors.message }}
                        </p>
                        <div v-if="requireOtp">
                            <form class="space-y-5 dark:text-white" @submit.prevent="verifyOtp">
                                <div>
                                    <label for="otp">{{ $t('otp_label') }}</label>
                                    <div class="relative text-white-dark">
                                        <input id="otp" type="text" :placeholder="$t('placeholder_otp')" class="form-input ps-10 placeholder:text-white-dark" v-model="forms.otp" />
                                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                            <icon-lock-dots :fill="true" />
                                        </span>
                                    </div>
                                    <p v-if="errors.otp" class="text-red-500 text-sm">{{ errors.otp }}</p>
                                </div>
                                <button type="submit" class="btn btn-primary btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {{ $t('signin') }}
                                </button>
                            </form>
                        </div>
                        <div v-else>
                            <form class="space-y-5 dark:text-white" @submit.prevent="verifyUser">
                                <div>
                                    <label for="Email">{{ $t('email') }}</label>
                                    <div class="relative text-white-dark">
                                        <input id="Email" type="email" :placeholder="$t('placeholder_email')" class="form-input ps-10 placeholder:text-white-dark" v-model="forms.email" />
                                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                            <icon-mail :fill="true" />
                                        </span>
                                    </div>
                                    <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
                                </div>
                                <div>
                                    <label for="Password">{{ $t('password') }}</label>
                                    <div class="relative text-white-dark">
                                        <input id="Password" type="password" :placeholder="$t('placeholder_password')" class="form-input ps-10 placeholder:text-white-dark" v-model="forms.password" />
                                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                            <icon-lock-dots :fill="true" />
                                        </span>
                                    </div>
                                    <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>

                                </div>
                                <div>
                                    <label class="flex cursor-pointer items-center">
                                        <input type="checkbox" class="form-checkbox bg-white dark:bg-black" v-model="forms.remember" />
                                        <span class="text-white-dark">{{ $t('remember_me') }}</span>
                                    </label>
                                </div>
                                <button type="submit" class="btn btn-primary btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {{ $t('signin') }}
                                </button>
                            </form>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { computed, reactive, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import appSetting from '@/app-setting';
    import { useAppStore, useAuthStore } from '@/stores';
    import { useRouter } from 'vue-router';
    import { useMeta } from '@/composables/use-meta';
    import { IconCaretDown, IconMail, IconLockDots } from '@components/icon'
    import { ErrorResponse, LoginResponse } from '@/composables/types';
import { fetchWrapper } from '@/composables/fetchers';
    const API_URL = import.meta.env.VITE_API_URL;

    useMeta({ title: 'Login Page' });
    const router = useRouter();
    const store = useAppStore();
    const authStore = useAuthStore(); 
    const i18n = reactive(useI18n());
    const forms = ref({
        email: '',
        password: '',
        remember: false,
        otp: ""
    })
    const errors = ref({
        email: '',
        password: '',
        message: '',
        otp: ""
    });
    const requireOtp = ref(false);


    const changeLanguage = (item: any) => {
        i18n.locale = item.code;
        appSetting.toggleLanguage(item);
    };
    const currentFlag = computed(() => {
        return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
    });

    const resetErrors = () => {
        errors.value = {
            email: '',
            password: '',
            message: '',
            otp: ''
        };
    };

    const verifyUser = async () => {
        resetErrors()

        try {
            const response = await fetchWrapper<LoginResponse>("POST", "/ojk/auth/login", forms.value)
    
            console.log(response)
            if (response.success) {
                if (response.data.require_otp) {
                    requireOtp.value = true;
                } else {
                    console.log("Login success! Token:", response.data.token);
                }
            } else {
                console.log("Login failed:", response.message);
            }
        }
        catch (err: unknown) {
            const errorData = err as ErrorResponse; 
            
            if (errorData?.error_type === "invalid_credential"){
                errors.value.message = "invalid credentials"
            }
            else if (errorData?.error_type === "validation_error") {
                const validationError = errorData.data.error
                errors.value.email = validationError.email ? validationError.email[0] : '';
                errors.value.password = validationError.password ? validationError.password[0] : ''
            }
           
        }
    }

    const verifyOtp = async () => {
        resetErrors()

        try {
            const response = await fetchWrapper<LoginResponse>("POST", "/ojk/auth/verify-otp", forms.value);

            if (response.success && !response.data.require_otp) {
                authStore.user = {
                    username: response.data.name,
                    token: response.data.token,
                    isMultiFactorActive: response.data.is_multi_factor_active
                };

                await authStore.saveToStorage();

                router.push({ name: 'home' }); 
            } else {
                console.log("Login failed:", response.message);
            }
        }
        catch (err: unknown) {
            const errorData = err as ErrorResponse; 
            
            if (errorData?.error_type === "invalid_credential"){
                errors.value.message = "invalid credentials"
            }
            else if (errorData?.error_type === "validation_error") {
                const validationError = errorData.data.error
                errors.value.otp = validationError.otp ? validationError.otp[0] : '';
            }
        }
    }
</script>
