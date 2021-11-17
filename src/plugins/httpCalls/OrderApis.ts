import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { PaginatedResult } from '@/@types/Pagination';
import { Order } from '@/@types/Order';

export class OrderApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/orders';
  
  static async readAll (): Promise<PaginatedResult<Order[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<Order[]>>("get",
      this.getUrl('', {
        "sortBy[status]": 1,
        "sortBy[updatedAt]": -1,
        "sortBy[createdAt]": -1,
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
  
  static async read (id: string): Promise<Order | undefined> {
    const result = await this.withLoader<Order>("get", this.getUrl("/" + id))
    
    return result?.data
  }
}
