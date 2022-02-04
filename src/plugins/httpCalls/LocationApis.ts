import {BasicApisClass} from '@/plugins/httpCalls/basicApisClass';
import {AxiosResponse} from 'axios';
import {City, Province, Region} from "@/@types/Location";

export class LocationApis extends BasicApisClass {
  static baseUrl = process.env.VUE_APP_BASE_URL + '/api/geo';
  
  static async provinces(region: string) {
    const resp: AxiosResponse<Province[]> | undefined = await this.withLoader("get", this.getUrl("/ita/provinces", {
      region
    }));
    
    return resp?.data;
  }
  
  static async regions() {
    const resp: AxiosResponse<Region[]> | undefined = await this.withLoader("get", this.getUrl("/ita/regions"));
    
    return resp?.data;
  }
  
  static async cities(region: string, province: string) {
    const resp: AxiosResponse<City[]> | undefined = await this.withLoader("get", this.getUrl("/ita/comunis", {
      region,
      province
    }));
    
    return resp?.data;
  }
}
