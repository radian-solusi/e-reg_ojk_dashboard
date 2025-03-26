<template>
    <p v-if="errors.message" class="text-red-500 text-sm text-center mb-4">
        {{ errors.message }}
    </p>
    <div v-if="requireOtp">
        <form class="space-y-5 dark:text-white" @submit.prevent="verifyOtp">
            <div>
                <label for="otp">{{ $t('otp_label') }}</label>
                <div class="relative text-white-dark">
                    <Input id="otp" type="text" :placeholder="$t('placeholder_otp')" class="form-input ps-10 placeholder:text-white-dark" v-model="forms.otp" />
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
                    <Input id="Email" type="email" v-model="forms.email" :placeholder="$t('placeholder_email')"  class="form-input ps-10 placeholder:text-white-dark"/>
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <icon-mail :fill="true" />
                    </span>
                </div>
                <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
            </div>
            <div>
                <label for="Password">{{ $t('password') }}</label>
                <div class="relative text-white-dark">
                    <Input id="Password" type="password" :placeholder="$t('placeholder_password')" class="form-input ps-10 placeholder:text-white-dark" v-model="forms.password" />
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
            <Buttons 
                as="primary" 
                block 
                :loading="loadingButton"
                otherClass="!mt-6 border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] text-white"
            >
                {{ $t('signin') }}
            </Buttons>
        </form>
    </div>
</template>
<script lang="ts" setup>
import { useLogin } from '@/composables/api';
import { useMeta } from '@/composables/use-meta';
import { Buttons, Input } from "@components/elements";
import { IconLockDots, IconMail } from '@components/icon';

    useMeta({ title: 'Login Page' });

    const { forms, errors, verifyUser, verifyOtp, loadingButton, requireOtp } = useLogin()

</script>
