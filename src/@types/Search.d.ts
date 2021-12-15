import { ProductCategory } from '@/@types/ProductCategory';
import { Product } from '@/@types/Product';

export interface SearchDto {
  query: string;
  result: (Product | ProductCategory)[];
}
