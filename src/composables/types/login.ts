import { SuccessResponse } from "./response";

interface LoginSuccess {
    require_otp: false;
    token: string;
    name: string;
    is_multi_factor_active: boolean;
}

interface LoginRequiresOTP {
    require_otp: true;
    user_email: string;
}

export type LoginResponse = SuccessResponse<LoginSuccess | LoginRequiresOTP>;