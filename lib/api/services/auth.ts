import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../types";
import { ClientPlatforms, UserSources } from "../types";
import { setTokens, clearTokens, getRefreshToken } from "../token";

const IAM = API_CONFIG.IAM_URL;

export async function login(email: string, password: string): Promise<LoginResponse> {
  const data: LoginRequest = {
    provider: "credentials",
    userName: email,
    password,
    token: "",
    platform: ClientPlatforms.Web,
    isCompanyHolding: false,
    companyId: API_CONFIG.COMPANY_ID,
    firstName: "",
    surname: "",
    phoneNumber: "",
    externalProviderUserId: "",
  };

  const result = await apiCall<LoginResponse>(apiClient.post(`${IAM}/Auth/Login`, data));
  setTokens(result.jwt, result.refreshToken);
  return result;
}

export async function register(params: {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
}): Promise<RegisterResponse> {
  const data: RegisterRequest = {
    userName: params.email,
    firstName: params.firstName,
    surname: params.surname,
    email: params.email,
    password: params.password,
    providerId: "",
    companyId: API_CONFIG.COMPANY_ID,
    userSource: UserSources.Manual,
    description: "",
    phoneNumber: params.phoneNumber,
  };

  return apiCall<RegisterResponse>(apiClient.post(`${IAM}/Auth/Register`, data));
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
  const token = getRefreshToken();
  if (!token) throw new Error("No refresh token");

  const result = await apiCall<RefreshTokenResponse>(
    apiClient.post(`${IAM}/Auth/RefreshToken`, {
      refreshToken: token,
      platform: ClientPlatforms.Web,
    })
  );

  setTokens(result.jwt, result.refreshToken);
  return result;
}

export async function logout(): Promise<void> {
  try {
    await apiCall<{ messageCode: string }>(apiClient.post(`${IAM}/Auth/Logout`, {}));
  } finally {
    clearTokens();
  }
}

export async function forgotPassword(email: string): Promise<{ userId: string; email: string }> {
  const data: ForgotPasswordRequest = {
    email,
    companyId: API_CONFIG.COMPANY_ID,
  };
  return apiCall<{ userId: string; email: string }>(
    apiClient.post(`${IAM}/Users/ForgotPassword`, data)
  );
}

export async function resetPassword(token: string, newPassword: string): Promise<{ id: string }> {
  const data: ResetPasswordRequest = { token, newPassword };
  return apiCall<{ id: string }>(apiClient.post(`${IAM}/Users/ResetPassword`, data));
}

export async function updatePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<{ id: string }> {
  return apiCall<{ id: string }>(
    apiClient.post(`${IAM}/Users/UpdatePassword`, { userId, oldPassword, newPassword })
  );
}

export async function getUserDetail(userId: string) {
  return apiCall(
    apiClient.post(`${IAM}/Users/Detail`, { userId, companyId: API_CONFIG.COMPANY_ID })
  );
}
