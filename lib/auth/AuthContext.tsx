"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { authApi, isLoggedIn, getToken, clearTokens } from "@/lib/api";
import type { LoginResponse } from "@/lib/api/types";

interface AuthUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  companyId: string;
  isCompanyHolding: boolean;
  companyName: string;
  isPhoneVerified: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isEmployer: boolean;
  login: (email: string, password: string, isEmployer?: boolean) => Promise<LoginResponse>;
  register: (params: {
    firstName: string;
    surname: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => Promise<void>;
  registerEmployer: (params: {
    firstName: string;
    surname: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function restoreUserFromToken(): AuthUser | null {
  const token = getToken();
  if (!token) return null;
  const payload = parseJwt(token);
  if (!payload) return null;
  return {
    id: (payload.sub || payload.userId || "") as string,
    username: (payload.userName || payload.email || "") as string,
    displayName: (payload.displayName || payload.fullName || "") as string,
    email: (payload.email || "") as string,
    companyId: (payload.companyId || "") as string,
    isCompanyHolding: (payload.isCompanyHolding || false) as boolean,
    companyName: (payload.companyName || "") as string,
    isPhoneVerified: (payload.isPhoneVerified || false) as boolean,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => restoreUserFromToken());
  const [isLoading, setIsLoading] = useState(false);

  const loginFn = useCallback(async (email: string, password: string, isEmployer = false) => {
    const result = await authApi.login(email, password, isEmployer);
    setUser(result.user);
    return result;
  }, []);

  const registerFn = useCallback(
    async (params: {
      firstName: string;
      surname: string;
      email: string;
      password: string;
      phoneNumber: string;
    }) => {
      await authApi.register(params);
      // Auto-login after register
      await loginFn(params.email, params.password);
    },
    [loginFn]
  );

  const registerEmployerFn = useCallback(
    async (params: {
      firstName: string;
      surname: string;
      email: string;
      password: string;
      phoneNumber: string;
    }) => {
      await authApi.register(params);
      // Auto-login as employer after register
      await loginFn(params.email, params.password, true);
    },
    [loginFn]
  );

  const logoutFn = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Clear tokens even if API call fails
      clearTokens();
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && isLoggedIn(),
        isEmployer: !!user?.isCompanyHolding,
        isLoading,
        login: loginFn,
        register: registerFn,
        registerEmployer: registerEmployerFn,
        logout: logoutFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
