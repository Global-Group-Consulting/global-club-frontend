import {ProductCategory} from '@/@types/ProductCategory';
import {Attachment} from '@/@types/Attachment';
import {User} from '@/@types/User';
import {PackEnum} from '@/@enums/pack.enum';
import searchCollapse from "@/views/shared/SearchCollapse.vue";

export interface Location {
  city: string;
  province: string;
  region: string;
}

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
  location: Location;
}

export type ProductCreateDto = Omit<Product, "_id" | "createdAt" | "updatedAt">
export type ProductUpdateDto = Omit<Product, "_id" | "createdAt" | "updatedAt">
