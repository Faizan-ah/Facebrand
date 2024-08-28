export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  color?: string;
  meta?: object; // Add values if needed!
  rating: number;
  stock: number;
}

export type CreateProduct = Omit<Product, "id">;

export type ProductWithQuantity = {
  product: Product;
  quantity: number;
};

export type AddOrUpdateProduct = {
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
};
