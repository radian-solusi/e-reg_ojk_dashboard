import type { userlogin, formLogin } from "./authorization"

export type { userlogin, formLogin }

export type methodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';
export * from "./authorization"
export * from "./response"
