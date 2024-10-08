import { Attachment } from '@/@types/Attachment';

export interface CreateProductCategoryDto {
  title: string;
  description: string;
  thumbnail: Attachment;
  parent?: string;
}
