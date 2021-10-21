import { AxiosInstance } from 'axios';

export class BasicApisClass {
   static baseUrl = 'api/ext/';
   static axiosInstance: AxiosInstance;
   
   static getUrl (endpoint = '') {
      return this.baseUrl + endpoint;
   }
}
