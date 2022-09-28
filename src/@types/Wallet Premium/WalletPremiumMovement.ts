import { WalletPremiumMovementEnum } from '@/@enums/wallet.premium.movement.enum'
import { Movement } from '@/@types/Movement'

export interface WalletPremiumMovement {
  _id: string;
  userId: string;
  initialAmount: number;
  semester: string;
  movementType: WalletPremiumMovementEnum;
  referenceSemester: number;
  referenceYear: number;
  referenceUsableUntil: string;
  updated_at: string;
  created_at: string;
  hasWithdrawMovements: boolean;
  
  // only for "monthly_income" movements
  incomeAmount?: number;
  incomePercentage?: number;
  withdrawableFrom?: string;
  withdrawableUntil?: string;
  withdrawalRemaining?: number;
  withdrawalMovements?: Movement[];
  withdrawalDate?: string;
}
