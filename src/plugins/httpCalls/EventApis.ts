import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass'
import { AxiosResponse } from 'axios'
import { GlobalEvent, GlobalEventReservation } from '@/@types/GlobalEvent'
import { PaginatedResult } from '@/@types/Pagination'

export class EventApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'news'
  
  static async readAll (): Promise<GlobalEvent[]> {
    const resp: AxiosResponse<any> | undefined = await this.withLoader('get', this.getUrl('/events'))
    
    return resp?.data
  }
  
  static async read (eventId: string): Promise<GlobalEvent> {
    const resp: AxiosResponse<any> | undefined = await this.withLoader('get', this.getUrl('/events/' + eventId))
    
    return resp?.data
  }
  
  static reservations = {
    readAll: async (eventId: string): Promise<PaginatedResult<GlobalEventReservation[]>> => {
      const resp: AxiosResponse<any> | undefined = await this.withLoader('get', this.getUrl(`/events/${eventId}/reservations`))
      
      return resp?.data
    },
    add: async (eventId: string, data: any): Promise<GlobalEventReservation> => {
      const resp: AxiosResponse<any> | undefined = await this.withLoader('post', this.getUrl(`/events/${eventId}/reservations`), data)
      
      return resp?.data
    }
  }
}
