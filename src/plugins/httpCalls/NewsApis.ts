import {BasicApisClass} from '@/plugins/httpCalls/basicApisClass';
import {AxiosRequestConfig, AxiosResponse} from 'axios';

export class NewsApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'news';
  
  static async read() {
    const resp: AxiosResponse<any> | undefined = await this.withLoader("get", this.getUrl("/news"));
    
    return resp?.data;
  }
}
