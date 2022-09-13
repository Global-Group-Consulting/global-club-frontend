import { SemesterDetail } from '@/@types/SemesterDetail'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'

export interface WalletPremiumStatisticEntry {
  initialAmount: number;
  earned: number;
  withdrawn: number;
  withdrawable: number;
  noMoreWithdrawable: number;
  remainingToWithdraw: number;
  movements: null | WalletPremiumMovement[];
  semesterDetails: SemesterDetail;
}
