import { installPlugin, PluginTemplate } from '@/plugins/PluginTemplate';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { settings } from '@/config/httpPlugin';
import { merge } from 'lodash';
import { ProductApis } from '@/plugins/httpCalls/ProductApis';
import { ProductCategoryApis } from '@/plugins/httpCalls/ProductCategoryApis';
import { loadingController } from '@ionic/vue';
import { AlertsPlugin } from '@/plugins/Alerts';
import { UserApis } from '@/plugins/httpCalls/UserApis';

type RequestsQueue = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[]

type Token = string

interface ApiModules {
  products: typeof ProductApis;
  productCategories: typeof ProductCategoryApis;
  user: typeof UserApis;
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
  decline (error: Error) {
    this.queue.forEach((p) => {
      p.reject(error)
    })
    
    this.queue = []
  }
}

export class LoadingHandler {
  private instances: Record<number, HTMLIonLoadingElement> = {}
  
  constructor (private t: any) {
  }
  
  private async createInstance (timeout) {
    const loadingInstance = await loadingController
      .create({
        // cssClass: 'my-custom-class',
        message: this.t("alerts.generic.loading"),
        duration: timeout,
      });
    
    const index = Object.keys(this.instances).length
    
    loadingInstance.onDidDismiss().then(() => this.onDidDismiss())
    
    this.instances[index] = loadingInstance
    
    return loadingInstance
  }
  
  async show (timeout?: number) {
    const loadingInstance = await this.createInstance(timeout)
    
    return await loadingInstance.present();
  }
  
  async hide () {
    const index = Object.keys(this.instances)[0];
    const loadingInstance = this.instances[index]
    
    if (!loadingInstance) {
      return
    }
    
    // Immediatly delete the instance from the array
    // so if there are other pending instances, will detect the right index
    delete this.instances[index]
    
    await loadingInstance.dismiss();
  }
  
  private onDidDismiss () {
    console.log("onDidDismiss")
  }
}

export class HttpPlugin extends PluginTemplate<HttpPluginOptions> {
  private axiosInstance!: AxiosInstance; // & { withLoader<T> (method: string, ...args: any[]): Promise<T> };
  private queue!: HttpQueue;
  protected options!: HttpPluginOptions;
  protected test = 'asdad';
  public loading!: LoadingHandler;
  protected alerts!: AlertsPlugin;
  public api!: ApiModules;
  
  protected onInit (options: HttpPluginOptions) {
    this.setAxiosDefaults();
    this.api = {
      products: ProductApis,
      productCategories: ProductCategoryApis,
      user: UserApis
    };
    this.queue = new HttpQueue();
    this.loading = new LoadingHandler(this.plugins["$t"]);
    this.alerts = this.plugins["$alerts"];
  
    // init an instance of axios
    this.axiosInstance = axios.create(options.axiosInstanceDefault);
  
    // add request interceptor
    this.axiosInstance.interceptors.request.use((request: any) => this.requestInterceptor(request));
    this.axiosInstance.interceptors.response.use((resp) => resp,
      (response: any) => this.responseErrorInterceptor(response));
  
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
      classToInit.loading = this.loading;
      classToInit.alerts = this.alerts;
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
  
  protected createFormDataElement (data: object) {
    const formDataToSend = new FormData();
    
    for (const key in data) {
      const elValue = data[key]
      
      if (elValue instanceof Array) {
        elValue.forEach(el => {
          formDataToSend.append(key + "[]", el);
        })
      } else {
        formDataToSend.append(key, data[key]);
      }
    }
    
    return formDataToSend
  }
  
  protected async requestInterceptor (requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    const tokens = await this.auth.getTokens();
    let accessToken = tokens?.authToken;
    
    // If the user is sending a data to the server, check if there area files.
    // If so, convert data to FormData()
    if (requestConfig.data) {
      let containFiles = false;
      
      for (const entry of Object.values(requestConfig.data)) {
        if ((entry instanceof Array && entry[0] instanceof File)
          || entry instanceof File) {
          containFiles = true
        }
      }
      
      if (containFiles) {
        requestConfig.data = this.createFormDataElement(requestConfig.data)
      }
    }
    
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
  
  protected async responseErrorInterceptor (error: AxiosError): Promise<AxiosError> {
    let errorName
    // const errorStatus = error.response?.status
  
    if (typeof error.response?.data === "string") {
      errorName = "Error"
    } else {
      errorName = error.response?.data?.name || error.response?.data?.error.name
    }
  
    if (errorName === "TokenExpiredException") {
      await this.auth.logout(true)
    }
  
    return Promise.reject(error);
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
