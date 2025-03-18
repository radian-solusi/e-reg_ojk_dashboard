import { SuccessResponse } from "./response";

export interface LoginSuccess {
    require_otp: false;
    token: string;
}

export interface LoginRequiresOTP {
    require_otp: true;
    user_email: string;
}

export type LoginResponse = SuccessResponse<LoginSuccess | LoginRequiresOTP>;