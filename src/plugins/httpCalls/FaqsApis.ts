import {BasicApisClass} from '@/plugins/httpCalls/basicApisClass';
import { AxiosResponse} from 'axios';

export class FaqsApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'news';
  
  static async read() {
    const resp: AxiosResponse<any> | undefined = await this.withLoader("get", this.getUrl("/faqs"));
    
    return resp?.data;
  }
}
