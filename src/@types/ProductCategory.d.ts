import { Attachment } from '@/@types/Attachment';

export interface ProductCategory {
  title: string;
  description: string;
  thumbnail: Attachment;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

