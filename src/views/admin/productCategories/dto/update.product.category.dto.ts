import { Attachment, NewAttachmentFile } from '@/@types/Attachment';

export interface UpdateProductCategoryDto {
  title?: string;
  description?: string;
  thumbnail?: File;
}
