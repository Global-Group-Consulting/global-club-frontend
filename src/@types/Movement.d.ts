import { MovementTypeEnum } from '@/@enums/movement.type.enum';

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
  created_at: Date;
  updated_at: Date;
}
