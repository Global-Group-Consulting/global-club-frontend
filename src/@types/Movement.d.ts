import { MovementTypeEnum } from '@/@enums/movement.type.enum';
import { PackEnum } from '@/@enums/pack.enum';

export interface Movement {
  amountChange: number;
  userId: string;
  createdBy?: string;
  semesterId: string;
  notes: string;
  movementType: MovementTypeEnum;
  order: string;
  clubPack: PackEnum;
  referenceSemester: number;
  referenceYear: number;
  usableFrom: Date;
  expiresAt: Date;
  
  /* ReadOnly props */
  
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateManualMovementDto {
  amountChange: number;
  notes: string;
  semesterId: string;
  type: 'add' | 'remove';
  userId: string;
  clubPack: PackEnum;
}
