import { User } from ".";
import { ProductWithQuantity } from "./product";

export type CartCreate = {
  userId: string;
  productId: string;
  quantity: number;
};

export type Cart = {
  cartId: string | null;
  user: User | null;
  products: ProductWithQuantity[];
};
