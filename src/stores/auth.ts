import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import { fetchWrapper } from '@composables/fetchers';
import { encrypt, decrypt } from '@/composables/security';
import type { userlogin, formLogin } from '@composables/types';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<userlogin>({
        username: '',
        token: '',
        isMultiFactorActive: false,
    })
    const returnUrl = ref<string>('/');
    const isSynced = ref(false)
    const syncFromStorage = async () => {
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
        localStorage.setItem('auths', encryptedAuth || "")
        isSynced.value = true
    }

    const isLogin = computed(() => {
        return user.value.token ? true : false
    })
    const isMultiFactorActive = computed(() => {
        return user.value.isMultiFactorActive
    })
    const getToken = computed(() => {
        if (!isSynced.value) {
            syncFromStorage()
        }
        return user.value.token
    })
    const getUsername = computed(() => {
        return user.value.username
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
    return { user, isLogin, isMultiFactorActive, syncFromStorage, saveToStorage, getToken, getUsername, logout, login, setReturnUrl, getReturnUrl }
})