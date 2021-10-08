import {HttpPluginOptions} from "@/plugins/HttpPlugin";

export const settings: Partial<HttpPluginOptions> = {
  axiosDefault: {
    baseURL: process.env.VUE_APP_BASE_URL
    
  }
}
