import { SuccessResponse } from "./response";

export interface userlogin {
    username: string,
    token?: string,
    expired?: string | number,
}

export interface formLogin {
    email: string,
    password: string
    remember?: boolean
}

export interface LoginSuccess {
    require_otp: false;
    token: string;
}

export interface LoginRequiresOTP {
    require_otp: true;
    user_email: string;
}

export type LoginResponse = SuccessResponse<LoginSuccess | LoginRequiresOTP>;
