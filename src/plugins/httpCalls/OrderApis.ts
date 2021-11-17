import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { PaginatedResult } from '@/@types/Pagination';
import { Order } from '@/@types/Order';

export class OrderApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/orders';
  
  static async readAll (): Promise<PaginatedResult<Order[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<Order[]>>("get", this.getUrl());
    
    return result?.data;
  }
  
  static async readPending (): Promise<PaginatedResult<Order[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<Order[]>>("get",
      this.getUrl("?filter[status]=pending&filter[status]=inProgress"));
    
    return result?.data;
  }
}
