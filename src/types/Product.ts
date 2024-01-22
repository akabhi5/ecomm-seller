import { ProductBrand } from "./Brand";
import { Category } from "./Category";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  created_on: string;
  updated_on: string;
  product_images: ProductImage[];
  category: Category;
  brand: ProductBrand;
}

export interface ProductImage {
  id: number;
  url: string;
}
