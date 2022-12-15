import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass'
import { WalletPremiumStatisticEntry } from '@/@types/Wallet Premium/WalletPremiumStatisticEntry'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import { WalletPremiumUserSummary } from '@/@types/Wallet Premium/WalletPremiumUserSummary'

export class WalletPremiumApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club2/wp'
  
  static async show (movementId: string): Promise<WalletPremiumMovement | undefined> {
    const result = await this.withLoader<WalletPremiumMovement>('get', this.getUrl('/' + movementId))
    
    return result?.data
  }
  
  static async getStatistics (userId: string): Promise<WalletPremiumStatisticEntry[] | undefined> {
    const result = await this.withLoader<WalletPremiumStatisticEntry[]>('get', this.getUrl('/user-statistics/' + userId))
    
    return result?.data
  }
  
  static async getUserSummary (userId: string): Promise<WalletPremiumUserSummary | undefined> {
    const result = await this.withLoader<WalletPremiumUserSummary>('get', this.getUrl('/user-summary/' + userId))
    
    return result?.data
  }
  
  static async getMovements (userId: string, semesterId: string): Promise<WalletPremiumStatisticEntry | undefined> {
    const result = await this.withLoader<WalletPremiumStatisticEntry>('get',
      this.getUrl('/user-summary-by-semester/' + [userId, semesterId].join('/'))
    )
    
    return result?.data
  }
  
  static async withdraw (movementId: string, amount: number, clubCardNumber?: string): Promise<WalletPremiumMovement | undefined> {
    const result = await this.withLoader<WalletPremiumMovement>('post', this.getUrl('/' + movementId + '/withdraw'), {
      amount,
      userCardNum: clubCardNumber
    })
    
    return result?.data
  }
  
  static async withdrawBySemester (amount: number, semesters: string[], clubCardNumber?: string, userId?: string): Promise<WalletPremiumMovement[] | undefined> {
    const result = await this.withLoader<WalletPremiumMovement[]>('post', this.getUrl('/withdraw-by-semester'), {
      amount,
      semesters,
      userCardNum: clubCardNumber,
      userId
    })
    
    return result?.data
  }
}
