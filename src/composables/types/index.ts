import type { userlogin, formLogin } from "./authorization"
import type { LoginResponse } from "./login";
import type { MultiFactorResponse } from "./multi-factor-auth";
import type { SuccessResponse, BaseErrorResponse, BaseResponseRefactor } from "./response";
import type { ErrorResponse } from "./error";
import type { ResponseDashboard } from "./dashboard";

export type { userlogin, formLogin, LoginResponse, MultiFactorResponse, SuccessResponse, BaseErrorResponse, ErrorResponse, BaseResponseRefactor }
export type {
    ResponseDashboard
}
export type methodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type colorize = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'dark';
export interface breadcrumb {
    title: string,
    route: string,
    active?: boolean
}
export interface StorageLike {
    setItem(key: string, state: string): void
    getItem(key: string): string | null
}

