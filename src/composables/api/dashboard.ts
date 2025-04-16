import { fetchWrapper } from "@/composables/fetchers";
import type { BaseResponseRefactor, ResponseDashboard } from "@/composables/types";

export const GetDashboard = async (): Promise<ResponseDashboard> => {
    const response = await fetchWrapper<BaseResponseRefactor<ResponseDashboard>>("GET", "/dashboard");
    if (!response.success) {
        const msg = response.error[0].message
        throw new Error(msg)
    }
    return response.data
}