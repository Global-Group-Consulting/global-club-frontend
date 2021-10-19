import { ProductCategory } from '@/@types/ProductCategory';
import { Attachment } from '@/@types/Attachment';

export interface Product {
  title: string;
  
  description: string;
  
  price: number;
  
  tags: string[];
  
  categories: ProductCategory[] | string[];
  
  thumbnail: Attachment;
  
  images: Attachment[];
  
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
