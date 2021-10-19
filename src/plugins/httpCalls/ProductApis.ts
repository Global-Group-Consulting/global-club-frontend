import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { Product } from '@/@types/Product';
import { AxiosResponse } from 'axios';

export class ProductApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/';
  
  static async readAll (): Promise<Product[]> {
    const result: AxiosResponse<Product[]> = await this.axiosInstance.get(this.getUrl('products'));
    
    return result.data;
  }
  
  static async read (id: string): Promise<Product> {
    
    return 'ciao' as any;
  }
}
