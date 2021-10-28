import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { Product } from '@/@types/Product';
import { AxiosResponse } from 'axios';
import { CreateProductDto } from '@/views/admin/products/dto/create.product.dto';
import { UpdateProductDto } from '@/views/admin/products/dto/update.product.dto';
import { ProductCategory } from '@/@types/ProductCategory';

export class ProductApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/products';
  
  static async readAll (): Promise<Product[] | undefined> {
    const result = await this.withLoader<Product[]>("get", this.getUrl());
    
    return result?.data;
  }
  
  static async read (id: string): Promise<Product | undefined> {
    const result = await this.withLoader<Product>("get", this.getUrl('/' + id))
    
    return result?.data
  }
  
  static async create (data: CreateProductDto): Promise<Product | undefined> {
    const result = await this.withLoader<Product>("post", this.getUrl(), data);
  
    return result?.data;
  }
  
  static async update (data: UpdateProductDto, id): Promise<Product | undefined> {
    const result = await this.withLoader<Product>("patch", this.getUrl('/' + id), data);
    
    return result?.data;
  }
  
  static async deleteProduct (id: string) {
    const result = await this.withLoader<Product>("delete", this.getUrl(`/${id}`))
    
    return result?.data;
  }
  
  static async deleteFile (productId: string, fileId: string): Promise<Product | undefined> {
    const config = {
      data: {
        filesToDelete: [fileId]
      }
    }
    const result = await this.withLoader<Product>("delete", this.getUrl(`/${productId}/files`), config);
    
    return result?.data;
  }
  
}
