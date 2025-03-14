import { useAuthStore } from "@/stores";

type methodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface headerRequest {
    "Content-Type"?: string
    Authorization?: string
}
interface RequestOption {
    method: methodRequest;
    headers?: headerRequest;
    body?: any
}

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: methodRequest) {
    return (url: string, body: any) => {
        const requestOptions: RequestOption = {
            method,
            headers: {
                ...authHeader(url)
            }
        };
        if (body) {
            if (requestOptions.headers) {
                requestOptions.headers['Content-Type'] = 'application/json';
            }
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions as RequestInit).then(handleResponse);
    }
}

// helper functions

function authHeader(url: string): { Authorization?: string } {
    // return auth header with jwt if user is logged in and request is to the api url
    const { isLogin, getToken } = useAuthStore();
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLogin && isApiUrl) {
        return { Authorization: `Bearer ${getToken}` };
    } else {
        return {};
    }
}

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            const { isLogin, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && isLogin) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}