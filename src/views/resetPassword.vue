<template>
    <p v-if="errors.message" class="text-red-500 text-sm text-center mb-4">
        {{ errors.message }}
    </p>
    <form class="space-y-5 dark:text-white" @submit.prevent="resetPassword">
            <div>
                <label for="password">{{ $t('password') }}</label>
                <div class="relative text-white-dark">
                    <input id="password" type="password" :placeholder="$t('placeholder_password')" class="form-input ps-10 placeholder:text-white-dark" v-model="forms.password" />
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <icon-mail :fill="true" />
                    </span>
                </div>
                <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
            </div>
            <div>
                <label for="password_confirmation">{{ $t('password_confirmation') }}</label>
                <div class="relative text-white-dark">
                    <input id="password_confirmation" type="password" :placeholder="$t('placeholder_password_confirmation')" class="form-input ps-10 placeholder:text-white-dark" v-model="forms.password_confirmation" />
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <icon-lock-dots :fill="true" />
                    </span>
                </div>
                <p v-if="errors.password_confirmation" class="text-red-500 text-sm">{{ errors.password_confirmation }}</p>

            </div>
            <button type="submit" class="btn btn-primary btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {{ $t('save') }}
            </button>
    </form>
</template>
<script lang="ts" setup>
    import { useResetPassword } from '@/composables/api';
    import { useMeta } from '@/composables/use-meta';
    import { IconLockDots, IconMail } from '@components/icon';
    import { onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    useMeta({ title: 'Login Page' });
    const router = useRouter();
    const route = useRoute();
    const {  forms, errors, verifyEmailAndToken, resetPassword} = useResetPassword()

    onMounted(async () => {
        if(!route.query || !route.query.token || !route.query.email) {
            router.push({ name: 'login' }); 
        }

        const isVerified = await verifyEmailAndToken()
        if (!isVerified) {
            router.push({ name: 'login' }); 
        }
    })
   
</script>
