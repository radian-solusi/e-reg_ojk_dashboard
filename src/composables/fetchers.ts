import { useAuthStore } from "@/stores";
import type { methodRequest } from "@composables/types";

export async function fetchWrapper(request: methodRequest, pathUrl: string, data?: any): Promise<any> {
    const authorization = useAuthStore();
    const options: RequestInit = {
        method: request,
        headers: {
            "Content-Type": "application/json",
        }
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    if (authorization.isLogin) {
        const headerAuth = {
            "Authorization": `Bearer ${authorization.getToken}`
        }
        options.headers = {
            ...options.headers,
            ...headerAuth
        }
    }
    
    const urls = import.meta.env.VITE_API_URL + pathUrl;
    const response = await fetch(urls, options);
    return await response.json();
}