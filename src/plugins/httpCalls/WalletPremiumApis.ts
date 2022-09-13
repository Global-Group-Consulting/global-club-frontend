import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass'
import { WalletPremiumStatisticEntry } from '@/@types/Wallet Premium/WalletPremiumStatisticEntry'

export class WalletPremiumApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club2/wp'
  
  static async getStatistics (userId: string): Promise<WalletPremiumStatisticEntry[] | undefined> {
    const result = await this.withLoader<WalletPremiumStatisticEntry[]>('get', this.getUrl('/' + userId))
    
    return result?.data
  }
  
  static async getMovements (userId: string, semesterId: string): Promise<WalletPremiumStatisticEntry | undefined> {
    const result = await this.withLoader<WalletPremiumStatisticEntry>('get',
      this.getUrl('/' + [semesterId, userId].join('/'))
    )
    
    return result?.data
  }
  
  static async withdraw (userId: string, amount: number): Promise<WalletPremiumStatisticEntry | undefined> {
    const result = await this.withLoader<WalletPremiumStatisticEntry>('post', this.getUrl('/' + userId + "/withdraw"), {
      amount
    })
    
    return result?.data
  }
}
