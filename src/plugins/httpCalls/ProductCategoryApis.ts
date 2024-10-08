import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass'
import { ProductCategory } from '@/@types/ProductCategory'
import { UpdateProductCategoryDto } from '@/views/admin/productCategories/dto/update.product.category.dto'
import { CreateProductCategoryDto } from '@/views/admin/productCategories/dto/create.product.category.dto'
import { PaginatedResult } from '@/@types/Pagination'

export class ProductCategoryApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/product-categories'
  
  static async readAll (filters?: any): Promise<PaginatedResult<ProductCategory[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<ProductCategory[]>>('get', this.getUrl('', {
      'sortBy[title]': 1,
      ...filters
    }))
    
    return result?.data
  }
  
  static async readAllRaw (filters?: Record<string, any>): Promise<ProductCategory[] | undefined> {
    
    const result = await this.withLoader<ProductCategory[]>('get', this.getUrl('/raw',
      {
        'sortBy[title]': 1,
        ...filters
      }))
    
    return result?.data
  }
  
  static async read (id: string): Promise<ProductCategory | undefined> {
    const result = await this.withLoader<ProductCategory>('get', this.getUrl('/' + id))
    
    return result?.data
  }
  
  static async create (data: CreateProductCategoryDto): Promise<ProductCategory | undefined> {
    const result = await this.withLoader<ProductCategory>('post', this.getUrl(), data)
    
    return result?.data
  }
  
  static async update (data: UpdateProductCategoryDto, id: string): Promise<ProductCategory | undefined> {
    const result = await this.withLoader<ProductCategory>('patch', this.getUrl('/' + id), data)
    
    return result?.data
  }
  
  static async deleteCategory (id: string) {
    const result = await this.withLoader<ProductCategory>('delete', this.getUrl(`/${id}`))
    
    return result?.data
  }
  
  static async deleteThumbnail (id: string): Promise<ProductCategory | undefined> {
    const result = await this.withLoader<ProductCategory>('delete', this.getUrl(`/${id}/thumbnail`))
    
    return result?.data
  }
  
}
