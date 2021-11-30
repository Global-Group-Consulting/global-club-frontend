import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { PaginatedResult } from '@/@types/Pagination';
import { Movement } from '@/@types/Movement';

export class MovementApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/movements';
  
  static async readAll (userId: string): Promise<PaginatedResult<Movement[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<Movement[]>>("get",
      this.getUrl('/' + userId, {
        "sortBy[created_at]": -1,
      }));
    
    return result?.data;
  }
}
