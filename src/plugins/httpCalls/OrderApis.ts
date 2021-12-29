import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { PaginatedResult } from '@/@types/Pagination';
import { Order, OrderProduct, ReadOrderStatusesDto, UpdateOrderProductDto } from '@/@types/Order';
import { OrderStatusEnum } from '@/@enums/order.status.enum';

export class OrderApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/orders';
  
  static async readAll (status?: OrderStatusEnum, userId?: string, limit?: number): Promise<PaginatedResult<Order[]> | undefined> {
    const filters = {}
    
    if (status) {
      filters["filter[status]"] = status
    }
    
    if (userId) {
      filters["filter[user]"] = userId
    }
    
    const queryParams = {
      "sortBy[status]": 1,
      "sortBy[updatedAt]": -1,
      "sortBy[createdAt]": -1,
    }
    
    if (limit) {
      queryParams["limit"] = limit
    }
    
    const result = await this.withLoader<PaginatedResult<Order[]>>("get",
      this.getUrl('', {
        ...queryParams,
        ...filters
      }));
    
    return result?.data;
  }
  
  static async readPending (): Promise<PaginatedResult<Order[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<Order[]>>("get",
      this.getUrl('', {
        "filter[status]": ["pending", "inProgress"],
      }));
    
    return result?.data;
  }
  
  static async readCounters () {
    const result = await this.withLoader<ReadOrderStatusesDto[]>("get", this.getUrl("/statuses"));
  
    return result?.data;
  }
  
  static async read (id: string): Promise<Order | undefined> {
    const result = await this.withLoader<Order>("get", this.getUrl("/" + id))
    
    return result?.data
  }
  
  static async create (products: OrderProduct[]) {
    const result = await this.withLoader<Order>("post", this.getUrl(), {
      products: products.reduce((acc, curr) => {
        acc.push({
          id: curr.product._id,
          qta: curr.qta,
          price: curr.price
        })
  
        return acc;
      }, [] as any[])
    })
  
    return result?.data
  }
  
  static async updateProduct (orderId: string, productId: string, data: UpdateOrderProductDto) {
    const result = await this.withLoader<OrderProduct>("patch", this.getUrl("/" + orderId + "/" + productId), data)
    
    return result?.data
  }
}
