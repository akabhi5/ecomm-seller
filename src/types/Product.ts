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
  size_quantity: SizeQuantity;
}

export interface ProductImage {
  id: number;
  url: string;
}

export interface SizeQuantity {
  id: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
}
