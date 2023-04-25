import {BasicApisClass} from '@/plugins/httpCalls/basicApisClass';
import { AxiosResponse} from 'axios';

export class NewsApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'news'
  
  static async read (type: 'news' | 'events' = 'news'): Promise<any> {
    const resp: AxiosResponse<any> | undefined = await this.withLoader('get', this.getUrl('/news', {
      type
    }))
    
    return resp?.data
  }
}
