import { installPlugin, PluginTemplate } from '@/plugins/PluginTemplate';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { settings } from '@/config/httpPlugin';
import { merge } from 'lodash';
import { ProductApis } from '@/plugins/httpCalls/ProductApis';

type RequestsQueue = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[]

type Token = string

interface ApiModules {
  products: typeof ProductApis;
}

class HttpQueue {
  private queue: RequestsQueue = [];
  
  add (callToQueue: { resolve: any; reject: any }) {
    this.queue.push(callToQueue);
  }
  
  /**
   * Function that resolves all items in the queue with the provided token
   * @param token New access token
   */
  resolve (token?: Token) {
    this.queue.forEach((p) => {
      p.resolve(token);
    });
    
    this.queue = [];
  }
  
  /**
   * Function that declines all items in the queue with the provided error
   * @param error Error
   */
  decline(error: Error) {
    this.queue.forEach((p) => {
      p.reject(error)
    })
    
    this.queue = []
  }
}

export class HttpPlugin extends PluginTemplate<HttpPluginOptions> {
  private axiosInstance!: AxiosInstance;
  private queue!: HttpQueue;
  protected options!: HttpPluginOptions;
  protected test = 'asdad';
  public api!: ApiModules;
  
  protected onInit (options: HttpPluginOptions) {
    this.setAxiosDefaults();
    this.api = {
      products: ProductApis
    };
    
    this.queue = new HttpQueue();
    
    // init an instance of axios
    this.axiosInstance = axios.create(options.axiosInstanceDefault);
    
    // add request interceptor
    this.axiosInstance.interceptors.request.use((request: any) => this.requestInterceptor(request));
    this.includeModules();
  }
  
  /**
   * For each module that must be included,
   * set the static axiosInstance to use.
   *
   * @protected
   */
  private async includeModules () {
    for (const entry of Object.entries(this.api)) {
      // const name = entry[0];
      const classToInit = entry[1];
      
      classToInit.axiosInstance = this.axiosInstance;
    }
  }
  
  //****************************************************************************
  //
  // PUBLIC METHODS
  //
  //****************************************************************************
  
  // expose axios methods
  public get = this.axiosInstance.get;
  public post = this.axiosInstance.post;
  
  public rawRequest = axios.request;
  
  //****************************************************************************
  //
  // PRIVATE METHODS
  //
  //****************************************************************************
  
  private get auth () {
    return this.plugins.$auth;
  }
  
  private setAxiosDefaults () {
    // merge global axios defaults
    if (this.options.axiosDefault) {
      merge(axios.defaults, this.options.axiosDefault);
    }
  }
  
  private async requestInterceptor (requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    const tokens = await this.auth.getTokens();
    let accessToken = tokens?.authToken;
    
    // check if exists a refresh token and a token
    if (!tokens) {
      return requestConfig;
    }
    
    // check if is already refreshing token
    if (this.auth.refreshing) {
      /*return new Promise((resolve, reject) => {
        this.queue.add({resolve, reject})
      })
        .then((token) => {
          requestConfig.headers[INTERCEPTOR_CONFIG.header] = `${INTERCEPTOR_CONFIG.headerPrefix}${token}`
          return requestConfig
        })
        .catch(Promise.reject)*/
    }
    
    // check if the token is still valid
    
    try {
      accessToken = await this.auth.refreshTokenIfNeeded(accessToken as string)
      //this.queue.resolve(accessToken)
    } catch (error: any) {
      //this.queue.decline(error)
      throw new Error(`Unable to refresh access token for request due to token refresh error: ${error.message}`)
    }
    
    // add token to headers
    if (accessToken) {
      requestConfig.headers[this.options.authHeader] = `${this.options.authHeaderPrefix}${accessToken}`
    }
    
    return requestConfig
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: HttpPlugin;
  }
}

export interface HttpPluginOptions {
  authHeader: string;
  authHeaderPrefix: string;
  axiosDefault?: AxiosRequestConfig;
  axiosInstanceDefault?: AxiosRequestConfig;
}

export const httpPlugin = installPlugin<HttpPluginOptions>("http", HttpPlugin, {
  authHeader: "Authorization",
  authHeaderPrefix: "Bearer ",
  ...settings
} as HttpPluginOptions)
