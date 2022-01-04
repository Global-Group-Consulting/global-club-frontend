import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { Statistics } from '@/@types/Statistics';

export class DashboardApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/dashboard/statistics';
 
  static async readAll (): Promise<Statistics | undefined> {
    const result = await this.withLoader<Statistics>("get", this.getUrl());
    return result?.data;
  }
}
