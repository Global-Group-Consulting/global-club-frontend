import { AxiosInstance, AxiosResponse } from 'axios'
import { LoadingHandler } from '@/plugins/HttpPlugin'
import { AlertsPlugin } from '@/plugins/Alerts'
import { bool } from 'yup'

export class BasicApisClass {
  static baseUrl = 'api/ext/'
  static axiosInstance: AxiosInstance
  static loading: LoadingHandler
  static alerts: AlertsPlugin
  
  static getUrl (endpoint = '', queryParams?: Record<string, any> | null) {
    const urlParams: string[] = []
    
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] instanceof Array) {
          queryParams[key].forEach(arrItem => {
            urlParams.push(key + '=' + arrItem)
          })
        } else {
          urlParams.push(key + '=' + queryParams[key])
        }
      })
    }
    
    return this.baseUrl + endpoint + (queryParams ? '?' + urlParams.join('&') : '')
  }
  
  private static async makeAxiosCall (method, ...args) {
    let result
    let error
    
    if (method === 'delete' && args.length > 1 && !args[1].data) {
      console.error('[HTTP_PLUGIN] - Seems that you\'re trying to send extra data in a \'DELETE\' request.\n'
        + 'To accomplish this, you must use AxiosRequestConfig object as the second argument instead on the provided object.\n'
        + 'Ex:', { data: { filesToDelete: ['as6sad86a87d6'] } })
    }
    
    try {
      await this.loading.show()
      result = await this.axiosInstance[method](...args)
    } catch (er) {
      console.error(er)
      error = er
    } finally {
      await this.loading.hide()
    }
    
    if (result) {
      return Promise.resolve(result)
    } else if (error) {
      return Promise.reject(error)
    }
  }
  
  /**
   *
   * @param {string} method
   * @param {boolean?} showErrorAlert
   * @param args
   */
  static async withLoader<T> (method: string, showErrorAlert: boolean, ...args: any): Promise<AxiosResponse<T> | undefined>;
  static async withLoader<T> (method: string, ...args: any): Promise<AxiosResponse<T> | undefined>;
  static async withLoader<T> (method: string, ...args: any[]): Promise<AxiosResponse<T> | undefined> {
    let showErrorAlert = true
    
    if (args.length && typeof args[0] === 'boolean') {
      showErrorAlert = args[0]
      
      args.shift()
    }
    
    try {
      return await this.makeAxiosCall(method, ...args)
    } catch (error) {
      if (showErrorAlert) {
        await this.alerts.error(error)
      }
      
      throw error
    }
    /*let result
    let error
    
    if (method === 'delete' && args.length > 1 && !args[1].data) {
      console.error('[HTTP_PLUGIN] - Seems that you\'re trying to send extra data in a \'DELETE\' request.\n'
        + 'To accomplish this, you must use AxiosRequestConfig object as the second argument instead on the provided object.\n'
        + 'Ex:', { data: { filesToDelete: ['as6sad86a87d6'] } })
    }
    
    try {
      await this.loading.show()
      result = await this.axiosInstance[method](...args)
    } catch (er) {
      console.error(er)
      error = er
    } finally {
      await this.loading.hide()
    }
    
    if (result) {
      return result
    } else if (error) {
      await this.alerts.error(error)
      
      throw error
    }*/
  }
  
  static async callAndWait<T> (method, showErrorAlert = true, ...args): Promise<AxiosResponse<T> | undefined> {
    try {
      return await this.makeAxiosCall(method, args)
    } catch (error) {
      if (showErrorAlert) {
        await this.alerts.error(error)
      }
      
      throw error
    }
  }
  
  static prepareFilterParams (filters: Record<string, string | number>) {
    const toReturn = {}
    
    Object.entries(filters).forEach(entry => {
      toReturn[`filter[${entry[0]}]`] = entry[1]
    })
    
    return toReturn
  }
}
