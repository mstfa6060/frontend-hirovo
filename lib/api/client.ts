import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "./config";
import { getToken, getRefreshToken, setTokens, clearTokens } from "./token";
import type { ApiResponse, RefreshTokenResponse } from "./types";
import { ClientPlatforms } from "./types";

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach JWT
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 + token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/tr/login";
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post<ApiResponse<RefreshTokenResponse>>(
          `${API_CONFIG.IAM_URL}/Auth/RefreshToken`,
          { refreshToken, platform: ClientPlatforms.Web }
        );

        if (response.data.hasError || !response.data.payload) {
          throw new Error("Token refresh failed");
        }

        const { jwt, refreshToken: newRefreshToken } = response.data.payload;
        setTokens(jwt, newRefreshToken);

        processQueue(null, jwt);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${jwt}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/tr/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Helper to extract payload from ArfBlocks response
export async function apiCall<T>(request: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  const response = await request;
  const data = response.data;

  if (data.hasError && data.error) {
    throw new Error(data.error.message || data.error.code || "API Error");
  }

  return data.payload;
}

export default apiClient;
