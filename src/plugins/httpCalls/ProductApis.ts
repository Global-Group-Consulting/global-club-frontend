import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { Product, ProductCreateDto, ProductUpdateDto } from '@/@types/Product';
import { PaginatedResult } from '@/@types/Pagination';

export class ProductApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/products';
  
  static async readAll (filters?: Record<string, string>): Promise<PaginatedResult<Product[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<Product[]>>("get", this.getUrl("/", filters));
    
    return result?.data;
  }
  
  static async read (id: string): Promise<Product | undefined> {
    const result = await this.withLoader<Product>("get", this.getUrl('/' + id))
    
    return result?.data
  }
  
  static async create (data: ProductCreateDto): Promise<Product | undefined> {
    const result = await this.withLoader<Product>("post", this.getUrl(), data);
    
    return result?.data;
  }
  
  static async update (data: ProductUpdateDto, id): Promise<Product | undefined> {
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
