import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class FileApis extends BasicApisClass {
  static baseUrl = 'api/files';
  
  static async preview (fileId: string, mimeType: string, fileName?: string) {
    console.log(fileName);
    const resp: AxiosResponse<Blob> | undefined = await this.withLoader("get", this.getUrl("/" + fileId), {
      responseType: "blob",
    } as AxiosRequestConfig);
  
    if (resp?.data) {
      const url = URL.createObjectURL(new Blob([resp.data], {type: mimeType}))
    
      window.open(url, "download")
      URL.revokeObjectURL(url);
    }
  }
}
