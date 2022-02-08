import { HttpPluginOptions } from '@/plugins/HttpPlugin';

export const settings: Partial<HttpPluginOptions> = {
  axiosDefault: {
    withCredentials: true,
    headers: {
      'Client-Key': process.env.VUE_APP_CLIENT_KEY
    },
    baseURL: process.env.VUE_APP_BASE_URL
  },
  links: {
    "baseUrl": process.env.VUE_APP_BASE_URL as string,
    "filesUrl": process.env.VUE_APP_FILES_URL as string
  }
};
