import type { userlogin, formLogin } from "./authorization"
import type { LoginResponse } from "./login";
import type { MultiFactorResponse } from "./multi-factor-auth";
import type { ErrorResponse } from "./error"

export type { userlogin, formLogin, LoginResponse, MultiFactorResponse, ErrorResponse }
export type methodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type colorize = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'dark';

