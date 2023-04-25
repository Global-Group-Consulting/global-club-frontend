import {AuthPluginOptions} from "@/plugins/AuthPlugin";

export const settings: Partial<AuthPluginOptions> = {
  loginUrl: process.env.VUE_APP_BASE_URL + "/api/auth/login",
  logoutUrl: process.env.VUE_APP_BASE_URL + "/api/auth/logout",
  forgotUrl: process.env.VUE_APP_BASE_URL + "/api/auth/forgot",
  activateUrl: process.env.VUE_APP_BASE_URL + "/api/auth/activate",
  refreshTokenUrl: process.env.VUE_APP_BASE_URL + "/api/auth/refresh",
  userUrl: process.env.VUE_APP_BASE_URL + "/api/auth/user",
  refreshTokenKey: "refreshToken",
  tokenKey: "token",
}
