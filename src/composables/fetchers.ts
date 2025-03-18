import { useAuthStore } from "@/stores";
import type { methodRequest } from "@composables/types";

export async function fetchWrapper<T>(request: methodRequest, pathUrl: string, data?: any): Promise<T> {
    const authorization = useAuthStore();
    await authorization.syncFromStrorage();
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
    
  
    try {
        const urls = import.meta.env.VITE_API_URL + pathUrl;
        const response = await fetch(urls, options);

        let responseData;
        
        try {
            responseData = await response.json();
        } catch (jsonError) {
            throw new Error("Failed to parse JSON response");
        }

        if (!response.ok) {
            return Promise.reject(responseData); 
        }

        return responseData as T;
    } catch (error) {
        throw error;
    }
}