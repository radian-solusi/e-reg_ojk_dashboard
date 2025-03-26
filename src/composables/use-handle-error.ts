import { Ref } from "vue";
import { ErrorResponse } from "@/composables/types";

export function useHandleError(errors: Ref<{ [key: string]: string }>) {
    const processErrors = (errorResponse: ErrorResponse) => {

        // reset error
        Object.keys(errors.value).forEach(key => errors.value[key] = "");

        // handle different types of error
        errorResponse.errors.forEach(err => {
            if (err.type === "validation_error") {
                errors.value[err.field] = err.message;
            } else {
                errors.value.message = err.message;
            }
        });
    };

    return { processErrors };
}
