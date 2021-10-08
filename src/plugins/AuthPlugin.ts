import {installPlugin, PluginTemplate} from "@/plugins/PluginTemplate";
import {HttpPlugin} from "@/plugins/HttpPlugin"
import {Storage} from '@ionic/storage';
import {settings} from "@/config/authPlugin";
import * as jwt from "jsonwebtoken";


interface LoginDto {
  email: string;
  password: string;
}

export interface Tokens {
  authToken: string;
  refreshToken: string;
}

export class AuthPlugin extends PluginTemplate<AuthPluginOptions> {
  private isRefreshing = false
  private storage!: Storage
  protected options!: AuthPluginOptions
  
  protected onInit() {
    this.storage = new Storage()
    
    this.storage.create()
      .then(async () => {
        const tokens = await this.readTokens()
        
        if (tokens) {
          await this.fetchUser()
        }
      })
  }
  
  //****************************************************************************
  //
  // PUBLIC METHODS
  //
  //****************************************************************************
  
  
  /**
   * Make the call to the server for logging in the user
   * and retrieving the jwt token
   */
  public async login(data: LoginDto) {
    // controllare se non esiste già un token
    // per evitare di fare troppi login
    
    try {
      const result = await this.http.rawRequest({
        method: "POST",
        url: this.options.loginUrl,
        data
      })
      
      await this.storeToken({
        authToken: result.data[this.options.tokenKey],
        refreshToken: result.data[this.options.refreshTokenKey],
      })
      
      await this.fetchUser()
    } catch (e) {
      console.error(e)
    }
  }
  
  public async logout() {
    await this.cleanToken()
    await this.store.dispatch("auth/setUser", null)
  }
  
  /**
   * Fetch user data
   */
  public async fetchUser() {
    try {
      const result = await this.http.get(this.options.userUrl)
      
      const user = result.data;
      
      if (user) {
        await this.store.dispatch("auth/setUser", user)
      }
    } catch (er: any) {
      throw new Error(`Failed to fetch user: ${er.message}`);
    }
  }
  
  /**
   * Get the token from the stored location and return it
   */
  public async getTokens(): Promise<Tokens | undefined> {
    return this.readTokens()
  }
  
  public async refreshTokenIfNeeded(token: string): Promise<string> {
    // use access token (if we have it)
    let accessToken = token
    
    // check if access token is expired
    if (!accessToken || this.isTokenExpired(accessToken)) {
      // do refresh
      accessToken = await this.refreshRefreshToken()
    }
    
    return accessToken
  }
  
  get http(): HttpPlugin {
    return this.plugins.$http
  }
  
  get refreshing() {
    return this.isRefreshing
  }
  
  //****************************************************************************
  //
  // PRIVATE METHODS
  //
  //****************************************************************************
  
  private async readTokens(): Promise<Tokens | undefined> {
    const tokensJson = await this.storage.get(this.options.storageKey)
    
    const tokensObject: Tokens = JSON.parse(tokensJson)
    
    if (tokensObject && tokensObject.authToken && tokensObject.refreshToken) {
      // update the auth store module logged state
      await this.store.dispatch("auth/setLoggedState", !!tokensJson)
      
      return tokensObject
    }
    
    await this.logout()
  }
  
  private async storeToken(tokens: Tokens) {
    // Store the keys in the main storage
    await this.storage.set(this.options.storageKey, JSON.stringify(tokens))
    
    // update the auth store module logged state
    await this.store.dispatch("auth/setLoggedState", true)
  }
  
  private async cleanToken() {
    // Remove the keys in the main storage
    await this.storage.remove(this.options.storageKey)
    
    // update the auth store module logged state
    await this.store.dispatch("auth/setLoggedState", false)
  }
  
  /**
   * Checks if the token is undefined, has expired or is about the expire
   *
   * @param {string} token - Access token
   * @returns Whether or not the token is undefined, has expired or is about the expire
   */
  private isTokenExpired(token: string): boolean {
    if (!token) return true
    const expiresIn = this.getExpiresIn(token)
    return !expiresIn || expiresIn <= 10
  }
  
  /**
   * Gets the unix timestamp from an access token
   *
   * @param {string} token - Access token
   * @returns {string} Unix timestamp
   */
  private getTimestampFromToken(token: string): number | undefined {
    const decoded = jwt.decode(token) as { [key: string]: number }
    
    const expDate = (new Date(decoded.exp * 1000))
    
    console.log("Checking expiration date", decoded)
    console.log(new Date(), expDate)
    
    return decoded ? decoded.exp : undefined
  }
  
  /**
   * Returns the number of seconds before the access token expires or -1 if it already has
   *
   * @param {string} token - Access token
   * @returns {number} Number of seconds before the access token expires
   */
  private getExpiresIn(token: string): number {
    const expiration = this.getTimestampFromToken(token)
    
    if (!expiration) return -1
    
    const result = expiration - Date.now() / 1000
    
    console.log("Token will expire in " + result + "s")
    
    return result
  }
  
  private async refreshRefreshToken(): Promise<string> {
    const refreshToken = (await this.readTokens())?.refreshToken
    
    if (!refreshToken) throw new Error('No refresh token available')
    
    try {
      this.isRefreshing = true
      
      // Refresh and store access token using the supplied refresh function
      const result = await this.http.rawRequest({
        method: "POST",
        url: this.options.refreshTokenUrl,
        data: {[this.options.refreshTokenKey]: refreshToken}
      })
  
      await this.storeToken({
        authToken: result.data[this.options.tokenKey],
        refreshToken: result.data[this.options.refreshTokenKey],
      })
      
      return result.data[this.options.tokenKey]
    } catch (error: any) {
      // Failed to refresh token
      const status = error?.response?.status
      
      // logout the user because can't refresh token
      await this.logout();
      
      if (status === 401 || status === 422) {
        // The refresh token is invalid so remove the stored tokens
        
        throw new Error(`Got ${status} on token refresh; clearing both auth tokens`)
      } else {
        // A different error, probably network error
        throw new Error(`Failed to refresh auth token: ${error.message}`)
      }
    } finally {
      this.isRefreshing = false
    }
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $auth: AuthPlugin;
  }
}

export interface AuthPluginOptions {
  loginUrl: string;
  logoutUrl: string;
  userUrl: string;
  refreshTokenUrl: string;
  tokenKey: string;
  refreshTokenKey: string;
  /**
   * @default auth_keys
   */
  storageKey: string;
}

export const authPlugin = installPlugin<AuthPluginOptions>("auth", AuthPlugin, {
  storageKey: "auth_keys",
  ...settings
} as AuthPluginOptions)
