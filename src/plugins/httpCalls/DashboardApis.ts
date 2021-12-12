import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { Statistic } from '@/@types/Statistics';

export class DashboardApis extends BasicApisClass {

  static baseUrl = super.baseUrl + 'club/dashboard/statistics';
 
  static async readAll (): Promise<Statistic | undefined> {
    const result = await this.withLoader<Statistic>("get", this.getUrl());
    return result?.data;
  }
}