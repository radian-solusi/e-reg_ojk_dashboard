import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import { fetchWrapper } from '@composables/fetchers';
import { encrypt, decrypt } from '@/composables/security';
import type { userlogin, formLogin } from '@composables/types';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<userlogin>({
        username: '',
    })
    const returnUrl = ref<string>('/');
    const isSynced = ref(false)
    const syncFromStrorage = async () => {
        let auths = localStorage.getItem('auths')
        if (auths) {
            // decrypt
            auths = await decrypt(auths)
            user.value = JSON.parse(auths)
        }
        isSynced.value = true;
    }
    
    const saveToStorage = async () => {
        // encrypt
        const encryptedAuth = await encrypt(JSON.stringify(user.value))
        localStorage.setItem('auths', encryptedAuth)
        isSynced.value = true
    }

    const isLogin = computed(() => {
        return user.value.token ? true : false
    })
    const getToken = computed(() => {
        if (!isSynced.value) {
            syncFromStrorage()
        }
        return user.value.token
    })
    const logout = () => {
        user.value = {
            username: '',
        }
        localStorage.removeItem('auths')
        router.push('/login')
        isSynced.value = false
    }
    const login = async (form: formLogin): Promise<{ status: boolean, message?: string}> => {
        const responseLogin = await fetchWrapper('POST','/login', form);
        await saveToStorage()
        return {
            status: true,
        }
    }
    const setReturnUrl = (url: string) => {
        returnUrl.value = url
    }
    const getReturnUrl = () => {
        return returnUrl.value
    }
    return { user, isLogin, saveToStorage, getToken, logout, login, setReturnUrl, getReturnUrl }
})