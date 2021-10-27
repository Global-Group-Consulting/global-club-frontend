export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  tags: string[];
  categories: string[];
  images: File[];
  thumbnail: File;
}
