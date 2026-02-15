import Cookies from "js-cookie";

const TOKEN_KEY = "hirovo_jwt";
const REFRESH_TOKEN_KEY = "hirovo_refresh";

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  secure: typeof window !== "undefined" && window.location.protocol === "https:",
  sameSite: "Strict",
  path: "/",
};

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

export function setTokens(jwt: string, refreshToken: string) {
  Cookies.set(TOKEN_KEY, jwt, { ...COOKIE_OPTIONS, expires: 1 });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { ...COOKIE_OPTIONS, expires: 30 });
}

export function clearTokens() {
  Cookies.remove(TOKEN_KEY, { path: "/" });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
}

export function isLoggedIn(): boolean {
  return !!getToken();
}
