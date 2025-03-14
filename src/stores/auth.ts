import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import { fetchWrapper } from '@composables/fetchers';
import { encrypt, decrypt } from '@/composables/security';
import type { userlogin } from '@composables/types';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<userlogin>({
        username: '',
    })
    const returnUrl = ref<string>('/');
    const syncFromStrorage = async () => {
        let auths = localStorage.getItem('auths')
        if (auths) {
            // decrypt
            auths = await decrypt(auths)
            user.value = JSON.parse(auths)
        }
    }
    const saveToStorage = async () => {
        // encrypt
        const encryptedAuth = await encrypt(JSON.stringify(user.value))
        localStorage.setItem('auths', encryptedAuth)
    }

    const isLogin = computed(() => {
        syncFromStrorage()
        return user.value.token ? true : false
    })
    const getToken = computed(() => {
        syncFromStrorage()
        return user.value.token
    })
    const logout = () => {
        user.value = {
            username: '',
        }
        localStorage.removeItem('auths')
        router.push('/login')
    }
    const login = async () => {
        saveToStorage()
    }
    const setReturnUrl = (url: string) => {
        returnUrl.value = url
    }
    const getReturnUrl = () => {
        return returnUrl.value
    }
    return { isLogin, getToken, logout, login, setReturnUrl, getReturnUrl }
})