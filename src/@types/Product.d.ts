import { ProductCategory } from '@/@types/ProductCategory';
import { Attachment } from '@/@types/Attachment';
import { User } from '@/@types/User';
import { PackEnum } from '@/@enums/pack.enum';

export interface Product {
  title: string;
  description: string;
  conditions: string;
  price: number;
  tags: string[];
  categories: ProductCategory[];
  thumbnail: Attachment;
  images: Attachment[];
  minPacks: PackEnum[];
  hasQta: boolean;
  visible: boolean;
  priceUndefined: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCreateDto = Omit<Product, "_id" | "createdAt" | "updatedAt">
export type ProductUpdateDto = Omit<Product, "_id" | "createdAt" | "updatedAt">
