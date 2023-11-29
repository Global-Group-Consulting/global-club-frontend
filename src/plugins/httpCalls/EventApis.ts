import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { GlobalEvent, GlobalEventReservation } from '@/@types/GlobalEvent'
import { PaginatedResult } from '@/@types/Pagination'
import { EventReservationStatus } from '@/@enums/event.reservation.status'
// @ts-ignore
import jsFileDownload from 'js-file-download'

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
    readAll: async (payload: any): Promise<PaginatedResult<GlobalEventReservation[]>> => {
      const resp: AxiosResponse<any> | undefined = await this.withLoader('get', this.getUrl(`/events/${payload.eventId}/reservations`, {
        page: payload.page || 1,
        userId: payload.userId || null,
        status: payload.status || null,
        referenceAgent: payload.referenceAgent || null,
      }))
      
      return resp?.data
    },
    upsert: async (eventId: string, data: any): Promise<GlobalEventReservation> => {
      const resp: AxiosResponse<any> | undefined = await this.withLoader('post', this.getUrl(`/events/${eventId}/reservations`), data)
      
      return resp?.data
    },
    updateStatus: async (eventId: string, reservationId: string, status: EventReservationStatus): Promise<GlobalEventReservation> => {
      const resp: AxiosResponse<any> | undefined = await this.withLoader('patch', this.getUrl(`/events/${eventId}/reservations/${reservationId}/status`), { status })
      
      return resp?.data
    },
    counters: async (eventId: string): Promise<any> => {
      const resp: AxiosResponse<any> | undefined = await this.makeAxiosCall('get',false,  this.getUrl(`/events/${eventId}/reservations/counters`))
      
      return resp?.data
    },
    sendPassNotification: async (eventId: string, reservationId: string, passCode: string): Promise<GlobalEventReservation> => {
      const resp: AxiosResponse<any> | undefined = await this.withLoader('post', this.getUrl(`/events/${eventId}/reservations/${reservationId}/statusNotify/${passCode}`))
      
      return resp?.data
    },
  }
  
  static async getExportAccesses (eventId: string) {
    const url = this.getUrl(`/events/${eventId}/accesses/export`)
    
    const resp: AxiosResponse<any> | undefined = await this.withLoader('get', url, {
      responseType: 'blob',
      headers: {
        Accept: 'arraybuffer',
      }
    } as AxiosRequestConfig)
    
    if (resp?.data) {
      const fileName = resp.headers["content-disposition"]?.split('filename=')[1] ?? 'export.xlsx'
      
      jsFileDownload(resp.data, fileName)
    }
    
    return resp?.data
  }
}
