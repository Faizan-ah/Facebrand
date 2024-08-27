export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  color: string;
  meta: {
    category?: string;
    subcategory?: string;
  };
  rating: number;
  stock: number;
}

export type CreateProduct = Omit<Product, "id">;

export type ProductWithQuantity = {
  product: Product;
  quantity: number;
};
