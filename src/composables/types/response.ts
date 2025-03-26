/**
 * Base response structure for all API responses
 */
interface BaseResponse {
    success: boolean;
    code: number;
    message: string;
  }
  
  /**
   * Structure for successful responses
   * @template T - Type of the data payload
   */
  export interface SuccessResponse<T> extends BaseResponse {
    success: true;
    data: T;
    errors: null;
  }
  
  /**
   * Structure for error responses
   */
  interface BaseApiError{
    message: string;
    type: string;
  }

  export interface BaseErrorResponse<T extends BaseApiError> extends BaseResponse {
    success: false;
    data: null;
    errors: T[];
  }
  
