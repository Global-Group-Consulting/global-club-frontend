import {AuthPluginOptions} from "@/plugins/AuthPlugin";

export const settings: Partial<AuthPluginOptions> = {
  loginUrl: "/api/auth/login",
  logoutUrl: "api/auth/logout",
  refreshTokenUrl: "api/auth/refresh",
  userUrl: "api/auth/user",
  refreshTokenKey: "refreshToken",
  tokenKey: "token",
}
