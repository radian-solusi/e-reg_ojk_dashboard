import { SuccessResponse } from "./response"

export interface GetMultiFactorSuccess {
    qr_code: string,
    recovery_codes: string[]
}

export type MultiFactorResponse = SuccessResponse<GetMultiFactorSuccess>;