import {BasicApisClass} from '@/plugins/httpCalls/basicApisClass';
import {Communication, CommunicationAnswerDto, MessageRead} from '@/@types/Communication';

export class CommunicationApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/communications';
  
  static async answer(communicationId: string, data: CommunicationAnswerDto): Promise<Communication | undefined> {
    const result = await this.withLoader<Communication>("put", this.getUrl("/" + communicationId), data)
    
    return result?.data
  }
  
  static async setMessageAsRead(communicationId: string, message: string): Promise<MessageRead> {
    return await this.axiosInstance.patch(this.getUrl("/" + communicationId), {
      message
    })
  }
}
