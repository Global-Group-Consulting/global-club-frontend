import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { Communication, CommunicationAnswerDto } from '@/@types/Communication';

export class CommunicationApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/communications';
  
  static async answer (communicationId: string, data: CommunicationAnswerDto): Promise<Communication | undefined> {
    const result = await this.withLoader<Communication>("put", this.getUrl("/" + communicationId), data)
    
    return result?.data
  }
}
