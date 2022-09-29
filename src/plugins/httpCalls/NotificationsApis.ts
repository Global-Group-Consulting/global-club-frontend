import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass'
import { AxiosResponse } from 'axios'
import { PaginatedResult } from '@/@types/Pagination'
import { Notification } from '@/@types/Notifications'

export class NotificationsApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'notifications'
  
  static async getUnread (): Promise<PaginatedResult<Notification[]> | undefined> {
    const resp: AxiosResponse<PaginatedResult<Notification[]>> | undefined = await this.withLoader('get', this.getUrl('/notifications', {
      'platform': 'app'
    }), {})
    
    return resp?.data
  }
  
  static async getRead (): Promise<PaginatedResult<Notification[]> | undefined> {
    const resp: AxiosResponse<PaginatedResult<Notification[]>> | undefined = await this.withLoader('get', this.getUrl('/notifications', {
      'platform': 'app',
      'read': true
    }), {})
    
    return resp?.data
  }
  
  static async getCounters (): Promise<PaginatedResult<{ read: number; unread: number }> | undefined> {
    const resp: AxiosResponse<PaginatedResult<{ read: number; unread: number }>> | undefined = await this.axiosInstance.get(this.getUrl('/notifications/counters', {
      'platform': 'app'
    }))
    
    return resp?.data
  }
  
  static async readAll (): Promise<void | undefined> {
    const resp: AxiosResponse<any> | undefined = await this.withLoader('patch', this.getUrl(`/notifications/all/read`,
      {
        'platform': 'app'
      }), {})
    
    return resp?.data
  }
  
  static async readByContent (multiReadBy: string): Promise<void | undefined> {
    const resp: AxiosResponse<any> | undefined = await this.makeAxiosCall('patch', false, this.getUrl(`/notifications/${multiReadBy}/readByContent`,
      {
        'platform': 'app'
      }), {})
    
    return resp?.data
  }
  
  static async read (id: string): Promise<void | undefined> {
    const resp: AxiosResponse<any> | undefined = await this.makeAxiosCall('patch', false, this.getUrl(`/notifications/${id}/read`,
      {
        'platform': 'app'
      }), {})
    
    return resp?.data
  }
  
  static async unread (id: string): Promise<void | undefined> {
    const resp: AxiosResponse<any> | undefined = await this.withLoader('patch', this.getUrl(`/notifications/${id}/unread`,
      {
        'platform': 'app'
      }))
    
    return resp?.data
  }
}
