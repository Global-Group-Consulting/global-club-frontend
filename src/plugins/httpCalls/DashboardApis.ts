import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { Statistics } from '@/@types/Statistics';

export class DashboardApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/dashboard/statistics';
  
  static async readAll (userId?: string): Promise<Statistics | undefined> {
    const params = {}
    
    if (userId) {
      params["userId"] = userId
    }
    
    const result = await this.withLoader<Statistics>("get", this.getUrl("", params));
    return result?.data;
  }
}
