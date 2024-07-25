// apiServices.d.ts

interface PostRequestPayload {
  [key: string]: any;
}

interface ApiResponse {
  message?: string;
  [key: string]: any;
}

declare module './../../../services/apiServices' {
  export const postRequest: (url: string, data?: PostRequestPayload) => Promise<ApiResponse>;
  export const getRequest: (url: string) => Promise<ApiResponse>;
  export const putRequest: (url: string, data?: PostRequestPayload) => Promise<ApiResponse>;
  export const deleteRequest: (url: string) => Promise<ApiResponse>;
}
