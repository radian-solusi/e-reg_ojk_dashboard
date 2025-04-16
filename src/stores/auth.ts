import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import { encrypt, decrypt } from '@/composables/security';
import type { userlogin, StorageLike } from '@composables/types';

const customStorage: StorageLike = {
    setItem(key: string, state: string) {
        const encrypted = encrypt(state);
        return localStorage.setItem('authorization', encrypted);
    },
    getItem(key: string): string | null {
        const state = localStorage.getItem(key);
        if (state === null) return null;
        const decrypted = decrypt(state as string);
        return decrypted
    },
}


export const useAuthStore = defineStore('auth', () => {
    const user = ref<userlogin>({
        username: '',
        token: '',
        isMultiFactorActive: false,
    })
    const returnUrl = ref<string>('/');

    const isLogin = computed(() => {
        return user.value.token ? true : false
    })
    const isMultiFactorActive = computed(() => {
        return user.value.isMultiFactorActive
    })
    const getToken = computed(() => {
        return user.value.token
    })
    const getUsername = computed(() => {
        return user.value.username
    })
    const logout = () => {
        user.value.username = ''
        user.value.token = ''
        user.value.isMultiFactorActive = false
        router.push('/login')
    }
    const activateMultiFactor = () => {
        user.value.isMultiFactorActive = true;
    };

    const setReturnUrl = (url: string) => {
        returnUrl.value = url
    }
    const getReturnUrl = () => {
        return returnUrl.value
    }

    const login = (payload: userlogin) => {
        user.value = payload
    }
    return { user, isLogin, isMultiFactorActive,  getToken, getUsername, logout, activateMultiFactor, setReturnUrl, getReturnUrl, login }
},{
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'authorization',
                paths: ['user'],
                storage: customStorage as Storage
            }
        ]
    }
})
