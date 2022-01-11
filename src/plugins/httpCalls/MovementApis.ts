import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { PaginatedResult } from '@/@types/Pagination';
import { Movement } from '@/@types/Movement';

export class MovementApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/movements';
  
  static async readAll (userId: string, semesterId?: string): Promise<PaginatedResult<Movement[]> | undefined> {
    const filters = { "sortBy[created_at]": -1 }
  
    if (semesterId) {
      filters["filter[semesterId]"] = semesterId
    }
  
    const result = await this.withLoader<PaginatedResult<Movement[]>>("get",
      this.getUrl('/' + userId, { ...filters }));
  
    return result?.data;
  }
  
  static async checkEnough (userId: string, amount: number): Promise<PaginatedResult<Movement[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<Movement[]>>("get",
      this.getUrl('/' + userId + "/checkEnough", { amount }));
    
    return result?.data;
  }
}
