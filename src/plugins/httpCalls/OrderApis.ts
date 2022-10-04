import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass'
import { PaginatedResult } from '@/@types/Pagination'
import { Order, OrderProduct, ReadOrderStatusesDto, UpdateOrderProductDto, UpdateOrderStatusDto } from '@/@types/Order'
import { OrderStatusEnum } from '@/@enums/order.status.enum'

export class OrderApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/orders'
  
  static async readAll (status?: OrderStatusEnum | OrderStatusEnum[], userId?: string, limit?: number, page?: number, queryFilters?: any): Promise<PaginatedResult<Order[]> | undefined> {
    const filters = {}
    
    if (status) {
      filters['filter[status]'] = status
    }
    
    if (userId) {
      filters['filter[user]'] = userId
    }
    
    if (queryFilters) {
      Object.assign(filters, queryFilters)
    }
    
    const queryParams = {
      'sortBy[status]': 1,
      'sortBy[updatedAt]': -1,
      'sortBy[createdAt]': -1
    }
    
    if (page) {
      queryParams['page'] = page
    }
    
    if (limit) {
      queryParams['limit'] = limit
    }
    
    const result = await this.withLoader<PaginatedResult<Order[]>>('get',
      this.getUrl('', {
        ...queryParams,
        ...filters
      }))
    
    return result?.data
  }
  
  static async readByStatus (statuses: OrderStatusEnum[], page?: number): Promise<PaginatedResult<Order[]> | undefined> {
    const queryParams = {
      'filter[status]': statuses,
      'sortBy[createdAt]': -1,
      'perPage': 10,
    }
    
    if (page) {
      queryParams['page'] = page
    }
    
    const result = await this.withLoader<PaginatedResult<Order[]>>('get',
      this.getUrl('', queryParams))
    
    return result?.data
  }
  
  static async readCounters (filters?: any) {
    const result = await this.withLoader<ReadOrderStatusesDto[]>('get', this.getUrl('/statuses', filters))
    
    return result?.data
  }
  
  static async read (id: string): Promise<Order | undefined> {
    const result = await this.withLoader<Order>('get', this.getUrl('/' + id))
    
    return result?.data
  }
  
  static async create (products: OrderProduct[], notes: string) {
    const result = await this.withLoader<Order>('post', this.getUrl(), {
      products: products.reduce((acc, curr) => {
        acc.push({
          id: curr.product._id,
          qta: curr.qta,
          price: curr.price,
          notes: curr.notes
        })
        
        return acc
      }, [] as any[]),
      notes
    })
    
    return result?.data
  }
  
  static async updateProduct (orderId: string, productId: string, data: UpdateOrderProductDto) {
    const result = await this.withLoader<OrderProduct>('patch', this.getUrl('/' + orderId + '/' + productId), data)
    
    return result?.data
  }
  
  static async updateStatus (orderId: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    const result = await this.withLoader<Order>('patch', this.getUrl('/' + orderId + '/status'), updateOrderStatusDto)
    
    return result?.data
  }
}
