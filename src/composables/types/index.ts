import type { userlogin, formLogin } from "./authorization"

export type { userlogin, formLogin }

export type methodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type colorize = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'dark';
export interface breadcrumb {
    title: string,
    route: string,
    active?: boolean
}