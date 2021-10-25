import { AxiosInstance } from 'axios';
import { LoadingHandler } from '@/plugins/HttpPlugin';
import { AlertsPlugin } from '@/plugins/Alerts';

export class BasicApisClass {
   static baseUrl = 'api/ext/';
   static axiosInstance: AxiosInstance;
   static loading: LoadingHandler
   static alerts: AlertsPlugin
   
   static getUrl (endpoint = '') {
      return this.baseUrl + endpoint;
   }
   
   static async withLoader (method, ...args) {
      let result;
      let error;
      
      await this.loading.show()
      
      try {
         result = await this.axiosInstance[method](...args);
      } catch (er) {
         console.error(er)
         error = er
      } finally {
         await this.loading.hide()
      }
      
      if (result) {
         return result
      } else if (error) {
         await this.alerts.error(error);
   
         throw error
      }
   }
   
}
