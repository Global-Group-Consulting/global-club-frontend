import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { PaginatedResult } from '@/@types/Pagination';
import { CreateManualMovementDto, Movement } from '@/@types/Movement';

export class MovementApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/movements';
  
  static async readAll(userId: string, semesterId?: string, page?: string): Promise<PaginatedResult<Movement[]> | undefined> {
    const filters = {"sortBy[createdAt]": -1}
    
    if (semesterId) {
      filters["filter[semesterId]"] = semesterId
    }
    
    if (page) {
      filters["page"] = page;
    }
    
    const result = await this.withLoader<PaginatedResult<Movement[]>>("get",
      this.getUrl('/' + userId, {...filters}));
    
    return result?.data;
  }
  
  static async checkEnough (userId: string, amount: number): Promise<PaginatedResult<Movement[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<Movement[]>>('get',
      this.getUrl('/' + userId + '/checkEnough', { amount }));
    
    return result?.data;
  }
  
  static async manualAdd (userId: string, data: CreateManualMovementDto): Promise<Movement | undefined> {
    const result = await this.withLoader<Movement>('post',
      this.getUrl('/' + userId), data);
    
    return result?.data;
  }
  
  static async manualRemove (userId: string, data: CreateManualMovementDto): Promise<Movement | undefined> {
    const result = await this.withLoader<Movement>('delete',
      this.getUrl('/' + userId), {
        data
      });
    
    return result?.data;
  }
}
