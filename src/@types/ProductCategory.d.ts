import { Attachment } from '@/@types/Attachment'

export interface ProductCategory {
  title: string;
  description: string;
  thumbnail: Attachment | null;
  parent: ProductCategory | null;
  level: number;
  
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

