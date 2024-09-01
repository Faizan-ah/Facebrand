import { User } from "./user";
import { ProductWithQuantity } from "./product";

export type CartCreate = {
  userId: string | undefined;
  productId: string;
  quantity: number;
};

export type Cart = {
  cartId: string | null;
  user: User | null;
  products: ProductWithQuantity[];
};
