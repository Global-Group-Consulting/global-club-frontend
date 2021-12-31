import { HttpPluginOptions } from '@/plugins/HttpPlugin';

export const settings: Partial<HttpPluginOptions> = {
  axiosDefault: {
    withCredentials: true,
    headers: {
      'Client-Key': process.env.VUE_APP_CLIENT_KEY
    },
    baseURL: process.env.VUE_APP_BASE_URL
  }
};
