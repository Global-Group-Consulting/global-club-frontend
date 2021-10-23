import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { Product } from '@/@types/Product';
import { AxiosResponse } from 'axios';
import { ProductCategory } from '@/@types/ProductCategory';

export class ProductCategoryApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/product-categories';
  
  static async readAll (): Promise<ProductCategory[]> {
    const result: AxiosResponse<ProductCategory[]> = await this.axiosInstance.get(this.getUrl());
    
    return result.data;
  }
  
  static async read (id: string): Promise<ProductCategory> {
    const result: AxiosResponse<ProductCategory> = await this.axiosInstance.get(this.getUrl('/' + id));
  
    return result.data;
  }
  
  static async create (data): Promise<ProductCategory> {
    const result: AxiosResponse<ProductCategory> = await this.axiosInstance.post(this.getUrl(), data);
    
    return result.data;
  }
  
  static async deleteThumbnail (id: string): Promise<void> {
    const result: AxiosResponse<void> = await this.axiosInstance.delete(this.getUrl(`/${id}/thumbnail`));
    
    return result.data;
  }
  
}
