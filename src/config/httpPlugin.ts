import {HttpPluginOptions} from "@/plugins/HttpPlugin";

export const settings: Partial<HttpPluginOptions> = {
  axiosDefault: {
    withCredentials: true
  }
}
