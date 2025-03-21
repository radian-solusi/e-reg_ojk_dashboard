import type { userlogin, formLogin } from "./authorization"
import type { LoginResponse } from "./login";
import type { MultiFactorResponse } from "./multi-factor-auth";
import type { ErrorResponse } from "./error"
import type { SuccessResponse, BaseErrorResponse } from "./response";

export type { userlogin, formLogin, LoginResponse, MultiFactorResponse, SuccessResponse, ErrorResponse, BaseErrorResponse }
export type methodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type colorize = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'dark';

