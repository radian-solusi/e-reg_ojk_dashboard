import type { userlogin, formLogin } from "./authorization"

export type { userlogin, formLogin }

export type methodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type colorize = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'dark';
export * from "./authorization"
export * from "./response"
export * from "./multi-factor-auth"
export * from "./login"
