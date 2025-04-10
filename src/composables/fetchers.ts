import { useAuthStore } from "@/stores";
import type { methodRequest } from "@composables/types";

export async function fetchWrapper<T>(request: methodRequest, pathUrl: string, data?: any): Promise<T> {
    const authorization = useAuthStore();
    await authorization.syncFromStorage();
    const options: RequestInit = {
        method: request,
        headers: {
            "Content-Type": "application/json",
        }
    }

    if (data) {
        if (request.toLowerCase() === "get") {
            // add query params
            pathUrl += `?${new URLSearchParams(data).toString()}`
        } else options.body = JSON.stringify(data);
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
        } catch (jsonErrr) {
            throw new Error("Failed to parse JSON response", { cause: jsonErrr });
        }

        if (!response.ok) {
            return Promise.reject(responseData); 
        }

        return responseData as T;
    } catch (error) {
        throw error;
    }
}