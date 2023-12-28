import { Category } from "./Category";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  created_on: string;
  updated_on: string;
  product_images: string;
  category: Category;
}
